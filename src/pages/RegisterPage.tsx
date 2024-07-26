import React, { useState, useEffect} from 'react';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import background_h from '../assets/images/background/background_h.png'

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
      if (axios.isAxiosError(error)) 
      { if (error.response?.status === 409) { setIsIdChecked(false); setIdCheckMessage('사용 중인 아이디입니다.'); } 
      else { setIsIdChecked(false); setIdCheckMessage('아이디 확인 실패!: ' + error.message); } }
    }
  };

  const handleButtonClick = async() => {
    const audio = new Audio('src/assets/sounds/click.mp3');
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
              value={name}
              onChange={(e) => setName(e.target.value)} // 상태 업데이트
              className="text-2xl rounded-[0.875rem] w-[30rem] h-14 pl-5 bg-[#F0F0F0] text-black placeholder-small font-dgm"
            />
          </div>
          <div className='flex flex-col mb-5'>
            <label className="mb-3 text-black font-dgm text-[1.4375rem]" htmlFor="아이디">아이디</label>
            <div className='flex items-center w-full space-x-4'>
              <input
                  id="email"
                  type="email"
                  placeholder="이메일을 입력하세요"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // 상태 업데이트
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
            {idCheckMessage && (
              <p className={`mt-2 text-l ${isIdChecked ? 'text-green-800' : 'text-red-800'} font-dgm`}>
                {idCheckMessage}
              </p>
            )}
          </div>
          <div className='flex flex-col mb-5'>
            <label className="mb-3 text-black font-dgm text-[1.4375rem]" htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              placeholder="6자리 이상"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // 상태 업데이트
              className="text-2xl rounded-[0.875rem] w-[30rem] h-14 pl-5 bg-[#F0F0F0] text-black placeholder-small font-dgm"
            />
          </div>
          <div className='flex flex-col mb-10'>
            <label className="mb-3 text-black font-dgm text-[1.4375rem]" htmlFor="password">비밀번호 확인</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="6자리 이상"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} // 상태 업데이트
              className="text-2xl rounded-[0.875rem] w-[30rem] h-14 pl-5 bg-[#F0F0F0] text-black placeholder-small font-dgm"
            />
            {confirmPassword && (
              <p className={`mt-2 ml-2 font:text-l ${passwordMatch ? 'text-green-800' : 'text-red-800'} font-dgm`}>
                {passwordMatch ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.'}
              </p>
            )}
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
