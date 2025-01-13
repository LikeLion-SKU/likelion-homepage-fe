import React from 'react';
import SignupSection1 from '@components//signup/SignupSection1';
import SignupSection2 from '@components//signup/SignupSection2';
import SignupForm2 from '@components//signup/SignupForm2';
import { useState } from 'react';

export default function SignupPage() {
  const [now, setNow] = useState(1);
  const [email, setEmail] = useState('');
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  return (
    <>
      {now == 1 ? (
        <SignupSection1
          now={now}
          setNow={setNow}
          setEmail={setEmail}
          emailSuccess={emailSuccess}
          setEmailSuccess={setEmailSuccess}
        />
      ) : (
        <SignupSection2
          now={now}
          setNow={setNow}
          email={email}
          emailSuccess={emailSuccess}
          signupSuccess={signupSuccess}
          setSignupSuccess={setSignupSuccess}
        />
      )}
    </>
  );
}
