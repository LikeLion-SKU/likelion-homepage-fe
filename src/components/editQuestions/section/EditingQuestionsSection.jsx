import EditingQuestionInputContainer from '@/components/editQuestions/input/container/EditingQuestionInputContainer';
import { useEditQuestions } from '@/components/editQuestions/provider/EditQuestionsProvider';
import SectionLayout from '@/components/editQuestions/section/Section.Layout';
import { useGetQuestionByType } from '@/hooks/useApplication';

export default function EditingQuestionsSection() {
  const { semester, type } = useEditQuestions();
  const { questions, isLoading } = useGetQuestionByType(semester, type);

  return (
    <SectionLayout>
      {!isLoading && questions.length === 0 ? <p>질문이 없습니다</p> : null}
      {!isLoading && questions.length > 0
        ? questions.map((q) => (
            <EditingQuestionInputContainer
              key={q.id}
              id={q.id}
              defaultValue={q.content}
              semester={semester}
              type={type}
            />
          ))
        : null}
      {}
    </SectionLayout>
  );
}
