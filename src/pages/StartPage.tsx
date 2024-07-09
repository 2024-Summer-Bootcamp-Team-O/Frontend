import React from 'react';
import '../StartPage.css'; 

function StartPage() {
  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-screen bg-cover bg-main_s">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 flex items-end justify-center">
          <img src="src/assets/images/bg_stand1.png" alt="" className="relative z-10 " />
          <img src="src/assets/images/bg_stand2.png" alt="" className="relative z-20 -ml-56" />
          <img src="src/assets/images/bg_stand3.png" alt="" className="relative z-30 -ml-28" />
          <img src="src/assets/images/bg_stand4.png" alt="" className="relative z-25 -ml-36" />
        </div>
        <h1 className="absolute z-40 font-bold text-center transform -translate-x-1/2 ml-28 top-10 left-1/2 text-9xl gradient-text font-dnf rotate-355 text-border">
          걔, 킹받네 ?
        </h1>
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-20">
          <button className="z-40 font-bold text-center text-7xl gradient-text font-dnf text-border">
            시작하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default StartPage;
