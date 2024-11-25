import { Outlet, Routes as ReactRouters, Route, useLocation } from "react-router-dom";

import HomePage from "@pages/HomePage";
import AboutPage from "@pages/AboutPage";
import ProjectPage from "@pages/ProjectPage";
import RecruitPage from "@pages/RecruitPage";
import LoginPage from "@pages/LoginPage";
import Footer from "@layouts/footer/Footer";
import Header from "@layouts/header/Header";

const Routes = () => {
  
    return (
      <ReactRouters>
        {/* 레이아웃 공통 적용 */}
        <Route path="/" element={<Layout/>}>
          <Route path="home" element={<HomePage />}/>
          <Route path="about" element={<AboutPage />}/>
          <Route path="project" element={<ProjectPage />}/>
          <Route path="recruit" element={<RecruitPage />}/>
          <Route path="login" element={<LoginPage />}/>
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
  