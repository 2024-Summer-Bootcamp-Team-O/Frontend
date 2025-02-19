import React, { useEffect, useState, useRef } from "react";
import '../index.css';
import typing from '../assets/sounds/typing.mp3';
import roulette from '../assets/sounds/roulette.mp3';

interface CharacterModalProps {
    onClose: () => void;
    character_id: number | null;
}

export const silhouette = [
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/silhouette_nice_m.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/silhouette_nice_w.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/silhouette_assistant.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/silhouette_om.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/silhouette_ow.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/silhouette_drunken.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/silhouette_employee.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/silhouette_intern.png',
];

export const standing = [
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/nice_m.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/nice_w.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/assistant.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/om.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/ow.png',
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
        <div className="flex items-center justify-center w-screen h-screen bg-cover" style={{ backgroundImage: `url(${'https://d2skuaswcwq39b.cloudfront.net/baseimage/office_m.png'})` }}>
            <div className="flex flex-col items-center justify-center w-screen h-screen bg-black bg-opacity-70">
                <div className="flex flex-col items-center justify-between 
                    4k:mt-[4.5rem] 4k:w-[62.254rem] 4k:h-[45.226rem]
                    3k:mt-[2.7rem] 3k:w-[53.207rem] 3k:h-[38.83rem]
                    2k:mt-[2.25rem] 2k:w-[52.538rem] 2k:h-[38.138rem]
                    1k:mt-[0.9rem] 1k:w-[45.94rem] 1k:h-[33.34rem]
                    bg-contain bg-no-repeat" style={{ backgroundImage: `url(${'https://d2skuaswcwq39b.cloudfront.net/baseimage/minipage_o.png'})` }}>
                    <div className="flex self-start 2k:mt-2 2k:ml-8 1k:mt-2 1k:ml-7">
                        {animationComplete ? (
                            <p className="4k:text-[2.3rem] 3k:text-[2rem] 2k:text-[1.9rem] 1k:text-[1.7rem] text-white font-dgm">출근 완료!</p>
                        ) : (
                            <p className="4k:text-[2.3rem] 3k:text-[2rem] 2k:text-[1.9rem] 1k:text-[1.7rem] text-white font-dgm">
                                출근중<span className="dot1">.</span><span className="dot2">.</span><span className="dot3">.</span>
                            </p>
                        )}
                    </div>
                    <img
                        src={displayImage || finalImage || currentImage}
                        alt="실루엣"
                        className={`4k:w-[21.326rem] 4k:h-[33.055rem] 4k:mr-[2.61rem] 
                        3k:w-[17.998rem] 3k:h-[27.896rem] 3k:mr-[2.43rem]
                        2k:w-[18rem] 2k:h-[27.9rem] 2k:mr-[2.25rem] 
                        1k:w-[15.75rem] 1k:h-[24.413rem] 1k:mr-[1.98rem] 1k:mb-[0.1rem] ${isFading ? 'animate-fade-in' : ''}`}
                    />
                </div>
                {animationComplete ? (
                    <p className="p-ani 4k:mt-14 4k:text-[3.5rem] 3k:mt-[2rem] 3k:text-[2.5rem] 2k:mt-10 2k:text-[2.5rem] 1k:mt-8 1k:text-[2.5rem] font-dgm text-white">{displayedText}</p>
                ) : (
                    <button 
                        className={`4k:mt-14 4k:text-[3.5rem] 3k:mt-[2rem] 3k:text-[2.5rem] 2k:mt-10 2k:text-[2.5rem] 1k:mt-8 1k:text-[2.5rem] font-dgm text-white ${isButtonClicked ? '' : 'animate-blink'}`}
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
