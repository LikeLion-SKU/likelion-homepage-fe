import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { APIService } from '@/api/axios';
import { convertQuestionPartToString } from '@/utils/questionParts';

export function useGetApplication() {
  const [isLoading, setIsLoading] = useState(false);
  const [storedApplications, setStoredApplications] = useState([]);
  const [onGoingApplications, setOnGoingApplications] = useState([]);

  const getAllApplication = useCallback(async function () {
    setIsLoading(true);
    try {
      const res = await APIService.private.get(import.meta.env.VITE_APP_APPLICATIONS);
      const storedApp = res.filter((application) => application.activation === false);
      const onGoingApp = res.filter((application) => application.activation === true);
      setStoredApplications(storedApp);
      setOnGoingApplications(onGoingApp);
    } catch {
      alert('지원서를 불러오는데 실패했습니다');
      return;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllApplication();
  }, []);

  return {
    isLoading,
    storedApplications,
    onGoingApplications,
  };
}

export function useGetApplicationBySemester(semester) {
  const [isLoading, setIsLoading] = useState(false);
  const [information, setInformation] = useState([]);

  const getApplicationBySemester = useCallback(async function () {
    setIsLoading(true);
    try {
      const res = await APIService.private.get(`${import.meta.env.VITE_APP_APPLICATIONS}/${semester}`);
      if (res) {
        setInformation(res);
      }
    } catch {
      alert('지원서를 불러오는데 실패했습니다');
      return;
    } finally {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    getApplicationBySemester();
  }, []);

  return {
    isLoading,
    information,
  };
}

export function useDeleteApplication(formId) {
  const [isLoading, setIsLoading] = useState(false);

  const deleteApplication = useCallback(
    async function () {
      setIsLoading(true);
      try {
        const res = await APIService.private.delete(`${import.meta.env.VITE_APP_APPLICATIONS}/${formId}`);
        if (!res) {
          alert('지원서를 성공적으로 삭제했습니다');
          window.location.href = '/admin/create';
        }
      } catch {
        alert('지원서를 불러오는데 실패했습니다');
      } finally {
        setIsLoading(false);
      }
    },
    [formId],
  );

  return {
    isLoading,
    deleteApplication,
  };
}

export function useCreateApplication() {
  const nav = useNavigate();

  function extractQuestionsContent(questions) {
    return Object.fromEntries(
      Object.entries(questions).map(([key, questionList]) => [key, questionList.map((q) => q.content)]),
    );
  }

  async function validateAndSubmitApplication(applicationInformation, questions) {
    if (!applicationInformation.semester) {
      alert('기수를 입력해주세요');
      return;
    }

    if (!applicationInformation.deadline) {
      alert('마감 기한을 입력해주세요');
      return;
    }

    for (const part in questions) {
      if (questions[part].some((q) => q.content.trim() === '')) {
        alert(`${convertQuestionPartToString(part)}에 비어 있는 질문이 있습니다.`);
        return;
      }
    }

    const extractedQuestions = extractQuestionsContent(questions);

    try {
      const res = await APIService.private.post(import.meta.env.VITE_APP_APPLICATIONS, {
        ...applicationInformation,
        ...extractedQuestions,
      });

      if (res) {
        alert('지원서가 성공적으로 생성되었습니다');
        nav('/admin/create');
      }
    } catch {
      alert('지원서 생성에 실패했습니다');
      return;
    }
  }

  return { validateAndSubmitApplication };
}

export function useUpdateApplicationActivation(formId) {
  const [isLoading, setIsLoading] = useState(false);

  const updateApplicationActivation = useCallback(
    async function () {
      setIsLoading(true);
      try {
        const res = await APIService.private.put(`${import.meta.env.VITE_APP_APPLICATIONS}/${formId}/activate`);
        if (res) {
          alert('지원서 활성화 상태를 성공적으로 업데이트 했습니다');
          window.location.href = '/admin/create';
        }
      } catch {
        alert('지원서를 활성화 상태를 업데이트 하는데 실패했습니다');
        return;
      } finally {
        setIsLoading(false);
      }
    },
    [formId],
  );

  return {
    isLoading,
    updateApplicationActivation,
  };
}

export function useUpdateApplicationInformation(semester, type, information) {
  const [isLoading, setIsLoading] = useState(false);

  const updateApplicationInformation = useCallback(
    async function () {
      setIsLoading(true);
      try {
        const res = await APIService.private.put(`${import.meta.env.VITE_APP_APPLICATIONS}/${semester}`, information);
        if (res) {
          alert('지원서 정보를 성공적으로 업데이트 했습니다');
          window.location.href = `/admin/edit/application/${res.semester}?type=${type}`;
        }
      } catch {
        alert('지원서를 활성화 상태를 업데이트 하는데 실패했습니다');
        return;
      } finally {
        setIsLoading(false);
      }
    },
    [semester, information, type],
  );

  return {
    isLoading,
    updateApplicationInformation,
  };
}

export function useGetQuestionByType(semester, type) {
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  const getQuestionByType = useCallback(
    async function () {
      setIsLoading(true);
      try {
        const res = await APIService.private.get(
          `${import.meta.env.VITE_APP_QUESTIONS}?semester=${semester}&type=${type}`,
        );
        if (res) {
          setQuestions(res);
        }
      } catch {
        alert('질문을 불러오는데 실패했습니다');
      } finally {
        setIsLoading(false);
      }
    },
    [semester, type],
  );

  useEffect(() => {
    getQuestionByType();
  }, [getQuestionByType]);

  return {
    isLoading,
    questions,
  };
}

export function useCreateQuestionByType(semester, type, data) {
  const [isLoading, setIsLoading] = useState(false);

  const createQuestionByType = useCallback(
    async function () {
      setIsLoading(true);
      try {
        const res = await APIService.private.post(`${import.meta.env.VITE_APP_QUESTIONS}?semester=${semester}`, data);
        if (res) {
          alert('새 질문을 성공적으로 생성 했습니다');
          window.location.href = `/admin/edit/application/${semester}?type=${type}`;
        }
      } catch {
        alert('새 질문을 생성하는데 실패했습니다');
        return;
      } finally {
        setIsLoading(false);
      }
    },
    [data, semester, type],
  );

  return {
    isLoading,
    createQuestionByType,
  };
}

export function useUpdateQuestionByType(questionId, data, semester, type) {
  const [isLoading, setIsLoading] = useState(false);

  const updateQuestionByType = useCallback(
    async function () {
      setIsLoading(true);
      try {
        const res = await APIService.private.put(`${import.meta.env.VITE_APP_QUESTIONS}/${questionId}`, data);
        if (res) {
          alert('질문을 성공적으로 업데이트 했습니다');
          window.location.href = `/admin/edit/application/${semester}?type=${type}`;
        }
      } catch {
        alert('질문을 업데이트 하는데 실패했습니다');
        return;
      } finally {
        setIsLoading(false);
      }
    },
    [questionId, data, semester, type],
  );

  return {
    isLoading,
    updateQuestionByType,
  };
}

export function useDeleteQuestionByType(questionId, semester, type) {
  const [isLoading, setIsLoading] = useState(false);

  const deleteQuestionByType = useCallback(
    async function () {
      setIsLoading(true);
      try {
        const res = await APIService.private.delete(`${import.meta.env.VITE_APP_QUESTIONS}/${questionId}`);
        if (!res) {
          alert('질문을 성공적으로 삭제했습니다');
          window.location.href = `/admin/edit/application/${semester}?type=${type}`;
        }
      } catch {
        alert('질문을 삭제 하는데 실패했습니다');
        return;
      } finally {
        setIsLoading(false);
      }
    },
    [questionId, semester, type],
  );

  return {
    isLoading,
    deleteQuestionByType,
  };
}
