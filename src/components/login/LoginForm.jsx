import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { loginSchema } from '@/constants/validationSchema';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  /**
   * 유저 데이터를 서버에 전송하는 함수
   * @param {Object} userData
   * @param {string} userData.loginId - 유저 아이디
   * @param {string} userData.password - 유저 비밀번호
   * @returns {Promise}
   */
  async function sendLoginData(userData) {
    // console.log() 삭제 후 로직 작성
    console.log(userData);
  }

  return (
    <form onSubmit={handleSubmit(sendLoginData)}>
      <fieldset>
        <legend>로그인</legend>
        <input
          type='text'
          {...register('loginId')}
        />
        {errors.loginId?.message ? <p>{errors.loginId?.message}</p> : null}

        <input
          type='password'
          {...register('password')}
        />
        {errors.password?.message ? <p>{errors.password?.message}</p> : null}
      </fieldset>

      <button>로그인</button>
    </form>
  );
}
