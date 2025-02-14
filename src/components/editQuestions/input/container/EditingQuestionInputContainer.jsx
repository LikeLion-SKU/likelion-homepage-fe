import { useState } from 'react';

import EditDeleteButtonContainer from '@/components/editQuestions/button/container/EditDeleteButtonContainer';
import Input from '@/components/editQuestions/input/ui/Input';
import InputContainer from '@/components/editQuestions/input/container/Input.Container';
import CompleteCancelButtonContainer from '@/components/editQuestions/button/container/CompleteCancelButtonContainer';
import { useDeleteQuestionByType, useUpdateQuestionByType } from '@/hooks/useApplication';
import CreateQuestionButton from '@/components/editQuestions/button/ui/CreateQuestionButton';

export default function EditingQuestionInputContainer({ defaultValue, id, semester, type, setUpdatedQuestions }) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(defaultValue);

  const { isLoading, deleteQuestionByType } = useDeleteQuestionByType(id, semester, type);
  const { updateQuestionByType } = useUpdateQuestionByType(id, { type, content }, semester, type);

  if (typeof id === 'string' && id.startsWith('temp')) {
    return (
      <InputContainer size='large'>
        <Input
          readOnly={false}
          type='text'
          size='large'
          value={content}
          rounded={true}
          onChange={(e) => setContent(e.target.value)}
        />

        <CompleteCancelButtonContainer
          cancelOnClick={() => {
            setUpdatedQuestions((prev) => prev.slice(0, -1));
          }}
        />
      </InputContainer>
    );
  }
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
