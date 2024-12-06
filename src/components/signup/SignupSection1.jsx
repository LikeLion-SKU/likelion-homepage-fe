import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './SignupSection.css'


export default function SignupSection(props) {
    const [form, setForm] = useState({
        email: "",
        email_valid: false,
        confirmCode: "",
        confirmCode_valid: false,
        timing: false,
    });
    const [m, setM] = useState();
    const [s, setS] = useState();
    const [count, setCount] = useState();
    const [errors, setErrors] = useState({}); 
    const navigate = useNavigate();
    const apiURL ="http://" // <== 여기에 api주소 추가
    
    // 타이머 관련 함수 //
    useEffect(() =>{
        const timer = setInterval(() => {
            setCount((count) => count - 1);
        }, 1000);
        
        if (count === 0) {
            clearInterval(timer);
        }
          
        return () => clearInterval(timer);
    }, [form.timing])

    useEffect(() =>{
        console.log("시간 흐르는중... ", count );
        setM(Math.floor(count / 60));
        setS(count%60);
        if(count === 0 || count < 0){
            setForm({...form, timing: false});
            setErrors(()=> ({...form, confirmCode: "인증번호 확인 시간이 만료되었습니다. 다시 인증번호를 전송해주세요."}));
        }

    }, [count])

    
   
    // 인증번호 전송 버튼 클릭 시, 이메일 적었는지 확인하고, 인증번호 전송 
    const emailsending = (e) => {
        e.preventDefault();
        console.log("인증번호 전송 버튼 클릭");

        const validationErrors = validation_form1();

        if (Object.keys(validationErrors).length > 0) { // 에러메세지가 있다면 set해주고 중단
            setErrors(validationErrors);
            console.log("유효성 검사 실패");
            return;
        }
        else{
            handleverificationSend(form.email)
        }
    }

    const handleverificationSend = (email) => {
        axios.post(`${apiURL}/api/email/verify/request`, {
            email: email
        })
        .then(function (response){
            console.log("인증번호가 전송 성공!");
            setCount(300);
            setForm({...form, email_valid: true}); 
            setForm({...form, timing: true});
        })
        .catch((error) => {
            console.log("인증번호 에러");
            setErrors(()=> ({...form, email: "인증번호 보내기를 실패하였습니다."}));
        });
    };

    // 인증번호 확인 버튼 클릭 시, 인증번호 적었는지 확인하고, 맞는지 검사
    const emailChecking = (e) =>{
        e.preventDefault();
        console.log("인증번호 확인 버튼 클릭");
        
        const validationErrors = validation_form2();

        if (Object.keys(validationErrors).length > 0) { // 에러메세지가 있다면 set해주고 중단
            setErrors(validationErrors);
            console.log("유효성 검사 실패");
            return;
        }
        else{
            // 인증번호 검사 요청 //
            handleverificationCheck(form.email, form.confirmCode);
        }
    }

    // 인증번호 일치하나 확인
    const handleverificationCheck = (email, confirmCode) => {
        axios.post(`${apiURL}/api/email/verify/confirm`, {
            email: email,
            code: confirmCode
        })
        .then(function (response){
            console.log("인증코드 일치!");
            setForm({...form, confirmCode_valid: true});
            props.setEmailSuccess(true);
        })
        .catch((error) => {
            console.log("인증번호 불일치");
            setErrors(()=> ({...form, confirmCode: "잘못된 인증번호입니다."}));
        });
    };


    // 계속 버튼 클릭시, 다음 페이지를 보여줌.
    const next = (e) => {
        e.preventDefault();
        console.log("회원가입 계속 버튼 클릭");
        
        props.setEmailSuccess(false); // 다시 돌아가면 다시 이메일 인증해야함.
        props.setNow(2); // 2번째 페이지 보여줌.
    }


    // 회원가입 유효성 검사 // 
    const validation_form1 = () => {
        const errors = {};

        if(form.email === ""){
            errors.email = "이메일은 필수 입력 항목입니다.";
        }
        return errors;
    }
    const validation_form2 = () => {
        const errors = {};

        if(form.confirmCode === ""){
            errors.confirmCode = "인증번호는 필수 입력 항목입니다.";
        }
        return errors;
    }


    return (
        <div className="SignupPage_layout">
            <div name="Signup_input_information">
                <p className="title">회원가입</p>
            </div>
            
            <div className="Signup_input_boxs">

                <div className="Signup_input_box">
                    <div className="label_box">
                        <label>이메일</label>
                        <p>*</p>
                    </div>
                    
                    <div className="input_box">
                        <div className="Input">
                            <input 
                            type="text" 
                            className={errors.email ? "invalid" : form.email ? "valid" : ""}
                            onChange={e => setForm({...form, email: e.currentTarget.value})}
                            required
                            ></input> 
                            <p> @skuniv.ac.kr </p>

                            <button className="checkingBtn" onClick={emailsending}>인증번호 전송</button>
                        </div>
                        
                        {errors.email 
                        ? <p className="error_message">{errors.email}</p>
                        : form.email_valid ?
                        <p className="ok_message">인증번호가 성공적으로 전송되었습니다.</p>
                        : null
                        }
                    </div>
                </div>

                <div className="Signup_input_box">
                    <div className="input_box">
                        <div className="Input">
                            <input 
                            type="text" 
                            className={errors.confirmCode ? "invalid" : form.confirmCode ? "valid" : ""}
                            onChange={e => setForm({...form, confirmCode: e.currentTarget.value})}
                            required
                            ></input> 

                            <button className="checkingBtn" onClick={emailChecking}>인증번호 확인</button>
                        </div>
                        {errors.email 
                        ? <p className="error_message">{errors.confirmCode}</p>
                        : form.confirmCode_valid ?
                        <p className="ok_message">이메일이 확인되었습니다.</p>
                        : form.timing ? 
                        <p className="time">입력대기시간 {count} | {m}:{s.toString()
                            .padStart(2, '0')}</p>
                        : <p className="error_message">{errors.confirmCode}</p>
                        }
                        
                    </div>
                </div>


                <div name="Signup_progress_box" className="Signup_progress_box">
                    
                    {
                        props.emailSuccess === true 
                        ? <button className="SignupBtn_Success" onClick={next}>계속</button>
                        : <button className="SignupBtn_Yet">계속</button>
                    }
                    
                    <div className="toLogin">
                        <p>이미 계정이 있으신가요?</p>
                        <button type="submit" className="tologinBtn"onClick={() => {navigate("/login")}}>로그인</button>
                    </div>

                    기능 잘 돌아가는지 확인용... 
                    <p>vvv 테스트용 버튼 vvv</p>
                    <button onClick={()=> {setCount(10); setForm({...form, timing: true});}}>-시간 테스트 버튼-</button>
                    <button onClick={()=> {props.emailSuccess === true ?props.setEmailSuccess(false) :props.setEmailSuccess(true)}}>-버튼 테스트 버튼-</button>
                    <button onClick={()=> {props.setNow(2);}}>-임시 이동 버튼-</button>
                   
                </div>
            </div>
        </div>
    )
}