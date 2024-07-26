import React, { useEffect, useState } from 'react'; 
import '../index.css';
import FeedBackDuck from "../assets/images/Duck/FeedBackDuck.png";
import FeedBackBubble from "../assets/images/Duck/FeedBackBubble.png";
import { useNavigate } from 'react-router-dom';
import click from '../assets/sounds/click.mp3';

interface FeedBackMoModalProps {
    isOpen: boolean;
    onClose: () => void;
    websocketMessage: string;
}

const FeedBackMoModal: React.FC<FeedBackMoModalProps> = ({ isOpen, onClose, websocketMessage }) => {
    const [showText, setShowText] = useState(false);
    const navigate = useNavigate();

    const handleButtonClick = async() => {
        const audio = new Audio(click);
        audio.play();

        onClose();
        navigate('/lunch');
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
            <div className='flex flex-col w-[42.685rem] h-full justify-end items-center'>
                <img src={FeedBackDuck} alt='FeedBackDuck' className={`w-[35.375rem] h-[46.8125rem] mb-[4.25rem] ml-[10rem] ${isOpen ? 'duck-image' : ''}`}/>
            </div>
            <div className='flex flex-grow flex-col w-[65.31rem] h-full '>
                <div className={`flex flex-col w-[57rem] h-[23.47rem] -ml-[4rem] mt-[6.81rem] items-center justify-center ${isOpen ? 'bubble' : ''}`} style={{background:`url(${FeedBackBubble})`, backgroundSize:'contain', backgroundRepeat: 'no-repeat'}}>
                    {showText && (
                        <p className="ml-7 mr-7 -mt-[4.5rem] mb-3 text-black font-dgm text-[2.3rem]">{websocketMessage}</p>
                    )}
                </div>
                <div className="flex flex-col w-full h-[39.17rem] justify-end items-end">
                    <button className="flex text-white hover:text-[#FFE486] text-[2.625rem] font-dgm mb-[2.75rem] mr-[7.38rem]" onClick={handleButtonClick}>
                        <span>다음 에피소드로 이동 !</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="31" viewBox="0 0 26 31" fill="none" className='ml-[1rem] mt-[1rem]'>
                        <path d="M5.03009e-06 2.50001V28.4C5.03009e-06 30.375 2.175 31.575 3.85 30.5L24.2 17.55C24.5563 17.3245 24.8497 17.0126 25.0531 16.6433C25.2565 16.2739 25.3631 15.8591 25.3631 15.4375C25.3631 15.0159 25.2565 14.6011 25.0531 14.2317C24.8497 13.8624 24.5563 13.5505 24.2 13.325L3.85 0.40001C3.47293 0.156121 3.03701 0.0185269 2.58825 0.00174343C2.13948 -0.0150401 1.69451 0.0896088 1.30026 0.304651C0.90602 0.519692 0.577125 0.837154 0.348275 1.22355C0.119424 1.60994 -0.000896585 2.05093 5.03009e-06 2.50001Z" fill="currentColor"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FeedBackMoModal;