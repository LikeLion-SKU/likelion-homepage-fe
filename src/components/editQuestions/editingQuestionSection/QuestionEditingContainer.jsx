import { useLocation, useSearchParams } from 'react-router-dom';
import { useGetQuestionByType } from '@/hooks/useApplication';

import QuestionEditingContainerLayout from '@/components/editQuestions/editingQuestionSection/layout/QuestionEditingContainerLayout';
import QuestionEditing from '@/components/editQuestions/editingQuestionSection/ui/QuestionEditing';

export default function QuestionEditingContainer() {
  const location = useLocation();
  const [searchParam] = useSearchParams();
  const { isLoading, questions } = useGetQuestionByType(location.pathname.split('/')[4], searchParam.get('type'));
  return (
    <QuestionEditingContainerLayout>
      {isLoading ? <p>로딩중</p> : null}
      {!isLoading && questions.length === 0 ? <p>질문이 없습니다.</p> : null}
      {!isLoading && questions.length !== 0
        ? questions.map((q) => (
            <QuestionEditing
              key={q.id}
              questionId={q.id}
              content={q.content}
              questionsLength={questions.length}
            />
          ))
        : null}
    </QuestionEditingContainerLayout>
  );
}
