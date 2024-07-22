import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../hooks/axiosInstance";
import html2canvas from "html2canvas";
import { useNavigate } from 'react-router-dom';
import '../index.css';
import ResultLoadingModal from "../components/ResultLoadingModal";
import config from "../api/apikey";

const ResultPage: React.FC = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [resultData, setResultData] = useState<{ result: string; image_url: string; name: string } | null>(null);
    const audio = new Audio('src/assets/sounds/click.mp3');
    const isMounted = useRef(false); 

    useEffect(() => {
        if (!isMounted.current) {
            const fetchData = async () => {
                try {
                    const response = await axiosInstance.get('/apps/results');
                    setResultData(response.data);
                    setIsModalOpen(false); 
                } catch (error) {
                    console.error("Failed to fetch data:", error);
                }
            };

            fetchData();
            isMounted.current = true;
        }
    }, []); 

    const saveAsImageHandler = () => {
        const target = document.getElementById('Page');
        const buttons = document.querySelectorAll('.hide-on-capture');
        audio.play();
        if (!target) {
            return alert('결과 저장에 실패했습니다.');
        }

        // 버튼 숨기기
        buttons.forEach(button => button.classList.add('hidden'));

        html2canvas(target).then((canvas) => {
            buttons.forEach(button => button.classList.remove('hidden'));
            const link = document.createElement('a');
            document.body.appendChild(link);
            link.href = canvas.toDataURL('image/png');
            link.download = 'result.png';
            link.click();
            document.body.removeChild(link);
        });
    };

    const handleShareButtonClick = () => {
        audio.play();
        if (window.Kakao) {
            const kakao = window.Kakao;
            if (!kakao.isInitialized()) {
                kakao.init(config.KAKAO_API_KEY);
            }
            kakao.Link.sendScrap({
                requestUrl: 'http://localhost:5173', 
                templateId: 110283, 
            });
        }
    };


    const handleHomeButtonClick = () => {
        audio.play();
        navigate('/myPage');
    };

    return (
        <div className="flex flex-col w-screen h-screen bg-cover bg-[url('src/assets/images/background/city.png')]">
            <div className="flex justify-end p-5">
                <button
                    type="button"
                    className='flex items-center justify-center font-dgm -translate-x-14 translate-y-7 text-[2.2rem] text-white hover:text-[#6D2121] hide-on-capture'
                    onClick={handleHomeButtonClick}>
                    마이페이지
                    <svg xmlns="http://www.w3.org/2000/svg" width="57" height="57" viewBox="0 0 57 57" fill="none" className='ml-5'>
                        <path d="M33.25 4.75H23.75V9.5H19V14.25H14.25V19H9.5V23.75H4.75V28.5H9.5V52.25H26.125V38H30.875V52.25H47.5V28.5H52.25V23.75H47.5V19H42.75V14.25H38V9.5H33.25V4.75ZM33.25 
                        9.5V14.25H38V19H42.75V23.75H47.5V28.5H42.75V47.5H35.625V33.25H21.375V47.5H14.25V28.5H9.5V23.75H14.25V19H19V14.25H23.75V9.5H33.25Z" 
                        fill="currentColor"/>
                    </svg>
                </button>
            </div>
            {isModalOpen && <ResultLoadingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
            {!isModalOpen && resultData && (
                <div className="flex items-center flex-1 justify-evenly">
                    <div className="flex flex-col items-center self-start -translate-y-44 ml-28 justify-center rotate-[12.21deg]">
                        <img src="src/assets/images/others/strap.png" alt="" className="w-[15rem] h-[30rem] z-10" />
                        <div className="flex flex-col items-center -mt-10 translate-x-8 justify-center w-[23rem] h-[33rem] bg-contain bg-no-repeat bg-[url('src/assets/images/others/memberCard_r.png')]">
                            <img src={resultData.image_url} alt="UserImage" className="mr-6 w-[12.23rem] h-[16rem]" />
                            <p className="text-[1.4375rem] tracking-[0.5em] font-dnf mt-2 mr-6">{resultData.name}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <div id="Page" className="flex flex-col items-center justify-center mr-5 w-[50rem] h-[50rem] bg-contain bg-no-repeat bg-[url('src/assets/images/background/minipage_r.png')]">
                            <div className="flex justify-center w-[43rem] h-[35rem] mt-20 mr-5 border-solid border-2 border-black">
                                <p className="font-dgm text-[1.625rem] mt-6 mb-6 mr-4 ml-4">
                                    {resultData.result}
                                </p>
                            </div>
                            <div className="space-x-10 mt-7">
                                <button
                                    type="button"
                                    className="bg-contain bg-no-repeat bg-[url('src/assets/images/others/sharebutton_ui.png')] hover:bg-[url('src/assets/images/others/sharebutton_ui_p.png')] font-dgm text-[1.25rem] text-center w-[9.375rem] h-[3.4375rem] hide-on-capture"
                                    onClick={handleShareButtonClick}>
                                    공유하기
                                </button>
                                <button
                                    type="button"
                                    className="bg-contain bg-no-repeat bg-[url('src/assets/images/others/sharebutton_ui.png')] hover:bg-[url('src/assets/images/others/sharebutton_ui_p.png')] font-dgm text-[1.25rem] text-center w-[9.375rem] h-[3.4375rem] hide-on-capture"
                                    onClick={saveAsImageHandler}>
                                    저장하기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ResultPage;
