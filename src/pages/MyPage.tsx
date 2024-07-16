import React, {useState, useEffect} from "react";
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
import myPageImg from "../assets/images/background/myPageImg.png";
import cardBack_1 from "../assets/images/Character/cardBack_1.png";
import cardBack_3 from "../assets/images/Character/cardBack_3.png";
import cardBack_4 from "../assets/images/Character/cardBack_4.png";
import cardBack_5 from "../assets/images/Character/cardBack_5.png";
import cardBack_6 from "../assets/images/Character/cardBack_6.png";
import cardBack_7 from "../assets/images/Character/cardBack_7.png";
import cardBack_8 from "../assets/images/Character/cardBack_8.png";
import cardBack_9 from "../assets/images/Character/cardBack_9.png";
import backgroundImg from "../assets/images/background/background_h.png";
import duckImg from "../assets/images/Duck/Duck.png";
import duckBubble from "../assets/images/Duck/DuckBubble.png";
import card_1 from "../assets/images/Character/card_1.png";
import card_3 from "../assets/images/Character/card_3.png";
import card_4 from "../assets/images/Character/card_4.png";
import card_5 from "../assets/images/Character/card_5.png";
import card_6 from "../assets/images/Character/card_6.png";
import card_7 from "../assets/images/Character/card_7.png";
import card_8 from "../assets/images/Character/card_8.png";
import card_9 from "../assets/images/Character/card_9.png";
import memberCard from "../assets/images/others/memberCard.png";
import userPhoto from "../assets/images/others/userPhoto.png";


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

const cardBackImages = [
    cardBack_1,
    cardBack_4,
    cardBack_7,
    cardBack_8,
    cardBack_3,
    cardBack_5,
    cardBack_6,
    cardBack_9,
    cardBack_3,
    cardBack_8,
    cardBack_1,
    cardBack_5,
    cardBack_3,
    cardBack_4,
    cardBack_7,
    cardBack_6,
    cardBack_1,
    cardBack_9
];

const cardRealImages=[
    card_1,
    card_4,
    card_7,
    card_8,
    card_3,
    card_5,
    card_6,
    card_9,
    card_3,
    card_8,
    card_1,
    card_5,
    card_3,
    card_4,
    card_7,
    card_6,
    card_1,
    card_9
];

const cardRealBackImage=memberCard;


const MyPage: React.FC = () => {
    const [revealedCards, setRevealedCards] = useState(Array(cardSdImages.length).fill(false)); // 공개된 카드 관리

    const CharacterIndex=[0,4,7,9,11];

    useEffect(() => {
        // 시뮬레이션 종료 시 호출될 함수
        const handleSimulationEnd = () => {
            const updatedRevealedCards = revealedCards.map((_, index) => CharacterIndex.includes(index));
            setRevealedCards(updatedRevealedCards);
        };

        handleSimulationEnd(); // 컴포넌트 마운트 시 시뮬레이션 종료 함수 호출
    }, []);

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
                <div className="w-[67.3rem] h-[51.43rem] mr-[3.33rem] mt-[9.06rem]  " style={{ backgroundImage: `url(${myPageImg})`, backgroundSize: 'cover' }}>
                    {/*상단바 div*/}
                    <div className="w-full h-[5.3125rem]"></div> 
                    {/*카드 스크롤 div*/}
                    <div className="w-[67rem] h-[45.9rem]">
                        <div className=" webpage-scrollbar overflow-y-auto h-[45.75rem] pt-[2.5rem] pr-[3.5rem] pl-[3.5rem] grid grid-cols-3 gap-7">
                            {cardSdImages.map((image,index) => (
                                <div key={index} className="flip-card mb-1">
                                    <div className="flip-card-inner">
                                        <div className="flip-card-front">
                                        <img src={revealedCards[index] ? cardRealImages[index] : image} alt={`Card ${index + 1}`} className="w-full h-full object-cover" />
                                        </div>
                                    <div className="flip-card-back">
                                    {revealedCards[index] ? (
                                                    <div className="w-full h-full flex flex-col justify-center items-center" style={{ backgroundImage: `url(${cardRealBackImage})`, backgroundSize: 'cover' }}>
                                                        <div className="flex w-[9.75rem] h-[12.75rem] mt-[1.5rem] ">
                                                            < img src={userPhoto} alt="userPhoto" className="w-full h-full object-cover" />
                                                        </div>
                                                        <div className="mt-[0.38rem] w-[4.5625rem] h-[1.9375rem]">
                                                            <p className="text-black text-center font-dnf text-[1.2rem] not-italic font-normal leading-normal tracking-[-0.04875rem] whitespace-pre-line" >
                                                                차은우
                                                            </p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <img src={cardBackImages[index]} alt={`Card Back ${index + 1}`} className="w-full h-full object-cover" />
                                                )}
                                    </div>
                                </div>
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