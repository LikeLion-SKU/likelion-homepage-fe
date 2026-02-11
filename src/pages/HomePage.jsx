import IntroSection from '@components/home/intro/IntroSection';
// import RecruitSection from '@components/home/recruit/RecruitSection';
import RenewalBanner from '@components/home/renewal/RenewalBanner';
import ScheduleSection from '@components/home/schedule/ScheduleSection';
import TrackSection from '@components/home/track/TrackSection';
import MainSection from '@components/home/main/MainSection';
import { withBottomUpAnimation } from '@/components/animation';

// const AnimationRecruitSection = withBottomUpAnimation(RecruitSection, {
//   position: 'absolute',
//   left: 0,
//   top: '7vh',
//   width: '100vw',
//   height: '100vh',
// });
const AnimationRenewalBanner = withBottomUpAnimation(RenewalBanner, {
  position: 'absolute',
  left: 0,
  top: '7vh',
  width: '100vw',
  height: '100vh',
});
const AnimationMainSection = withBottomUpAnimation(MainSection);
const AnimationIntroSection = withBottomUpAnimation(IntroSection);
const AnimationTrackSection = withBottomUpAnimation(TrackSection);
const AnimationScheduleSection = withBottomUpAnimation(ScheduleSection);

export default function HomePage() {
  return (
    <>
      {/* <AnimationRecruitSection /> */}
      <AnimationRenewalBanner />
      <AnimationMainSection />
      <AnimationIntroSection />
      <AnimationTrackSection />
      <AnimationScheduleSection />
    </>
  );
}
