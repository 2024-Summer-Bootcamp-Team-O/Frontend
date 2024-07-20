import React from 'react';
import '../index.css'; 
import { useNavigate } from 'react-router-dom';
import cardS_1 from "../assets/images/Character/cardS_1.png";
import cardS_2 from "../assets/images/Character/cardS_2.png";
import cardS_3 from "../assets/images/Character/cardS_3.png";
import cardS_4 from "../assets/images/Character/cardS_4.png";
import cardS_5 from "../assets/images/Character/cardS_5.png";
import cardS_6 from "../assets/images/Character/cardS_6.png";
import cardS_7 from "../assets/images/Character/cardS_7.png";
import cardS_8 from "../assets/images/Character/cardS_8.png";

import cardB_1 from "../assets/images/Character/cardB_1.png";
import cardB_2 from "../assets/images/Character/cardB_2.png";
import cardB_3 from "../assets/images/Character/cardB_3.png";
import cardB_4 from "../assets/images/Character/cardB_4.png";
import cardB_5 from "../assets/images/Character/cardB_5.png";
import cardB_6 from "../assets/images/Character/cardB_6.png";
import cardB_7 from "../assets/images/Character/cardB_7.png";
import cardB_8 from "../assets/images/Character/cardB_8.png";

import characterPageImg from "../assets/images/Character/characterPage.png";
import backgroundImg from "../assets/images/background/background_h.png";
import duckImg from "../assets/images/Duck/Duck.png";
import duckBubble from "../assets/images/Duck/DuckBubble.png";

const cardSImages = [
    cardS_1,
    cardS_2,
    cardS_3,
    cardS_4,
    cardS_5,
    cardS_6,
    cardS_7,
    cardS_8,
    cardS_1,
    cardS_2,
    cardS_3,
    cardS_4,
    cardS_5,
    cardS_6,
    cardS_7,
    cardS_8,
    cardS_1,
    cardS_2
];

const cardBackImages = [
    cardB_1,
    cardB_2,
    cardB_3,
    cardB_4,
    cardB_5,
    cardB_6,
    cardB_7,
    cardB_8,
    cardB_1,
    cardB_2,
    cardB_3,
    cardB_4,
    cardB_5,
    cardB_6,
    cardB_7,
    cardB_8,
    cardB_1,
    cardB_2
];

const MainPage: React.FC = () => {
    const navigate = useNavigate();

    const getRandomCharacterId = () => {
        return Math.floor(Math.random() * 5) + 1; // 1부터 5 사이의 랜덤 값 생성
    };

    const handleButtonClick = async () => {
        const randomCharacterId = getRandomCharacterId();
        console.log('랜덤 character_id:', randomCharacterId);


            const audio = new Audio('src/assets/sounds/click.mp3');
            audio.play();

            sessionStorage.setItem('characterId', randomCharacterId.toString());

            // 페이지 이동
            navigate('/morning', { state: { character_id: randomCharacterId } });
        }

    return (
        <div className="flex justify-center w-screen h-screen" style={{backgroundImage: `url(${backgroundImg})`,backgroundSize:'cover'}}>
            <div className="flex w-[108rem] max-w-[108rem] place-content-between">
                <div className="flex flex-col w-[37.5rem] h-[69.81rem] justify-end ">
                    <div className="w-[28.1rem] h-[13.28rem] ml-[5.7rem] mr-[3.33rem] pt-[1.1rem] pb-[2.16rem]" style={{ backgroundImage: `url(${duckBubble})`, backgroundSize: 'cover' }}>
                        <p className="text-black text-center font-dgm text-[1.625rem] not-italic font-normal leading-normal tracking-[-0.04875rem] whitespace-pre-line">
                            나는 MZ요정일세 ! <br />
                            자네는 깨어있는 MZ라고 생각하나? <br />
                            내가 한번 시험해보겠네.
                        </p>
                    </div>
                    <img src={duckImg} alt="duck" className="w-[34rem] h-[45rem] ml-[1.94rem] mr-[1.94rem] mb-[2.8rem]"/>
                </div>

                <div className="flex flex-col w-[70.5rem]">
                    <div className="w-[67.3rem] h-[51.43rem] mr-[3.33rem] mt-[9.06rem]" style={{ backgroundImage: `url(${characterPageImg})`, backgroundSize: 'cover' }}>
                        <div className="w-full h-[5.3125rem]"></div> 
                        <div className="w-[67rem] h-[45.9rem]">
                            <div className="webpage-scrollbar overflow-y-auto h-[45.75rem] pt-[2.5rem] pr-[3.5rem] pl-[3.5rem] grid grid-cols-3 gap-7">
                                {cardSImages.map((image, index) => (
                                    <div key={index} className="mb-1 flip-card">
                                        <div className="flip-card-inner">
                                            <div className="flip-card-front">
                                                <img src={image} alt={`Card ${index + 1}`} className="object-cover w-full h-full"/>
                                            </div>
                                            <div className="flip-card-back">
                                                <img src={cardBackImages[index]} alt={`Card Back ${index + 1}`} className="object-cover w-full h-full"/>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div> 
                    <div className="flex justify-end">
                        <button
                            type="button" 
                            className='flex items-center justify-center text-[2.5rem] font-dgm mt-[1.5rem] mb-[1.7rem] mr-[3.0rem] text-black hover:text-[#3735A3]'
                            onClick={handleButtonClick}>
                            시뮬레이션 하러 가기 ! 
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="31" viewBox="0 0 26 31" fill="none" className='ml-10'>
                                <path d="M5.03009e-06 2.50001V28.4C5.03009e-06 30.375 2.175 31.575 3.85 30.5L24.2 17.55C24.5563 17.3245 24.8497 
                                17.0126 25.0531 16.6433C25.2565 16.2739 25.3631 15.8591 25.3631 15.4375C25.3631 15.0159 25.2565 14.6011 25.0531 
                                14.2317C24.8497 13.8624 24.5563 13.5505 24.2 13.325L3.85 0.40001C3.47293 0.156121 3.03701 0.0185269 2.58825 0.00174343C2.13948 
                                -0.0150401 1.69451 0.0896088 1.30026 0.304651C0.90602 0.519692 0.577125 0.837154 0.348275 1.22355C0.119424 1.60994 -0.000896585 2.05093 5.03009e-06 2.50001Z" 
                                fill="currentColor"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
