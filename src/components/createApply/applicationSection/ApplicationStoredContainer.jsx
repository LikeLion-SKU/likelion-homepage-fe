import ApplicationBtn from '@/components/createApply/applicationSection/ApplicationBtn';
import ApplicationLayout from '@/components/createApply/applicationSection/layout/ApplicationLayout';
import ApplicationStateHeading from '@/components/createApply/applicationSection/ui/ApplicationStateHeading';

export default function ApplicationStoredContainer() {
  return (
    <ApplicationLayout>
      <ApplicationStateHeading title='보관된 지원서' />
      <ApplicationBtn cohort='멋사 14기 지원서' />
      <ApplicationBtn cohort='멋사 15기 지원서' />
      <ApplicationBtn cohort='멋사 16기 지원서' />
    </ApplicationLayout>
  );
}
