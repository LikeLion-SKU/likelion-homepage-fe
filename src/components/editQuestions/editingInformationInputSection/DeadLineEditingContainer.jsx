import DeadLineEditingContainerLayout from '@/components/editQuestions/editingInformationInputSection/layout/DeadLineEditingContainerLayout';
import DeadLineEditingInput from '@/components/editQuestions/editingInformationInputSection/ui/DeadLineEditingInput';
import { useGetApplicationBySemester } from '@/hooks/useApplication';
import { useLocation } from 'react-router-dom';

export default function DeadLineEditingContainer() {
  const location = useLocation();
  const { information } = useGetApplicationBySemester(location.pathname.split('/')[4]);

  return (
    <DeadLineEditingContainerLayout>
      <DeadLineEditingInput value={information.deadline} />
    </DeadLineEditingContainerLayout>
  );
}
