import CreateQuestionBtnContainerLayout from '@/components/creatingQuestions/creatingQuestionsSection/layout/CreateQuestionBtnContainerLayout';
import CreateQuestionBtn from '@/components/creatingQuestions/creatingQuestionsSection/ui/CreateQuestionBtn';
import { useQuestions } from '@/components/creatingQuestions/provider/QuestionsProvider';

export default function CreateQuestionBtnContainer() {
  const { createNewQuestion } = useQuestions();
  return (
    <CreateQuestionBtnContainerLayout>
      <CreateQuestionBtn createNewQuestion={createNewQuestion} />
    </CreateQuestionBtnContainerLayout>
  );
}
