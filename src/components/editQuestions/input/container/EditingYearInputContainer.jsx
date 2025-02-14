import { useState } from 'react';

import styles from './Input.Container.module.css';

import InputContainer from '@/components/editQuestions/input/container/Input.Container';
import Input from '@/components/editQuestions/input/ui/Input';
import EditingButton from '@/components/editQuestions/editingQuestionSection/ui/EditingButton';
import CompleteCancelButtonContainer from '@/components/editQuestions/button/container/CompleteCancelButtonContainer';
import { useEditQuestions } from '@/components/editQuestions/provider/EditQuestionsProvider';

import { useUpdateApplicationInformation } from '@/hooks/useApplication';

export default function EditingYearInputContainer({ information }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedSemester, setUpdatedSemester] = useState(information.semester);

  const { type } = useEditQuestions();
  const { isLoading: isUpdateLoading, updateApplicationInformation } = useUpdateApplicationInformation(
    information.semester,
    type,
    {
      ...information,
      semester: updatedSemester,
    },
  );

  return (
    <InputContainer size='large'>
      <h1 className={styles['container__title']}>
        멋사
        <Input
          readOnly={!isEditing}
          type='number'
          min={0}
          value={updatedSemester}
          onChange={(e) => setUpdatedSemester(e.target.value)}
          size='small'
          rounded={false}
        />
        기 지원서
      </h1>

      {isEditing ? (
        <CompleteCancelButtonContainer
          completeOnClick={() => updateApplicationInformation()}
          cancelOnClick={() => setIsEditing(false)}
        />
      ) : (
        <EditingButton onClick={() => setIsEditing(true)} />
      )}
    </InputContainer>
  );
}
