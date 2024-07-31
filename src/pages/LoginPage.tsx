import React, { useState } from 'react';
import '../index.css'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
    <div className="flex items-center justify-between w-screen h-screen bg-cover" style={{ backgroundImage: `url(${'https://d2skuaswcwq39b.cloudfront.net/baseimage/background_h.png'})` }}>
      <div className='flex self-end'>
        <img src={'https://d2skuaswcwq39b.cloudfront.net/baseimage/bg_stand5.png'} alt="Background stand" className="4k:w-[27.2rem] 3k:w-[20rem] 2k:w-[20.8rem] 1k:w-[18rem] lg:w-[15rem] md:w-[11rem] "/>
      </div>
      <div className="4k:rounded-[1rem] 3k:rounded-[0.95rem] 2k:rounded-[0.9375rem] 1k:rounded-[0.8rem] lg:rounded-[0.5rem] md:rounded-[0.3rem] bg-white shadow-shadow_tr p-8">
        <form className="4k:w-[35.75rem] 4k:h-[49rem] 3k:w-[30rem] 3k:h-[42rem] 2k:w-[30rem] 2k:h-[42rem] 1k:w-[25rem] 1k:h-[36rem] lg:w-[18rem] lg:h-[26rem] md:w-[13rem] md:h-[18rem] flex flex-col items-center justify-center" onSubmit={handleLoginButtonClick}>
          <h1 className="4k:mt-[2rem] 4k:mb-[5rem] 4k:text-6xl 
          3k:-mt-[1rem] 3k:mb-[3rem] 3k:text-[3.8rem] 
          2k:mt-[1rem] 2k:mb-[3rem] 2k:text-[4.2rem] 
          1k:mt-[1rem] 1k:mb-[3rem] 1k:text-[3.5rem] 
          lg:mt-[1.5rem] lg:mb-[0.1rem] lg:text-[2.5rem] 
          md:mt-[0.5rem] md:mb-[0.1rem] md:text-[1.8rem] 
          text-center font-nomal gradient-text-s font-dnf text-border-custom">
            로그인
          </h1>
          <div className='flex flex-col 4k:mb-16 3k:mb-14 2k:mb-14 1k:mb-10 lg:mb-3 md:mb-2'>
            <label className="2k:mb-7 1k:mb-5 lg:mb-4 md:mb-3 text-black font-dgm 2k:text-[1.4375rem] 1k:text-[1.3rem] lg:text-[0.8rem] md:text-[0.6rem]" htmlFor="email">아이디</label>
            <input
              id="email"
              type="text"
              placeholder="이메일"
              className="4k:text-2xl 4k:rounded-[0.875rem] 4k:w-[30rem] 4k:h-14 4k:pl-5 
              3k:text-[1.5rem] 3k:rounded-[0.875rem] 3k:w-[27rem] 3k:h-14 3k:pl-4 
              2k:text-[1.4rem] 2k:rounded-[0.8rem] 2k:w-[26rem] 2k:h-[3.25rem] 2k:pl-5 
              1k:text-[1rem] 1k:rounded-[0.7rem] 1k:w-[23rem] 1k:h-[2.8rem] 1k:pl-4
              lg:text-[1rem] lg:rounded-[0.4rem] lg:w-[16rem] lg:h-[2rem] lg:pl-3
              md:text-[0.7rem] md:rounded-[0.35rem] md:w-[13rem] md:h-[1.5rem] md:pl-2
              bg-[#F0F0F0] placeholder-normal text-black font-dgm "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='flex flex-col 4k:mb-24 3k:mb-20 2k:mb-18 1k:mb-20 lg:mb-3 md:mb-2'>
            <label className="2k:mb-7 1k:mb-5 lg:mb-4 md:mb-3 text-black font-dgm 2k:text-[1.4375rem] 1k:text-[1.3rem] lg:text-[0.8rem] md:text-[0.6rem]" htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              placeholder="6자리 이상"
              className="4k:text-2xl 4k:rounded-[0.875rem] 4k:w-[30rem] 4k:h-14 4k:pl-5 
              3k:text-[1.5rem] 3k:rounded-[0.875rem] 3k:w-[27rem] 3k:h-14 3k:pl-4 
              2k:text-[1.4rem] 2k:rounded-[0.8rem] 2k:w-[26rem] 2k:h-[3.25rem] 2k:pl-5 
              1k:text-[1rem] 1k:rounded-[0.7rem] 1k:w-[23rem] 1k:h-[2.8rem] 1k:pl-4
              lg:text-[1rem] lg:rounded-[0.4rem] lg:w-[16rem] lg:h-[2rem] lg:pl-3
              md:text-[0.7rem] md:rounded-[0.35rem] md:w-[13rem] md:h-[1.5rem] md:pl-2
              bg-[#F0F0F0] placeholder-normal text-black font-dgm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4 error-container">
            {error && <p className="4k:text-[1.1rem] 3k:text-[1.05rem] 2k:text-[1rem] 1k:text-[0.9rem] text-red-600 font-dgm">{error}</p>}
          </div>
          <button 
            type="submit" 
            className="4k:rounded-[5rem] 4k:w-56 4k:h-[3.8rem] 4k:text-[1.625rem] 4k:mb-7
            3k:rounded-[5rem] 3k:w-52 3k:h-[3.4rem] 3k:text-[1.4rem] 3k:mb-3
            2k:rounded-[5rem] 2k:w-[12.5rem] 2k:h-[3.4rem] 2k:text-[1.5rem] 2k:mb-3
            1k:rounded-[3rem] 1k:w-44 1k:h-[2.8rem] 1k:text-[1.3rem] 1k:mb-2
            lg:rounded-[2rem] lg:w-[8rem] lg:h-[2rem] lg:text-[1rem] lg:mb-2
            md:rounded-[1rem] md:w-[5rem] md:h-[1.3rem] md:text-[0.6rem] md:mb-[0.01rem]
            font-dgm bg-[#2C2C2C] hover:bg-[#585858] text-white cursor-pointer"
          > 로그인</button>
          <div>
            <span className="4k:text-[1.20rem] 3k:text-[1rem] 2k:text-[1.1rem] 1k:text-[0.9rem] lg:text-[0.7rem] md:text-[0.45rem] text-[#B2B2B2] font-dgm underline underline-offset-1" onClick={handleSignupClick}>
              회원가입 하러가기
            </span>
          </div>
        </form>
      </div>
      <div className='flex self-end'>
        <img src={'https://d2skuaswcwq39b.cloudfront.net/baseimage/bg_stand6.png'} alt="Background stand" className="4k:w-[28rem] 4k:h-[67rem] 3k:w-[21rem] 3k:h-[50rem] 2k:w-[21rem] 2k:h-[52rem] 1k:w-[18rem] 1k:h-[45rem] lg:w-[14rem] md:w-[10.6rem] "/>
      </div>
    </div>
  );
}

export default LoginPage;
