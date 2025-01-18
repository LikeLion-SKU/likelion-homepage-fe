import AnimationLayout from '@/layouts/AnimationLayout';
import Recruit from './Recruit';

export default function RecruitSection() {
  return (
    <AnimationLayout
      styling={{
        position: 'absolute',
        left: 0,
        width: '100vw',
        height: '100vh',
      }}
    >
      <Recruit>
        <Recruit.ItemBox>
          <Recruit.Title />
          <Recruit.TimerTitle />
          <Recruit.Timer />
          <Recruit.Button />
        </Recruit.ItemBox>
        <Recruit.Motion />
      </Recruit>
    </AnimationLayout>
  );
}
