import IntroSection from '@components/home/intro/IntroSection';
import RecruitSection from '@components/home/recruit/RecruitSection';
import ScheduleSection from '@components/home/schedule/ScheduleSection';
import TrackSection from '@components/home/track/TrackSection';
import MainSection from '@components/home/main/MainSection';

export default function HomePage() {
  return (
    <>
      <RecruitSection />
      <MainSection />
      <IntroSection />
      <TrackSection />
      <ScheduleSection />
    </>
  );
}
