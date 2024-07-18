import React from "react";
import { useNavigate } from 'react-router-dom';
import '../index.css';

const ResultPage: React.FC = () => {
    const navigate = useNavigate();
    
    const handleButtonClick = () => {
        const audio = new Audio('src/assets/sounds/click.mp3');
        audio.play();
        navigate('/myPage');
    };

    return (
        <div className="flex flex-col w-screen h-screen bg-cover bg-[url('src/assets/images/background/city.png')]">
            <div className="flex justify-end p-5">
                <button
                    type="button" 
                    className='flex items-center justify-center font-dgm -translate-x-14 translate-y-7 text-[2.2rem] text-white hover:text-[#6D2121]'
                    onClick={handleButtonClick}>
                    마이페이지
                    <svg xmlns="http://www.w3.org/2000/svg" width="57" height="57" viewBox="0 0 57 57" fill="none" className='ml-5'>
                        <path d="M33.25 4.75H23.75V9.5H19V14.25H14.25V19H9.5V23.75H4.75V28.5H9.5V52.25H26.125V38H30.875V52.25H47.5V28.5H52.25V23.75H47.5V19H42.75V14.25H38V9.5H33.25V4.75ZM33.25 
                        9.5V14.25H38V19H42.75V23.75H47.5V28.5H42.75V47.5H35.625V33.25H21.375V47.5H14.25V28.5H9.5V23.75H14.25V19H19V14.25H23.75V9.5H33.25Z" 
                        fill="currentColor"/>
                    </svg>
                </button>
            </div>
            <div className="flex items-center flex-1 justify-evenly">
                <div className="flex flex-col items-center self-start -translate-y-44  ml-28 justify-center rotate-[12.21deg]">
                    <img src="src/assets/images/others/strap.png" alt="" className="w-[15rem] h-[30rem] z-10" />
                    <div className="flex flex-col items-center -mt-10 translate-x-8 justify-center w-[23rem] h-[33rem] bg-contain bg-no-repeat bg-[url('src/assets/images/others/memberCard_r.png')]">
                        <img src="src/assets/images/standing/cha.png" alt="UserImage" className=" mr-6 w-[12.23rem] h-[16rem]" />
                        <p className="text-[1.4375rem] font-dnf mt-2 mr-6"> 차 은 우 </p>
                    </div> 
                </div>
                <div className="flex flex-col items-end">
                    <div className="flex flex-col items-center justify-center mr-5 w-[50rem] h-[50rem] bg-contain bg-no-repeat bg-[url('src/assets/images/background/minipage_r.png')]">
                        <div className="flex justify-center w-[43rem] h-[35rem] mt-20 mr-5 border-solid border-2 border-black">
                            <p className="font-dgm text-[1.625rem] mt-6 mb-6 mr-4 ml-4">
                            피곤하다는 이유로 배달을 시키자는 말씀은 누가 들어도 적절하지 않은 제안입니다. 회사 생활은 선생님 혼자서 하는 것이 아니며, 팀워크가 매우 중요합니다. 모두가 만족할 수 있는 선택을 제안해야 합니다. 선생님 혼자 모든 것을 처리하려고 하지 마시고, 상사의 의견도 묻고, 동료들도 배려하는 마음을 가지셔야 합니다. 그러한 배려가 필요합니다. 그러므로 좀 더 유연하고 배려 깊게 행동하셔야 합니다.
                            결론적으로, 사회 생활에서 중요한 것은 팀워크와 상호 배려입니다. 이를 좀 더 신경 써서 대처하시면 선생님의 직장 생활이 훨씬 원활해질 것입니다. 마음을 가다듬고, 이제, 함께 잘해봅시다.
                            </p>
                        </div>
                        <div className="space-x-10 mt-7">
                            <button 
                                type="button"
                                className="bg-contain bg-no-repeat bg-[url('src/assets/images/others/sharebutton_ui.png')] hover:bg-[url('src/assets/images/others/sharebutton_ui_p.png')] font-dgm text-[1.25rem] text-center w-[9.375rem] h-[3.4375rem]"
                                onClick={handleButtonClick}>
                                공유하기
                            </button>
                            <button 
                                type="button"
                                className="bg-contain bg-no-repeat bg-[url('src/assets/images/others/sharebutton_ui.png')] hover:bg-[url('src/assets/images/others/sharebutton_ui_p.png')] font-dgm text-[1.25rem] text-center w-[9.375rem] h-[3.4375rem]"
                                onClick={handleButtonClick}>
                                저장하기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResultPage;
