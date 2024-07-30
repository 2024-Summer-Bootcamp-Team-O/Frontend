import React, { useEffect, useState } from 'react'; 
import '../index.css';
import FeedBackDuck from "../assets/images/Duck/FeedBackDuck.png";
import FeedBackBubble from "../assets/images/Duck/FeedBackBubble.png";
import { useNavigate } from 'react-router-dom';
import click from '../assets/sounds/click.mp3';

interface FeedBackLuModalProps {
    isOpen: boolean;
    onClose: () => void;
    websocketMessage: string;
}

const FeedBackLuModal: React.FC<FeedBackLuModalProps> = ({ isOpen, onClose, websocketMessage }) => {
    const [showText, setShowText] = useState(false);
    const navigate = useNavigate();

    const handleButtonClick = async () => {
        const audio = new Audio(click);
        audio.play();

        onClose();
        navigate('/evening');
    };

    useEffect(() => {
        if (isOpen) {
            const bubble = document.querySelector('.bubble');
            const handleAnimationEnd = () => {
                setShowText(true);
            };
            bubble?.addEventListener('animationend', handleAnimationEnd);

            return () => {
                bubble?.removeEventListener('animationend', handleAnimationEnd);
            };
        } else {
            setShowText(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={`fixed top-0 left-0 flex w-screen h-screen bg-black bg-opacity-80 ${isOpen ? 'modal-overlay' : ''}`}>
            <div className='flex flex-col 4k:w-[60rem] 3k:w-[50rem] 2k:w-[42.685rem] 1k:w-[34.685rem] h-full justify-end items-center'>
                <img src={FeedBackDuck} alt='FeedBackDuck' className={`4k:w-[42.45rem] 4k:h-[56.175rem] 4k:mb-[4.25rem] 4k:ml-[10rem]
                3k:w-[28rem] 3k:h-[38rem] 3k:mb-[3rem] 3k:ml-[8rem]
                2k:w-[29rem] 2k:h-[39rem] 2k:mb-[3.5rem] 2k:ml-[10rem] 
                1k:w-[26rem] 1k:h-[34.5rem] 1k:mb-[2rem] 1k:ml-[10rem] 
                ${isOpen ? 'duck-image' : ''}`}/>
            </div>
            <div className='flex flex-grow flex-col w-[65.31rem] h-full '>
                <div className={`flex flex-col items-center justify-center 
                4k:-ml-[4rem] 4k:mt-[10rem] 4k:w-[60rem] 4k:h-[23.6rem]
                3k:-ml-[8rem] 3k:mt-[6.5rem] 3k:w-[48rem] 3k:h-[23.2rem]
                2k:-ml-[5rem] 2k:mt-[7.8rem] 2k:w-[48rem] 2k:h-[22rem]
                1k:-ml-[2rem] 1k:mt-[6.81rem] 1k:w-[43rem] 1k:h-[23.6rem]  ${isOpen ? 'bubble' : ''}`} style={{background:`url(${FeedBackBubble})`, backgroundSize:'cover', backgroundRepeat: 'no-repeat'}}>
                    {showText && (
                        <p className="4k:ml-10 4k:mr-10 4k:-mt-[5rem] 4k:mb-3 4k:text-[2.5rem]
                        3k:ml-10 3k:mr-10 3k:-mt-[3rem] 3k:mb-3 3k:text-[2.2rem]
                        2k:ml-8 2k:mr-8 2k:-mt-[3rem] 2k:mb-3 2k:text-[2.1rem]
                        1k:ml-7 1k:mr-7 1k:-mt-[2.5rem] 1k:mb-3 1k:text-[1.9rem] text-black font-dgm ">{websocketMessage}</p>
                    )}
                </div>
                <div className="flex flex-col w-full h-[39.17rem] justify-end items-end">
                    <button className="flex text-white hover:text-[#FFE486] font-dgm 
                    4k:text-[3.25rem] 4k:-mb-[2.5rem] 4k:mr-[5rem]
                    3k:text-[2.5rem] 3k:mb-[2.75rem] 3k:mr-[5rem] 
                    2k:text-[2.3rem] 2k:mb-[2.75rem] 2k:mr-[5rem]
                    1k:text-[2rem] 1k:mb-[2rem] 1k:mr-[4rem]" onClick={handleButtonClick}>
                        <span>다음 에피소드로 이동 !</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="31" viewBox="0 0 26 31" fill="none" className='4k:ml-[1rem] 4k:mt-[1rem] 4k:w-14 4k:h-12 3k:ml-[1rem] 3k:mt-[0.75rem] 3k:w-7 3k:h-9 2k:ml-[1rem] 2k:mt-[0.75rem] 2k:w-6 2k:h-8 1k:ml-[1rem] 1k:mt-[0.5rem] 1k:w-6 1k:h-8'>
                        <path d="M5.03009e-06 2.50001V28.4C5.03009e-06 30.375 2.175 31.575 3.85 30.5L24.2 17.55C24.5563 17.3245 24.8497 17.0126 25.0531 16.6433C25.2565 16.2739 25.3631 15.8591 25.3631 15.4375C25.3631 15.0159 25.2565 14.6011 25.0531 14.2317C24.8497 13.8624 24.5563 13.5505 24.2 13.325L3.85 0.40001C3.47293 0.156121 3.03701 0.0185269 2.58825 0.00174343C2.13948 -0.0150401 1.69451 0.0896088 1.30026 0.304651C0.90602 0.519692 0.577125 0.837154 0.348275 1.22355C0.119424 1.60994 -0.000896585 2.05093 5.03009e-06 2.50001Z" fill="currentColor"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FeedBackLuModal;