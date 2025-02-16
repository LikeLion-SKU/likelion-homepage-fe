import EditingDeadLineInputContainer from '@/components/editQuestions/input/container/EditingDeadLineInputContainer';
import EditingOpenLineInputContainer from '@/components/editQuestions/input/container/EditingOpenLineInputContainer';
import EditingResultLineInputContainer from '@/components/editQuestions/input/container/EditingResultLineInputContainer';
import EditingYearInputContainer from '@/components/editQuestions/input/container/EditingYearInputContainer';
import { useEditQuestions } from '@/components/editQuestions/provider/EditQuestionsProvider';
import SectionLayout from '@/components/editQuestions/section/Section.Layout';

import { useGetApplicationBySemester } from '@/hooks/useApplication';

export default function EditingInformationSection() {
  const { semester } = useEditQuestions();
  const { isLoading, information } = useGetApplicationBySemester(semester);
  console.log(information);

  return (
    <SectionLayout>
      {isLoading ? <p>로딩중</p> : null}
      {!isLoading ? <EditingYearInputContainer information={information} /> : null}
      {!isLoading ? <EditingOpenLineInputContainer information={information} /> : null}
      {!isLoading ? <EditingDeadLineInputContainer information={information} /> : null}
      {!isLoading ? <EditingResultLineInputContainer information={information} /> : null}
    </SectionLayout>
  );
}
