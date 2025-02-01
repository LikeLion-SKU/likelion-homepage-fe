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

export default function useApplication() {
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
