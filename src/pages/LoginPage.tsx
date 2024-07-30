import React, { useState } from 'react';
import '../index.css'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import background_h from '../assets/images/background/background_h.png';
import bg_stand5 from '../assets/images/background/bg_stand5.png';
import bg_stand6 from '../assets/images/background/bg_stand6.png';
import click from '../assets/sounds/click.mp3';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginButtonClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const audio = new Audio(click);
      audio.play();

      const response = await axios.post('https://rumz.site/api/users/login', {
        email: email,
        password: password
      });
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      navigate('/main');
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
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
    <div className="flex items-center justify-between w-screen h-screen bg-cover" style={{ backgroundImage: `url(${background_h})` }}>
      <div className='flex self-end'>
        <img src={bg_stand5} alt="Background stand" className="2k:w-auto 2k:h-auto 1k:w-[21.4rem] lg:w-[15rem] md:w-[11rem] "/>
      </div>
      <div className="2k:rounded-[0.9375rem] 1k:rounded-[0.8rem] lg:rounded-[0.5rem] md:rounded-[0.3rem] bg-white shadow-shadow_tr p-8">
        <form className="2k:w-[35.75rem] 2k:h-[47rem] 1k:w-[29rem] 1k:h-[39rem] lg:w-[18rem] lg:h-[26rem] md:w-[13rem] md:h-[18rem] flex flex-col items-center justify-center" onSubmit={handleLoginButtonClick}>
          <h1 className="text-center 2k:mb-16 2k:text-6xl 1k:mb-10 1k:text-[3.8rem] lg:mb-6 lg:text-[2.5rem] md:mb-3 md:text-[2rem] font-nomal gradient-text-s font-dnf text-border-custom">
            로그인
          </h1>
          <div className='flex flex-col 2k:mb-4 1k:mb-3 lg:mb-2 md:mb-1'>
            <label className="2k:mb-7 1k:mb-5 lg:mb-4 md:mb-3 text-black font-dgm 2k:text-[1.4375rem] 1k:text-[1.3rem] lg:text-[0.8rem] md:text-[0.6rem]" htmlFor="email">아이디</label>
            <input
              id="email"
              type="text"
              placeholder="이메일"
              className="2k:text-3xl 2k:rounded-[0.875rem] 2k:w-[32rem] 2k:h-16 2k:pl-5 2k:mb-10
              1k:text-2xl 1k:rounded-[0.8rem] 1k:w-[26rem] 1k:h-[3.25rem] 1k:pl-4 1k:mb-7
              lg:text-1xl lg:rounded-[0.4rem] lg:w-[18rem] lg:h-[2.25rem] lg:pl-3 lg:mb-5
              md:text-1xl md:rounded-[0.35rem] md:w-[13rem] md:h-[1.5rem] md:pl-2 md:mb-4
              bg-[#F0F0F0] placeholder-normal text-black font-dgm "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='flex flex-col 2k:mb-4 1k:mb-3 lg:mb-2 md:mb-1'>
            <label className="2k:mb-7 1k:mb-5 lg:mb-4 md:mb-3 text-black font-dgm 2k:text-[1.4375rem] 1k:text-[1.3rem] lg:text-[0.8rem] md:text-[0.6rem]" htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              placeholder="6자리 이상"
              className="2k:text-3xl 2k:rounded-[0.875rem] 2k:w-[32rem] 2k:h-16 2k:pl-5 2k:mb-20
              1k:text-2xl 1k:rounded-[0.8rem] 1k:w-[26rem] 1k:h-[3rem] 1k:pl-4 1k:mb-16
              lg:text-1xl lg:rounded-[0.4rem] lg:w-[18rem] lg:h-[2.25rem] lg:pl-3 lg:mb-10
              md:text-1xl md:rounded-[0.35rem] md:w-[13rem] md:h-[1.5rem] md:pl-2 md:mb-5
              bg-[#F0F0F0] placeholder-normal text-black font-dgm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4 error-container">
            {error && <p className="text-red-600 font-dgm">{error}</p>}
          </div>
          <button 
            type="submit" 
            className="2k:rounded-[5rem] 2k:w-56 2k:h-[3.8rem] 2k:text-[1.625rem] 2k:mb-5
                1k:rounded-[3rem] 1k:w-48 1k:h-[3.2rem] 1k:text-[1.4rem] 1k:mb-3
                lg:rounded-[2rem] lg:w-[8rem] lg:h-[2rem] lg:text-[1rem] lg:mb-2
                md:rounded-[1rem] md:w-[5.5rem] md:h-[1.75rem] md:text-[0.7rem] md:mb-[0.01rem]
                font-dgm bg-[#2C2C2C] hover:bg-[#585858] text-white cursor-pointer"
          > 로그인</button>
          <div>
            <span className="2k:text-[1.20rem] 1k:text-[1rem] lg:text-[0.7rem] md:text-[0.45rem] text-[#B2B2B2] font-dgm underline underline-offset-1" onClick={handleSignupClick}>
              회원가입 하러가기
            </span>
          </div>
        </form>
      </div>
      <div className='flex self-end'>
        <img src={bg_stand6} alt="Background stand" className="2k:w-auto 2k:h-auto 1k:w-[20.5rem] lg:w-[14rem] md:w-[10.6rem] "/>
      </div>
    </div>
  );
}

export default LoginPage;
