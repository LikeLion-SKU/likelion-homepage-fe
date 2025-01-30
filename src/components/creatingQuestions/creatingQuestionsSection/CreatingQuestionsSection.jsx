import CreateQuestionBtnContainer from '@/components/creatingQuestions/creatingQuestionsSection/CreateQuestionBtnContainer';
import QuestionInputContainer from '@/components/creatingQuestions/creatingQuestionsSection/QuestionInputContainer';

export default function CreatingQuestionsSection() {
  return (
    <section>
      <QuestionInputContainer />
      <CreateQuestionBtnContainer />
    </section>
  );
}
