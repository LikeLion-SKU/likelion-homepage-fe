import ApplicationBtnCard from './ui/ApplicationBtnCard';

export default function ApplicationBtn({ cohort }) {
  return (
    <ApplicationBtnCard>
      <ApplicationBtnCard.ApplicationCohort cohort={cohort} />
      <ApplicationBtnCard.Dots />
      <ApplicationBtnCard.MenuList>
        <ApplicationBtnCard.MenuItem text='수정 하기' />
        <ApplicationBtnCard.MenuItem text='삭제 하기' />
      </ApplicationBtnCard.MenuList>
    </ApplicationBtnCard>
  );
}
