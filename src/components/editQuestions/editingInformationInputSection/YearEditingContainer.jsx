import { useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import YearEditingContainerLayout from '@/components/editQuestions/editingInformationInputSection/layout/YearEditingContainerLayout';
import YearInput from '@/components/editQuestions/editingInformationInputSection/ui/YearInput';
import CompleteBtn from '@/components/editQuestions/editingInformationInputSection/ui/CompleteBtn';
import EditingButton from '@/components/editQuestions/editingInformationInputSection/ui/EditingButton';
import { useGetApplicationBySemester, useUpdateApplicationInformation } from '@/hooks/useApplication';

export default function YearEditingContainer() {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedSemester, setUpdatedSemester] = useState(null);

  const location = useLocation();
  const [searchParam] = useSearchParams();

  const { information } = useGetApplicationBySemester(location.pathname.split('/')[4]);
  const { updateApplicationInformation } = useUpdateApplicationInformation(
    information.semester,
    { ...information, semester: updatedSemester !== null ? updatedSemester : information.semester },
    searchParam.get('type'),
  );
  return (
    <YearEditingContainerLayout>
      <YearInput
        value={information.semester}
        isEditing={isEditing}
        setUpdatedSemester={setUpdatedSemester}
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
    </YearEditingContainerLayout>
  );
}
