import ContainerLayout from '@/components/editQuestions/button/container/Container.Layout';
import CancelButton from '@/components/editQuestions/button/ui/CancelButton';
import CompleteButton from '@/components/editQuestions/button/ui/CompleteButton';

export default function CompleteCancelButtonContainer({ completeOnClick, cancelOnClick }) {
  if (typeof completeOnClick !== 'function') throw new Error('completeOnClick은 함수이어야 합니다');
  if (typeof cancelOnClick !== 'function') throw new Error('cancelOnClick은 함수이어야 합니다');

  return (
    <ContainerLayout>
      <CompleteButton onClick={() => completeOnClick()} />
      <CancelButton onClick={() => cancelOnClick()} />
    </ContainerLayout>
  );
}
