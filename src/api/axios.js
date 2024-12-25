/***
 * axios.js 사용 예시
 *
 * 1. 토큰이 필요없는 요청 (public)
 * EX: GET 전체 게시글
 * try {
 *   const response = await APIService.public.get('/api/posts');
 *   console.log();
 * } catch (error) {
 *   console.error(error);
 * }
 *
 * 2. 토큰이 필요한 요청 (private)
 * // POST
 * try {
 *   const response = await APIService.private.post('/posts', {
 *     title: '제목',
 *     content: '내용'
 *   });
 *   console.log();
 * } catch (error) {
 *   console.error(error);
 * }
 *
 * // PUT
 * try {
 *   const response = await APIService.private.put('/posts/1', {
 *     title: '수정된 제목',
 *     content: '수정된 내용'
 *   });
 *   console.log();
 * } catch (error) {
 *   console.error(error);
 * }
 *
 * // delete
 * try {
 *   const response = await APIService.private.delete('/posts/1');
 *   console.log(response);
 * } catch (error) {
 *   console.error(error);
 * }
 */

import axios from 'axios';

/**
 * 토큰이 필요없는 일반 요청을 위한 Axios 인스턴스
 * 주로 로그인, 회원가입 등 인증 전 요청에 사용
 * baseURL: 환경변수에서 가져온 API 기본 주소
 * timeout: 30초 (30000ms) 후 요청 자동 취소
 */
const publicApi = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 토큰이 필요한 인증 요청을 위한 Axios 인스턴스
 * 로그인 후 사용자 인증이 필요한 API 요청에 사용
 * publicApi와 동일한 기본 설정을 가지지만, 토큰 관련 인터셉터가 추가됨
 */
const privateApi = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * privateApi 요청 인터셉터
 * 모든 privateApi 요청이 실행되기 전에 실행되는 미들웨어
 * localStorage에서 토큰을 가져와 요청 헤더에 추가
 */
privateApi.interceptors.request.use(
  (config) => {
    // localStorage에서 토큰 가져오기
    const token = localStorage.getItem('token');
    if (token) {
      // Authorization 헤더에 Bearer 토큰 추가
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 요청 전 에러 발생 시 에러 반환
    return Promise.reject(error);
  }
);

/**
 * privateApi 응답 인터셉터
 * 모든 privateApi 응답이 처리되기 전에 실행되는 미들웨어
 * 주로 토큰 만료 시 토큰 갱신 처리를 담당
 */
privateApi.interceptors.response.use(
  (response) => {
    // 정상 응답 시 그대로 반환
    return response;
  },
  async (error) => {
    // 실패한 요청의 설정을 저장
    const originalRequest = error.config;

    // 401 에러(인증 실패)이고 아직 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      // 재시도 표시
      originalRequest._retry = true;

      try {
        // 리프레시 토큰으로 새 액세스 토큰 발급 시도
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await publicApi.post('/auth/refresh', {
          refreshToken,
        });
        const newToken = response.data.token;

        // 새 access 토큰 저장
        localStorage.setItem('token', newToken);

        // 새 토큰으로 원래 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return privateApi(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰도 만료된 경우
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        // 로그인 페이지로 리다이렉트
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    // 다른 에러의 경우 그대로 에러 반환
    return Promise.reject(error);
  }
);

/**
 * API 서비스 객체
 * 실제 API 호출을 위한 메서드들을 제공
 * public과 private으로 구분하여 각각의 용도에 맞는 메서드 제공
 */
export const APIService = {
  // 공개 API (토큰 불필요)
  public: {
    // GET 요청
    get: async (url, config = {}) => {
      const response = await publicApi.get(url, config);
      return response.data;
    },
    // POST 요청
    post: async (url, data = {}, config = {}) => {
      const response = await publicApi.post(url, data, config);
      return response.data;
    },
  },

  // 비공개 API (토큰 필요)
  private: {
    // GET 요청
    get: async (url, config = {}) => {
      const response = await privateApi.get(url, config);
      return response.data;
    },
    // POST 요청
    post: async (url, data = {}, config = {}) => {
      const response = await privateApi.post(url, data, config);
      return response.data;
    },
    // PUT 요청
    put: async (url, data = {}, config = {}) => {
      const response = await privateApi.put(url, data, config);
      return response.data;
    },
    // DELETE 요청
    delete: async (url, config = {}) => {
      const response = await privateApi.delete(url, config);
      return response.data;
    },
    // PATCH 요청
    patch: async (url, data = {}, config = {}) => {
      const response = await privateApi.patch(url, data, config);
      return response.data;
    },
  },
};

export default {
  public: publicApi,
  private: privateApi,
};
