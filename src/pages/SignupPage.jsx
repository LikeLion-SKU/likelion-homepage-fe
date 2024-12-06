import React from "react";
import Wrapper from "@commons/Wrapper";
import SignupSection1 from "@components//signup/SignupSection1";
import SignupSection2 from "@components//signup/SignupSection2";
import { useState } from "react";

export default function SignupPage(){
    const [now, setNow] = useState(1);
    const [emailSuccess, setEmailSuccess] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false);

    return(
        <Wrapper>
            {now == 1 
            ? <SignupSection1 
            now={now} setNow={setNow} 
            emailSuccess={emailSuccess} setEmailSuccess={setEmailSuccess}
            /> 
            : <SignupSection2 
            now={now} setNow={setNow}
            emailSuccess={emailSuccess}
            signupSuccess={signupSuccess} setSignupSuccess={setSignupSuccess}
            />}
        </Wrapper>
    )
}