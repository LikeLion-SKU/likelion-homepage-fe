import { useEffect } from "react";
import { Routes as ReactRouters, Route, useLocation } from "react-router-dom";

import HomePage from "@pages/HomePage";
import Footer from "@layouts/Footer";
import Header from "@layouts/Header";

const Routes = () => {
  
    return (
      <ReactRouters>
        {/* 헤더 및 푸터 공통 적용 */}
        <Route path="/" element={<>
            <Header/> <Footer />
        </>}>
        {/* 그 외 페이지들 */}
          <Route index element={<HomePage />} />
        
        </Route>
      </ReactRouters>
    );
  };
  
  export default Routes;
  