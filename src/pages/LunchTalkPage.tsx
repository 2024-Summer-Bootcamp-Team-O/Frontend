import React, { useState, useEffect } from "react";
import '../index.css';
import LunchImg from "../assets/images/background/LunchImg.png";
import JunghoImg from "../assets/images/Character/JunghoImg.png";
import chatBarImg from '../assets/images/others/Chatbar.png';
import LLoadingModal from '../components/LLoadingModal';
import FeedBackModal from '../components/FeedBackLuModal'; 

const LunchTalkPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(true); // 페이지 로드 시 모달이 열리도록 초기값을 true로 설정
    const [isContentVisible, setIsContentVisible] = useState(false); // 콘텐츠 가시성 상태
    const [inputValue, setInputValue] = useState('');
    const [buttonImage, setButtonImage] = useState('src/assets/images/others/sendbutton_ui.png');
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            setIsContentVisible(true); // 모달이 닫힌 후 콘텐츠를 표시
        },);
    };

    const handleButtonClick = () => {
        const audio = new Audio('src/assets/sounds/click.mp3');
        audio.play();
        setIsFeedbackModalOpen(true);
    };

    const handleCloseFeedbackModal = () => {
        setIsFeedbackModalOpen(false); // 피드백 모달 닫기
    };

    useEffect(() => {
        if (inputValue.trim() !== '') {
            setButtonImage('src/assets/images/others/sendbutton_ui_a.png'); 
        } else {
            setButtonImage('src/assets/images/others/sendbutton_ui.png'); 
        }
    }, [inputValue]);

    return (
        <div className="flex flex-col justify-between w-screen h-screen" style={{backgroundImage: `url(${LunchImg})`, backgroundSize:'cover'}}>
            {isModalOpen && <LLoadingModal isOpen={isModalOpen} onClose={handleCloseModal} />}
            <div className={`flex justify-end p-4 fade-in ${isContentVisible ? 'show' : ''}`}>
                <button
                    type="button" 
                    className='flex items-center justify-center font-dgm text-[2.2rem] text-white mt-7 mr-10 hover:text-[#FFE486]'
                    onClick={handleButtonClick}>
                    피드백 받기 ! 
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="26" viewBox="0 0 26 31" fill="none" className='ml-5'>
                    <path d="M5.03009e-06 2.50001V28.4C5.03009e-06 30.375 2.175 31.575 3.85 30.5L24.2 17.55C24.5563 17.3245 24.8497 
                        17.0126 25.0531 16.6433C25.2565 16.2739 25.3631 15.8591 25.3631 15.4375C25.3631 15.0159 25.2565 14.6011 25.0531 
                        14.2317C24.8497 13.8624 24.5563 13.5505 24.2 13.325L3.85 0.40001C3.47293 0.156121 3.03701 0.0185269 2.58825 0.00174343C2.13948 
                        -0.0150401 1.69451 0.0896088 1.30026 0.304651C0.90602 0.519692 0.577125 0.837154 0.348275 1.22355C0.119424 1.60994 -0.000896585 2.05093 5.03009e-06 2.50001Z" 
                        fill="currentColor"/>
                    </svg>
                </button>
            </div>
            <div className="flex items-end justify-center">
                <div className={`flex flex-col items-center h-[61.56rem] w-[45.44rem] fade-in ${isContentVisible ? 'show' : ''}`} style={{backgroundImage:`url(${JunghoImg})`, backgroundSize:'cover'}}>
                    <div className="flex flex-col mt-[36.8rem]" style={{width: '86.25rem', height:'11.125rem', background:'rgba(255, 255, 255, 0.85)', borderRadius: '30px', border: '5.5px solid #000',boxSizing: 'border-box'}}>
                        <p className="text-black text-center font-dgm text-[2.3rem] not-italic font-normal leading-normal tracking-[-0.04875rem] whitespace-pre-line mt-[1.62rem]">
                            안녕하십니까. <br/>
                            다들 좋은 아침입니다. 
                        </p>
                    </div>
                    <div className="flex w-[86.25rem] h-[5.4375rem] -mt-1 mb-[7.31rem] bg-no-repeat bg-contain" style={{backgroundImage: `url(${chatBarImg})`}} >
                    <input type="text" 
                    className='flex-grow ml-10 text-4xl text-black bg-transparent border-none outline-none font-dgm'
                    placeholder="답변을 입력하세요" 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)} 
                    />
                    <button className='flex-none'><img src={buttonImage} alt="button" className='w-12 h-12 mr-9'/></button>
                    </div>
                </div>
            </div>
            {isFeedbackModalOpen && <FeedBackModal isOpen={isFeedbackModalOpen} onClose={handleCloseFeedbackModal} />}
        </div>
    );}

    export default LunchTalkPage;