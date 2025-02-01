import ApplicationBtn from '@/components/createApply/applicationSection/ApplicationBtn';
import ApplicationLayout from '@/components/createApply/applicationSection/layout/ApplicationLayout';
import ApplicationStateHeading from '@/components/createApply/applicationSection/ui/ApplicationStateHeading';
import { useGetApplication } from '@/hooks/useApplication';

export default function ApplicationStoredContainer() {
  const { isLoading, storedApplications } = useGetApplication();
  return (
    <ApplicationLayout>
      <ApplicationStateHeading title='보관된 지원서' />
      {isLoading ? <p>로딩중</p> : null}
      {!isLoading && storedApplications.length === 0 ? <p>지원서가 없습니다</p> : null}
      {!isLoading && storedApplications.length !== 0
        ? storedApplications.map((application) => {
            return (
              <ApplicationBtn
                key={application.id}
                cohort={`멋사 ${application.semester}기 지원서`}
              />
            );
          })
        : null}
    </ApplicationLayout>
  );
}
