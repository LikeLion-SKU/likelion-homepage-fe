import PasswordFindContainer from '@/components/passwordFind/PasswordFindContainer';
import PasswordFindForm from '@/components/passwordFind/PasswordFindForm';

import { useState } from 'react';

export default function PasswordFindPage() {
  const [now, setNow] = useState(1);
  const [email, setEmail] = useState('');
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [subPassword, setSubPassword] = useState('');

  return (
    <PasswordFindContainer>
      {now == 1 ? (
        <PasswordFindForm
          now={now}
          setNow={setNow}
          setEmail={setEmail}
          emailSuccess={emailSuccess}
          setEmailSuccess={setEmailSuccess}
        />
      ) : (
        <PasswordFindForm
          now={now}
          setNow={setNow}
          email={email}
          emailSuccess={emailSuccess}
          signupSuccess={signupSuccess}
          setSignupSuccess={setSignupSuccess}
        />
      )}
    </PasswordFindContainer>
  );
}
