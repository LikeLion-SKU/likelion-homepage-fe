import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './SignupSection.css'

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
    const apiURL ="http://"; // <== 여기에 api주소 추가


    // 회원가입 유효성 검사 // 
    const inputRegexs = {
        idRegex: /^[a-zA-Z][a-zA-Z0-9]{2,19}$/,
        pwRegex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/,
        nameRegex: /^[가-힣]{2,10}$/,
        strudent_numRegex: /^[0-9]{10}$/,
        phoneNumberRegex: /0-9{8,12}/,
    };

    // 아이디 중복 검사용
    function validation_form_id () {
        const errors = {};

        if(form.id === ""){
            errors.id = "아이디는 필수 입력 항목입니다.";
        }
        else if(!inputRegexs.idRegex.test(form.id)){
            errors.id = "아이디는 영문, 숫자로 2~18자여야 합니다.";
        }
        return errors;
    }
    
    // 회원가입용
    function validation_form () {
        const errors = {};

        if(form.id === ""){
            errors.id = "아이디는 필수 입력 항목입니다.";
        }
        else if(!inputRegexs.idRegex.test(form.id)){
            errors.id = "아이디는 영문, 숫자로 2~18자여야 합니다.";
        }
        else if(form.id_valid === false){
            errors.id = "아이디 중복확인을 해야 합니다.";
        }
        else if(form.password === ""){
            errors.password = "비밀번호는 필수 입력 항목입니다.";
        }
        else if(!inputRegexs.pwRegex.test(form.password)){
            errors.password = "비밀번호는 최소 8자 이상의 영문, 숫자, 특수문자를 포함해야 합니다.";
        }
        else if(form.password_valid === ""){
            errors.password_valid = "비밀번호 확인은 필수 입력 항목입니다.";
        }
        else if(form.password_valid !== form.password){
            errors.password_valid = "비밀번호와 다릅니다.";
        }
        else if(form.name === ""){
            errors.name = "이름은 필수 입력 항목입니다.";
        }
        else if(!inputRegexs.nameRegex.test(form.name)){
            errors.name = "이름은 한글로 입력해야 합니다.";
        }
        else if(form.department === ""){
            errors.department = "학과는 필수 입력 항목입니다.";
        }
        else if(form.strudent_num === ""){
            errors.strudent_num = "학번은 필수 입력 항목입니다.";
        }
        else if(!inputRegexs.strudent_numRegex.test(form.strudent_num)){
            errors.strudent_num = "학번은 숫자 10자로 입력해야 합니다.";
        }
        else if(form.phone_num === ""){
            errors.phone_num = "연락처는 필수 입력 항목입니다.";
        }
        else if(!inputRegexs.nameRegex.test(form.phone_num)){
            errors.phone_num = "연락처는 숫자로 입력해야 합니다.";
        }

        return errors;
    }


    // 아이디 중복확인 버튼 //
    function idChecking (e) {
        e.preventDefault();
        console.log("중복확인 버튼 클릭");

        const validationErrors = validation_form_id();

        if (Object.keys(validationErrors).length > 0) { 
            setErrors(validationErrors);
            console.log("유효성 검사 실패");
            return;
        }
        else{
            handleDuplicationCheck(form.id);
        }
        
    }

    function handleDuplicationCheck (id) {
        axios.post(`${apiURL}/api/users/login-id-duplicate-check`, {
            loginId: id
        })
        .then(function (response){
            console.log("아이디 중복 검사 성공");
            setForm({...form, id_valid: true});
        })
        .catch((error) => {
            console.log("아이디 중복 검사 실패");
            setErrors(()=> ({...form, id: "중복되는 아이디 입니다. 다시 정해주세요."}));
        });
    };

    // 회원가입 버튼 클릭 //
    function next (e) {
        e.preventDefault();
        console.log("회원가입 버튼 클릭");
        
        const validationErrors = validation_form();

        if (Object.keys(validationErrors).length > 0) { 
            setErrors(validationErrors);
            console.log("유효성 검사 실패");
            return;
        }
        else{
            handleSubmit(form);
        }
    }

    function handleSubmit (form) {
        //e.preventDefault();
        
        axios.post(`${apiURL}/api/users/register`, {
            loginId: form.id,
            password: form.password,
            userName: form.name, 
            department: form.department,
            semester: form.semester,
            phoneNumber: form.phone_num,
            parts: form.part,
        })
        .then(function (response){
            console.log("회원가입 성공!");
            setSignupSuccess(true);
            props.setNow(1);
            navigate("/welcome");
        }
        )
        .catch((error) => {
            setErrors(()=> ({...form, signup: "회원가입이 실패하였습니다."}));
            alert("회원가입 실패" + error);
        });
    };

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
                            className={errors.id ? "invalid" : form.id ? "valid" : ""}
                            onChange={e => setForm({...form, id: e.currentTarget.value})}
                            required
                            ></input> 
                            <button
                             style={{cursor:'pointer'}} 
                            className="checkingBtn" 
                            onClick={idChecking}>중복확인</button>
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
                            className={errors.password ? "invalid" : form.password ? "valid" : ""}
                            onChange={e => setForm({...form, password: e.currentTarget.value})}
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
                            className={errors.password_valid ? "invalid" : form.password_valid ? "valid" : ""}
                            onChange={e => setForm({...form, password_valid: e.currentTarget.value})}
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
                            className={errors.name ? "invalid" : form.name ? "valid" : ""}
                            onChange={e => setForm({...form, name: e.currentTarget.value})}
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
                            className={errors.department ? "invalid" : form.department ? "valid" : ""}
                            onChange={e => setForm({...form, department: e.currentTarget.value})}
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
                            className={errors.strudent_num ? "invalid" : form.strudent_num ? "valid" : ""}
                            onChange={e => setForm({...form, strudent_num: e.currentTarget.value})}
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
                            className={errors.semester ? "invalid" : form.semester ? "valid" : ""}
                            onChange={e => setForm({...form, semester: e.currentTarget.value})}
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
                            className={errors.phone_num ? "invalid" : form.phone_num ? "valid" : ""}
                            onChange={e => setForm({...form, phone_num: e.currentTarget.value})}
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
                            <select defaultValue="">
                                <option value="">미정</option>
                                <option value="front">프론트앤드</option>
                                <option value="back">백앤드</option>
                                <option value="design">기획/디자인</option>
                            </select>
                        </div>
                        {errors.part && <p className="error_message">{errors.part}</p>}
                    </div>

                </div>


                <div className="Signup_progress_box2">
                    {errors.signup && <p className="error_message_false">{errors.signup}</p>}
                    
                    <button style={{cursor:'pointer'}}  className="SignupBtn" onClick={next}>회원가입</button>
                    <div className="toLogin">
                        <p>이미 계정이 있으신가요?</p>
                        <button style={{cursor:'pointer'}}  type="submit" className="tologinBtn"onClick={() => {navigate("/login")}}>로그인</button>
                    </div>
                    
                    <p>vvv테스트vvv</p>
                    <button style={{cursor:'pointer'}}  onClick={(e) => {setErrors(()=> ({...form, signup: "회원가입 실패"}))}}>-회원가입 실패 테스트-</button>
                
                </div>
            </div>
        </div>
    )
}