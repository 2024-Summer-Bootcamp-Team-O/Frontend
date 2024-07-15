import React, { useEffect, useState, useRef } from "react";
import '../index.css'; 

export const silhouette = [
    'src/assets/images/silhouette/silhouette_ow.png',
    'src/assets/images/silhouette/silhouette_om.png',
    'src/assets/images/silhouette/silhouette_drunken.png',
    'src/assets/images/silhouette/silhouette_nice_m.png',
    'src/assets/images/silhouette/silhouette_nice_w.png',
    'src/assets/images/silhouette/silhouette_assistant.png',
    'src/assets/images/silhouette/silhouette_employee.png',
    'src/assets/images/silhouette/silhouette_intern.png',
];

export const standing = [
    'src/assets/images/standing/om.png',
    'src/assets/images/standing/ow.png',
    'src/assets/images/standing/drunken.png',
    'src/assets/images/standing/nice_m.png',
    'src/assets/images/standing/nice_w.png',
    'src/assets/images/standing/assistant.png',
    'src/assets/images/standing/employee.png',
    'src/assets/images/standing/intern.png',
];

export const CharacterName = [
    '부장 박진수가',
    '차장 김진숙이',
    '과장 박성민이',
    '팀장 이정호가',
    '팀장 서윤아가',
    '대리 한민석이',
    '인턴 박지훈이',
    '인턴 최수민이'
];

const CharacterModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
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

    const predefinedIndex = 3; 

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
    }, [isAnimating, finalImage]);

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
                    setTimeout(onClose, 3000); 
                }
            }, 150);
            
            return () => clearInterval(typingIntervalRef.current!);
        }
    }, [animationComplete, characterName, onClose]);

    return (
        <div className="flex items-center justify-center w-screen h-screen bg-cover bg-[url('src/assets/images/background/office_m.png')]">
            <div className="flex flex-col items-center justify-center w-screen h-screen bg-black bg-cover bg-opacity-70">
                <div className="flex flex-col items-center justify-between mt-32 w-[58.375rem] h-[42.375rem] bg-contain bg-no-repeat bg-[url('src/assets/images/background/minipage_o.png')]">
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
                        className={`w-[20rem] h-[31rem] mb-1 ${isFading ? 'animate-fade-in' : ''}`}
                    />
                </div>
                {animationComplete ? (
                    <p className="mt-10 text-[2.8125rem] font-dgm text-white">{displayedText}</p>
                ) : (
                    <button 
                        className={`mt-10 text-[2.8125rem] font-dgm text-white ${isButtonClicked ? '' : 'animate-blink'}`}
                        onClick={startAnimation}
                    >
                        {buttonText}
                    </button>
                )}
                <audio ref={typingSoundRef} src="src/assets/sounds/typing.mp3" muted />
                <audio ref={rouletteSoundRef} src="src/assets/sounds/roulette.mp3" muted />
            </div>
        </div>
    );
}

export default CharacterModal;
