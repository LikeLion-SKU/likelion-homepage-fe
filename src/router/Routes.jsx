import { Routes as ReactRouters, Route } from 'react-router-dom';

// Pages
import HomePage from '@pages/HomePage';
import AboutPage from '@pages/AboutPage';
import ProjectPage from '@pages/ProjectPage';
import RecruitPage from '@pages/RecruitPage';
import LoginPage from '@pages/LoginPage';
import PasswordFindPage from '@pages/PasswordFindPage';
import SignupPage from '@pages/SignupPage';
import MyPage from '@pages/MyPage';
import WelcomePage from '@pages/WelcomePage';
import Apply from '@pages/ApplyPage';
import ApiTestPage from '@/pages/ApiTestPage';
import AdminPage from '@/pages/AdminPage';
import QuestionAdminPage from '@/pages/adminPage1/QuestionAdminPage';
import AdminApply from '@pages/AdminApplyPage';
import CreateApplyPage from '@/pages/CreateApplyPage';
import AdminAbout from '@/pages/AdminAboutPage';

// Components
import ProjectPageLayout from '../components/ProjectPage/ProjectPageLayout';
import ProjectDetail from '../components/ProjectPage/ProjectDetail';
import NewProjectForm from '../components/ProjectPage/NewProjectForm';
import EditProjectForm from '../components/ProjectPage/EditProjectForm';
import ViewForm from '@components/adminApply/ViewForm';
import { Error } from '@components/commons';

// Layouts
import { MainLayout } from '@layouts';





export default function Routes() {
  return (
    <ReactRouters>
      <Route path="/" element={<MainLayout />}>
        {/* Public Routes */}
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="passwordFind" element={<PasswordFindPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="welcome" element={<WelcomePage />} />
        <Route path="project" element={<ProjectPage />} />


        {/* Project Routes */}
        <Route path="project">
          <Route index element={<ProjectPageLayout isAdmin={false} />} />
          <Route path=":projectId" element={<ProjectDetail />} />
        </Route>

        {/* Application Routes */}
        <Route path="apply" element={<Apply />} />
        <Route path="recruit" element={<RecruitPage />} />
        <Route path='application' element={<ViewForm/>} />

        {/* Admin Routes */}
        <Route path="admin">
          <Route index element={<AdminPage />} />
          {/* 지원서 생성하기 */}
          <Route path="create" element={<CreateApplyPage />} />
          <Route path="questions" element={<QuestionAdminPage />} />
          {/* 지원서 모아보기 */}
          <Route path="apply">
            <Route index element={<AdminApply/>}/>
            <Route path=':studentId' element={<ViewForm/>}/>
          </Route>
          {/* 프로젝트 편집하기 */}
          <Route path="project">
            <Route index element={<ProjectPageLayout isAdmin={true} />} />
            <Route path="add" element={<NewProjectForm />} />
            <Route path="edit" element={<EditProjectForm />} />
          </Route>
          {/* 멋사인 편집하기 */}
          <Route path="about" element={<AdminAbout />} />
        </Route>

        {/* User Routes */}
        <Route path="mypage" element={<MyPage />} />

        {/* Development Routes */}
        <Route path="apitest" element={<ApiTestPage />} />

        {/* Error Routes */}
        <Route path="error" element={<Error />} />
      </Route>
    </ReactRouters>
  );
}
