import React, { useEffect, useState } from 'react'; 
import '../index.css';
import ELoadingImg from "../assets/images/Loading/ELoadingImg.png";
import HumanImg from "../assets/images/Loading/Human.png";
import LoadingPerImg from "../assets/images/Loading/LoadingPer.png";

interface LoadingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ELoadingModal: React.FC<LoadingModalProps> = ({ isOpen, onClose }) => {
    const [animate, setAnimate] = useState(false);
    const [progress, setProgress] = useState(0);
    const [animationComplete, setAnimationComplete] = useState(false);
    
    useEffect(() => {
        if (isOpen) {
            setAnimate(false);
            setProgress(0);
            setAnimationComplete(false);

            let interval = setInterval(() => {
                setProgress(prev => {
                    if (prev < 100) {
                        return prev + 5; // 5초 동안 100까지 증가
                    } else {
                        clearInterval(interval);
                        return 100;
                }
            });
        }, 125); // 5초 동안 진행되도록 설정

        setTimeout(() => {
            setAnimate(true); // 애니메이션 시작
        }, 100); // 리플로우를 보장하기 위한 약간의 지연

        setTimeout(() => {
            setAnimationComplete(true);
        }, 5000); // 4초 후에 애니메이션 완료 설정
    }
}, [isOpen]);

useEffect(() => {
    if (animationComplete && progress === 100) {
        setTimeout(() => {
            onClose();
        }, 500); // 약간의 지연을 추가하여 로딩 완료 후 모달 닫기
    }
}, [animationComplete, progress, onClose]);
        

    if (!isOpen) return null;
    

    return (
        <div className='fixed top-0 left-0 flex flex-col items-center justify-center w-screen h-screen bg-black bg-opacity-70 '>
            <div className='flex flex-col mt-20 w-[57.8rem] h-[43.6rem]' style={{backgroundImage:`url(${ELoadingImg})`, backgroundSize:'cover'}}>
                <div className='flex w-[50rem] h-[6.2rem] mt-[9.00rem] overflow-hidden'>
                    <div className='flex h-full' style={{width:'100%', transition:'transform 4s linear', transform: animate ? 'translateX(calc(100% - 6.2rem))' : 'translateX(0)'}}>
                        <img src={HumanImg} alt='Moving Human' className='h-full'/>
                    </div>
                </div>
                <div className='flex w-[51.2rem] h-[3rem] ml-[4.61rem] mt-[0.19rem] overflow-hidden'>
                    <div className='flex h-full' style={{width:`${progress}%`, transition:'width 3.0s linear', overflow:'hidden'}}>
                        {Array(Math.ceil(51.2/1.43631)).fill(0).map((_,index) => (
                            <img key={index} src={LoadingPerImg} alt='Loading Per' className='h-full' style={{width: '1.43631rem'}}/>
                        ))}
                    </div>
                </div>
            </div>
            <p className="mt-12 text-[2.8125rem] text-white font-dgm">
                다음 에피소드로 이동 중 <span className="dot1">.</span><span className="dot2">.</span><span className="dot3">.</span>
            </p>
        </div>
    );
}

export default ELoadingModal;