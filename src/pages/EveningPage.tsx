import React, { useState, useEffect, useRef } from "react";
import '../index.css';
import axiosInstance from "../hooks/axiosInstance";
import EveningImg from "../assets/images/background/EveningPage.png";
import { standing } from '../components/CharacterModal';
import chatBarImg from '../assets/images/others/Chatbar.png';
import ELoadingModal from '../components/ELoadingModal';
import FeedBackEvModal from '../components/FeedBackEvModal';
import CameraModal from '../components/CameraModal';

const EveningPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(true); // 페이지 로드 시 모달이 열리도록 초기값을 true로 설정
    const [isContentVisible, setIsContentVisible] = useState(false); // 콘텐츠 가시성 상태
    const [inputValue, setInputValue] = useState('');
    const [buttonImage, setButtonImage] = useState('src/assets/images/others/sendbutton_ui.png');
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [isCameraModalOpen, setIsCameraModalOpen] = useState(false); // 카메라 모달 상태 추가
    const [characterId, setCharacterId] = useState<number | null>(null);
    const websocket = useRef<WebSocket | null>(null);
    const [websocketMessage, setWebsocketMessage] = useState('');
    const [messageQueue, setMessageQueue] = useState<string[]>([]);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [feedbackQueue, setFeedbackQueue] = useState<string[]>([]);

    const handleCloseModal = async() => {
        setIsModalOpen(false);
        setTimeout(() => {
            setIsContentVisible(true); // 모달이 닫힌 후 콘텐츠를 표시
        },);

        try {
            const response = await axiosInstance.get('/apps/next')
            if (response.status === 201) {
                console.log('다음 상화 성공:', response.data);
                // 필요한 경우 응답 데이터를 처리
            } else {
                console.error('다음 상황 실패:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('API 요청 에러:', error);
        }
    };

    const handleButtonClick = () => {
        const audio = new Audio('src/assets/sounds/click.mp3');
        audio.play();
        if (websocket.current) {
            websocket.current.send(JSON.stringify({ message: inputValue }));
            setInputValue('');
            setWebsocketMessage(''); // 기존 대사를 지우기
        }
    };

    const handleFeedbackButtonClick = async() => {
        setIsFeedbackModalOpen(true); // 피드백 모달 열기

        try {
            const response = await axiosInstance.get ('/apps/feedbacks')
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

    useEffect(() => {
        websocket.current = new WebSocket('ws://localhost:8000/ws/gpt/');

        websocket.current.onopen = () => {
            console.log('WebSocket 연결이 열렸습니다.');
        };

        websocket.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('받은 메시지:', data);
            if(data.message){
                if (data.type === 'gpt_feedback_message') {
                    setFeedbackQueue(prevQueue => [...prevQueue, ...data.message]);
                } else {
                    setMessageQueue(prevQueue => [...prevQueue, ...data.message]);
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

    const handleCloseCameraModal = () => {
        setIsCameraModalOpen(false); // 카메라 모달 닫기
    };

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
            setButtonImage('src/assets/images/others/sendbutton_ui_a.png');
        } else {
            setButtonImage('src/assets/images/others/sendbutton_ui.png');
        }
    }, [inputValue]);
    
    return (
        <div className="flex flex-col justify-between w-screen h-screen" style={{backgroundImage: `url(${EveningImg})`, backgroundSize:'cover'}}>
            {isModalOpen && <ELoadingModal isOpen={isModalOpen} onClose={handleCloseModal} />}
            <div className={`flex justify-end p-4 fade-in ${isContentVisible && !isCameraModalOpen ? 'show' : ''}`}>
                <button
                    type="button"
                    className='flex items-center justify-center font-dgm text-[2.2rem] text-white mt-7 mr-10 hover:text-[#FFE486]'
                    onClick={handleFeedbackButtonClick}>
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
            <div className={`flex items-end justify-center ${isCameraModalOpen ? 'hidden' : ''}`}>
                <div className={`flex flex-col items-center h-[61.56rem] w-[45.44rem] bg-contain bg-no-repeat fade-in ${isContentVisible ? 'show' : ''}`} style={{ backgroundImage: `url(${characterId !== null ? standing[characterId-1] : 'src/assets/images/standing/nice_m_long.png'})` }}>
                    <div className="flex flex-col items-center justify-center mt-[36.8rem]" style={{width: '86.25rem', height:'11.125rem', background:'rgba(255, 255, 255, 0.85)', borderRadius: '30px', border: '5.5px solid #000',boxSizing: 'border-box'}}>
                        <p className="ml-7 mr-7 mt-3 mb-3 text-black font-dgm text-[2.0rem]">{websocketMessage}</p>
                    </div>
                    <div className="flex w-[86.25rem] h-[5.4375rem] -mt-1 mb-[7.31rem] bg-no-repeat bg-contain" style={{backgroundImage: `url(${chatBarImg})`}} >
                        <input type="text"
                        className='flex-grow ml-10 text-4xl text-black bg-transparent border-none outline-none font-dgm'
                        value={inputValue}
                        placeholder="답변을 입력하세요"
                        onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button className='flex-none' onClick={handleButtonClick}><img src={buttonImage} alt="button" className='w-12 h-12 mr-9'/></button>
                    </div>
                </div>
            </div>
            {isFeedbackModalOpen && <FeedBackEvModal isOpen={isFeedbackModalOpen} onClose={handleCloseFeedbackModal} websocketMessage={feedbackMessage} />}
            {isCameraModalOpen && <CameraModal isOpen={isCameraModalOpen} onClose={handleCloseCameraModal} />} 
        </div>
    );}
export default EveningPage;






