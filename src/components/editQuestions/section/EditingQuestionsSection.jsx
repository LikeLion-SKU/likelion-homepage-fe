import { useEffect, useState } from 'react';

import CreateQuestionButton from '@/components/editQuestions/button/ui/CreateQuestionButton';
import EditingQuestionInputContainer from '@/components/editQuestions/input/container/EditingQuestionInputContainer';
import { useEditQuestions } from '@/components/editQuestions/provider/EditQuestionsProvider';
import SectionLayout from '@/components/editQuestions/section/Section.Layout';
import { useGetQuestionByType } from '@/hooks/useApplication';

export default function EditingQuestionsSection() {
  const { semester, type } = useEditQuestions();
  const { questions, isLoading } = useGetQuestionByType(semester, type);

  const [updatedQuestions, setUpdatedQuestions] = useState([]);

  useEffect(() => {
    if (questions) {
      setUpdatedQuestions(questions);
    }
  }, [questions]);

  return (
    <SectionLayout>
      {!isLoading && updatedQuestions.length === 0 ? <p>질문이 없습니다</p> : null}
      {!isLoading && updatedQuestions.length > 0
        ? updatedQuestions.map((q) => (
            <EditingQuestionInputContainer
              key={q.id}
              id={q.id}
              defaultValue={q.content}
              semester={semester}
              type={type}
              setUpdatedQuestions={setUpdatedQuestions}
              updatedQuestions={updatedQuestions}
            />
          ))
        : null}
      <CreateQuestionButton
        onClick={() =>
          setUpdatedQuestions((prev) => {
            if (prev.length === questions.length + 1) {
              alert('기존에 새로 생성한 질문의 작성 완료 후 새로운 질문을 만들어주세요');
              return prev;
            }
            return [...prev, { id: `temp-${Math.random()}`, content: '', type: 'add' }];
          })
        }
      />
    </SectionLayout>
  );
}
