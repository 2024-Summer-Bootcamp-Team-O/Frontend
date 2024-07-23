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
    cardS_1, cardS_2, cardS_3,
    cardS_4, cardS_5, cardS_6,
    cardS_7, cardS_8,
];

const cardBackImages = [
    cardB_1, cardB_2, cardB_3,
    cardB_4, cardB_5, cardB_6,
    cardB_7, cardB_8,
];

const MainPage: React.FC = () => {
    const navigate = useNavigate();
    const audio = new Audio('src/assets/sounds/click.mp3');
    const getRandomCharacterId = () => {
        return Math.floor(Math.random() * 5) + 1; 
    };

    const handleLogOut = async () => {
        audio.play();
        navigate('/login');
    }
    const handleButtonClick = async () => {
        const randomCharacterId = getRandomCharacterId();
        console.log('랜덤 character_id:', randomCharacterId);
            audio.play();

            sessionStorage.setItem('characterId', randomCharacterId.toString());
            navigate('/morning', { state: { character_id: randomCharacterId } });
        }

    return (
        <div className="flex justify-center w-screen h-screen" style={{backgroundImage: `url(${backgroundImg})`,backgroundSize:'cover'}}>
            <div className="flex w-[108rem] max-w-[108rem] place-content-between">
                <div className="flex flex-col w-[37.5rem] h-[69.81rem] justify-end ">
                    <div className="pb-[2.8rem] pl-14">
                        <button
                            type="button" 
                            className='flex items-center justify-center text-[2rem] font-dgm text-black hover:text-[#3735A3]'
                            onClick={handleLogOut}>
                            로그아웃
                            <svg xmlns="http://www.w3.org/2000/svg" width="31" height="41" viewBox="0 0 31 41" fill="none" className="ml-3">
                                <path d="M0 6.14943V34.8494C0 35.3931 0.217738 35.9145 0.605313 36.299C0.992888 36.6834 1.51855 36.8994 2.06667 36.8994H8.26667V32.7994H4.13333V8.19943H8.26667V4.09943H2.06667C1.51855 4.09943 0.992888 4.31541 0.605313 4.69986C0.217738 5.08431 0 5.60574 0 6.14943ZM29.4335 4.16093L12.9001 0.0609338C12.5955 -0.0144226 12.2776 -0.01996 11.9706 0.0447422C11.6635 0.109444 11.3753 0.242686 11.1279 0.434353C10.8805 0.62602 10.6804 0.871076 10.5427 1.15092C10.405 1.43076 10.3334 1.73804 10.3333 2.04943V38.9494C10.3326 39.2611 10.4037 39.5688 10.5411 39.849C10.6785 40.1293 10.8787 40.3747 11.1263 40.5665C11.3739 40.7583 11.6625 40.8915 11.9699 40.9559C12.2773 41.0203 12.5955 41.0141 12.9001 40.9379L29.4335 36.8379C29.8808 36.7273 30.2779 36.4714 30.5618 36.1111C30.8456 35.7508 30.9999 35.3067 31 34.8494V6.14943C30.9999 5.69215 30.8456 5.24805 30.5618 4.88773C30.2779 4.52742 29.8808 4.27159 29.4335 4.16093ZM20.6667 20.8848C20.6429 21.4127 20.4147 21.911 20.0298 22.2762C19.6448 22.6414 19.1327 22.8452 18.6 22.8452C18.0673 22.8452 17.5552 22.6414 17.1702 22.2762C16.7853 21.911 16.5571 21.4127 16.5333 20.8848V20.112C16.5336 19.5683 16.7516 19.047 17.1394 18.6627C17.5271 18.2784 18.0529 18.0627 18.601 18.063C19.1491 18.0633 19.6747 18.2795 20.0621 18.6642C20.4495 19.0488 20.6669 19.5703 20.6667 20.114V20.8848Z" fill="currentColor"/>
                            </svg>
                        </button>
                    </div>
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
