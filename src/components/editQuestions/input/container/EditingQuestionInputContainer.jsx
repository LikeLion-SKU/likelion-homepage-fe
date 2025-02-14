import { useState } from 'react';

import EditDeleteButtonContainer from '@/components/editQuestions/button/container/EditDeleteButtonContainer';
import Input from '@/components/editQuestions/input/ui/Input';
import InputContainer from '@/components/editQuestions/input/container/Input.Container';
import CompleteCancelButtonContainer from '@/components/editQuestions/button/container/CompleteCancelButtonContainer';
import LoadingButtonConatainer from '@/components/editQuestions/button/container/LoadingButtonContainer';

import { useCreateQuestionByType, useDeleteQuestionByType, useUpdateQuestionByType } from '@/hooks/useApplication';

export default function EditingQuestionInputContainer({
  defaultValue,
  id,
  semester,
  type,
  setUpdatedQuestions,
  updatedQuestions,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(defaultValue);

  const { isLoading: isDeleteLoading, deleteQuestionByType } = useDeleteQuestionByType(id, semester, type);
  const { isLoading: isUpdateLoading, updateQuestionByType } = useUpdateQuestionByType(
    id,
    { type, content },
    semester,
    type,
  );
  const { isLoading: isCreateLoading, createQuestionByType } = useCreateQuestionByType(semester, type, {
    type,
    content,
  });

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
        {isCreateLoading ? (
          <LoadingButtonConatainer size='small' />
        ) : (
          <CompleteCancelButtonContainer
            completeOnClick={() => createQuestionByType()}
            cancelOnClick={() => {
              setUpdatedQuestions((prev) => prev.slice(0, -1));
            }}
          />
        )}
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
        isUpdateLoading ? (
          <LoadingButtonConatainer size='small' />
        ) : (
          <CompleteCancelButtonContainer
            completeOnClick={() => updateQuestionByType()}
            cancelOnClick={() => setIsEditing(false)}
          />
        )
      ) : isDeleteLoading ? (
        <LoadingButtonConatainer size='small' />
      ) : (
        <EditDeleteButtonContainer
          editOnClick={() => setIsEditing(true)}
          deleteOnClick={() => {
            if (updatedQuestions.length === 1) {
              alert('질문이 1개인 경우 삭제가 불가능합니다.');
              return;
            }

            if (updatedQuestions.length === 2 && updatedQuestions[updatedQuestions.length - 1]?.type === 'add') {
              alert('새로운 질문을 생성하면서 삭제는 불가능합니다.');
              return;
            }

            deleteQuestionByType();
          }}
        />
      )}
    </InputContainer>
  );
}
