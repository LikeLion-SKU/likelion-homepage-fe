import React, { useState } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_API_URL;

const ApiTestPage = () => {
  const [results, setResults] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [semester, setSemester] = useState('');
  const [parts, setParts] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 에러 처리 함수
  const handleError = (error) => {
    console.error('API Error:', error);
    setError(error.response?.data?.message || error.message);
    setResults(null);
    setIsLoading(false);
  };

  // 결과 처리 함수
  const handleSuccess = (data) => {
    setError(null);
    setResults(data);
    setIsLoading(false);
  };

  // 전체 사용자 조회 [관리자]
  const getAllUsers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASE_URL}/api/users/users`);
      handleSuccess(response.data);
    } catch (error) {
      handleError(error);
    }
  };

  // 기수별 사용자 조회
  const getUsersBySemester = async () => {
    if (!semester) {
      setError('기수를 입력해주세요.');
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASE_URL}/api/users/semester/${semester}`);
      handleSuccess(response.data);
    } catch (error) {
      handleError(error);
    }
  };

  // 기수/파트별 사용자 조회
  const getUsersBySemesterAndParts = async () => {
    if (!semester || !parts) {
      setError('기수와 파트를 모두 입력해주세요.');
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASE_URL}/api/users/semester/${semester}/parts/${parts}`);
      handleSuccess(response.data);
    } catch (error) {
      handleError(error);
    }
  };

  // 이름으로 사용자 검색
  const searchUsersByName = async () => {
    if (!searchName) {
      setError('검색할 이름을 입력해주세요.');
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASE_URL}/api/users/search/name`, {
        params: { name: searchName },
      });
      handleSuccess(response.data);
    } catch (error) {
      handleError(error);
    }
  };

  // 역할별 사용자 조회 [관리자]
  const getUsersByRole = async () => {
    if (!role) {
      setError('역할을 입력해주세요.');
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASE_URL}/api/users/role/${role}`);
      handleSuccess(response.data);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className='p-6 max-w-4xl mx-auto'>
      <h1 className='text-2xl font-bold mb-6'>API 테스트 페이지</h1>

      {/* 전체 사용자 조회 섹션 */}
      <section className='mb-8 p-4 bg-white rounded-lg shadow'>
        <h2 className='text-xl font-semibold mb-4'>전체 사용자 조회 [관리자]</h2>
        <button
          onClick={getAllUsers}
          disabled={isLoading}
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300'
        >
          {isLoading ? '로딩중...' : '조회하기'}
        </button>
      </section>

      {/* 기수별 사용자 조회 섹션 */}
      <section className='mb-8 p-4 bg-white rounded-lg shadow'>
        <h2 className='text-xl font-semibold mb-4'>기수별 사용자 조회</h2>
        <div className='flex gap-4 mb-4'>
          <input
            type='number'
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            placeholder='기수 입력'
            className='border p-2 rounded flex-1'
          />
          <button
            onClick={getUsersBySemester}
            disabled={isLoading}
            className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-green-300'
          >
            {isLoading ? '로딩중...' : '조회하기'}
          </button>
        </div>
      </section>

      {/* 기수/파트별 사용자 조회 섹션 */}
      <section className='mb-8 p-4 bg-white rounded-lg shadow'>
        <h2 className='text-xl font-semibold mb-4'>기수/파트별 사용자 조회</h2>
        <div className='flex gap-4 mb-4'>
          <input
            type='number'
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            placeholder='기수 입력'
            className='border p-2 rounded flex-1'
          />
          <input
            type='text'
            value={parts}
            onChange={(e) => setParts(e.target.value)}
            placeholder='파트 입력'
            className='border p-2 rounded flex-1'
          />
          <button
            onClick={getUsersBySemesterAndParts}
            disabled={isLoading}
            className='bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:bg-purple-300'
          >
            {isLoading ? '로딩중...' : '조회하기'}
          </button>
        </div>
      </section>

      {/* 이름으로 사용자 검색 섹션 */}
      <section className='mb-8 p-4 bg-white rounded-lg shadow'>
        <h2 className='text-xl font-semibold mb-4'>이름으로 사용자 검색</h2>
        <div className='flex gap-4 mb-4'>
          <input
            type='text'
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder='이름 입력'
            className='border p-2 rounded flex-1'
          />
          <button
            onClick={searchUsersByName}
            disabled={isLoading}
            className='bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 disabled:bg-yellow-300'
          >
            {isLoading ? '로딩중...' : '검색하기'}
          </button>
        </div>
      </section>

      {/* 역할별 사용자 조회 섹션 */}
      <section className='mb-8 p-4 bg-white rounded-lg shadow'>
        <h2 className='text-xl font-semibold mb-4'>역할별 사용자 조회 [관리자]</h2>
        <div className='flex gap-4 mb-4'>
          <input
            type='text'
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder='역할 입력'
            className='border p-2 rounded flex-1'
          />
          <button
            onClick={getUsersByRole}
            disabled={isLoading}
            className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:bg-red-300'
          >
            {isLoading ? '로딩중...' : '조회하기'}
          </button>
        </div>
      </section>

      {/* 에러 메시지 표시 */}
      {error && <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>{error}</div>}

      {/* 결과 표시 */}
      {results && (
        <div className='mt-8 p-4 bg-white rounded-lg shadow'>
          <h3 className='text-lg font-semibold mb-4'>결과</h3>
          <pre className='bg-gray-100 p-4 rounded overflow-auto max-h-96 text-sm'>
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ApiTestPage;
