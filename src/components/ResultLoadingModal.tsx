import React, { useEffect, useRef } from "react";
import subway_sound from '../assets/sounds/subway.mp3';
import city_sunset from '../assets/images/background/city_sunset.png';
import subway from '../assets/images/background/subway.png';
import '../index.css';

interface ResultLoadingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ResultLoadingModal: React.FC<ResultLoadingModalProps> = ({ isOpen, onClose }) => {
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const playAudio = () => {
            if (audioRef.current) {
                audioRef.current.volume = 0.1;
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
                onClose();
            }, 7000); 

            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="relative w-screen h-screen overflow-hidden bg-white">
                <audio ref={audioRef} loop>
                    <source src={subway_sound} type="audio/mpeg" />
                </audio>
                <div className="absolute top-0 left-0 flex w-[6824px] h-full bg-cover animate-slide">
                    <div className="w-[1704px] h-full bg-cover" style={{ backgroundImage: `url(${city_sunset})` }}></div>
                    <div className="w-[1704px] h-full bg-cover" style={{ backgroundImage: `url(${city_sunset})` }}></div>
                    <div className="w-[1704px] h-full bg-cover" style={{ backgroundImage: `url(${city_sunset})` }}></div>
                    <div className="w-[1704px] h-full bg-cover" style={{ backgroundImage: `url(${city_sunset})` }}></div>
                </div>
                <div className="relative flex items-end justify-center w-screen h-screen bg-cover" style={{ backgroundImage: `url(${subway})` }}>
                    <div className="flex flex-col items-center justify-center ml-20 animate-scroll-up">
                        <p className="text-white font-dgm text-[4rem]">The End</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResultLoadingModal;
