import { Outlet } from 'react-router-dom';

import { Wrapper } from '@components/commons';
import { Footer, Header } from '@components/commons';

export default function MainLayout() {
  return (
    <Wrapper>
      <Header />
      <Outlet />
      <Footer />
    </Wrapper>
  );
}
