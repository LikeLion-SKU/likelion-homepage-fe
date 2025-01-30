import QuestionInputContainerLayout from '@/components/creatingQuestions/creatingQuestionsSection/layout/QuestionInputContainerLayout';
import QuestionInput from '@/components/creatingQuestions/creatingQuestionsSection/ui/QuestionInput';
import { useQuestions } from '@/components/creatingQuestions/provider/QuestionsProvider';

export default function QuestionInputContainer() {
  const { selectedPart, updateQuestionContent, deleteQuestion, questions } = useQuestions();

  return (
    <QuestionInputContainerLayout>
      {questions[selectedPart].map((q) => (
        <QuestionInput
          key={q.id}
          id={q.id}
          content={q.content}
          selectedPart={selectedPart}
          updateQuestionContent={updateQuestionContent}
          deleteQuestion={deleteQuestion}
        />
      ))}
    </QuestionInputContainerLayout>
  );
}
