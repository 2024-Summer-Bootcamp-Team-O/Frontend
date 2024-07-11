import React from 'react';
import '../index.css'; 
import talkImg from "../assets/images/others/talkImg.png";
import nextIconImg from "../assets/images/icon/nextIcon.png";

const TalkPage: React.FC = () => {
    return(
		<div className="flex flex-col items-center w-screen h-screen bg-cover bg-main_v">
			<div className="flex justify-center items-end w-screen h-[50rem] bg-cover bg-[url('src/assets/images/background/office_m.png')]">
				<img src="src/assets/images/standing/office_nice.png" alt="man" className="w-[37rem] h-[47.125rem]" />
			</div>
            <div className="flex justify-center w-screen h-[19.75rem]">
            <div className="w-[96.125rem] h-[14rem] mt-[3.06rem]" style={{ backgroundImage: `url(${talkImg})`, backgroundSize: 'cover' }}>
                <div className="w-full h-[7.88rem] mt-[1.5rem] ">
                <p className="text-[2.6rem] text-black font-dgm mr-[1.81rem] ml-[1.81rem]">
                    다들 좋은 아침입니다.
                </p>
                </div>
                <div className="flex justify-end w-full h-[4.87rem] mt-[0.3rem]">
                    <img src={nextIconImg} alt="nextIcon" className="w-[2.5rem] h-[2.9rem] mr-[3.28rem]"/>
                </div>
            </div>
            </div>
		</div>
    );
}

export default TalkPage;