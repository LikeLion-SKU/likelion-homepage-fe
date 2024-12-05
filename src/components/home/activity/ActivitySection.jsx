import ActivityCard from './ActivityCard';

export default function ActivitySection() {
  return (
    <ActivityCard>
      <ActivityCard.Title />
      <ActivityCard.ItemBox>
        <ActivityCard.Item content="A1" />
      </ActivityCard.ItemBox>
    </ActivityCard>
  );
}
