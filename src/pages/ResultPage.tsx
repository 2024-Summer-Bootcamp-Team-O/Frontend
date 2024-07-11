import React from "react";
import '../index.css';
import backgroundImg from "../assets/images/background/background_h.png"
import duckImg from "../assets/images/Duck/Duck.png";
import duckBubble from "../assets/images/Duck/DuckBubble.png";
import homeIcon from "../assets/images/icon/homeIcon.png";
import resultPageImg from "../assets/images/background/resultPage.png";
import shareIcon from "../assets/images/icon/shareIcon.png";
import saveIcon from "../assets/images/icon/saveIcon.png";
import PieChart from "../components/PieChart"; 


const ResultPage: React.FC = () => {
    return (
        <div className="h-screen w-screen  flex justify-center" style={{backgroundImage: `url(${backgroundImg})`,backgroundSize:'cover'}}>
            <div className="flex w-[108rem] max-w-[108rem] place-content-between">
                <div className="flex flex-col w-[37.5rem] h-[69.81rem] justify-end ">
                    <div className="w-[28.1rem] h-[13.28rem] ml-[5.7rem] mr-[3.33rem] pt-[1.1rem] pb-[2.16rem]" style={{ backgroundImage: `url(${duckBubble})`, backgroundSize: 'cover' }}>
                        <p className="text-black text-center font-dgm text-[1.625rem] not-italic font-normal leading-normal tracking-[-0.04875rem] whitespace-pre-line">
                            자네의 MZ력을 잘 보았네. <br />
                            이 경험을 통해 앞으로 더 <br />
                            성장하길 바라네.
                        </p>
                    </div>
                    < img src={duckImg} alt="duck" className="w-[34rem] h-[45rem] ml-[1.94rem] mr-[1.94rem] mb-[2.8rem]"/>
                </div>
            

            < div className="flex flex-col  w-[70.5rem]">
                <div className="flex justify-end">
                    <button className="flex items-center text-black text-[2.5rem] font-dgm mt-[3.5rem] mb-[1.7rem] mr-[3.5rem]">
                        <span>마이페이지</span>
                        <img src={homeIcon} alt="homeIcon" className="w-[3.75rem] h-[3.75rem] ml-[1.0rem] mr-2"/>
                    </button>
                </div>
                <div className="w-[67.3rem] h-[51.43rem] mr-[4.3rem] mt-[1.5rem] " style={{ backgroundImage: `url(${resultPageImg})`, backgroundSize: 'cover' }}>
                    {/*상단바 div*/}
                    <div className="w-full h-[5.3125rem]"></div> 
                    {/* 결과 입력 div*/}
                    <div className="flex w-[67rem] h-[45.9rem]">
                        <div className="flex-col w-[23.69rem] h-full">
                            <div className="flex-col w-full h-[10rem] mt-[5.44rem]">
                                <div className="w-full h-[2.75rem]">
                                    <p className="text-black text-center font-dnf text-[2.5rem] not-italic font-normal leading-normal tracking-[-0.04875rem] whitespace-pre-line">
                                        귀염둥이 MZ
                                    </p>
                                </div>
                                <div className="w-full h-[6.19rem] mt-[1rem]">
                                <p className="text-black text-center font-dnf text-[4rem] not-italic font-normal leading-normal tracking-[-0.04875rem] whitespace-pre-line">
                                    75%
                                </p>
                                </div>
                            </div>
                            <div className="flex w-full h-[31.63rem] justify-center mt-[2.5rem] mr-[0.3rem]">
                                <PieChart></PieChart>
                            </div>
                        </div>
                        <div className="flex-col w-[42.94rem] h-full">
                            <div className="flex-col w-[37rem] h-[37.5rem] mt-[2.5rem] mr-[2.19rem] ml-[3.0rem] ">
                                <p className="text-black font-dgm text-[1.75rem] not-italic font-normal leading-normal tracking-[-0.04875rem] whitespace-pre-line">
                                이놈아! 피곤하다고 배달 시키자는 소리는 누가 들어도 정신 나간 소리야.<br/>
                                회사 생활은 너 혼자 하는 게 아니야. 팀워크가 중요해, 알겠니? 
                                모두가 만족할 수 있는 선택을 제안해야지, 네가 뭐 라고 혼자 다 해먹으려고 그래? 
                                상사의 의견도 묻고, 동료들도 생각하고, 그런 배려가 필요해. 그러니까 좀 더 유연하고 배려 깊게 행동해야 돼. <br/>
                                결론적으로, 사회 생활에서 중요한 건 팀워크와 상호 배려야. 그걸 좀 더 신경 써서 대처하면 네 직장 생활이 훨씬 원활해질 거야. 정신 좀 차리고, 다 같이 잘해보자고! 너도 훨씬 더 빛날 거야. <br/>
                                자, 이제 좀 잘해보자, 이놈아!
                                </p>
                            </div>
                            <div className="flex gap-9 w-[42.94rem] h-[6.2rem] justify-center mt-[0.5rem]">
                                <div className="w-[9.4rem] h-[3.55rem]">
                                <button className="flex-row">
                                    <img src={shareIcon} alt="shareIcon" className="w-[9.38rem] h-[3.5rem]"/>
                                </button>
                                </div>
                                <div className="w-[9.4rem] h-[3.55rem]">
                                <button className="flex-row">
                                    <img src={saveIcon} alt="saveIcon" className="w-[9.38rem] h-[3.5rem]"/>
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            <div>
        </div>
        </div>
    </div>
</div>
);
}

export default ResultPage;