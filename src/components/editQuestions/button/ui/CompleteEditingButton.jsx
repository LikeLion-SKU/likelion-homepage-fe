import ButtonLayout from '@/components/editQuestions/button/ui/Button.Layout';

export default function CompleteEditingButton({ onClick }) {
  return (
    <ButtonLayout
      size='large'
      onClick={() => onClick()}
      color='lightgrey'
      rounded='small'
      textSize='small'
      textColor='black'
    >
      수정 완료
    </ButtonLayout>
  );
}
