import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './SignupSection.css'
import {handleEmailchecking, handleConfirmCodechecking} from "../../utils/register.js";
import { handleInputChange } from "../../utils/inputOnChange.js";


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
    const [confirms, setConfirms] = useState({});
    const navigate = useNavigate();
    

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
        setM(Math.floor(count / 60));
        setS(count%60);

        if(count === 0 || count < 0){
            setForm({...form, timing: false});
            setErrors(()=> ({...form, confirmCode: "인증번호 확인 시간이 만료되었습니다. 다시 인증번호를 전송해주세요."}));
        }

    }, [count])

    // 인증번호 전송 //
    function handleSendingClick(event) {
        event.preventDefault();

        const isValid = handleEmailchecking(setErrors, form);
        if (isValid) {
            console.log('```이메일 유효성 성공');

            // handleVerificationSend(form.email);
            setConfirms(()=> ({...form, email: "인증번호가 전송되었습니다."}));
            setCount(10); // 300=5분
            setForm({...form, email_valid: true, timing: true}); 
            setErrors(()=> ({...form, email: ""}));
        }
    }
    

    // 인증번호 확인 //
    function handleCheckingClick(event) {
        event.preventDefault();

        const isValid = handleConfirmCodechecking(setErrors, form);
        if (isValid) {
            console.log('```인증번호 유효성 성공');

            // handleVerificationCheck(form.email, form.confirmCode);
            setConfirms((prev)=> ({...prev, confirmCode: "이메일이 인증되었습니다."}));
            props.setEmailSuccess(true);
            setForm({...form, confirmCode_valid: true});
            setErrors(()=> ({...form, confirmCode: ""}));
        }
    }


    // 계속 버튼 클릭시, 다음 페이지를 보여줌 //
    function next (e) {
        e.preventDefault();
        console.log("회원가입 계속 버튼 클릭");
        
        props.setNow(2); // 2번째 페이지 보여줌.
    }



    return (
        <div className="SignupPage_layout">
            <div className="Signup_input_information">
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
                            name="email"
                            value={form.email}
                            className={ form.email_valid ? "valid" : errors.email? "invalid" : form.email ? "valid" : ""}
                            onChange={handleInputChange(setForm)}
                            required
                            ></input> 
                            <p> @skuniv.ac.kr </p>

                            <button style={{cursor:'pointer'}}  className="checkingBtn" onClick={handleSendingClick}>인증번호 전송</button>
                        </div>
                        
                        {form.email_valid ?
                        <p className="ok_message">{confirms.email}</p>
                        : errors.email 
                        ? <p className="error_message">{errors.email}</p>
                        : null
                        }
                    </div>
                </div>

                <div className="Signup_input_box">
                    <div className="input_box">
                        <div className="Input">
                            {form.email_valid
                            ? // 이메일 인증되었다면
                            <>
                                <input 
                                type="text" 
                                name="confirmCode"
                                value={form.confirmCode}
                                className={form.confirmCode_valid ? "valid" : errors.confirmCode ? "invalid" : form.confirmCode ? "valid" : ""}
                                onChange={handleInputChange(setForm)}
                                disabled={!form.timing} 
                                required
                                ></input>
                                <button style={{cursor:'pointer'}}  className="checkingBtn" onClick={handleCheckingClick}>인증번호 확인</button>
                            </>
                            :  // 이메일 인증 안됐으면
                            <div style={{visibility:'hidden'}}>
                                ?
                                <input 
                                type="text" 
                                name="confirmCode"
                                value={form.confirmCode}
                                className={errors.confirmCode ? "invalid" : form.confirmCode ? "valid" : ""}
                                onChange={handleInputChange(setForm)}
                                disabled={true}
                                ></input>
                                <button className="checkingBtn_Yet" onClick={handleCheckingClick}>인증번호 확인</button>
                            </div>
                            }
                            
                        </div>
                        {
                        form.confirmCode_valid ?
                        <p className="ok_message">{confirms.confirmCode}</p>
                        :errors.confirmCode ?
                        <p className="error_message">{errors.confirmCode}</p>
                        : form.timing ? 
                        <p className="time">입력대기시간 {m}:{s.toString()
                            .padStart(2, '0')}</p>
                        : null
                        }
                        
                    </div>
                </div>


                <div name="Signup_progress_box" className="Signup_progress_box">
                    
                    {
                        props.emailSuccess === true 
                        ? <button style={{cursor:'pointer'}}  className="SignupBtn_Success" onClick={next}>계속</button>
                        : <button className="SignupBtn_Yet">계속</button>
                    }
                    
                    <div className="toLogin">
                        <p>이미 계정이 있으신가요?</p>
                        <button style={{cursor:'pointer'}}  type="submit" className="tologinBtn"onClick={() => {navigate("/login")}}>로그인</button>
                    </div>

                    기능 잘 돌아가는지 확인용
                    <p>vvv 테스트용 버튼 vvv</p> 
                    <button style={{cursor:'pointer'}}  onClick={()=> {setCount(10); setErrors(()=> ({...form, email: ""})); setConfirms(()=> ({...form, email: "이메일이 인증되었습니다."})); setForm({...form, email_valid: true});}}>-확인창 테스트-</button>
                    <button style={{cursor:'pointer'}}  onClick={()=> {setCount(10); setForm({...form, timing: true});}}>-시간 테스트-</button>
                    <button style={{cursor:'pointer'}}  onClick={()=> {props.emailSuccess === true ?props.setEmailSuccess(false) :props.setEmailSuccess(true)}}>-계속 버튼 테스트-</button>
                    <button style={{cursor:'pointer'}}  onClick={()=> {props.setNow(2);}}>-다음 회원가입 페이지로 임시 이동-</button>
                    /
                    <button style={{cursor:'pointer'}}  onClick={()=> {navigate("/welcome");}}>-회원가입 완료 페이지로 이동-</button>
                    
                </div>
            </div>
        </div>
    )
}