import React from 'react';
import '../index.css'; 


const StartPage: React.FC = () => {

  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-screen bg-cover bg-main_s">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 flex items-end justify-center">
          <img src="src/assets/images/bg_stand1.png" alt="" className="relative z-10 " />
          <img src="src/assets/images/bg_stand2.png" alt="" className="relative z-20 -ml-56" />
          <img src="src/assets/images/bg_stand3.png" alt="" className="relative z-30 -ml-20" />
          <img src="src/assets/images/bg_stand4.png" alt="" className="relative -ml-32 z-25" />
        </div>
        <h1 className="absolute z-40 ml-12 font-normal text-center transform -translate-x-1/2 top-8 left-1/2 text-9xl gradient-text font-dnf rotate-355 text-border">
          걔, 킹받네 ?
        </h1>
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-20">
          <button className="z-40 mb-10 ml-20 text-6xl font-normal text-center gradient-text font-dnf text-border-norm">
            시작하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default StartPage;
