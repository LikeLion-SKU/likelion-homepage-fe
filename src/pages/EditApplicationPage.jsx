import EditingInformationSection from '@/components/editQuestions/editingInformationInputSection/EditingInformationSection';
import EditQuestionsProvider from '@/components/editQuestions/provider/EditQuestionsProvider';

export default function EditApplicationPage() {
  return (
    <EditQuestionsProvider>
      <EditingInformationSection />
    </EditQuestionsProvider>
  );
}
