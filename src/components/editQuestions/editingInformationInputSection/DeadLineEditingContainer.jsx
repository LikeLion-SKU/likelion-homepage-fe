import { useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import DeadLineEditingContainerLayout from '@/components/editQuestions/editingInformationInputSection/layout/DeadLineEditingContainerLayout';
import DeadLineEditingInput from '@/components/editQuestions/editingInformationInputSection/ui/DeadLineEditingInput';
import EditingButton from '@/components/editQuestions/editingInformationInputSection/ui/EditingButton';
import { useGetApplicationBySemester, useUpdateApplicationInformation } from '@/hooks/useApplication';
import CompleteBtn from '@/components/editQuestions/editingInformationInputSection/ui/CompleteBtn';

export default function DeadLineEditingContainer() {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedDeadline, setUpdatedDeadline] = useState(null);

  const location = useLocation();
  const [searchParam] = useSearchParams();

  const { information } = useGetApplicationBySemester(location.pathname.split('/')[4]);
  const { updateApplicationInformation } = useUpdateApplicationInformation(
    information.semester,
    { ...information, deadline: updatedDeadline !== null ? updatedDeadline : information.deadline },
    searchParam.get('type'),
  );

  return (
    <DeadLineEditingContainerLayout>
      <DeadLineEditingInput
        value={information.deadline}
        isEditing={isEditing}
        setUpdatedDeadline={setUpdatedDeadline}
      />
      {isEditing ? (
        <CompleteBtn
          onClick={function () {
            updateApplicationInformation();
          }}
        />
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
