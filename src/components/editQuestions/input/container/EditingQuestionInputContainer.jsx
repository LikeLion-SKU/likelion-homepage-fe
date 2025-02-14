import { useState } from 'react';

import EditDeleteButtonContainer from '@/components/editQuestions/button/container/EditDeleteButtonContainer';
import Input from '@/components/editQuestions/input/ui/Input';
import InputContainer from '@/components/editQuestions/input/container/Input.Container';
import CompleteCancelButtonContainer from '@/components/editQuestions/button/container/CompleteCancelButtonContainer';
import { useDeleteQuestionByType, useUpdateQuestionByType } from '@/hooks/useApplication';

export default function EditingQuestionInputContainer({ defaultValue, id, semester, type }) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(defaultValue);

  const { isLoading, deleteQuestionByType } = useDeleteQuestionByType(id, semester, type);
  const { updateQuestionByType } = useUpdateQuestionByType(id, { type, content }, semester, type);

  return (
    <InputContainer size='large'>
      <Input
        readOnly={!isEditing}
        type='text'
        size='large'
        value={content}
        rounded={true}
        onChange={(e) => setContent(e.target.value)}
      />
      {isEditing ? (
        <CompleteCancelButtonContainer
          completeOnClick={() => updateQuestionByType()}
          cancelOnClick={() => setIsEditing(false)}
        />
      ) : (
        <EditDeleteButtonContainer
          editOnClick={() => setIsEditing(true)}
          deleteOnClick={() => deleteQuestionByType()}
        />
      )}
    </InputContainer>
  );
}
