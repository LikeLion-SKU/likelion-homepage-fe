import { useState } from 'react';

import { questionParts } from '@/constants/questionParts';

import QuestionBtnContainerLayout from '@/components/creatingQuestions/informationInputSection/layout/QuestionBtnContainerLayout';
import QuestionPartBtn from '@/components/creatingQuestions/informationInputSection/ui/QuestionPartBtn';
import { useQuestions } from '@/components/creatingQuestions/provider/QuestionsProvider';

export default function QuestionBtnContainer() {
  const [isActive, setIsActive] = useState(questionParts[0].part);

  const { setSelectedPart } = useQuestions();

  function setActiveButton(part) {
    setIsActive(part);
  }

  return (
    <QuestionBtnContainerLayout>
      {questionParts.map((part) => {
        return (
          <QuestionPartBtn
            key={part.part}
            part={part.part}
            isActive={isActive === part.part}
            onClick={setActiveButton}
            setSelectedPart={setSelectedPart}
          />
        );
      })}
    </QuestionBtnContainerLayout>
  );
}
