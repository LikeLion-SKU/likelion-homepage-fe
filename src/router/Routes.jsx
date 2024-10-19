import { useEffect } from 'react';
import {
  Routes as ReactRouters,
  Route,
  useLocation,
  Outlet,
} from 'react-router-dom';

import HomePage from '@pages/HomePage';
import Footer from '@layouts/Footer';
import Header from '@layouts/Header';
import ApplicationForm from '../pages/applicationForm/ApplicationForm';

const Routes = () => {
  return (
    <ReactRouters>
      {/* 헤더 및 푸터 공통 적용 */}
      <Route path="/" element={<Layout />}>
        {/* 그 외 페이지들 */}
        {/* <Route index element={<HomePage />} /> */}

        <Route path="apply" element={<ApplicationForm />} />
      </Route>
    </ReactRouters>
  );
};

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Routes;
