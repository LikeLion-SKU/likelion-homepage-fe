import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { editParts } from '@/constants/questionParts';

import ContainerLayout from '@/components/editQuestions/button/container/Container.Layout';
import QuestionTypeButton from '@/components/editQuestions/button/ui/QuestionTypeButton';
import { useEditQuestions } from '@/components/editQuestions/provider/EditQuestionsProvider';

export default function QuestionTypeButtonContainer() {
  const { type } = useEditQuestions();
  const [searchParam, setSearchParam] = useSearchParams();

  const [isActive, setIsActive] = useState(type);

  return (
    <ContainerLayout size='superLarge'>
      {editParts.map((part) => (
        <QuestionTypeButton
          key={part.part}
          onClick={() => {
            setIsActive(part.part);
            searchParam.set('type', part.part);
            setSearchParam(searchParam);
          }}
          part={part.part}
          isActive={isActive}
        />
      ))}
    </ContainerLayout>
  );
}
