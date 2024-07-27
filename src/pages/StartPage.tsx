import React from 'react';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import background_s from '../assets/images/background/background_s.png';
import logo_i from '../assets/images/others/logo_i.png';
import bg_stand1 from '../assets/images/background/bg_stand1.png';
import bg_stand2 from '../assets/images/background/bg_stand2.png';
import bg_stand3 from '../assets/images/background/bg_stand3.png';
import bg_stand4 from '../assets/images/background/bg_stand4.png';
import clickSound from '../assets/sounds/click.mp3';

const StartPage: React.FC = () => { 
  const navigate = useNavigate();
  
  const handleButtonClick = () => {
    const audio = new Audio(clickSound);
    audio.play();
    navigate('/signup');
  };

  return (
    <div className="flex flex-col items-center justify-end w-screen h-screen bg-cover" style={{ backgroundImage: `url(${background_s})` }}>
      <div className='z-40 2k:w-[60rem] 2k:h-[18rem] 2k:mt-4 2k:ml-[5.5rem] 2k:translate-y-[19.3rem] lg:w-[45rem] lg:ml-[4rem] lg:translate-y-44 md:w-[30rem] md:ml-[3rem] md:translate-y-32 sm:w-[25rem] sm:ml-[2rem] sm:translate-y-24'>
        <img src={logo_i} alt="logo" />
      </div>
      <button 
        type="button" 
        className="z-40 2k:text-6xl lg:text-5xl md:text-4xl sm:text-3xl font-normal text-center gradient-text font-dnf text-border-custom 2k:translate-y-[60rem] lg:translate-y-[35rem] md:translate-y-[24rem] sm:translate-y-[21rem]"
        onClick={handleButtonClick}
      >
        시작하기
      </button>
      <div className="flex flex-row items-end justify-center w-full">
        <img src={bg_stand1} alt="male_a" className="z-10 2k:w-auto 2k:h-auto 2k:ml-28            lg:w-[22rem] lg:ml-10         md:w-[15rem] md:ml-8          sm:w-[13rem] sm: ml-6" />
        <img src={bg_stand2} alt="female_a" className="z-20 2k:w-auto 2k:h-auto 2k:-ml-[15rem]    lg:w-[22rem] lg:-ml-[8rem]    md:w-[15rem] md:-ml-[6rem]    sm:w-[13rem] sm:-ml-[5rem]" />
        <img src={bg_stand3} alt="female_b" className="z-30 2k:w-auto 2k:h-auto 2k:-ml-[10.6rem]  lg:w-[22rem] lg:-ml-[6.8rem]  md:w-[15rem] md:-ml-[4.6rem]  sm:w-[13rem] sm:-ml-[4rem]" />
        <img src={bg_stand4} alt="male_b" className="z-25 2k:w-auto 2k:h-auto 2k:-ml-[14.5rem]    lg:w-[23rem] lg:-ml-[8rem]    md:w-[16rem] md:-ml-[6rem]    sm:w-[14rem] sm:-ml-[5rem]" />
      </div>
    </div>
  );
}

export default StartPage;
