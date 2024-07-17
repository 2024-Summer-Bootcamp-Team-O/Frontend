import React, { useState } from 'react';
import '../index.css';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [isIdChecked, setIsIdChecked] = useState(false);
  const navigate = useNavigate();

  const handleIdCheck = () => {
    setIsIdChecked(true);
    alert('사용할 수 있는 아이디입니다.');
  };

  const handleButtonClick = () => {
    const audio = new Audio('src/assets/sounds/click.mp3');
    audio.play();
    navigate('/login');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-between w-screen h-screen bg-cover bg-main_h">
      <div className='flex self-end'>
        <img src="src/assets/images/background/bg_stand5.png" alt="" />
      </div>
      <div className="rounded-[0.9375rem] bg-white shadow-shadow_tr p-8">
        <form action="#" method="post" className='w-[35.75rem] h-[47rem] flex flex-col items-center justify-center'>
          <h1 className="mt-[3.25rem] mb-[0.3rem] text-6xl text-center font-nomal gradient-text-s font-dnf text-border-norm">
            회원가입
          </h1>
          <div className='flex flex-col mb-5'>
            <label className="mb-3 text-black font-dgm text-[1.4375rem]" htmlFor="password">이름</label>
            <input
              id="name"
              type="text"
              placeholder="2글자 이상"
              className="text-2xl rounded-[0.875rem] w-[30rem] h-14 pl-5 bg-[#F0F0F0] text-black placeholder-small font-dgm"
            />
          </div>
          <div className='flex flex-col mb-5'>
            <label className="mb-3 text-black font-dgm text-[1.4375rem]" htmlFor="아이디">아이디</label>
            <div className='flex items-center w-full space-x-4'>
              <input
                  id="id"
                  type="text"
                  placeholder="영문+숫자"
                  className="text-2xl rounded-[0.875rem] w-80 h-14 pl-5 bg-[#F0F0F0] text-black placeholder-small font-dgm mb-3."
              />
              <button
                type="button"
                className="rounded-[0.875rem] w-36 h-14 ml-[1.35] font-dgm text-[1.25rem] bg-[#505050] hover:bg-[#222222] text-white cursor-pointer"
                onClick={handleIdCheck}
              >
                중복확인
              </button>
            </div>
          </div>
          <div className='flex flex-col mb-5'>
            <label className="mb-3 text-black font-dgm text-[1.4375rem]" htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              placeholder="6자리 이상"
              className="text-2xl rounded-[0.875rem] w-[30rem] h-14 pl-5 bg-[#F0F0F0] text-black placeholder-small font-dgm"
            />
          </div>
          <div className='flex flex-col mb-10'>
            <label className="mb-3 text-black font-dgm text-[1.4375rem]" htmlFor="password">비밀번호 확인</label>
            <input
              id="password"
              type="password"
              placeholder="6자리 이상"
              className="text-2xl rounded-[0.875rem] w-[30rem] h-14 pl-5 bg-[#F0F0F0] text-black placeholder-small font-dgm"
            />
          </div>
          <div className='flex flex-col items-center mb-10'>
              <button
                type="button"
                className="rounded-[5rem] w-56 h-[3.8rem] font-dgm text-[1.625rem] bg-[#2C2C2C] hover:bg-[#585858] text-white cursor-pointer mb-5"
                onClick={handleButtonClick}
              >
                확인
              </button>
              <a href="#">
                  <span className="text-[1.20rem] text-[#B2B2B2] font-dgm underline underline-offset-1" onClick={handleLoginClick}>                    
                  로그인 하러가기
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

export default RegisterPage;
