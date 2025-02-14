import EditingInformationSection from '@/components/editQuestions/editingInformationInputSection/EditingInformationSection';
import EditingQuestionsSection from '@/components/editQuestions/section/EditingQuestionsSection';
import EditQuestionsProvider from '@/components/editQuestions/provider/EditQuestionsProvider';

export default function EditApplicationPage() {
  return (
    <EditQuestionsProvider>
      <EditingInformationSection />
      <EditingQuestionsSection />
    </EditQuestionsProvider>
  );
}
