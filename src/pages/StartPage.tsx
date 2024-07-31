import React from 'react';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import clickSound from '../assets/sounds/click.mp3';

const StartPage: React.FC = () => { 
  const navigate = useNavigate();
  
  const handleButtonClick = () => {
    const audio = new Audio(clickSound);
    audio.play();
    navigate('/signup');
  };

  return (
    <div className="flex flex-col items-center justify-end w-screen h-screen bg-cover" style={{ backgroundImage: `url(${'https://d2skuaswcwq39b.cloudfront.net/baseimage/background_s.png'})` }}>
      <div className='z-40 4k:w-[78rem] 4k:h-[36rem] 4k:mt-4 4k:ml-[11rem] 4k:translate-y-[22.3rem] 
      3k:w-[52rem] 3k:h-[10rem] 3k:ml-[7rem] 3k:translate-y-[12rem] 
      2k:w-[58rem] 2k:h-[16rem] 2k:mt-4 2k:ml-[5rem] 2k:translate-y-[16rem] 
      1k:w-[48rem] 1k:ml-[5rem] 1k:translate-y-[16rem] 
      lg:w-[45rem] lg:ml-[4rem] lg:translate-y-44 
      md:w-[30rem] md:ml-[3rem] md:translate-y-32'>
        <img src='https://d2skuaswcwq39b.cloudfront.net/baseimage/logo_i.png' alt="logo" />
      </div>
      <button 
        type="button" 
        className="z-40 4k:text-[5rem] 3k:text-6xl 2k:text-6xl 1k:text-[3.5rem] lg:text-5xl md:text-4xl font-normal text-center gradient-text font-dnf text-border-custom 4k:translate-y-[65rem] 3k:translate-y-[49rem] 2k:translate-y-[49rem] 1k:translate-y-[43rem] lg:translate-y-[35rem] md:translate-y-[24rem]"
        onClick={handleButtonClick}
      >
        시작하기
      </button>
      <div className="flex flex-row items-end justify-center w-full">
        <img src={'https://d2skuaswcwq39b.cloudfront.net/baseimage/bg_stand1.png'} alt="male_a" className="z-10   4k:w-[40rem] 4k:ml-[8rem]       3k:w-[30rem] 3k:ml-28         2k:w-[30rem]    2k:ml-12          1k:w-[27rem]                     lg:w-[22rem] lg:ml-10           md:w-[15rem] md:ml-8" />
        <img src={'https://d2skuaswcwq39b.cloudfront.net/baseimage/bg_stand2.png'} alt="female_a" className="z-20 4k:w-[40rem] 4k:-ml-[17rem]     3k:w-[30rem] 3k:-ml-[11rem]   2k:w-[30rem]    2k:-ml-[12rem]    1k:w-[27rem]   1k:-ml-[9rem]     lg:w-[22rem] lg:-ml-[8rem]      md:w-[15rem] md:-ml-[6rem]" />
        <img src={'https://d2skuaswcwq39b.cloudfront.net/baseimage/bg_stand3.png'} alt="female_b" className="z-30 4k:w-[40rem] 4k:-ml-[11rem]     3k:w-[30rem] 3k:-ml-[7.4rem]  2k:w-[30rem]    2k:-ml-[9rem]     1k:w-[27rem]   1k:-ml-[7.3rem]   lg:w-[22rem] lg:-ml-[6.8rem]    md:w-[15rem] md:-ml-[4.6rem]" />
        <img src={'https://d2skuaswcwq39b.cloudfront.net/baseimage/bg_stand4.png'} alt="male_b" className="z-25   4k:w-[42rem] 4k:-ml-[15.7rem]   3k:w-[32rem] 3k:-ml-[11rem]   2k:w-[32rem]    2k:-ml-[12rem]    1k:w-[28.5rem] 1k:-ml-[10rem]    lg:w-[23rem] lg:-ml-[10rem]     md:w-[16rem] md:-ml-[6rem]" />
      </div>
    </div>
  );
}

export default StartPage;
