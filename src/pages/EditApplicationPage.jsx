import EditingInformationSection from '@/components/editQuestions/section/EditingInformationSection';
import EditingQuestionsSection from '@/components/editQuestions/section/EditingQuestionsSection';
import EditQuestionsProvider from '@/components/editQuestions/provider/EditQuestionsProvider';
import QuestionTypeButtonSection from '@/components/editQuestions/section/QuestionTypeButtonSection';

export default function EditApplicationPage() {
  return (
    <EditQuestionsProvider>
      <EditingInformationSection />
      <QuestionTypeButtonSection />
      <EditingQuestionsSection />
    </EditQuestionsProvider>
  );
}
