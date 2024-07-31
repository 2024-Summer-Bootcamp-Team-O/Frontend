import React from 'react';
import '../index.css'; 
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import click from '../assets/sounds/click.mp3';

const cardSImages = [
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/cardS_1.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/cardS_2.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/cardS_3.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/cardS_4.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/cardS_5.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/cardS_6.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/cardS_7.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/cardS_8.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/cardS_1.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/cardS_2.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/cardS_3.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/cardS_4.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/cardS_5.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/cardS_6.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/cardS_7.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/cardS_8.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/cardS_1.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/cardS_2.png',
];

const cardBackImages = [
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/cardB_1.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/cardB_2.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/cardB_3.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/cardB_4.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/cardB_5.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/cardB_6.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/cardB_7.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/cardB_8.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/cardB_1.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/cardB_2.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/cardB_3.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/cardB_4.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/cardB_5.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/cardB_6.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/cardB_7.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/cardB_8.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/cardB_1.png',
    'https://d2skuaswcwq39b.cloudfront.net/baseimage/cardB_2.png',
];

const MainPage: React.FC = () => {
    const navigate = useNavigate();
    const audio = new Audio(click);
    const getRandomCharacterId = () => {
        return Math.floor(Math.random() * 5) + 1; 
    };

    const handleLogOut = async () => {
        const refresh = localStorage.getItem('refresh');
        const access = localStorage.getItem('access');
        audio.play();
        try {
            const response = await axios.post('https://rumz.site/api/users/logout',{
                refresh: refresh, 
                },{
                    headers: {
                        Authorization: `Bearer ${access}`, 
                    },
                }
            );
            if (response.status === 205) {
                console.log('로그아웃 성공:', response.data);
                localStorage.removeItem('refresh');
                localStorage.removeItem('access');
                navigate('/login');
            } else {
                console.error('로그아웃 실패:', response.data);
            }
        } catch (error) {
            console.error('API 요청 에러:', error);
        }
    }

    const handleButtonClick = async () => {
        const randomCharacterId = getRandomCharacterId();
        console.log('랜덤 character_id:', randomCharacterId);
            audio.play();

            sessionStorage.setItem('characterId', randomCharacterId.toString());
            navigate('/morning', { state: { character_id: randomCharacterId } });
        }

    const handleMyButtonClick = async () => {
            audio.play();
            navigate('/myPage')
        }
    return (
        <div className="flex justify-center w-screen h-screen" style={{backgroundImage: `url(${'https://d2skuaswcwq39b.cloudfront.net/baseimage/background_h.png'})`,backgroundSize:'cover'}}>
            <div className="flex w-[108rem] place-content-between 1k:w-[94.5rem] 1k:h-[51.5rem] 2k:w-[108rem] 2k:h-[59.9375rem] 3k:w-[120rem] 3k:h-[57.5625rem] 4k:w-[160rem] 4k:h-[79.4375rem]">
                <div className="flex flex-col justify-end 1k:w-[36rem] 1k:h-[51.5rem] 2k:w-[40.63rem] 2k:h-[59.937rem] 3k:w-[48rem] 3k:h-[57.5625rem] 4k:w-[67.31rem] 4k:h-[79.4375rem]">
                    <div className="1k:pl-[3.06rem] 1k:pb-[2.3rem] 2k:pb-[2.5rem] 2k:pl-[3.5rem] 3k:pb-[1.5rem] 3k:pl-[3.7rem] 4k:pl-[6.06rem]">
                        <button
                            type="button" 
                            className='flex items-center justify-center text-[2rem] font-dgm text-black hover:text-[#3735A3] 1k:text-[1.5rem] 2k:text-[2.0rem] 3k:text-[2.3rem] 4k:text-[2.9rem]'
                            onClick={handleLogOut}>
                            로그아웃
                            <svg xmlns="http://www.w3.org/2000/svg" width="31" height="41" viewBox="0 0 31 41" fill="none" className="ml-3 1k:w-[1.5rem] 1k:h-[2.0rem] 1k:mt-[0.3rem] 2k:w-[2.5rem] 2k:h-[2.5rem] 3k:w-[2.7rem] 3k:h-[2.7rem] 3k:mt-[0.2rem] 4k:w-[3.8rem] 4k:h-[3.8rem] 4k:ml-[1.0rem]">
                                <path d="M0 6.14943V34.8494C0 35.3931 0.217738 35.9145 0.605313 36.299C0.992888 36.6834 1.51855 36.8994 2.06667 36.8994H8.26667V32.7994H4.13333V8.19943H8.26667V4.09943H2.06667C1.51855 4.09943 0.992888 4.31541 0.605313 4.69986C0.217738 5.08431 0 5.60574 0 6.14943ZM29.4335 4.16093L12.9001 0.0609338C12.5955 -0.0144226 12.2776 -0.01996 11.9706 0.0447422C11.6635 0.109444 11.3753 0.242686 11.1279 0.434353C10.8805 0.62602 10.6804 0.871076 10.5427 1.15092C10.405 1.43076 10.3334 1.73804 10.3333 2.04943V38.9494C10.3326 39.2611 10.4037 39.5688 10.5411 39.849C10.6785 40.1293 10.8787 40.3747 11.1263 40.5665C11.3739 40.7583 11.6625 40.8915 11.9699 40.9559C12.2773 41.0203 12.5955 41.0141 12.9001 40.9379L29.4335 36.8379C29.8808 36.7273 30.2779 36.4714 30.5618 36.1111C30.8456 35.7508 30.9999 35.3067 31 34.8494V6.14943C30.9999 5.69215 30.8456 5.24805 30.5618 4.88773C30.2779 4.52742 29.8808 4.27159 29.4335 4.16093ZM20.6667 20.8848C20.6429 21.4127 20.4147 21.911 20.0298 22.2762C19.6448 22.6414 19.1327 22.8452 18.6 22.8452C18.0673 22.8452 17.5552 22.6414 17.1702 22.2762C16.7853 21.911 16.5571 21.4127 16.5333 20.8848V20.112C16.5336 19.5683 16.7516 19.047 17.1394 18.6627C17.5271 18.2784 18.0529 18.0627 18.601 18.063C19.1491 18.0633 19.6747 18.2795 20.0621 18.6642C20.4495 19.0488 20.6669 19.5703 20.6667 20.114V20.8848Z" fill="currentColor"/>
                            </svg>
                        </button>
                    </div>
                    <div className="bg-cover bg-no-repeat 1k:w-[23.56rem] 1k:h-[11rem] 1k:ml-[9rem] 1k:mr-[5.46rem] 1k:pt-[0.9rem] 1k:pl-[0.1rem] 2k:w-[27rem] 2k:h-[12rem] 2k:mb-[0.7rem] 2k:mt-[0.5rem] 2k:mr-[1.0rem] 2k:pt-[1.1rem] 2k:pr-[0.15rem] 3k:w-[25rem] 3k:h-[11.5rem] 3k:-mb-[1.2rem] 3k:ml-[13rem] 3k:pt-[0.8rem] 4k:w-[32rem] 4k:h-[14.72rem] 4k:ml-[24.5rem] 4k:pt-[1.1rem] 4k:mb-[0.01rem]" style={{ backgroundImage: `url(${'https://d2skuaswcwq39b.cloudfront.net/baseimage/DuckBubble.png'})` }}>
                        <p className="text-black text-center font-dgm text-[1.625rem] not-italic font-normal leading-normal tracking-[-0.04875rem] whitespace-pre-line 1k:text-[1.35rem] 2k:text-[1.55rem] 3k:text-[1.5rem] 4k:text-[1.9rem]">
                            나는 MZ요정일세 ! <br />
                            자네는 깨어있는 MZ라고 생각하나? <br />
                            내가 한번 시험해보겠네.
                        </p>
                    </div>
                    <img src={'https://d2skuaswcwq39b.cloudfront.net/baseimage/Duck.png'} alt="duck" className=" 1k:w-[25rem] 1k:h-[32rem] 1k:mb-[1.44rem] 1k:ml-[7rem] 1k:mr-[4.16rem] 2k:w-[29.5rem] 2k:h-[36.5rem] 2k:mb-[1.9rem] 3k:w-[29.5rem] 3k:h-[37rem] 3k:ml-[11.3rem] 4k:w-[39rem] 4k:h-[51.375rem] 4k:ml-[20rem] 4k:mb-[2.5rem]"/>
                </div>

                <div className="flex flex-col w-[70.5rem] 1k:w-[58.5rem] 2k:w-[70.5rem] 3k:w-[72rem] 4k:w-[92.69rem]">
                    <div className='flex justify-end'>
                        <button
                            type="button" 
                            className='flex items-center justify-center text-[2.5rem] font-dgm mt-[1.5rem] mb-[1.7rem] mr-[3.0rem] text-black hover:text-[#3735A3] 1k:mr-[3.0rem] 1k:mt-[2.2rem] 1k:text-[1.5rem] 2k:text-[2.0rem] 2k:mr-[3.5rem] 2k:mt-[2.7rem] 3k:text-[2.3rem] 3k:mr-[3.8rem] 3k:mt-[2.85rem] 4k:text-[2.9rem] 4k:mr-[6.63rem] 4k:mt-[4.4rem]'
                            onClick={handleMyButtonClick}>
                            마이페이지 
                            <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none" className='1k:w-[2.3rem] 1k:h-[2.3rem] 1k:ml-[0.5rem] 1k:mt-[0.4rem] 2k:w-[2.8rem] 2k:h-[2.8rem] 2k:ml-[0.7rem] 2k:mt-[0.4rem] 3k:w-[3.4rem] 3k:h-[3.4rem] 4k:w-[4.0rem] 4k:h-[4.0rem] 4k:mt-[0.5rem]'>
                                <path d="M7.45384 3.72705H33.5447V5.59069H35.4084V7.45432H37.272V33.5452H35.4084V35.4089H33.5447V37.2725H7.45384V35.4089H5.5902V33.5452H3.72656V7.45432H5.5902V5.59069H7.45384V3.72705ZM7.45384 29.818H9.31747V27.9543H13.0447V26.0907H27.9538V27.9543H31.6811V29.818H33.5447V9.31796H31.6811V7.45432H9.31747V9.31796H7.45384V29.818ZM29.8175 33.5452V31.6816H26.0902V29.818H14.9084V31.6816H11.1811V33.5452H29.8175ZM16.772 9.31796H24.2266V11.1816H26.0902V13.0452H27.9538V20.4998H26.0902V22.3634H24.2266V24.2271H16.772V22.3634H14.9084V20.4998H13.0447V13.0452H14.9084V11.1816H16.772V9.31796ZM22.3629 14.9089V13.0452H18.6357V14.9089H16.772V18.6361H18.6357V20.4998H22.3629V18.6361H24.2266V14.9089H22.3629Z" 
                                fill="currentColor"/>
                            </svg>
                        </button>
                    </div>
                    <div className="w-[67.3rem] h-[51.43rem] mr-[3.33rem] 1k:w-[50.5rem] 1k:h-[38.5rem] 1k:mr-[6rem] 2k:w-[59.875rem] 2k:h-[45.7rem] 3k:w-[57.15rem] 3k:h-[43.6rem] 4k:w-[74.7rem] 4k:h-[57rem] 4k:mt-[1.5rem]" style={{ backgroundImage: `url(${'https://d2skuaswcwq39b.cloudfront.net/baseimage/characterPage.png'})`, backgroundSize: 'cover' }}>
                        <div className="w-full 1k:h-[4.02rem] 2k:h-[4.77rem] 3k:h-[4.59rem] 4k:h-[5.95rem]"></div> 
                        <div className="w-[67rem] h-[45.9rem] 1k:w-[50.21rem] 1k:h-[34.5rem] 2k:w-[59.6rem] 2k:h-[41.2rem] 3k:w-[56.8rem] 3k:h-[39.03rem] 4k:w-[74.28rem] 4k:h-[51rem]">
                            <div className="webpage-scrollbar overflow-y-auto h-[34.2rem] pt-[2.5rem] pr-[3.5rem] pl-[3.5rem] grid grid-cols-3 gap-7 1k:h-[34.28rem] 1k:pt-[1.5rem] 1k:pr-[2.0rem] 1k:pl-[2.0rem] 2k:h-[40.6rem] 2k:pt-[2.0rem] 2k:pl-[2.5rem] 2k:pr-[2.7rem] 3k:h-[38.73rem] 3k:pt-[2.3rem] 3k:pl-[2.3rem] 3k:pr-[2.5rem] 4k:h-[50.66rem] 4k:pt-[2.5rem] 4k:pl-[3.0rem] 4k:pr-[3.0rem]">
                                {cardSImages.map((image, index) => (
                                    <div key={index} className="mb-1 flip-card">
                                        <div className="flip-card-inner">
                                            <div className="flip-card-front">
                                                <img src={image} alt={`Card ${index + 1}`} className="object-cover w-full h-full"/>
                                            </div>
                                            <div className="flip-card-back">
                                                <img src={cardBackImages[index]} alt={`Card Back ${index + 1}`} className="object-cover w-full h-full"/>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div> 
                    <div className="flex justify-end">
                        <button
                            type="button" 
                            className='flex items-center justify-center text-[2.5rem] font-dgm mt-[1.5rem] mb-[1.7rem] mr-[3.0rem] text-black hover:text-[#3735A3] 1k:text-[1.9375rem] 1k:mr-[9rem] 2k:text-[1.9375rem] 2k:mr-[10rem] 3k:text-[1.9375rem] 3k:mr-[12rem] 4k:text-[3.0rem] 4k:mr-[10rem] 4k:mt-[2.8rem]'
                            onClick={handleButtonClick}>
                            시뮬레이션 하러 가기 ! 
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="31" viewBox="0 0 26 31" fill="none" className='ml-10 1k:ml-[1.5rem] 1k:w-[1.5rem] 1k:h-[1.5rem] 2k:w-[1.8rem] 2k:h-[1.8rem] 2k:mt-[0.1rem] 3k:w-[2.0rem] 3k:h-[2.0rem] 3k:mt-[0.1rem] 3k:ml-[1.5rem] 4k:w-[2.5rem] 4k:h-[2.5rem]'>
                                <path d="M5.03009e-06 2.50001V28.4C5.03009e-06 30.375 2.175 31.575 3.85 30.5L24.2 17.55C24.5563 17.3245 24.8497 
                                17.0126 25.0531 16.6433C25.2565 16.2739 25.3631 15.8591 25.3631 15.4375C25.3631 15.0159 25.2565 14.6011 25.0531 
                                14.2317C24.8497 13.8624 24.5563 13.5505 24.2 13.325L3.85 0.40001C3.47293 0.156121 3.03701 0.0185269 2.58825 0.00174343C2.13948 
                                -0.0150401 1.69451 0.0896088 1.30026 0.304651C0.90602 0.519692 0.577125 0.837154 0.348275 1.22355C0.119424 1.60994 -0.000896585 2.05093 5.03009e-06 2.50001Z" 
                                fill="currentColor"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
