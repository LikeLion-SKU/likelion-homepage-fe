import React from "react";
import { Routes, Route } from "react-router-dom";
import Wrapper from "@commons/Wrapper";
import ProjectPageContent from "../components/ProjectPage/ProjectPageContent";

export default function ProjectPage() {
    return (
        <Wrapper>
            <Routes>
                <Route index element={<ProjectPageContent isAdmin={false} />} /> {/* 사용자 모드 */}
                <Route path="admin" element={<ProjectPageContent isAdmin={true} />} /> {/* 관리자 모드 */}
            </Routes>
        </Wrapper>
    );
}
