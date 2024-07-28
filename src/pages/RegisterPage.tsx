import React, { useState, useEffect } from 'react';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import background_h from '../assets/images/background/background_h.png';
import bg_stand5 from '../assets/images/background/bg_stand5.png';
import bg_stand6 from '../assets/images/background/bg_stand6.png';
import clickSound from '../assets/sounds/click.mp3';

const RegisterPage: React.FC = () => {
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [idCheckMessage, setIdCheckMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (confirmPassword) {
      setPasswordMatch(password === confirmPassword);
    }
  }, [password, confirmPassword]);

  const handleIdCheck = async () => {
    try {
      const response = await axios.get('https://rumz.site/api/users/exists', {
        params: { email: email },
      });

      console.log(response); // 응답 데이터 콘솔 출력

      if (response.status === 200) {
        setIsIdChecked(true);
        setIdCheckMessage('사용 가능한 아이디입니다.');
      } 
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) { 
          setIsIdChecked(false); 
          setIdCheckMessage('사용 중인 아이디입니다.'); 
        } else { 
          setIsIdChecked(false); 
          setIdCheckMessage('아이디 확인 실패!: ' + error.message); 
        }
      }
    }
  };

  const handleButtonClick = async() => {
    const audio = new Audio(clickSound);
    audio.play();

    if (!passwordMatch) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await axios.post('https://rumz.site/api/users/sign-up', {
        email: email,
        password: password,
        name: name,
      });

      console.log(response); // 응답 데이터 콘솔 출력

      if (response.status === 201) {
        navigate('/login');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert('회원가입 실패: ' + error.message);
      } else {
        alert('회원가입 실패: ' + String(error));
      }
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-between w-screen h-screen bg-cover" style={{ backgroundImage: `url(${background_h})` }}>
      <div className='flex self-end'>
        <img src={bg_stand5} alt="Background stand" className="2k:w-auto 2k:h-auto 1k:w-[21.4rem] lg:w-[15rem] md:w-[11rem] "/>
      </div>
      <div className="2k:rounded-[0.9375rem] 1k:rounded-[0.8rem] lg:rounded-[0.5rem] md:rounded-[0.3rem] bg-white shadow-shadow_tr p-8">
        <form action="#" method="post" className='2k:w-[35.75rem] 2k:h-[47rem] 1k:w-[29rem] 1k:h-[39rem] lg:w-[18rem] lg:h-[26rem] md:w-[13rem] md:h-[18rem] flex flex-col items-center justify-center'>
          <h1 className="2k:mt-[3.25rem] 2k:mb-[0.3rem] 2k:text-6xl 
          1k:mt-[6rem] 1k:mb-[0.25rem] 1k:text-[3.75rem] 
          lg:mt-[1.5rem] lg:mb-[0.1rem] lg:text-[2.5rem] 
          md:mt-[0.5rem] md:mb-[0.1rem] md:text-[1.8rem] 
          text-center font-nomal gradient-text-s font-dnf text-border-custom">
            회원가입
          </h1>
          <div className='flex flex-col 2k:mb-5 1k:mb-4 lg:mb-3 md:mb-2'>
            <label className="2k:mb-3 1k:mb-2 lg:mb-[0.35rem] md:mb-1 text-black font-dgm 2k:text-[1.4375rem] 1k:text-[1.3rem] lg:text-[0.8rem] md:text-[0.6rem]" htmlFor="name">이름</label>
            <input
              id="name"
              type="text"
              placeholder="2글자 이상"
              value={name}
              onChange={(e) => setName(e.target.value)} // 상태 업데이트
              className="2k:text-2xl 2k:rounded-[0.875rem] 2k:w-[30rem] 2k:h-14 2k:pl-5 
              1k:text-xl 1k:rounded-[0.8rem] 1k:w-[25rem] 1k:h-[3rem] 1k:pl-4
              lg:text-[1rem] lg:rounded-[0.4rem] lg:w-[16rem] lg:h-[2rem] lg:pl-3
              md:text-[0.7rem] md:rounded-[0.35rem] md:w-[13rem] md:h-[1.5rem] md:pl-2
              bg-[#F0F0F0] text-black placeholder-small font-dgm"
            />
          </div>
          <div className='flex flex-col 2k:mb-5 1k:mb-4 lg:mb-3 md:mb-2'>
          <label className="2k:mb-3 1k:mb-2 lg:mb-[0.35rem] md:mb-1 text-black font-dgm 2k:text-[1.4375rem] 1k:text-[1.3rem] lg:text-[0.8rem] md:text-[0.6rem]" htmlFor="아이디">아이디</label>
            <div className='flex items-center w-full 2k:space-x-4 1k:space-x-3 lg:space-x-2 md:space-x-1'>
              <input
                id="email"
                type="email"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // 상태 업데이트
                className="2k:text-2xl 2k:rounded-[0.875rem] 2k:w-80 2k:h-14 2k:pl-5 
                1k:text-xl 1k:rounded-[0.8rem] 1k:w-[16.7rem] 1k:h-[3rem] 1k:pl-4
                lg:text-[1rem] lg:rounded-[0.4rem] lg:w-[11rem] lg:h-[2rem] lg:pl-3
                md:text-[0.7rem] md:rounded-[0.35rem] md:w-[8.8rem] md:h-[1.5rem] md:pl-2
                bg-[#F0F0F0] text-black placeholder-small font-dgm"
              />
              <button
                type="button"
                className="2k:rounded-[0.875rem] 2k:w-36 2k:h-14 2k:text-[1.25rem] 
                1k:rounded-[0.8rem] 1k:w-[7.5rem] 1k:h-[3rem] 1k:text-[1rem] 
                lg:rounded-[0.4rem] lg:w-[4.5rem] lg:h-[2rem] lg:text-[0.6rem] 
                md:rounded-[0.35rem] md:w-[4rem] md:h-[1.5rem] md:text-[0.5rem] 
                font-dgm bg-[#505050] hover:bg-[#222222] text-white cursor-pointer"
                onClick={handleIdCheck}
              >
                중복확인
              </button>
            </div>
            {idCheckMessage && (
              <p className={`mt-2 text-l ${isIdChecked ? 'text-green-800' : 'text-red-800'} font-dgm`}>
                {idCheckMessage}
              </p>
            )}
          </div>
          <div className='flex flex-col 2k:mb-5 1k:mb-4 lg:mb-3 md:mb-2'>
          <label className="2k:mb-3 1k:mb-2 lg:mb-[0.35rem] md:mb-1 text-black font-dgm 2k:text-[1.4375rem] 1k:text-[1.3rem] lg:text-[0.8rem] md:text-[0.6rem]" htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              placeholder="6자리 이상"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // 상태 업데이트
              className="2k:text-2xl 2k:rounded-[0.875rem] 2k:w-[30rem] 2k:h-14 2k:pl-5 
              1k:text-xl 1k:rounded-[0.8rem] 1k:w-[25rem] 1k:h-[3rem] 1k:pl-4
              lg:text-[1rem] lg:rounded-[0.4rem] lg:w-[16rem] lg:h-[2rem] lg:pl-3
              md:text-[0.7rem] md:rounded-[0.35rem] md:w-[13rem] md:h-[1.5rem] md:pl-2
              bg-[#F0F0F0] text-black placeholder-small font-dgm"
            />
          </div>
          <div className='flex flex-col 2k:mb-5 1k:mb-4 lg:mb-3 md:mb-2'>
          <label className="2k:mb-3 1k:mb-2 lg:mb-[0.35rem] md:mb-1 text-black font-dgm 2k:text-[1.4375rem] 1k:text-[1.3rem] lg:text-[0.8rem] md:text-[0.6rem]" htmlFor="confirmPassword">비밀번호 확인</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="6자리 이상"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} // 상태 업데이트
              className="2k:text-2xl 2k:rounded-[0.875rem] 2k:w-[30rem] 2k:h-14 2k:pl-5 
              1k:text-xl 1k:rounded-[0.8rem] 1k:w-[25rem] 1k:h-[3rem] 1k:pl-4
              lg:text-[1rem] lg:rounded-[0.4rem] lg:w-[16rem] lg:h-[2rem] lg:pl-3
              md:text-[0.7rem] md:rounded-[0.35rem] md:w-[13rem] md:h-[1.5rem] md:pl-2
              bg-[#F0F0F0] text-black placeholder-small font-dgm"
            />
            {confirmPassword && (
              <p className={`mt-2 ml-2 font:text-l ${password.length < 6 || !passwordMatch ? 'text-red-800' : 'text-green-800'} font-dgm`}>
                {password.length < 6 ? '비밀번호는 6자리 이상이어야 합니다.' : passwordMatch ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.'}
              </p>
            )}
          </div>
          <div className='flex flex-col items-center 2k:mb-10 1k:mb-20 lg:mb-4 md:mb-[0.1rem]'>
              <button
                type="button"
                className="2k:rounded-[5rem] 2k:w-56 2k:h-[3.8rem] 2k:text-[1.625rem] 2k:mb-5
                1k:rounded-[3rem] 1k:w-48 1k:h-[3.2rem] 1k:text-[1.4rem] 1k:mb-3
                lg:rounded-[2rem] lg:w-[8rem] lg:h-[2rem] lg:text-[1rem] lg:mb-2
                md:rounded-[1rem] md:w-[5rem] md:h-[1.3rem] md:text-[0.6rem] md:mb-[0.01rem]
                font-dgm bg-[#2C2C2C] hover:bg-[#585858] text-white cursor-pointer"
                onClick={handleButtonClick}
              >
                확인
              </button>
                <span className="2k:text-[1.20rem] 1k:text-[1rem] lg:text-[0.7rem] md:text-[0.45rem] text-[#B2B2B2] font-dgm underline underline-offset-1" onClick={handleLoginClick}>                    
                로그인 하러가기
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

export default RegisterPage;
