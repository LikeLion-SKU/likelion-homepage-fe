import ContainerLayout from '@/components/editQuestions/button/container/Container.Layout';
import EditButton from '@/components/editQuestions/button/ui/EditButton';
import DeleteButton from '@/components/editQuestions/button/ui/DeleteButton';

export default function EditDeleteButtonContainer({ editOnClick, deleteOnClick }) {
  if (typeof editOnClick !== 'function') throw new Error('editOnClick은 함수이어야 합니다');
  if (typeof deleteOnClick !== 'function') throw new Error('deleteOnClcik은 함수이어야 합니다');

  return (
    <ContainerLayout size='medium'>
      <EditButton onClick={() => editOnClick()} />
      <DeleteButton onClick={() => deleteOnClick()} />
    </ContainerLayout>
  );
}
