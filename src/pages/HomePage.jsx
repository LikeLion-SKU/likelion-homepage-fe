import React from 'react';
import Wrapper from '@commons/Wrapper';
import MainSection from '@components/home/main/MainSection';
import IntroSection from '@components/home/intro/IntroSection';
import { ActivitySection } from '@components/home/activity';

export default function HomePage() {
  return (
    <Wrapper>
      <MainSection />
      <IntroSection />
      <ActivitySection />
    </Wrapper>
  );
}
