import { useState } from 'react';

import { editParts } from '@/constants/questionParts';

import QuestionBtnContainerLayout from '@/components/editQuestions/editingInformationInputSection/layout/QuestionBtnContainerLayout';
import QuestionPartBtn from '@/components/editQuestions/editingInformationInputSection/ui/QuestionPartBtn';
import { useEditQuestions } from '@/components/editQuestions/provider/EditQuestionsProvider';
import { useSearchParams } from 'react-router-dom';

export default function QuestionBtnContainer() {
  const [isActive, setIsActive] = useState(editParts[0].part);
  const [searchParam, setSearchParam] = useSearchParams();

  const { setSelectedPart } = useEditQuestions();

  function setActiveButton(part) {
    setIsActive(part);
  }

  return (
    <QuestionBtnContainerLayout>
      {editParts.map((part) => {
        return (
          <QuestionPartBtn
            key={part.part}
            part={part.part}
            isActive={isActive === part.part}
            onClick={function () {
              setActiveButton(part.part);
              setSelectedPart(part.part);
              searchParam.set('type', part.part);
              setSearchParam(searchParam);
            }}
          />
        );
      })}
    </QuestionBtnContainerLayout>
  );
}
