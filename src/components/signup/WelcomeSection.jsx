import React from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import './WelcomeSection.css'
import logo from "@svgs/logo.svg";

export default function WelcomeSection() {
    const [name, setName] = useState("김유저");
    const navigate = useNavigate();

    // 홈으로 버튼 클릭 //
    function toHomeClick (e) {
        e.preventDefault();
        
        navigate("/"); // 2번째 페이지 보여줌.
    }

    return (
        <div className="WelcomePage_layout">
            <div className="welcome_img_box">
                <img src={logo} className="welcomeImg" alt="Logo"/>
            </div>
            <div className="welcomePage_message">
                <p className="userName">{name}님</p>
                <p>서경대학교 멋쟁이사자처럼 홈페이지</p>
                <p>가입을 환영합니다!</p>
            </div>
            <div className="welcomePage_Btn">
                <button style={{cursor:'pointer'}} onClick={toHomeClick}>홈으로</button>
                
            </div>
        </div>
    )
}