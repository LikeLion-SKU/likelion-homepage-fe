import React from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './LoginSection.css'
import {handleLogin} from "../../utils/login.js";

export default function LoginSection() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({}); 
    const navigate = useNavigate();

    // 로그인 버튼 클릭 시, 유효성 검사부터하고 회원정보 찾기 호출
    function handleLoginClick(event) {
        event.preventDefault();

        const isValid = handleLogin(setErrors, id, password);
        if (isValid) {
            // 유효성 검사를 통과한 경우 로그인 처리
            console.log('```로그인 유효성 검사 성공');

            //login(id, password);
            console.log("로그인 성공");
            navigate("/");
        }
    }



    // Id, Password 입력받기
    function onIdHandler (event) {
        setId(event.currentTarget.value);
    }
    function onPasswordHandler (event) {
        setPassword(event.currentTarget.value);
    }


    return (
        <div className="LoginPage_layout">
            <div className="Login_input_information"> 
                <p className="title">로그인</p>
            </div>
            <div className="Login_input_boxs">
                <div className="Login_input_box">
                    <label>아이디</label>
                    <input 
                    type="text" 
                    name="id"
                    className={errors.id ? "invalid" : id ? "valid" : ""}
                    style={{ borderColor: errors.id && 'red' }} 
                    onChange={onIdHandler} required></input>
                    {errors.id && <p className="error_message">{errors.id}</p>}
                </div>
                
                <div className="Login_input_box">  
                    <label>비밀번호</label>
                    <input 
                    type="password" 
                    name="password"
                    className={errors.password ? "invalid" : password ? "valid" : ""}
                    style={{ borderColor: errors.id && 'red' }}
                    onChange={onPasswordHandler} required></input>
                    {errors.password && <p className="error_message">{errors.password}</p>} 
                </div>

                <div className="Login_progress_box"> 
                    <button style={{cursor:'pointer'}}  type="button" className="LoginBtn" onClick={handleLoginClick}>로그인</button>
                    <div className="toSignup">
                        <p>계정이 없으신가요?</p>
                        <button style={{cursor:'pointer'}}  type="submit" className="tosignupBtn"onClick={() => {navigate("/signup")}}>회원가입</button>
                    </div>
                    {errors.login && <p className="error_message_false">{errors.login}</p>} 
                </div>
            </div>
        </div>
    )
}