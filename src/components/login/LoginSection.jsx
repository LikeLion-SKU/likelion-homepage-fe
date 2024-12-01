import React from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import './LoginSection.css'

export default function LoginSection() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({}); 
    const navigate = useNavigate();


    // 로그인 버튼 클릭 시, 존재하는 정보인지 확인 
    const login = (e) => {
        e.preventDefault();

        //유효성 검사
        const validationErrors = validation_login(); 

        if (Object.keys(validationErrors).length > 0) { // 에러메세지가 있다면 set해주고 중단
            setErrors(validationErrors);
            return;
        }
        else{
            navigate("/")
        }
    }

    
    
    // Id, Password 입력받기
    const onIdHandler = (event) => {
        setId(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }

    

    // 로그인 유효성 검사 // 
    const validation_login = () => {
        const errors = {};

        if(id === ""){
            errors.id = "이메일을 입력해주세요.";
        }
        else if(password === ""){
            errors.password = "비밀번호를 입력해주세요.";
        }

        return errors;
    }


    return (
        <div className="LoginPage_layout">
            <div className="Login_input_information"> 
                <p className="title">로그인</p>
            </div>

            <div className="Login_input_boxs">
                <div className="Login_input_box">
                    <label>이메일</label>
                    <div className="id_box">
                        <div className="id_input">
                            <input 
                            type="text" 
                            className={errors.id ? "invalid" : id ? "valid" : ""}
                            style={errors.id && {borderColor:"red"}}  
                            onChange={onIdHandler} required></input>
                            <p> @skuniv.ac.kr </p>
                        </div>
                    {errors.id && <p className="error_message">{errors.id}</p>}
                    </div>
                    
                </div>
                <div className="Login_input_box">  
                    <label>비밀번호</label>
                    <input 
                    type="password" 
                    className={errors.password ? "invalid" : password ? "valid" : ""}
                    style={errors.password && {borderColor:"red"}} 
                    onChange={onPasswordHandler} required></input>
                    {errors.password && <p className="error_message">{errors.password}</p>} 
                </div>

                <div className="Login_progress_box"> 
                    <button type="button" className="LoginBtn" onClick={login}>로그인</button>
                    <div className="toSignup">
                        <p>계정이 없으신가요?</p>
                        <button type="submit" className="tosignupBtn">회원가입</button>
                    </div>
                </div>
            </div>
        </div>
    )
}