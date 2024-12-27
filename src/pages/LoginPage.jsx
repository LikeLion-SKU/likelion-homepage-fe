import LoginFormContainer from '@/components/login/LoginFormContainer';
import LoginForm from '@/components/login/LoginForm';
import SignupContainer from '@/components/login/SignupContainer';
import Signup from '@/components/login/Signup';

export default function LoginPage() {
  return (
    <LoginFormContainer>
      <LoginForm />

      <SignupContainer>
        <Signup />
      </SignupContainer>
    </LoginFormContainer>
  );
}
