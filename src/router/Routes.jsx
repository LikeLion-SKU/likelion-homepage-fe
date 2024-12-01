import { Outlet, Routes as ReactRouters, Route, useLocation } from "react-router-dom";

import HomePage from "@pages/HomePage";
import AboutPage from "@pages/AboutPage";
import ProjectPage from "@pages/ProjectPage";
import RecruitPage from "@pages/RecruitPage";
import LoginPage from "@pages/LoginPage";
import SignupPage from "@pages/SignupPage";
import WelcomePage from "@pages/WelcomePage";
import Footer from "@layouts/footer/Footer";
import Header from "@layouts/header/Header";

const Routes = () => {
  
    return (
      <ReactRouters>
        {/* 레이아웃 공통 적용 */}
        <Route path="/" element={<Layout/>}>
          <Route index={true} element={<HomePage />}/>
          <Route path="about" element={<AboutPage />}/>
          <Route path="project" element={<ProjectPage />}/>
          <Route path="recruit" element={<RecruitPage />}/>
          <Route path="login" element={<LoginPage />}/>
          <Route path="signup" element={<SignupPage />}/>
          <Route path="welcome" element={<WelcomePage />}/>
        </Route>
      </ReactRouters>
    );
  };

  const Layout = () => {
    return(
      <>
        <Header/>
        <Outlet/>
        <Footer />
      </>
    );
  };
  
  export default Routes;
  