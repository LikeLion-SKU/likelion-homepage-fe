import { useNavigate } from 'react-router-dom';

import CompleteEditingButton from '@/components/editQuestions/button/ui/CompleteEditingButton';
import SectionLayout from '@/components/editQuestions/section/Section.Layout';

export default function EditCompleteButtonSection() {
  const nav = useNavigate();
  return (
    <SectionLayout size='super-large'>
      <CompleteEditingButton
        onClick={() => {
          if (confirm('수정을 완료하시겠습니까?')) nav('/admin/create');
          return;
        }}
      />
    </SectionLayout>
  );
}
