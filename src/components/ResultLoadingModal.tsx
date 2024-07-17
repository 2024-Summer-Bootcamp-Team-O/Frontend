import React, { useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import '../index.css';

interface ResultLoadingModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

const ResultLoadingModal: React.FC<ResultLoadingModalProps> = ({ isOpen }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const playAudio = () => {
            if (audioRef.current) {
                audioRef.current.volume = 0.1; // 볼륨을 10%로 설정
                audioRef.current.play().catch((error) => {
                    console.error("Failed to play audio:", error);
                });
            }
        };

        if (isOpen) {
            window.addEventListener("click", playAudio);
        }

        return () => {
            window.removeEventListener("click", playAudio);
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                navigate('/result'); // 이동할 페이지 경로
            }, 7000); 

            return () => clearTimeout(timer);
        }
    }, [isOpen, navigate]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="relative w-screen h-screen overflow-hidden bg-white">
                <audio ref={audioRef} loop>
                    <source src="src/assets/sounds/subway.mp3" type="audio/mpeg" />
                </audio>
                <div className="absolute top-0 left-0 w-[218.5rem] h-[69.8125rem] bg-cover bg-[url('src/assets/images/background/city_sunset.png')] animate-slide"></div>
                <div className="relative flex items-end justify-center w-screen h-screen bg-cover bg-[url('src/assets/images/background/subway.png')]">
                    <div className="flex flex-col items-center justify-center ml-20 animate-scroll-up">
                        <p className="text-white font-dgm text-[4rem]">The End</p>
                        <p className="text-white font-dgm text-[2.5rem]">
                            박수연<br/>
                            김영택<br/>
                            김경섭<br/>
                            이슬아<br/>
                            강태훈
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResultLoadingModal;
