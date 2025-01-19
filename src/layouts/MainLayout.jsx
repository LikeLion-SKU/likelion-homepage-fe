import { Outlet } from 'react-router-dom';

import { Footer, Header } from '@components/commons';

export default function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
