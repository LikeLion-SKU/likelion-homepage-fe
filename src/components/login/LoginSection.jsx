import React from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './LoginSection.css'

export default function LoginSection() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({}); 
    const navigate = useNavigate();
    const apiURL ="http://"; // <== 여기에 api주소 추가

    // 로그인 버튼 클릭 시, 유효성 검사부터하고 회원정보 찾기 호출
    const next = (e) => {
        e.preventDefault();

        const validationErrors = validation_login(); //유효성 검사

        if (Object.keys(validationErrors).length > 0) { // 에러메세지가 있다면 set해주고 중단
            setErrors(validationErrors);
            return;
        }
        else{
            login(id, password);
        }
    }

    const login = (id, password) => {
        //e.preventDefault();
        
        axios.post(`${apiURL}/api/users/login`, {
            loginId: id,
            password: password
        })
        .then(function (response) { 
            if(response.data.isSuccess === true){
                setData(response.data); 
                console.log(response.data); 
            
                let accessToken = response.data.accessToken;
                let refreshToken = response.data.refreshToken;
    
                sessionStorage.setItem("access", accessToken); // 키, 토큰 
                sessionStorage.setItem("refresh", refreshToken); // ???? 
                console.log("로그인 성공");
    
                navigate("/");
            }
            else{
                console.log(error);
                console.log("로그인 실패");
                setErrors(()=> ({...form, password: "로그인을 실패하였습니다."}));
            }
            
        })
        .catch(function (error) {
            console.log(error);
            console.log("로그인 실패");
        });
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
            errors.id = "아이디를 입력해주세요.";
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
                    <label>아이디</label>
                    <div className="id_box">
                        <div className="id_input">
                            <input 
                            type="text" 
                            className={errors.id ? "invalid" : id ? "valid" : ""}
                            style={errors.id && {borderColor:"red"}}  
                            onChange={onIdHandler} required></input>
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
                    <button type="button" className="LoginBtn" onClick={next}>로그인</button>
                    <div className="toSignup">
                        <p>계정이 없으신가요?</p>
                        <button type="submit" className="tosignupBtn"onClick={() => {navigate("/signup")}}>회원가입</button>
                    </div>
                </div>
            </div>
        </div>
    )
}