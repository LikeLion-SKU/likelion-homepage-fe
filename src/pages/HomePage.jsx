import IntroSection from '@components/home/intro/IntroSection';
import RecruitSection from '@components/home/recruit/RecruitSection';
import ScheduleSection from '@components/home/schedule/ScheduleSection';
import TrackSection from '@components/home/track/TrackSection';

export default function HomePage() {
  return (
    <>
      <RecruitSection />
      <IntroSection />
      <TrackSection />
      <ScheduleSection />
    </>
  );
}
