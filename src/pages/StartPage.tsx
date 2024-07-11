import React from 'react';
import '../index.css';

const StartPage: React.FC = () => { 
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-cover bg-main_s">
        <h1 className="z-40 ml-24 font-normal text-center translate-y-48 text-9xl gradient-text font-dnf rotate-355 text-border">
          걔, 킹받네 ?
        </h1>
        <div className="flex flex-row justify-end">
          <img src="src/assets/images/background/bg_stand1.png" alt="male_a" className="z-10" />
          <img src="src/assets/images/background/bg_stand2.png" alt="female_a" className="z-20 -ml-56" />
          <img src="src/assets/images/background/bg_stand3.png" alt="female_b" className="z-30 -ml-20" />
          <img src="src/assets/images/background/bg_stand4.png" alt="male_b" className="-ml-32 z-25" />
        </div>
        <button className="z-40 mb-10 text-6xl ml-[4.2rem] -translate-y-[13rem] font-normal text-center gradient-text font-dnf text-border-norm">
          시작하기
        </button>
    </div>
  );
}

export default StartPage;
