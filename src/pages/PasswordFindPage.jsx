import PasswordFindContainer from '@/components/passwordFind/PasswordFindContainer';
import PasswordFindForm from '@/components/passwordFind/PasswordFindForm';
import PasswordFindResult from '@/components/passwordFind/PasswordFindResult';

import { useState } from 'react';

export default function PasswordFindPage() {
  const [now, setNow] = useState(1);
  const [email, setEmail] = useState('userEmail');
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [subPassword, setSubPassword] = useState('password');

  return (
    <PasswordFindContainer>
      {now == 1 ? (
        <PasswordFindForm
          now={now}
          setNow={setNow}
          setEmail={setEmail}
          emailSuccess={emailSuccess}
          setEmailSuccess={setEmailSuccess}
          setSubPassword={setSubPassword}
        />
      ) : (
        <PasswordFindResult
          now={now}
          setNow={setNow}
          email={email}
          emailSuccess={emailSuccess}
          signupSuccess={signupSuccess}
          setSignupSuccess={setSignupSuccess}
          subPassword={subPassword}
        />
      )}
    </PasswordFindContainer>
  );
}
