import ApplicationBtn from '@/components/createApply/applicationSection/ApplicationBtn';
import ApplicationLayout from '@/components/createApply/applicationSection/layout/ApplicationLayout';
import ApplicationStateHeading from '@/components/createApply/applicationSection/ui/ApplicationStateHeading';

export default function ApplicationOnGoingContainer() {
  return (
    <ApplicationLayout>
      <ApplicationStateHeading title='진행 중인 지원서' />
      <ApplicationBtn cohort='멋사 12기 지원서' />
    </ApplicationLayout>
  );
}
