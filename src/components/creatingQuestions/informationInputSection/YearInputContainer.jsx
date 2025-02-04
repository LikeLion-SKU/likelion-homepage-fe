import YearInputContainerLayout from '@/components/creatingQuestions/informationInputSection/layout/YearInputContainerLayout';
import SubmitApplicationBtn from '@/components/creatingQuestions/informationInputSection/ui/SubmitApplicationBtn';
import YearInput from '@/components/creatingQuestions/informationInputSection/ui/YearInput';
import { useQuestions } from '@/components/creatingQuestions/provider/QuestionsProvider';
import useApplication from '@/hooks/useApplication';

export default function YearInputContainer() {
  const { applicationInformation, questions } = useQuestions();
  const { validateAndSubmitApplication } = useApplication();
  return (
    <YearInputContainerLayout>
      <YearInput />
      <SubmitApplicationBtn
        validateAndSubmitApplication={validateAndSubmitApplication}
        applicationInformation={applicationInformation}
        questions={questions}
      />
    </YearInputContainerLayout>
  );
}
