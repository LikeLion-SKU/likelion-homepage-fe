import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SignupSection.css'
import {handleIdchecking, handleSignup} from "../../utils/register.js";
import { handleInputChange } from "../../utils/inputOnChange.js";

export default function SignupSection(props) {
    const [form, setForm] = useState({
        id: "",
        id_valid: false,
        password: "",
        password_valid: "",
        name: "",
        department: "",
        strudent_num: "",
        semester: 0,
        phone_num: "",
        part: "",
    });
    const [errors, setErrors] = useState({}); 
    const navigate = useNavigate();
    

    // 아이디 중복 체크 //
    function handleDuplicateClick(event) {
        event.preventDefault();

        const isValid = handleIdchecking(setErrors, form);
        if (isValid) {
            setForm({...form, id_valid: true});
        }
    }


    // 회원가입 버튼 클릭 //
    function handleSignupClick(event) {
        event.preventDefault();

        const isValid = handleSignup(setErrors, form);
        if (isValid && form.id_valid) {
            props.setSignupSuccess(true);
            props.setNow(1);
            navigate("/welcome");
        }
    }
    

    return (
        <div className="SignupPage_layout">
            <div name="Signup_input_information">
                <p className="title">회원가입</p>
            </div>
            <div className="Signup_input_boxs">
                <div className="Signup_input_box">
                    <div className="label_box">
                        <label>아이디</label>
                        <p>*</p>
                    </div>
                    <div className="input_box">
                        <div className="Input">
                            <input 
                            type="text" placeholder="영문, 숫자로 2~18자"
                            name="id"
                            value={form.id}
                            className={errors.id ? "invalid" : form.id ? "valid" : ""}
                            onChange={handleInputChange(setForm)}
                            required
                            ></input> 
                            <button
                             style={{cursor:'pointer'}} 
                            className="checkingBtn" 
                            onClick={handleDuplicateClick}>중복확인</button>
                        </div>
                        {errors.id 
                        ? <p className="error_message">{errors.id}</p> 
                        : 
                        form.id_valid 
                        ? <p className="ok_message">아이디를 사용하실 수 있습니다.</p>
                        : null }
                    </div>
                </div>
                <div className="Signup_input_box">
                    <div className="label_box">
                        <label>비밀번호</label>
                        <p>*</p>
                    </div>
                    <div className="input_box">
                        <div className="Input">
                            <input 
                            type="password" placeholder="최소 8자 이상의 영문, 숫자, 특수문자를 포함"
                            name="password"
                            value={form.password}
                            className={errors.password ? "invalid" : form.password ? "valid" : ""}
                            onChange={handleInputChange(setForm)}
                            required
                            ></input> 
                        </div>
                        {errors.password && <p className="error_message">{errors.password}</p>}
                    </div>
                </div>
                <div className="Signup_input_box">
                    <div className="label_box">
                        <label>비밀번호 확인</label>
                        <p>*</p>
                    </div>
                    <div className="input_box">
                        <div className="Input">
                            <input 
                            type="password" placeholder="다시 한번 더 비밀번호 기입"
                            name="password_valid"
                            value={form.password_valid}
                            className={errors.password_valid ? "invalid" : form.password_valid ? "valid" : ""}
                            onChange={handleInputChange(setForm)}
                            required
                            ></input> 
                        </div>
                        {errors.password_valid && <p className="error_message">{errors.password_valid}</p>}
                    </div>
                </div>
                <div className="Signup_input_box">
                    <div className="label_box">
                        <label>이름</label>
                        <p>*</p>
                    </div>
                    <div className="input_box">
                        <div className="Input">
                            <input 
                            type="text" placeholder="한글로 입력"
                            name="name"
                            value={form.name}
                            className={errors.name ? "invalid" : form.name ? "valid" : ""}
                            onChange={handleInputChange(setForm)}
                            required
                            ></input> 
                        </div>
                        {errors.name && <p className="error_message">{errors.name}</p>}
                    </div>
                </div>
                <div className="Signup_input_box">
                    <div className="label_box">
                        <label>학과</label>
                        <p>*</p>
                    </div>
                    <div className="input_box">
                        <div className="Input">
                            <input 
                            type="text" placeholder="본인의 학과/학부"
                            name="department"
                            value={form.department}
                            className={errors.department ? "invalid" : form.department ? "valid" : ""}
                            onChange={handleInputChange(setForm)}
                            required
                            ></input> 
                        </div>
                        {errors.department && <p className="error_message">{errors.department}</p>}
                    </div>
                </div>
                <div className="Signup_input_box">
                    <div className="label_box">
                        <label>학번</label>
                        <p>*</p>
                    </div>
                    <div className="input_box">
                        <div className="Input">
                            <input 
                            type="text" maxLength={10} placeholder="본인의 학번 10자"
                            name="strudent_num"
                            value={form.strudent_num}
                            className={errors.strudent_num ? "invalid" : form.strudent_num ? "valid" : ""}
                            onChange={handleInputChange(setForm)}
                            required
                            ></input> 
                        </div>
                        {errors.strudent_num && <p className="error_message">{errors.strudent_num}</p>}
                    </div>
                </div>
                <div className="Signup_input_box">
                    <div className="label_box">
                        <label>기수</label>
                    </div>
                    <div className="input_box">
                        <div className="Input">
                            <input 
                            type="text" placeholder="현재 재학 중인 학기수"
                            name="semester"
                            value={form.semester}
                            className={errors.semester ? "invalid" : form.semester ? "valid" : ""}
                            onChange={handleInputChange(setForm)}
                            ></input> 
                            <p className="semester_p">학기</p>
                        </div>
                        {errors.semester && <p className="error_message">{errors.semester}</p>}
                    </div>
                </div>
                <div className="Signup_input_box">
                    <div className="label_box">
                        <label>연락처</label>
                        <p>*</p>
                    </div>
                    <div className="input_box">
                        <div className="Input">
                            <input 
                            type="text" placeholder="'-'빼고 입력"
                            name="phone_num"
                            value={form.phone_num}
                            className={errors.phone_num ? "invalid" : form.phone_num ? "valid" : ""}
                            onChange={handleInputChange(setForm)}
                            required
                            ></input> 
                        </div>
                        {errors.phone_num && <p className="error_message">{errors.phone_num}</p>}
                    </div>
                </div>
                <div className="Signup_input_box">
                    <div className="label_box">
                        <label>파트</label>
                    </div>
                    <div className="input_box">
                        <div className="Select">
                            <select name="part" value={form.part} onChange={handleInputChange(setForm)}>
                                <option value="">미정</option>
                                <option value="front">프론트앤드</option>
                                <option value="back">백앤드</option>
                                <option value="PM/design">기획/디자인</option>
                            </select>
                        </div>
                        {errors.part && <p className="error_message">{errors.part}</p>}
                    </div>
                </div>
                <div className="Signup_progress_box2">
                    <button style={{cursor:'pointer'}}  className="SignupBtn" onClick={handleSignupClick}>회원가입</button>
                    <div className="toLogin">
                        <p>이미 계정이 있으신가요?</p>
                        <button style={{cursor:'pointer'}}  type="submit" className="tologinBtn"onClick={() => {navigate("/login")}}>로그인</button>
                    </div>
                    {errors.signup && <p className="error_message_false">{errors.signup}</p>}
                </div>
            </div>
        </div>
    )
}