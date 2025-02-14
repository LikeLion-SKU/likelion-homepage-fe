import ButtonLayout from '@/components/editQuestions/button/ui/Button.Layout';
import { convertQuestionPartToString } from '@/utils/questionParts';

export default function QuestionTypeButton({ onClick, part, isActive }) {
  return (
    <ButtonLayout
      color={isActive === part ? 'grey' : 'lightgrey'}
      size='large'
      rounded='medium'
      textSize='small'
      textColor={isActive === part ? 'bright' : 'black'}
      onClick={() => onClick()}
    >
      {part ? convertQuestionPartToString(part) : ''}
    </ButtonLayout>
  );
}
