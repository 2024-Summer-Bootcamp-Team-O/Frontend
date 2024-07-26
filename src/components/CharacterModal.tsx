import React, { useEffect, useState, useRef } from "react";
import silhouette_nice_m from '../assets/images/silhouette/silhouette_nice_m.png';
import silhouette_nice_w from '../assets/images/silhouette/silhouette_nice_w.png';
import silhouette_assistant from '../assets/images/silhouette/silhouette_assistant.png';
import silhouette_om from '../assets/images/silhouette/silhouette_om.png';
import silhouette_ow from '../assets/images/silhouette/silhouette_ow.png';
import silhouette_drunken from '../assets/images/silhouette/silhouette_drunken.png';
import silhouette_employee from '../assets/images/silhouette/silhouette_employee.png';
import silhouette_intern from '../assets/images/silhouette/silhouette_intern.png';

import standing_nice_m from '../assets/images/standing/nice_m.png';
import standing_nice_w from '../assets/images/standing/nice_w.png';
import standing_assistant from '../assets/images/standing/assistant.png';
import standing_om from '../assets/images/standing/om.png';
import standing_ow from '../assets/images/standing/ow.png';
import standing_drunken from '../assets/images/standing/drunken.png';
import standing_employee from '../assets/images/standing/employee.png';
import standing_intern from '../assets/images/standing/intern.png';

import bg_office_m from '../assets/images/background/office_m.png';
import bg_minipage_o from '../assets/images/background/minipage_o.png';

import typing from '../assets/sounds/typing.mp3';
import roulette from '../assets/sounds/roulette.mp3';

import '../index.css';

interface CharacterModalProps {
    onClose: () => void;
    character_id: number | null;
}

export const silhouette = [
    silhouette_nice_m,
    silhouette_nice_w,
    silhouette_assistant,
    silhouette_om,
    silhouette_ow,
    silhouette_drunken,
    silhouette_employee,
    silhouette_intern,
];

export const standing = [
    standing_nice_m,
    standing_nice_w,
    standing_assistant,
    standing_om,
    standing_ow,
    standing_drunken,
    standing_employee,
    standing_intern,
];

export const CharacterName = [
    '팀장 이정호가',
    '팀장 서윤아가',
    '대리 한민석이',
    '부장 박진수가',
    '차장 김진숙이',
    '과장 박성민이',
    '인턴 박지훈이',
    '인턴 최수민이'
];

const CharacterModal: React.FC<CharacterModalProps> = ({ onClose, character_id }) => {
    if (character_id === null) {
        return null;
    }

    const [currentImage, setCurrentImage] = useState(silhouette[0]);
    const [finalImage, setFinalImage] = useState<string | null>(null);
    const [displayImage, setDisplayImage] = useState<string | null>(null);
    const [characterName, setCharacterName] = useState<string | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isFading, setIsFading] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [buttonText, setButtonText] = useState("CLICK HERE!");
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const typingSoundRef = useRef<HTMLAudioElement | null>(null);
    const rouletteSoundRef = useRef<HTMLAudioElement | null>(null);

    const predefinedIndex = character_id - 1;

    useEffect(() => {
        console.log('Received character_id:', character_id);
    }, [character_id]);

    const startAnimation = () => {
        playSound(rouletteSoundRef);
        setButtonText("당신의 상사는 누굴까요 ?");
        setIsButtonClicked(true);
        setIsAnimating(true);
    };

    const playSound = (soundRef: React.RefObject<HTMLAudioElement>) => {
        if (soundRef.current) {
            soundRef.current.muted = false;
            soundRef.current.loop = true;
            soundRef.current.play().then(() => {
                console.log(`${soundRef.current?.src} 재생 중`);
            }).catch(error => {
                console.error(`${soundRef.current?.src} 재생 오류:`, error);
            });
        }
    };

    const stopSound = (soundRef: React.RefObject<HTMLAudioElement>) => {
        if (soundRef.current) {
            soundRef.current.loop = false;
            soundRef.current.pause();
            soundRef.current.currentTime = 0;
            console.log(`${soundRef.current?.src} 중지`);
        }
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;
        let timeout: NodeJS.Timeout;

        if (isAnimating && !finalImage) {
            interval = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * silhouette.length);
                setCurrentImage(silhouette[randomIndex]);
            }, 100);

            timeout = setTimeout(() => {
                clearInterval(interval);
                setFinalImage(silhouette[predefinedIndex]);
                setCharacterName(CharacterName[predefinedIndex]);
                setIsAnimating(false);
                stopSound(rouletteSoundRef);
            }, 6100);
        }

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [isAnimating, finalImage, predefinedIndex]);

    useEffect(() => {
        if (finalImage) {
            const finalIndex = silhouette.indexOf(finalImage);
            const finalImageTimeout = setTimeout(() => {
                setDisplayImage(standing[finalIndex]);
                setIsFading(true);
                setTimeout(() => {
                    setIsFading(false);
                    setAnimationComplete(true);
                }, 500);
            }, 500);

            return () => clearTimeout(finalImageTimeout);
        }
    }, [finalImage]);

    useEffect(() => {
        const handleUserInteraction = () => {
            if (typingSoundRef.current) {
                typingSoundRef.current.muted = false;
            }
        };

        window.addEventListener('click', handleUserInteraction);
        window.addEventListener('keydown', handleUserInteraction);

        return () => {
            window.removeEventListener('click', handleUserInteraction);
            window.removeEventListener('keydown', handleUserInteraction);
        };
    }, []);

    useEffect(() => {
        if (animationComplete && typingSoundRef.current) {
            playSound(typingSoundRef);
        }
    }, [animationComplete]);

    useEffect(() => {
        if (animationComplete && characterName && !isTyping) {
            if (typingIntervalRef.current) {
                clearInterval(typingIntervalRef.current);
            }
            const fullText = `${' ' + characterName} 나타났다 !`;
            setDisplayedText("");
            let index = 0;
            setIsTyping(true);
            typingIntervalRef.current = setInterval(() => {
                setDisplayedText((prev) => prev + fullText.charAt(index));
                index++;
                if (index >= fullText.length) {
                    clearInterval(typingIntervalRef.current!);
                    setIsTyping(false);
                    stopSound(typingSoundRef);
                    setTimeout(onClose, 500); 
                }
            }, 150);

            return () => clearInterval(typingIntervalRef.current!);
        }
    }, [animationComplete, characterName, onClose]);

    return (
        <div className="flex items-center justify-center w-screen h-screen bg-cover" style={{ backgroundImage: `url(${bg_office_m})` }}>
            <div className="flex flex-col items-center justify-center w-screen h-screen bg-black bg-opacity-70">
                <div className="flex flex-col items-center justify-between mt-32 w-[58.375rem] h-[42.375rem] bg-contain bg-no-repeat" style={{ backgroundImage: `url(${bg_minipage_o})` }}>
                    <div className="flex self-start mt-2 ml-9">
                        {animationComplete ? (
                            <p className="text-[2.125rem] text-white font-dgm">출근 완료!</p>
                        ) : (
                            <p className="text-[2.125rem] text-white font-dgm">
                                출근중<span className="dot1">.</span><span className="dot2">.</span><span className="dot3">.</span>
                            </p>
                        )}
                    </div>
                    <img
                        src={displayImage || finalImage || currentImage}
                        alt="실루엣"
                        className={`w-[20rem] h-[31rem] mb-1 mr-10 ${isFading ? 'animate-fade-in' : ''}`}
                    />
                </div>
                {animationComplete ? (
                    <p className="p-ani mt-10 text-[2.8125rem] font-dgm text-white">{displayedText}</p>
                ) : (
                    <button 
                        className={`mt-10 text-[2.8125rem] font-dgm text-white ${isButtonClicked ? '' : 'animate-blink'}`}
                        onClick={startAnimation}
                    >
                        {buttonText}
                    </button>
                )}
                <audio ref={typingSoundRef} src={typing} muted />
                <audio ref={rouletteSoundRef} src={roulette} muted />
            </div>
        </div>
    );
}

export default CharacterModal;
