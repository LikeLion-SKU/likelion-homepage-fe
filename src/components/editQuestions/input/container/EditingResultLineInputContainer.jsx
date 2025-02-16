import { useState } from 'react';

import { InputWithLabel } from '@/components/editQuestions/input/ui/Input';
import InputContainer from '@/components/editQuestions/input/container/Input.Container';
import EditingButton from '@/components/editQuestions/editingQuestionSection/ui/EditingButton';
import CompleteCancelButtonContainer from '@/components/editQuestions/button/container/CompleteCancelButtonContainer';
import { useUpdateApplicationInformation } from '@/hooks/useApplication';
import { useEditQuestions } from '@/components/editQuestions/provider/EditQuestionsProvider';
import LoadingButtonConatainer from '@/components/editQuestions/button/container/LoadingButtonContainer';

export default function EditingResultLineInputContainer({ information }) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(information.resultDate);

  const { semester, type } = useEditQuestions();
  const { isLoading: isUpdateLoading, updateApplicationInformation } = useUpdateApplicationInformation(semester, type, {
    ...information,
    resultDate: content,
  });

  return (
    <InputContainer size='large'>
      <InputWithLabel
        readOnly={!isEditing}
        type='datetime-local'
        value={content}
        size='medium'
        rounded={false}
        onChange={(e) => setContent(e.target.value)}
      >
        발표일 날짜
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
