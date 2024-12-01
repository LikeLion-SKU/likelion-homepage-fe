import React from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import './WelcomeSection.css'
import logo from "@svgs/logo.svg";

export default function WelcomeSection() {
    const [name, setName] = useState("김사자");
    const navigate = useNavigate();

    return (
        <div className="WelcomePage_layout">
            <div>
                <img src={logo} className="welcomeImg" alt="Logo"/>
            </div>
            <div className="welcomePage_message">
                <p className="userName">{name}님</p>
                <p>서경대학교 멋쟁이사자처럼 홈페이지</p>
                <p>가입을 환영합니다!</p>
            </div>
            <div className="welcomePage_Btn">
                <button onClick={()=>{navigate("/")}}>홈으로</button>
                
            </div>
        </div>
    )
}