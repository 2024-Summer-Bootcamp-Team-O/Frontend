import React from 'react';
import '../index.css'; 
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginButtonClick = () => {
    const audio = new Audio('src/assets/sounds/click.mp3');
    audio.play();
    navigate('/main');
  };

  const handleSignupClick = () => {
    navigate('/signup'); // 회원가입 페이지로 이동
  };
  
  return (
    <div className="flex items-center justify-between w-screen h-screen bg-cover bg-main_h">
      <div className='flex self-end'>
        <img src="src/assets/images/background/bg_stand5.png" alt="" />
      </div>
      <div className="rounded-[0.9375rem] bg-white shadow-shadow_tr p-8">
        <form action="#" method="post" className='w-[36rem] h-[48rem] flex flex-col items-center justify-center'>
          <h1 className="mb-16 text-6xl text-center font-nomal gradient-text-s font-dnf text-border-norm">
            로그인
          </h1>
          <div className='flex flex-col mb-4'>
            <label className="mb-7 text-black font-dgm text-[1.4375rem]" htmlFor="아이디">아이디</label>
            <input
              id="아이디"
              type="text"
              placeholder="영문+숫자"
              className="text-3xl rounded-[0.875rem] w-[32rem] h-16 pl-5 bg-[#F0F0F0] placeholder-normal text-black font-dgm mb-10"
            />
          </div>
          <div className='flex flex-col mb-4'>
            <label className="mb-7 text-black font-dgm text-[1.4375rem]" htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              placeholder="6자리 이상"
              className="text-3xl rounded-[0.875rem] w-[32rem] h-16 pl-5 bg-[#F0F0F0] text-[#B2B2B2] placeholder-normal font-dgm mb-24"
            />
          </div>
          <button 
            type="button" 
            className="rounded-[5rem] w-56 h-14 font-dgm text-[1.625rem] bg-[#2C2C2C] hover:bg-[#585858] text-white cursor-pointer mb-5"
            onClick={handleLoginButtonClick}
          > 로그인</button>
          <div>
            <a href="#">
              <span className="text-[1.20rem] text-[#B2B2B2] font-dgm underline underline-offset-1" onClick={handleSignupClick}>
                회원가입 하러가기
              </span>
            </a>
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
