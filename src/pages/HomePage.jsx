import MainSection from '@components/home/main/MainSection';
import IntroSection from '@components/home/intro/IntroSection';
import { ActivitySection } from '@components/home/activity';

export default function HomePage() {
  return (
    <>
      <MainSection />
      <IntroSection />
      <ActivitySection />
    </>
  );
}
