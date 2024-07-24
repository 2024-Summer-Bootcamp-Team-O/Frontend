import React from 'react';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import background_s from '../assets/images/background/background_s.png'

const StartPage: React.FC = () => { 
  const navigate = useNavigate();
  
  const handleButtonClick = () => {
    const audio = new Audio('src/assets/sounds/click.mp3');
    audio.play();
    navigate('/signup');
  };


  return (
    <div className="flex flex-col items-center justify-end w-screen h-screen bg-cover" style={{ backgroundImage: `url(${background_s})` }}>
      <div className='z-40 w-[60rem] h-[18rem] mt-4 ml-[5.5rem] translate-y-96'>
        <img src="src/assets/images/others/logo_i.png" alt="logo" />
      </div>
      <button 
        type="button" 
        className="z-40 mb-10 text-6xl font-normal text-center gradient-text font-dnf text-border-norm translate-y-[60rem]"
        onClick={handleButtonClick}
      >
        시작하기
      </button>
      <div className="flex flex-row items-end justify-center w-full">
        <img src="src/assets/images/background/bg_stand1.png" alt="male_a" className="z-10" />
        <img src="src/assets/images/background/bg_stand2.png" alt="female_a" className="z-20 -ml-56" />
        <img src="src/assets/images/background/bg_stand3.png" alt="female_b" className="z-30 -ml-20" />
        <img src="src/assets/images/background/bg_stand4.png" alt="male_b" className="-ml-32 z-25" />
      </div>
    </div>
  );
}

export default StartPage;
