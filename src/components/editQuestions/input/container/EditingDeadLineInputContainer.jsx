import { useState } from 'react';

import { InputWithLabel } from '@/components/editQuestions/input/ui/Input';
import InputContainer from '@/components/editQuestions/input/container/Input.Container';
import EditingButton from '@/components/editQuestions/editingQuestionSection/ui/EditingButton';
import CompleteCancelButtonContainer from '@/components/editQuestions/button/container/CompleteCancelButtonContainer';
import { useUpdateApplicationInformation } from '@/hooks/useApplication';
import { useEditQuestions } from '@/components/editQuestions/provider/EditQuestionsProvider';
import LoadingButtonConatainer from '@/components/editQuestions/button/container/LoadingButtonContainer';

export default function EditingDeadLineInputContainer({ information }) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(information.deadline);

  const { semester, type } = useEditQuestions();
  const { isLoading: isUpdateLoading, updateApplicationInformation } = useUpdateApplicationInformation(semester, type, {
    ...information,
    deadline: content,
  });

  return (
    <InputContainer size='large'>
      <InputWithLabel
        readOnly={!isEditing}
        type='date'
        value={content}
        size='small'
        rounded={false}
        onChange={(e) => setContent(e.target.value)}
      >
        마감 날짜
      </InputWithLabel>

      {isEditing ? (
        isUpdateLoading ? (
          <LoadingButtonConatainer />
        ) : (
          <CompleteCancelButtonContainer
            completeOnClick={() => updateApplicationInformation()}
            cancelOnClick={() => setIsEditing(false)}
          />
        )
      ) : (
        <EditingButton onClick={() => setIsEditing(true)} />
      )}
    </InputContainer>
  );
}
