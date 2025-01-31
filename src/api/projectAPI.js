import { APIService } from '@/api/axios';
import defaultImage from '@assets/projectPage/defaultImage.webp';

/**
 * 프로젝트 관련 API 호출
 */
const projectAPI = {
  /**
   * 프로젝트 목록 조회
   * @param {string} type
   * @param {number} page
   * @returns {Promise<Object>}
   */
  fetchProjects: async (type = 'ALL', page = 0) => {
    try {
      const endpoint =
        type === 'ALL'
          ? import.meta.env.VITE_APP_PROJECT_LIST_API
          : `${import.meta.env.VITE_APP_PROJECT_BY_TYPE_API}/${type}`;
      const response = await APIService.public.get(endpoint, { params: { page } });
      const projects = response.content.map((project) => ({
        ...project,
        thumbnailUrl: project.thumbnailUrl
          ? `${import.meta.env.VITE_APP_API_URL}${project.thumbnailUrl}`
          : defaultImage,
      }));

      return { ...response, content: projects };
    } catch (error) {
      console.error('프로젝트 목록 조회 실패:', error);
      throw error;
    }
  },

  /**
   * 프로젝트 상세 조회
   * @param {number|string} projectId - 프로젝트 ID
   * @returns {Promise<Object>} 서버 응답 데이터
   */
  fetchProjectDetail: async (projectId) => {
    try {
      const endpoint = `${import.meta.env.VITE_APP_PROJECT_DETAIL_API}/${projectId}`;
      const response = await APIService.public.get(endpoint);
      const projectData = response.data || response;

      // 그대로 반환
      return {
        ...projectData,
        imageUrls: projectData.imageUrls || [],
      };
    } catch (error) {
      console.error(`프로젝트 상세 조회 실패 (ID: ${projectId}):`, error);
      throw error;
    }
  },

  /**
   * 프로젝트 등록
   * @param {FormData} formData - 프로젝트 등록 데이터 (FormData 형태)
   * @returns {Promise<Object>} 서버 응답 데이터
   */
  createProject: async (formData) => {
    try {
      const endpoint = import.meta.env.VITE_APP_PROJECT_CREATE_API;
      // FormData를 전송할 때 Axios가 자동으로 Content-Type을 설정함
      const response = await APIService.private.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // 명시적으로 Content-Type 설정 가능
        },
      });
      return response;
    } catch (error) {
      console.error('프로젝트 등록 실패:', error);
      throw error;
    }
  },

  /**
   * 프로젝트 수정
   * @param {string} endpoint - API URL
   * @param {FormData} formData - 수정 데이터 (FormData 형태)
   * @param {Array} remainingImageUrls - 남은 이미지 URL 배열
   * @returns {Promise<Object>} 서버 응답 데이터
   */
  updateProject: async (endpoint, formData) => {
    try {
      const response = await APIService.private.put(endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data || response;
    } catch (error) {
      console.error('프로젝트 수정 실패:', error);
      throw error; // 에러를 상위로 전달
    }
  },

  /**
   * 프로젝트 삭제
   * @param {number} projectId
   * @returns {Promise<Object>}
   */
  deleteProject: async (projectId) => {
    try {
      const endpoint = `${import.meta.env.VITE_APP_PROJECT_DELETE_API}/${projectId}`;
      const response = await APIService.private.delete(endpoint);
      return response;
    } catch (error) {
      console.error(`프로젝트 삭제 실패 (ID: ${projectId}):`, error);
      throw error;
    }
  },
};

export default projectAPI;
