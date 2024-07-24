import React, { useState } from 'react';
import '../index.css'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginButtonClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const audio = new Audio('src/assets/sounds/click.mp3');
      audio.play();

      const response = await axios.post('http://localhost:8000/users/login', {
        email: email,
        password: password
      });
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      navigate('/main');
    } catch (error: any) {
      if (error.response.status === 400) {
        setError("아이디 또는 비밀번호가 일치하지 않습니다.");
      } else {
        setError('로그인에 실패했습니다. 다시 시도해주세요.');
      }
      console.error('Error:', error);
    }
  };

  const handleSignupClick = () => {
    navigate('/signup'); 
  };

  return (
    <div className="flex items-center justify-between w-screen h-screen bg-cover bg-main_h">
      <div className='flex self-end'>
        <img src="src/assets/images/background/bg_stand5.png" alt="" />
      </div>
      <div className="rounded-[0.9375rem] bg-white shadow-shadow_tr p-8">
        <form className='w-[36rem] h-[48rem] flex flex-col items-center justify-center' onSubmit={handleLoginButtonClick}>
          <h1 className="mb-16 text-6xl text-center font-nomal gradient-text-s font-dnf text-border-norm">
            로그인
          </h1>
          <div className='flex flex-col mb-4'>
            <label className="mb-7 text-black font-dgm text-[1.4375rem]" htmlFor="email">아이디</label>
            <input
              id="email"
              type="text"
              placeholder="이메일"
              className="text-3xl rounded-[0.875rem] w-[32rem] h-16 pl-5 bg-[#F0F0F0] placeholder-normal text-black font-dgm mb-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='flex flex-col mb-4'>
            <label className="mb-7 text-black font-dgm text-[1.4375rem]" htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              placeholder="6자리 이상"
              className="text-3xl rounded-[0.875rem] w-[32rem] h-16 pl-5 bg-[#F0F0F0] text-[#B2B2B2] placeholder-normal font-dgm mb-20"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4 error-container">
            {error && <p className="text-red-600 font-dgm">{error}</p>}
          </div>
          <button 
            type="submit" 
            className="rounded-[5rem] w-56 h-14 font-dgm text-[1.625rem] bg-[#2C2C2C] hover:bg-[#585858] text-white cursor-pointer mb-5"
          > 로그인</button>
          <div>
            <span className="text-[1.20rem] text-[#B2B2B2] font-dgm underline underline-offset-1 cursor-pointer" onClick={handleSignupClick}>
              회원가입 하러가기
            </span>
          </div>
        </form>
      </div>
      <div className='flex self-end'>
        <img src="src/assets/images/background/bg_stand6.png" alt="" />
      </div>
    </div>
  );
}

export default LoginPage;
