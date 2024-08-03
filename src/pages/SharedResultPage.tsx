import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import click from '../assets/sounds/click.mp3';
import minipage_r from '../assets/images/minipage_r.png'
import '../index.css';


const SharedResultPage: React.FC = () => {
    const navigate = useNavigate();
    const { room_id } = useParams<{ room_id: string }>();
    const [resultData, setResultData] = useState<{ result: string; image_url: string; name: string } | null>(null);
    const audio = new Audio(click);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://rumz.site/api/share/results/${room_id}`);
                setResultData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
    }, [room_id]);

    const handleButtonClick = () => {
        audio.play();
        navigate('/');
    };

    return (
        <div className="flex flex-col w-screen h-screen bg-contain" style={{ backgroundImage: `url(${'https://d2skuaswcwq39b.cloudfront.net/baseimage/city.png'})` }}>
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
                    <div className="flex flex-col justify-center items-center 1k:w-[56.5rem] 1k:h-full 2k:w-[59.13rem] 3k:w-[65.81rem] 4k:w-[84.435rem]">
                        <div id="Page" className="flex flex-col items-center justify-center w-[50rem] h-[50rem] bg-cover bg-no-repeat 1k:w-[39.7rem] 1k:h-[39.79rem] 1k:ml-[2rem] 1k:mt-[1rem] 2k:w-[45rem] 2k:h-[45rem] 2k:mt-[1.5rem] 3k:h-[44rem] 3k:w-[44rem] 3k:-mt-[0.1rem] 4k:bg-cover 4k:w-[59rem] 4k:h-[59rem] 4k:mt-[2rem] " style={{ backgroundImage: `url(${minipage_r})` }}>
                            <div className="flex justify-center w-[43rem] h-[35rem] mt-20 mr-5 border-solid border-2 border-black 1k:w-[34.5rem] 1k:h-[29rem] 1k:mt-[4rem] 1k:mr-[1.7rem] 2k:w-[38.5rem] 2k:h-[32rem] 2k:mt-[5rem] 3k:w-[37.3rem] 3k:h-[31.5rem] 4k:w-[49.5rem] 4k:h-[43rem] 4k:mr-[2.5rem] 4k:mt-[6.5rem]">
                                <p className="font-dgm text-[1.625rem] mt-6 mb-6 mr-4 ml-4 1k:text-[1.25rem] 1k:mt-[0.7rem] 1k:mr-[0.7rem] 1k:ml-[0.7rem] 2k:text-[1.4rem] 2k:mr-[0.8rem] 2k:ml-[0.8rem] 2k:mt-[0.8rem] 4k:text-[1.8rem] 4k:mr-[0.9rem] 4k:ml-[0.9rem] 4k:mt-[0.9rem]">
                                    {resultData.result}
                                </p>
                            </div>
                            <div className="mt-7">
                                <button
                                    type="button"
                                    className="bg-no-repeat bg-contain font-dgm text-[1.25rem] text-center w-[19rem] h-[3rem] "
                                    style={{ backgroundImage: `url(${'https://d2skuaswcwq39b.cloudfront.net/baseimage/simulbutton_ui.png'})` }}
                                    onClick={handleButtonClick}
                                    onMouseOver={e => (e.currentTarget.style.backgroundImage = `url(${'https://d2skuaswcwq39b.cloudfront.net/baseimage/simulbutton_ui_p.png'})`)}
                                    onMouseOut={e => (e.currentTarget.style.backgroundImage = `url(${'https://d2skuaswcwq39b.cloudfront.net/baseimage/simulbutton_ui.png'})`)}>
                                    시뮬레이션 하러가기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SharedResultPage;
