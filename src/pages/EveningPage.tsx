import React, { useState, useEffect } from "react";
import '../index.css';
import EveningPage from "../assets/images/background/EveningPage.png";
import JunghoImg from "../assets/images/Character/JunghoImg.png";
import chatBarImg from '../assets/images/others/Chatbar.png';
import ELoadingModal from '../components/ELoadingModal';

const LunchTalkPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(true); // 페이지 로드 시 모달이 열리도록 초기값을 true로 설정
    const [isContentVisible, setIsContentVisible] = useState(false); // 콘텐츠 가시성 상태
    const [inputValue, setInputValue] = useState('');
    const [buttonImage, setButtonImage] = useState('src/assets/images/others/sendbutton_ui.png');
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            setIsContentVisible(true); // 모달이 닫힌 후 콘텐츠를 표시
        },);
    };

    useEffect(() => {
        if (inputValue.trim() !== '') {
            setButtonImage('src/assets/images/others/sendbutton_ui_a.png'); 
        } else {
            setButtonImage('src/assets/images/others/sendbutton_ui.png'); 
        }
    }, [inputValue]);

    return (
        <div className="flex h-screen w-screen justify-center items-end" style={{backgroundImage: `url(${EveningPage})`, backgroundSize:'cover'}}>
            {isModalOpen && <ELoadingModal isOpen={isModalOpen} onClose={handleCloseModal} />}
            <div className={`flex flex-col items-center h-[61.56rem] w-[45.44rem] fade-in ${isContentVisible ? 'show' : ''}`} style={{backgroundImage:`url(${JunghoImg})`, backgroundSize:'cover'}}>
                <div className="flex flex-col mt-[36.8rem]" style={{width: '86.25rem', height:'11.125rem', background:'rgba(255, 255, 255, 0.85)', borderRadius: '30px', border: '5.5px solid #000',boxSizing: 'border-box'}}>
                    <p className="text-black text-center font-dgm text-[2.3rem] not-italic font-normal leading-normal tracking-[-0.04875rem] whitespace-pre-line mt-[1.62rem]">
                        안녕하십니까. <br/>
                        다들 좋은 아침입니다. 
                    </p>
                </div>
                <div className="flex w-[86.25rem] h-[5.4375rem] -mt-1 mb-[7.31rem]" style={{backgroundImage: `url(${chatBarImg})`, backgroundSize:'cover'}} >
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
    );}

    export default LunchTalkPage;