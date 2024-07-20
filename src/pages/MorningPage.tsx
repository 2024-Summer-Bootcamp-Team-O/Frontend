import React, { useState, useEffect, useRef } from 'react';
import '../index.css';
import axios from 'axios';
import CharacterModal, { standing } from '@components/CharacterModal';
import FeedBackModal from '../components/FeedBackMoModal'; 
import { useLocation } from 'react-router-dom';

const MorningPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [buttonImage, setButtonImage] = useState('src/assets/images/others/sendbutton_ui.png');
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [websocketMessage, setWebsocketMessage] = useState('');
    const [messageQueue, setMessageQueue] = useState<string[]>([]);
    const location = useLocation();
    const characterId = location.state?.character_id;
    const websocket = useRef<WebSocket | null>(null);
    // const [characterId, setCharacterId] = useState<number | null>(null);

    const closeModal = async() => {
        setIsModalOpen(false);

        try{
            const response= await axios.post("http://localhost:80/apps/start",{
                user_id:1,
                character_id:characterId,
            });

            if (response.status==201){
                console.log('대화 시작 성공:',response.data.message);
            } else{
                console.error('대화 시작 실패:',response.data.message);
            }
        } catch(error) {
            console.error('API 요청 중 오류 발생:',error);
        }
    };

    const handleButtonClick = () => {
        const audio = new Audio('src/assets/sounds/click.mp3');
        audio.play();
        if (websocket.current) {
            websocket.current.send(JSON.stringify({ message: inputValue }));
            setInputValue(''); // 메시지를 보낸 후 입력 필드 비우기
            setWebsocketMessage(''); // 기존 대사를 지우기
        }
    };

    const handleFeedbackButtonClick = () => {
        setIsFeedbackModalOpen(true); // 피드백 모달 열기
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
    

    useEffect(() => {
        websocket.current = new WebSocket('ws://localhost:80/ws/gpt/');

        websocket.current.onopen = () => {
            console.log('WebSocket 연결이 열렸습니다.');
        };

        websocket.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('받은 메시지:', data);
            if (data.message) {
                setMessageQueue(prevQueue => [...prevQueue, ...data.message]);} // 메시지를 한 글자씩 큐에 추가
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


    // useEffect(() => {
    //     const storedCharacterId = sessionStorage.getItem('characterId');
    //     if (storedCharacterId) {
    //         setCharacterId(parseInt(storedCharacterId, 10));
    //     }
    // }, []);

    return (
        <div className="flex flex-col justify-between w-screen h-screen bg-cover bg-[url('src/assets/images/background/office_m.png')]">
            {isModalOpen ? (
                <div className="modal-overlay">
                    <div className="modal-container animate-modal">
                        {characterId !== null && <CharacterModal onClose={closeModal} character_id={characterId} />}
                    </div>
                </div>
            ) : (
                <>
                    <div className='flex justify-end p-4'>
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
                    <div className="flex items-end justify-center">
                        <div className="flex flex-col items-center justify-end animate-fade-in w-[45.44rem] h-[61.56rem] bg-contain bg-no-repeat" style={{ backgroundImage: `url(${characterId !== null ? standing[characterId-1] : 'src/assets/images/standing/nice_m_long.png'})` }}>
                            <div className='-translate-y-1/2'>
                                <div className="flex items-center justify-center w-[86.25rem] h-[11.125rem] bg-contain bg-no-repeat bg-[url('src/assets/images/others/script_ui.png')]">
                                    <p className="ml-7 mr-7 mt-3 mb-3 text-black font-dgm text-[2.0rem]">{websocketMessage}</p>
                                </div>
                                <div className="flex -mt-1 justify-between items-center w-[86.25rem] h-[5.4375rem] bg-contain bg-no-repeat bg-[url('src/assets/images/others/input_ui.png')]">
                                    <input 
                                        type="text" 
                                        placeholder="답변을 입력하세요" 
                                        className='flex-grow ml-10 text-4xl text-black bg-transparent border-none outline-none font-dgm'
                                        value={inputValue} 
                                        onChange={(e) => setInputValue(e.target.value)} 
                                    />
                                    <button className='flex-none' onClick={handleButtonClick}>
                                        <img src={buttonImage} alt="button" className='w-12 h-12 mr-9'/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {isFeedbackModalOpen && (
                <FeedBackModal isOpen={isFeedbackModalOpen} onClose={handleCloseFeedbackModal} />
            )}
        </div>
    );
}

export default MorningPage;
