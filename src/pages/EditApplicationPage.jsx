import EditingInformationSection from '@/components/editQuestions/section/EditingInformationSection';
import EditingQuestionsSection from '@/components/editQuestions/section/EditingQuestionsSection';
import EditQuestionsProvider from '@/components/editQuestions/provider/EditQuestionsProvider';
import QuestionTypeButtonSection from '@/components/editQuestions/section/QuestionTypeButtonSection';
import EditCompleteButtonSection from '@/components/editQuestions/section/EditCompleteButtonSection';

export default function EditApplicationPage() {
  return (
    <EditQuestionsProvider>
      <EditCompleteButtonSection />
      <EditingInformationSection />
      <QuestionTypeButtonSection />
      <EditingQuestionsSection />
    </EditQuestionsProvider>
  );
}
