import { CreatingQuestionsSection, InformationInputSection } from '@/components/creatingQuestions';
import QuestionsProvider from '@/components/creatingQuestions/provider/QuestionsProvider';

export default function QuestionAdminPage() {
  return (
    <QuestionsProvider>
      <InformationInputSection />
      <CreatingQuestionsSection />
    </QuestionsProvider>
  );
}
