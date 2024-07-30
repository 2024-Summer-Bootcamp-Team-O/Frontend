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
            <div className='flex flex-col 4k:mt-[4rem] 4k:w-[57rem] 4k:h-[43rem]
                3k:mt-[3rem] 3k:w-[45rem] 3k:h-[34rem]
                2k:mt-[2.8rem] 2k:w-[47.4rem] 2k:h-[35.75rem] 
                1k:mt-[2.5rem] 1k:w-[42.5rem] 1k:h-[32rem]' style={{backgroundImage:`url(${ELoadingImg})`, backgroundSize:'cover'}}>
                <div className='flex 4k:w-[49.7rem] 4k:h-[10rem] 4k:mt-[7.2rem]
                3k:w-[40rem] 3k:h-[6.2rem] 3k:mt-[5.7rem]
                2k:w-[41.8rem] 2k:h-[6.2rem] 2k:mt-[6.17rem]  
                1k:w-[38.5rem] 1k:h-[6.2rem] 1k:mt-[5.1rem] overflow-hidden'>
                    <div className='flex h-full' style={{width:'100%', transition:'transform 4s linear', transform: animate ? 'translateX(calc(100% - 6.2rem))' : 'translateX(0)'}}>
                        <img src={HumanImg} alt='Moving Human' className='4k:w-[5.4rem] 4k:h-[5.4rem] 4k:mt-[2.47rem] 3k:w-[4.7rem] 3k:h-[4.7rem] 3k:mt-[1.5rem] 2k:w-[5rem] 2k:h-[5rem] 2k:mt-[1.2rem] 1k:w-[4.5rem] 1k:h-[4.5rem] 1k:mt-[1.6rem]'/>
                    </div>
                </div>
                <div className='flex 4k:w-[50.3rem] 4k:h-[2.93rem] 4k:ml-[4.7rem] 4k:-mt-[2rem]
                3k:w-[39.8rem] 3k:h-[2.3rem] 3k:ml-[3.7rem] 3k:mt-[0.1rem]
                2k:w-[41.8rem] 2k:h-[2.45rem] 2k:ml-[3.9rem] 2k:mt-[0.26rem]
                1k:w-[37.6rem] 1k:h-[2.186rem] 1k:ml-[3.48rem] 1k:mt-[0.01rem] overflow-hidden'>
                    <div className='flex h-full' style={{width:`${progress}%`, transition:'width 3.0s linear', overflow:'hidden'}}>
                        {Array(Math.ceil(51.2/1.43631)).fill(0).map((_,index) => (
                            <img key={index} src={LoadingPerImg} alt='Loading Per' className='h-full w-[1.43631rem] 4k:w-[3rem]'/>
                        ))}
                    </div>
                </div>
            </div>
            <p className="4k:mt-14 4k:text-[2.8rem] 3k:mt-[2.5rem] 3k:text-[2.3rem] 2k:mt-12 2k:text-[2.6rem] 1k:mt-10 1k:text-[2.2rem] text-white font-dgm">
                다음 에피소드로 이동 중 <span className="dot1">.</span><span className="dot2">.</span><span className="dot3">.</span>
            </p>
        </div>
    );
}

export default ELoadingModal;