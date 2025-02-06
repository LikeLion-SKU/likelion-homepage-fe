import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import DeadLineEditingContainerLayout from '@/components/editQuestions/editingInformationInputSection/layout/DeadLineEditingContainerLayout';
import DeadLineEditingInput from '@/components/editQuestions/editingInformationInputSection/ui/DeadLineEditingInput';
import EditingButton from '@/components/editQuestions/editingInformationInputSection/ui/EditingButton';
import { useGetApplicationBySemester } from '@/hooks/useApplication';
import CompleteBtn from '@/components/editQuestions/editingInformationInputSection/ui/CompleteBtn';

export default function DeadLineEditingContainer() {
  const [isEditing, setIsEditing] = useState(false);
  const location = useLocation();
  const { information } = useGetApplicationBySemester(location.pathname.split('/')[4]);

  return (
    <DeadLineEditingContainerLayout>
      <DeadLineEditingInput
        value={information.deadline}
        isEditing={isEditing}
      />
      {isEditing ? (
        <CompleteBtn />
      ) : (
        <EditingButton
          onClick={function () {
            setIsEditing((prev) => !prev);
          }}
        />
      )}
    </DeadLineEditingContainerLayout>
  );
}
