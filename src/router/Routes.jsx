import { Routes as ReactRouters, Route } from 'react-router-dom';

import HomePage from '@pages/HomePage';
import AboutPage from '@pages/AboutPage';
import ProjectPage from '@pages/ProjectPage';
import RecruitPage from '@pages/RecruitPage';
import LoginPage from '@pages/LoginPage';
import SignupPage from '@pages/SignupPage';
import WelcomePage from '@pages/WelcomePage';
import ApplicationForm from '../pages/applicationForm/ApplicationForm';
import ProjectPageLayout from '../components/ProjectPage/ProjectPageLayout';
import ProjectDetail from '../components/ProjectPage/ProjectDetail';
import NewProjectForm from '../components/ProjectPage/NewProjectFrom';
import ShowApply from '@pages/showApply/ShowApply';
import { MainLayout } from '@layouts';

export default function Routes() {
  return (
    <ReactRouters>
      {/* 레이아웃 공통 적용 */}
      <Route path="/" element={<MainLayout />}>
        <Route index={true} element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="project" element={<ProjectPage />}>
          {/* 사용자 모드 */}
          <Route index element={<ProjectPageLayout isAdmin={false} />} />
          {/* 관리자 모드 */}
          <Route path="admin" element={<ProjectPageLayout isAdmin={true} />} />
          <Route path="admin/add" element={<NewProjectForm />} />
          {/* 프로젝트 상세 페이지 */}
          <Route path=":projectId" element={<ProjectDetail />} />
        </Route>
        <Route path="recruit" element={<RecruitPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="welcome" element={<WelcomePage />} />
        <Route path="apply" element={<ApplicationForm />} />
        <Route path="admin/apply" element={<ShowApply />} />
      </Route>
    </ReactRouters>
  );
}
