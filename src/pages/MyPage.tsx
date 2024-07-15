import React from "react";
import '../index.css';
import startIcon from "../assets/images/icon/startIcon.png";
import cardSd_1 from "../assets/images/Character/cardSd_1.png";
import cardSd_3 from "../assets/images/Character/cardSd_3.png";
import cardSd_4 from "../assets/images/Character/cardSd_4.png";
import cardSd_5 from "../assets/images/Character/cardSd_5.png";
import cardSd_6 from "../assets/images/Character/cardSd_6.png";
import cardSd_7 from "../assets/images/Character/cardSd_7.png";
import cardSd_8 from "../assets/images/Character/cardSd_8.png";
import cardSd_9 from "../assets/images/Character/cardSd_9.png";
import myPageImg from "../assets/images/background/myPage.png";
import backgroundImg from "../assets/images/background/background_h.png"
import duckImg from "../assets/images/Duck/Duck.png";
import duckBubble from "../assets/images/Duck/DuckBubble.png";


const cardSdImages = [
    cardSd_1,
    cardSd_4,
    cardSd_7,
    cardSd_8,
    cardSd_3,
    cardSd_5,
    cardSd_6,
    cardSd_9,
    cardSd_3,
    cardSd_8,
    cardSd_1,
    cardSd_5,
    cardSd_3,
    cardSd_4,
    cardSd_7,
    cardSd_6,
    cardSd_1,
    cardSd_9
];

const MyPage: React.FC = () => {
    return (
        <div className="flex justify-center w-screen h-screen" style={{backgroundImage: `url(${backgroundImg})`,backgroundSize:'cover'}}>
            <div className="flex w-[108rem] max-w-[108rem] place-content-between">
                <div className="flex flex-col w-[37.5rem] h-[69.81rem] justify-end ">
                    <div className="w-[28.1rem] h-[13.28rem] ml-[5.7rem] mr-[3.33rem] pt-[1.1rem] pb-[2.16rem]" style={{ backgroundImage: `url(${duckBubble})`, backgroundSize: 'cover' }}>
                        <p className="text-black text-center font-dgm text-[1.625rem] not-italic font-normal leading-normal tracking-[-0.04875rem] whitespace-pre-line">
                            자네의 MZ력을 잘 보았네. <br />
                            이 경험을 통해 앞으로 더 <br/>
                            성장하길 바라네. <br />
                        </p>
                    </div>
                    < img src={duckImg} alt="duck" className="w-[34rem] h-[45rem] ml-[1.94rem] mr-[1.94rem] mb-[2.8rem]"/>
                </div>
            

            < div className="flex flex-col  w-[70.5rem]">
                <div className="w-[67.3rem] h-[51.43rem] mr-[3.33rem] mt-[9.06rem]  " style={{ backgroundImage: `url(${myPageImg})`, backgroundSize: 'cover' }}>
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
                        <span>시뮬레이션 또 하러가기 !</span>
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

export default MyPage;