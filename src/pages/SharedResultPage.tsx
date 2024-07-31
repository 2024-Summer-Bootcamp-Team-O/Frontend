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
        <div className="flex flex-col w-screen h-screen bg-cover" style={{ backgroundImage: `url(${'https://d2skuaswcwq39b.cloudfront.net/baseimage/city.png'})` }}>
            {resultData && (
                <div className="flex items-center flex-1 justify-evenly">
                    <div className="flex flex-col items-center self-start -translate-y-44 ml-28 justify-center rotate-[12.21deg]">
                        <img src={'https://d2skuaswcwq39b.cloudfront.net/baseimage/strap.png'} alt="Strap" className="w-[15rem] h-[30rem] z-10" />
                        <div className="flex flex-col items-center -mt-10 translate-x-8 justify-center w-[23rem] h-[33rem] bg-contain bg-no-repeat" style={{ backgroundImage: `url(${'https://d2skuaswcwq39b.cloudfront.net/baseimage/memberCard_r.png'})` }}>
                            <img src={resultData.image_url} alt="UserImage" className="mr-6 w-[12.23rem] h-[16rem]" />
                            <p className="text-[1.4375rem] tracking-[0.5em] font-dnf mt-2 mr-6">{resultData.name}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <div id="Page" className="flex flex-col items-center justify-center mr-5 w-[50rem] h-[50rem] bg-contain bg-no-repeat" style={{ backgroundImage: `url(${minipage_r})` }}>
                            <div className="flex justify-center w-[43rem] h-[35rem] mt-20 mr-5 border-solid border-2 border-black">
                                <p className="font-dgm text-[1.625rem] mt-6 mb-6 mr-4 ml-4">
                                    {resultData.result}
                                </p>
                            </div>
                            <div className="mt-7">
                                <button
                                    type="button"
                                    className="bg-no-repeat bg-contain font-dgm text-[1.25rem] text-center w-[19rem] h-[3rem]"
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
