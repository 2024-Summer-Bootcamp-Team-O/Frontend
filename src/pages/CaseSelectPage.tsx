import React from "react";
import '../index.css'; 

const CaseSelectPage: React.FC = () => {

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-cover bg-main_h">
      <div className="mb-16">
        <div className="flex">
          <img src="src/assets/images/duck_s.png" alt="duck" className="ml-32 w-[17rem] h-72"/>
          <div className="relative flex items-center justify-center">
            <img src="src/assets/images/bubble_s.png" alt="bubble" className="w-[26rem] h-[9rem]"/>
            <span className="absolute mb-10 text-5xl text-black font-dgm ">골라보거라</span>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="relative flex items-end justify-center drop-shadow-shadow_d">
            <img src="src/assets/images/minipage_a.png" alt="arbeit" className="w-[43.75rem] h-[35.125]"/>
            <img src="src/assets/images/silhouette_a.png" alt="silhouette_a" className="absolute w-80 h-[27rem]"/>
          </div>
          <div className="relative flex items-end justify-center ml-24 drop-shadow-shadow_d">
            <img src="src/assets/images/minipage_b.png" alt="office" className="w-[43.75rem] h-[35.125]"/>
            <img src="src/assets/images/silhouette_b.png" alt="silhouette_b" className="absolute w-80 h-[27rem]"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaseSelectPage;