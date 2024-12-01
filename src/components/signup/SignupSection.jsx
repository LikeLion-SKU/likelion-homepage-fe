import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SignupSection.css'

export default function SignupSection() {
    const [form, setForm] = useState({
        name: "",
        id: "",
        password: "",
    });
    const [errors, setErrors] = useState({}); 
    const navigate = useNavigate();


    const next = (e) => {
        e.preventDefault();
        
        const validationErrors = validation_form();

        if (Object.keys(validationErrors).length > 0) { // 에러메세지가 있다면 set해주고 중단
            setErrors(validationErrors);
            console.log("유효성 검사 실패");
            return;
        }
        else{
            navigate("/welcome")
        }
    }


    // 회원가입 유효성 검사 // 
    const validation_form = () => {
        const errors = {};

        if(form.name === ""){
            errors.name = "본인의 이름을 입력해주세요.";
        }
        
        else if(form.id === ""){
            errors.id = "이메일은 필수 입력 항목입니다.";
        }
        else if(form.password === ""){
            errors.password = "비밀번호는 필수 입력 항목입니다.";
        }
        else if(form.password.length < 8){
            errors.password = "비밀번호는 최소 8자 이상이어야 합니다.";
        }

        return errors;
    }


    return (
        <div className="SignupPage_layout">
            <div name="Signup_input_information">
                <p className="title">회원가입</p>
            </div>
            <div className="Signup_input_boxs">
                <div name="name_box" className="Signup_input_box">
                    <label>이름</label>
                    <div name="Name_input" className="input_box">
                        <input 
                        type="text" 
                        className={errors.name ? "invalid" : form.name ? "valid" : ""}
                        onChange={e => setForm({...form, name: e.currentTarget.value})}
                        required
                        ></input>
                        {errors.name && <p className="error_message">{errors.name}</p>}
                    </div>
                </div>

                <div name="id_box" className="Signup_input_box">
                    <label>이메일</label>
                    <div name="Id_input" className="input_box">
                        <div className="idInput">
                            <input 
                            type="text" 
                            className={errors.id ? "invalid" : form.id ? "valid" : ""}
                            onChange={e => setForm({...form, id: e.currentTarget.value})}
                            required
                            ></input> 
                            <p> @skuniv.ac.kr </p>
                        </div>
                        
                        {errors.id && <p className="error_message">{errors.id}</p>}
                    </div>
                </div>

                <div name="password_box" className="Signup_input_box">
                    <label>비밀번호</label>
                    <div name="Password_input" className="input_box" id="pwinput">
                        <input 
                        type="text" 
                        className={errors.password ? "invalid" : form.password ? "valid" : ""}
                        onChange={e => setForm({...form, password: e.currentTarget.value})}
                        minLength={8}
                        required
                        ></input>
                        <div className="passwordCaution">
                            <p>비밀번호는 반드시 최소 8자리 문자여야 합니다.</p>
                        </div>
                        {errors.password && <p className="error_message">{errors.password}</p>}
                    </div>
                </div>

                <div name="Signup_progress_box" className="Signup_progress_box">
                    <button className="SignupBtn" onClick={next}>회원가입</button>
                    <div className="toLogin">
                        <p>이미 계정이 있으신가요?</p>
                        <button type="submit" className="tologinBtn"onClick={() => {navigate("/login")}}>로그인</button>
                    </div>
                </div>
            </div>
        </div>
    )
}