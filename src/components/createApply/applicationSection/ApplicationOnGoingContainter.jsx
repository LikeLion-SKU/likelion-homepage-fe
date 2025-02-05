import ApplicationBtn from '@/components/createApply/applicationSection/ApplicationBtn';
import ApplicationLayout from '@/components/createApply/applicationSection/layout/ApplicationLayout';
import ApplicationStateHeading from '@/components/createApply/applicationSection/ui/ApplicationStateHeading';
import Loading from '@/components/createApply/applicationSection/ui/Loading';
import { useGetApplication } from '@/hooks/useApplication';

export default function ApplicationOnGoingContainer() {
  const { onGoingApplications, isLoading } = useGetApplication();
  return (
    <ApplicationLayout>
      <ApplicationStateHeading title='진행 중인 지원서' />
      {isLoading ? <Loading /> : null}
      {!isLoading && onGoingApplications.length === 0 ? <p>지원서가 없습니다</p> : null}
      {!isLoading && onGoingApplications.length !== 0
        ? onGoingApplications.map((application) => {
            return (
              <ApplicationBtn
                key={application.id}
                formId={application.id}
                cohort={`멋사 ${application.semester}기 지원서`}
              />
            );
          })
        : null}
    </ApplicationLayout>
  );
}
