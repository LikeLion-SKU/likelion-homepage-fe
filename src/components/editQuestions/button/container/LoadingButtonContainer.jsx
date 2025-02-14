import { TailSpin } from 'react-loader-spinner';

import ContainerLayout from '@/components/editQuestions/button/container/Container.Layout';

export default function LoadingButtonConatainer({ size }) {
  return (
    <ContainerLayout
      size={size}
      loading={true}
    >
      <TailSpin
        width={50}
        height={50}
      />
    </ContainerLayout>
  );
}
