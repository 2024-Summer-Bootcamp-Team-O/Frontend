import React, { useState, useEffect, useRef } from "react";
import '../index.css';
import axiosInstance from "../hooks/axiosInstance";
import EveningImg from "../assets/images/background/EveningPage.png";
import { standing } from '../components/CharacterModal';
import ELoadingModal from '../components/ELoadingModal';
import FeedBackEvModal from '../components/FeedBackEvModal';
import CameraModal from '../components/CameraModal';
import sendbutton_ui from '../assets/images/others/sendbutton_ui.png';
import sendbutton_ui_a from '../assets/images/others/sendbutton_ui_a.png';
import click from '../assets/sounds/click.mp3';

const EveningPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(true); // 페이지 로드 시 모달이 열리도록 초기값을 true로 설정
    const [isContentVisible, setIsContentVisible] = useState(false); // 콘텐츠 가시성 상태
    const [inputValue, setInputValue] = useState('');
    const [buttonImage, setButtonImage] = useState(sendbutton_ui);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [isCameraModalOpen, setIsCameraModalOpen] = useState(false); // 카메라 모달 상태 추가
    const [characterId, setCharacterId] = useState<number | null>(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true); // 버튼 상태 추가
    const websocket = useRef<WebSocket | null>(null);
    const [websocketMessage, setWebsocketMessage] = useState('');
    const [messageQueue, setMessageQueue] = useState<string[]>([]);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [feedbackQueue, setFeedbackQueue] = useState<string[]>([]);
    const [messageCount, setMessageCount] = useState(0);
    
    const handleCloseModal = async() => {
        setIsModalOpen(false);
        setTimeout(() => {
            setIsContentVisible(true); // 모달이 닫힌 후 콘텐츠를 표시
        },);

        try {
            const response = await axiosInstance.get('/api/apps/next')
            if (response.status === 201) {
                console.log('다음 상황 성공:', response.data);
                // 필요한 경우 응답 데이터를 처리
            } else {
                console.error('다음 상황 실패:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('API 요청 에러:', error);
        }
    };

    const handleButtonClick = () => {
        const audio = new Audio(click);
        audio.play();
    
        if (websocket.current) {
            const access = localStorage.getItem('access');
            const messagePayload = {
                access: access,
                message: inputValue
            };
    
            websocket.current.send(JSON.stringify(messagePayload));
            setInputValue('');
            setWebsocketMessage('');
            setMessageCount(prevCount => prevCount + 1);
            setIsButtonDisabled(true);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && !isButtonDisabled) {
            handleButtonClick();
        }
    };

    const handleFeedbackButtonClick = async() => {
        const audio = new Audio(click);
        audio.play();
        setIsFeedbackModalOpen(true); // 피드백 모달 열기

        try {
            const response = await axiosInstance.get ('/api/apps/feedbacks')
            if (response.status === 201) {
                console.log('피드백 요청 성공:', response.data);
                // 필요한 경우 응답 데이터를 처리
            } else {
                console.error('API 요청 실패:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('API 요청 에러:', error);
        }
    };

    const handleCloseFeedbackModal = () => {
        setIsFeedbackModalOpen(false); // 피드백 모달 닫기
        setFeedbackMessage(''); // 피드백 메시지 초기화
        setIsCameraModalOpen(true); // 카메라 모달 열기
    };

    const handleCloseCameraModal = () => {
        setIsCameraModalOpen(false); // 카메라 모달 닫기
    };

    useEffect(() => {
        const token = localStorage.getItem("access");
        websocket.current = new WebSocket('wss://rumz.site/ws/gpt/');

        websocket.current.onopen = () => {
            if (websocket.current){
                const authMessage = JSON.stringify({ type: 'auth', token: token });
                websocket.current.send(authMessage);
                console.log('WebSocket 연결이 열렸습니다. 인증 메시지를 전송했습니다.');
            }
        };
        websocket.current.onmessage = async(event) => {
            const data = JSON.parse(event.data);
            console.log('받은 메시지:', data);
            if(data.message){
                if (data.type === 'gpt_feedback_message') {
                    setFeedbackQueue(prevQueue => [...prevQueue, ...data.message]);
                } else {
                    setMessageQueue(prevQueue => [...prevQueue, ...data.message]);
                }
            }
            if (data.audio_chunk) {
                try {
                    const audioBlob = await (await fetch(`data:audio/mp3;base64,${data.audio_chunk}`)).blob();
                    const audioUrl = URL.createObjectURL(audioBlob);
                    const audio = new Audio(audioUrl);
                    audio.onended = () => {
                        setIsButtonDisabled(false); 
                    };
                    audio.play();
                } catch (error) {
                    console.error('오디오 재생 중 오류 발생:', error);
                }
            }
        };

        websocket.current.onclose = () => {
            console.log('WebSocket 연결이 닫혔습니다.');
        };

        websocket.current.onerror = (error) => {
            console.error('WebSocket 에러:', error);
        };

        return () => {
            if (websocket.current) {
                websocket.current.close();
            }
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (messageQueue.length > 0) {
                setWebsocketMessage(prevMessage => prevMessage + messageQueue[0]);
                setMessageQueue(prevQueue => prevQueue.slice(1));
            }
        }, 100); // 속도를 조절하려면 이 값을 변경 (100ms로 설정)

        return () => clearInterval(interval);
    }, [messageQueue]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (feedbackQueue.length > 0) {
                setFeedbackMessage(prevMessage => prevMessage + feedbackQueue[0]);
                setFeedbackQueue(prevQueue => prevQueue.slice(1));
            }
        }, 100); // 속도를 조절하려면 이 값을 변경 (100ms로 설정)

        return () => clearInterval(interval);
    }, [feedbackQueue]);

    useEffect(() => {
        const storedCharacterId = sessionStorage.getItem('characterId');
        if (storedCharacterId) {
            setCharacterId(parseInt(storedCharacterId, 10));
        }
    }, []);
    
    useEffect(() => {
        if (inputValue.trim() !== '') {
            setButtonImage(sendbutton_ui_a);
        } else {
            setButtonImage(sendbutton_ui);
        }
    }, [inputValue]);
    
    return (
        <div className="flex flex-col justify-between w-screen h-screen" style={{backgroundImage: `url(${EveningImg})`, backgroundSize:'cover'}}>
            {isModalOpen && <ELoadingModal isOpen={isModalOpen} onClose={handleCloseModal} />}
            <div className={`flex justify-end p-4 fade-in ${isContentVisible && !isCameraModalOpen ? 'show' : ''}`}>
                <button
                    type="button"
                    className={`flex items-center justify-center font-dgm text-white hover:text-[#FFE486]
                    4k:text-[3rem] 4k:mt-10 4k:mr-28 3k:text-[2.4rem] 3k:mt-10 3k:mr-20 2k:text-[2.2rem] 2k:mt-10 2k:mr-16 1k:text-[1.8rem] 1k:mt-8 1k:mr-16 
                    ${messageCount < 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={handleFeedbackButtonClick} disabled={messageCount < 3}>
                    피드백 받기 !
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="26" viewBox="0 0 26 31" fill="none" className='ml-5 4k:w-8 4k:h-10 3k:w-7 3k:h-9 2k:w-6 2k:h-8 1k:ml-4 1k:w-5 1k:h-7'>
                    <path d="M5.03009e-06 2.50001V28.4C5.03009e-06 30.375 2.175 31.575 3.85 30.5L24.2 17.55C24.5563 17.3245 24.8497
                        17.0126 25.0531 16.6433C25.2565 16.2739 25.3631 15.8591 25.3631 15.4375C25.3631 15.0159 25.2565 14.6011 25.0531
                        14.2317C24.8497 13.8624 24.5563 13.5505 24.2 13.325L3.85 0.40001C3.47293 0.156121 3.03701 0.0185269 2.58825 0.00174343C2.13948
                        -0.0150401 1.69451 0.0896088 1.30026 0.304651C0.90602 0.519692 0.577125 0.837154 0.348275 1.22355C0.119424 1.60994 -0.000896585 2.05093 5.03009e-06 2.50001Z"
                        fill="currentColor"/>
                    </svg>
                </button>
            </div>
            <div className={`flex items-end justify-center ${isCameraModalOpen ? 'hidden' : ''}`}>
                <div className={`flex flex-col items-center justify-end
                4k:w-[47.775rem] 4k:h-[67.35625rem]
                3k:w-[35.25rem] 3k:h-[49.75rem] 
                2k:w-[36.75rem] 2k:h-[51.8125rem] 
                1k:w-[30.875rem] 1k:h-[43.4375rem] fade-in bg-contain bg-no-repeat ${isContentVisible ? 'show' : ''}`} style={{ backgroundImage: `url(${characterId !== null ? standing[characterId-1] : null})` }}>
                    <div className='4k:-translate-y-[8rem] 3k:-translate-y-[6.5rem] 2k:-translate-y-[6rem] 1k:-translate-y-[5rem]'>
                        <div className="flex flex-col items-center justify-center 
                        4k:w-[98.07rem] 4k:h-[11.58rem] 4k:border-[5.5px] 4k:rounded-[1.8rem]
                        3k:w-[76.44rem] 3k:h-[9.8rem] 3k:border-[5.5px] 3k:rounded-[1.7rem]
                        2k:w-[81.73rem] 2k:h-[9.65rem] 2k:border-[5px] 2k:rounded-[1.6rem]
                        1k:w-[70.67rem] 1k:h-[7.74rem] 1k:border-[4.5px] 1k:rounded-[1.4rem]
                        bg-white bg-opacity-85 border-black" >
                            <p className="4k:pl-12 4k:pr-14 4k:pt-6 4k:pb-6 4k:text-[2.25rem] 3k:pl-12 3k:pr-14 3k:pt-4 3k:pb-4 3k:text-[1.8rem] 2k:pl-9 2k:pr-7 2k:pt-3 2k:pb-3 2k:text-[1.7rem] 1k:pl-8 1k:pr-7 1k:pt-4 1k:pb-4 1k:text-[1.5rem] 
                            text-black font-dgm ">{websocketMessage}</p>
                        </div>
                        <div className="flex items-center justify-between
                        4k:-mt-1 4k:w-[98.07rem] 4k:h-[5.6rem] 4k:border-[5.5px] 4k:rounded-[1.8rem]
                        3k:-mt-1 3k:w-[76.44rem] 3k:h-[4.8rem] 3k:border-[5.5px] 3k:rounded-[1.7rem]
                        2k:-mt-1 2k:w-[81.73rem] 2k:h-[4.67rem] 2k:border-[4.5px] 2k:rounded-[1.6rem]
                        1k:-mt-1 1k:w-[70.67rem] 1k:h-[3.78rem] 1k:border-[4px] 1k:rounded-[1.4rem]
                        border-black bg-cover bg-no-repeat" style={{backgroundImage: "linear-gradient(to left, #C7ECEE, #DAE3E9 32.9552%, #E2E9FC 53.8801%, #F0F8F6 67.1105%, #F1F9DF)"}}>
                            <input
                                type="text"
                                placeholder="답변을 입력하세요"
                                className='flex-grow 4k:mr-1 4k:text-[2.25rem] 3k:mr-1 3k:text-[1.8rem] 2k:ml-10 2k:mr-10 2k:text-[1.7rem] 1k:ml-5 1k:mr-32 1k:text-[1.5rem] text-black bg-transparent border-none outline-none font-dgm'
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyPress}
                                disabled={isButtonDisabled} 
                            />
                            <button className='' onClick={handleButtonClick} disabled={isButtonDisabled}>
                                <img src={buttonImage} alt="button" className='4k:w-12 4k:h-12 4k:mr-10 3k:w-10 3k:h-10 3k:mr-10 2k:w-10 2k:h-10 2k:mr-8 1k:h-9 1k:w-9 1k:mr-7' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isFeedbackModalOpen && <FeedBackEvModal isOpen={isFeedbackModalOpen} onClose={handleCloseFeedbackModal} websocketMessage={feedbackMessage} />}
            {isCameraModalOpen && <CameraModal isOpen={isCameraModalOpen} onClose={handleCloseCameraModal} />} 
        </div>
    );
}

export default EveningPage;
