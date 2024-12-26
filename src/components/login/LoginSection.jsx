import { useNavigate } from 'react-router-dom';
import './LoginSection.css';
import LoginForm from '@/components/login/LoginForm';

export default function LoginSection() {
  const navigate = useNavigate();

  return (
    <div className='LoginPage_layout'>
      <LoginForm />
      <div className='toSignup'>
        <p>계정이 없으신가요?</p>
        <button
          style={{ cursor: 'pointer' }}
          type='submit'
          className='tosignupBtn'
          onClick={() => {
            navigate('/signup');
          }}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
