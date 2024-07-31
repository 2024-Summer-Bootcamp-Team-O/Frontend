import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import html2canvas from "html2canvas";
import '../index.css';
import { shareKakao } from "../utils/shareKakao";
import minipage_r from '../assets/images/minipage_r.png'
import clickSound from '../assets/sounds/click.mp3';

const UserResultPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [resultData, setResultData] = useState(location.state as { result: string; image_url: string; name: string; room_id: number; });
    const audio = new Audio(clickSound);
    
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

    const handleShareButtonClick = async () => {
        audio.play();
        try {
            if (resultData) {
                shareKakao(`https://www.rumz.site/share/`, resultData.room_id);
            } else {
                console.error("Result data is null");
            }
        } catch (error) {
            console.error("Failed to fetch share data:", error);
        }
    };

    const handleHomeButtonClick = () => {
        audio.play();
        navigate('/myPage');
    };

    return (
        <div className="flex flex-col w-screen h-screen bg-contain " style={{ backgroundImage: `url(${'https://d2skuaswcwq39b.cloudfront.net/baseimage/city.png'})` }}>
            {resultData && (
                <div className="flex items-center flex-1 justify-evenly">
                    <div className="flex items-center 1k:w-[42rem] 2k:w-[48.87rem] 3k:w-[54.19rem] 4k:w-[75.565rem] 4k:h-full">
                        <div className="flex flex-col items-center self-start -translate-y-44 ml-28 justify-center rotate-[12.21deg] 1k:ml-[15rem] 2k:ml-[17rem] 3k:ml-[23rem] 4k:ml-[35rem]">
                            <img src={'https://d2skuaswcwq39b.cloudfront.net/baseimage/strap.png'} alt="Strap" className="w-[15rem] h-[30rem] z-10 1k:w-[11rem] 1k:h-[29rem] 2k:w-[13rem] 2k:h-[33.5rem] 3k:w-[14rem] 3k:h-[32rem] 4k:w-[18rem] 4k:h-[37rem]" />
                            <div className="flex flex-col items-center -mt-8 translate-x-6 justify-center w-[23rem] h-[33rem] bg-contain bg-no-repeat 1k:w-[18.26rem] 1k:h-[26.37rem] 2k:w-[20rem] 2k:h-[30em] 3k:w-[21rem] 3k:h-[32rem] 3k:translate-x-7  4k:w-[29rem] 4k:h-[42rem] 4k:bg-cover 4k:translate-x-9 4k:-mt-10" style={{ backgroundImage: `url(${'https://d2skuaswcwq39b.cloudfront.net/baseimage/memberCard_r.png'})` }}>
                                <img src={resultData.image_url} alt="UserImage" className="mr-6 w-[12.23rem] h-[16rem] 1k:w-[9.716rem] 1k:h-[12.693rem] 1k:mt-[0.5rem] 2k:w-[11rem] 2k:h-[14rem] 2k:-mt-[0.3rem] 3k:w-[11.8rem] 3k:h-[15.3rem] 3k:-mt-[0.7rem] 4k:w-[16.9rem] 4k:h-[21rem] 4k:mt-[1.3rem]" />
                                <p className="text-[1.4375rem] tracking-[0.5em] font-dnf 1k:text-[1.3rem] 1k:mr-[0.6rem] 1k:mt-[0.5rem] 2k:text-[1.4rem] 3k:text-[1.5rem] 3k:mt-[0.2rem] 4k:text-[1.7rem] 4k:mt-[0.3rem]">{resultData.name}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col 1k:w-[56.5rem] 1k:h-full 2k:w-[59.13rem] 3k:w-[65.81rem] 4k:w-[84.435rem] ">
                        <div className='flex justify-end'>
                        <button
                            type="button" 
                            className='flex items-center justify-center text-[2.5rem] font-dgm mt-[1.5rem] mb-[1.7rem] mr-[3.0rem] text-black hover:text-[#3735A3] 1k:mr-[4.0rem] 1k:mt-[2.2rem] 1k:text-[1.5rem] 2k:text-[2.0rem] 2k:mr-[3.5rem] 2k:mt-[2.7rem] 3k:text-[2.3rem] 3k:mr-[3.8rem] 3k:mt-[2.85rem] 4k:text-[2.9rem] 4k:mr-[6.63rem] 4k:mt-[4.4rem]'
                            onClick={handleHomeButtonClick}>
                            마이페이지 
                            <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none" className='1k:w-[2.3rem] 1k:h-[2.3rem] 1k:ml-[0.5rem] 1k:mt-[0.4rem] 2k:w-[2.8rem] 2k:h-[2.8rem] 2k:ml-[0.7rem] 2k:mt-[0.4rem] 3k:w-[3.4rem] 3k:h-[3.4rem] 4k:w-[4.0rem] 4k:h-[4.0rem] 4k:mt-[0.5rem]'>
                                <path d="M7.45384 3.72705H33.5447V5.59069H35.4084V7.45432H37.272V33.5452H35.4084V35.4089H33.5447V37.2725H7.45384V35.4089H5.5902V33.5452H3.72656V7.45432H5.5902V5.59069H7.45384V3.72705ZM7.45384 29.818H9.31747V27.9543H13.0447V26.0907H27.9538V27.9543H31.6811V29.818H33.5447V9.31796H31.6811V7.45432H9.31747V9.31796H7.45384V29.818ZM29.8175 33.5452V31.6816H26.0902V29.818H14.9084V31.6816H11.1811V33.5452H29.8175ZM16.772 9.31796H24.2266V11.1816H26.0902V13.0452H27.9538V20.4998H26.0902V22.3634H24.2266V24.2271H16.772V22.3634H14.9084V20.4998H13.0447V13.0452H14.9084V11.1816H16.772V9.31796ZM22.3629 14.9089V13.0452H18.6357V14.9089H16.772V18.6361H18.6357V20.4998H22.3629V18.6361H24.2266V14.9089H22.3629Z" 
                                fill="currentColor"/>
                            </svg>
                        </button>
                        </div>
                        <div id="Page" className="flex flex-col items-center justify-center  w-[50rem] h-[50rem] bg-cover bg-no-repeat 1k:w-[39.7rem] 1k:h-[39.79rem] 1k:ml-[2rem] 1k:mt-[1rem] 2k:w-[45rem] 2k:h-[45rem] 2k:mt-[1.5rem] 3k:h-[44rem] 3k:w-[44rem] 3k:-mt-[0.1rem] 4k:bg-cover 4k:w-[59rem] 4k:h-[59rem] 4k:mt-[2rem]" style={{ backgroundImage: `url(${minipage_r})` }}>
                            <div className="flex justify-center w-[43rem] h-[35rem] mt-20 mr-5 border-solid border-2 border-black 1k:w-[34.5rem] 1k:h-[29rem] 1k:mt-[4rem] 1k:mr-[1.7rem] 2k:w-[38.5rem] 2k:h-[32rem] 2k:mt-[5rem] 3k:w-[37.3rem] 3k:h-[31.5rem] 4k:w-[49.5rem] 4k:h-[43rem] 4k:mr-[2.5rem] 4k:mt-[6.5rem]">
                                <p className="font-dgm mt-6 mb-6 mr-4 ml-4 1k:text-[1.25rem] 1k:mt-[0.7rem] 1k:mr-[0.7rem] 1k:ml-[0.7rem] 2k:text-[1.4rem] 2k:mr-[0.8rem] 2k:ml-[0.8rem] 2k:mt-[0.8rem] 4k:text-[1.8rem] 4k:mr-[0.9rem] 4k:ml-[0.9rem] 4k:mt-[0.9rem]">
                                    {resultData.result}
                                </p>
                            </div>
                            <div className="space-x-10">
                            <button
                                    type="button"
                                    className="bg-contain bg-no-repeat font-dgm text-[1.25rem] text-center w-[9.375rem] h-[3.4375rem] hide-on-capture"
                                    style={{ backgroundImage: `url(${'https://d2skuaswcwq39b.cloudfront.net/baseimage/sharebutton_ui.png'})` }}
                                    onMouseOver={(e) => (e.currentTarget.style.backgroundImage = `url(${'https://d2skuaswcwq39b.cloudfront.net/baseimage/sharebutton_ui_p.png'})`)}
                                    onMouseOut={(e) => (e.currentTarget.style.backgroundImage = `url(${'https://d2skuaswcwq39b.cloudfront.net/baseimage/sharebutton_ui.png'})`)}
                                    onClick={handleShareButtonClick}>
                                    공유하기
                                </button>
                                <button
                                    type="button"
                                    className="bg-contain bg-no-repeat font-dgm text-[1.25rem] text-center w-[9.375rem] h-[3.4375rem] hide-on-capture"
                                    style={{ backgroundImage: `url(${'https://d2skuaswcwq39b.cloudfront.net/baseimage/sharebutton_ui.png'})` }}
                                    onMouseOver={(e) => (e.currentTarget.style.backgroundImage = `url(${'https://d2skuaswcwq39b.cloudfront.net/baseimage/sharebutton_ui_p.png'})`)}
                                    onMouseOut={(e) => (e.currentTarget.style.backgroundImage = `url(${'https://d2skuaswcwq39b.cloudfront.net/baseimage/sharebutton_ui.png'})`)}
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

export default UserResultPage;
