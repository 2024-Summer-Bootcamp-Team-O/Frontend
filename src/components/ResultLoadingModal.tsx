import React, { useEffect, useRef } from "react";
import subway_sound from '../assets/sounds/subway.mp3';
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
            <div className="absolute top-0 left-0 flex 4k:w-[426.5rem] 3k:w-[340.8rem] 2k:w-[383.2rem] 1k:w-[340.8rem] h-full bg-cover animate-slide" style={{ zIndex: 0 }}>
                <div className="4k:w-[106.5rem] 3k:w-[85.2rem] 2k:w-[95.8rem] 1k:w-[85.2rem] bg-cover" style={{ backgroundImage: `url(${'https://d2skuaswcwq39b.cloudfront.net/baseimage/city_sunset.png'})` }}></div>
                <div className="4k:w-[106.5rem] 3k:w-[85.2rem] 2k:w-[95.8rem] 1k:w-[85.2rem] bg-cover" style={{ backgroundImage: `url(${'https://d2skuaswcwq39b.cloudfront.net/baseimage/city_sunset.png'})` }}></div>
                <div className="4k:w-[106.5rem] 3k:w-[85.2rem] 2k:w-[95.8rem] 1k:w-[85.2rem] bg-cover" style={{ backgroundImage: `url(${'https://d2skuaswcwq39b.cloudfront.net/baseimage/city_sunset.png'})` }}></div>
                <div className="4k:w-[106.5rem] 3k:w-[85.2rem] 2k:w-[95.8rem] 1k:w-[85.2rem] bg-cover" style={{ backgroundImage: `url(${'https://d2skuaswcwq39b.cloudfront.net/baseimage/city_sunset.png'})` }}></div>
            </div>
            <div className="absolute top-0 left-0 z-10 flex items-end justify-center h-screen 4k:w-[160rem] 3k:w-[120rem] 2k:w-[108rem] 1k:w-[94.5rem] bg-cover" style={{ backgroundImage: `url(${'https://d2skuaswcwq39b.cloudfront.net/baseimage/subway.png'})` }}>
                <div className="flex flex-col items-center justify-center ml-20 animate-scroll-up">
                    <p className="text-white font-dgm 4k:text-[5.5rem] 3k:text-[4rem] 2k:text-[4rem] 1k:text-[3.5rem]">The End</p>
                </div>
            </div>
        </div>
    </div>    
    );
}

export default ResultLoadingModal;
