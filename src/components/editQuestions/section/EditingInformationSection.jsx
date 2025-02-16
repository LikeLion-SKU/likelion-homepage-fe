import EditingDeadLineInputContainer from '@/components/editQuestions/input/container/EditingDeadLineInputContainer';
import EditingYearInputContainer from '@/components/editQuestions/input/container/EditingYearInputContainer';
import { useEditQuestions } from '@/components/editQuestions/provider/EditQuestionsProvider';
import SectionLayout from '@/components/editQuestions/section/Section.Layout';

import { useGetApplicationBySemester } from '@/hooks/useApplication';

export default function EditingInformationSection() {
  const { semester } = useEditQuestions();
  const { isLoading, information } = useGetApplicationBySemester(semester);

  return (
    <SectionLayout>
      {isLoading ? <p>로딩중</p> : null}
      {!isLoading ? <EditingYearInputContainer information={information} /> : null}
      {!isLoading ? <EditingDeadLineInputContainer information={information} /> : null}
    </SectionLayout>
  );
}
