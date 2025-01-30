import YearInputContainerLayout from '@/components/creatingQuestions/informationInputSection/layout/YearInputContainerLayout';
import SubmitApplicationBtn from '@/components/creatingQuestions/informationInputSection/ui/SubmitApplicationBtn';
import YearInput from '@/components/creatingQuestions/informationInputSection/ui/YearInput';

export default function YearInputContainer() {
  return (
    <YearInputContainerLayout>
      <YearInput />
      <SubmitApplicationBtn />
    </YearInputContainerLayout>
  );
}
