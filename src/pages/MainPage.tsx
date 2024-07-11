import React from "react";
import '../index.css';
import startIcon from "../assets/images/startIcon.png";
import cardSd_1 from "../assets/images/Character/cardSd_1.png";
import cardSd_2 from "../assets/images/Character/cardSd_2.png";
import cardSd_3 from "../assets/images/Character/cardSd_3.png";
import cardSd_4 from "../assets/images/Character/cardSd_4.png";
import cardSd_5 from "../assets/images/Character/cardSd_5.png";
import cardSd_a from "../assets/images/Character/cardSd_a.png";
import cardSd_b from "../assets/images/Character/cardSd_b.png";
import cardSd_c from "../assets/images/Character/cardSd_c.png";
import cardSd_d from "../assets/images/Character/cardSd_d.png";
import cardSd_e from "../assets/images/Character/cardSd_e.png";
import characterPageImg from "../assets/images/Character/characterPage.png";
import backgroundImg from "../assets/images/background/background_h.png"
import duckImg from "../assets/images/Duck.png";
import duckBubble from "../assets/images/DuckBubble.png";


const cardSdImages = [
    cardSd_a,
    cardSd_4,
    cardSd_2,
    cardSd_b,
    cardSd_3,
    cardSd_d,
    cardSd_e,
    cardSd_c,
    cardSd_5,
    cardSd_1,
    cardSd_a,
    cardSd_4,
    cardSd_2,
    cardSd_b,
    cardSd_3,
    cardSd_d,
    cardSd_e,
    cardSd_5,
    cardSd_c,
    cardSd_1
];

const MainPage: React.FC = () => {
    return (
        <div className="h-screen w-screen  flex justify-center" style={{backgroundImage: `url(${backgroundImg})`,backgroundSize:'cover'}}>
            <div className="flex w-[108rem] max-w-[108rem] place-content-between">
                <div className="flex flex-col w-[37.5rem] h-[69.81rem] justify-end ">
                    <div className="w-[28.1rem] h-[13.28rem] ml-[5.7rem] mr-[3.33rem] pt-[1.1rem] pb-[2.16rem]" style={{ backgroundImage: `url(${duckBubble})`, backgroundSize: 'cover' }}>
                        <p className="text-black text-center font-dgm text-[1.625rem] not-italic font-normal leading-normal tracking-[-0.04875rem] whitespace-pre-line">
                            나는 MZ요정일세 ! <br />
                            자네는 깨어있는 MZ라고 생각하나? <br />
                            내가 한번 시험해보겠네.
                        </p>
                    </div>
                    < img src={duckImg} alt="duck" className="w-[34rem] h-[45rem] ml-[1.94rem] mr-[1.94rem] mb-[2.8rem]"/>
                </div>
            

            < div className="flex flex-col  w-[70.5rem]">
                <div className="w-[67.3rem] h-[51.43rem] mr-[3.33rem] mt-[9.06rem]  " style={{ backgroundImage: `url(${characterPageImg})`, backgroundSize: 'cover' }}>
                    {/*상단바 div*/}
                    <div className="w-full h-[5.3125rem]"></div> 
                    {/*카드 스크롤 div*/}
                    <div className="  w-[67rem] h-[45.9rem]">
                        <div className=" webpage-scrollbar overflow-y-auto h-[45.75rem] pt-[2.5rem] pr-[3.5rem] pl-[3.5rem] grid grid-cols-3 gap-7">
                            {cardSdImages.map((image,index) => (
                                <div key={index} className="mb-1">
                                    <img src={image} alt={`Card ${index + 1}`} className="w-full h-auto"/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div> 
                <div className="flex justify-end">
                    <button className="flex items-center text-black text-[2.5rem] font-dgm mt-[1.5rem] mb-[1.7rem] mr-[3.0rem]">
                        <span>시뮬레이션 하러가기 !</span>
                        <img src={startIcon} alt="startIcon" className="w-[3.75rem] h-[3.75rem] mr-2"/>
                    </button>
                </div>
            <div>
                
        </div>
        </div>
    </div>
</div>
);
}

export default MainPage;