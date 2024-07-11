import React from "react";
import '../index.css'; 

const CaseSelectPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-cover bg-main_h">
      <div className="mb-16">
        <div className="flex">
          <img src="src/assets/images/standing/duck_s.png" alt="duck" className="ml-32 w-[17rem] h-72"/>
          <div className="flex items-center justify-center w-[26rem] h-[8.5rem] bg-cover bg-[url('src/assets/images/others/bubble_s.png')]">
              <p className="mb-10 text-5xl text-black font-dgm ">골라보거라</p>
          </div>
        </div>
        <div className="flex">
          <div className="flex items-end justify-center drop-shadow-shadow_d">
            <div className="flex items-end justify-center w-[43.75rem] h-[35.125rem] bg-cover bg-[url('src/assets/images/background/minipage_a.png')]">
              <img src="src/assets/images/standing/silhouette_a.png" alt="silhouette_a" className="w-80 h-[27rem]"/>
            </div>
          </div>
          <div className="flex items-end justify-center ml-24 drop-shadow-shadow_d">
            <div className="flex items-end justify-center w-[43.75rem] h-[35.125rem] bg-cover bg-[url('src/assets/images/background/minipage_b.png')]">
              <img src="src/assets/images/standing/silhouette_b.png" alt="silhouette_b" className="w-80 h-[27rem]"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaseSelectPage;