import React from "react";
import '../index.css';

const ResultPage: React.FC = () => {
    return (
        <div className="flex items-center justify-evenly w-screen h-screen bg-cover bg-[url('src/assets/images/background/city.png')]">
            <div className="flex flex-col self-start items-center justify-center w-[46rem] h-[68rem] bg-contain bg-no-repeat bg-[url('src/assets/images/others/memberCard_strap.png')]">
                <img src="src/assets/images/others/box.png" alt="UserImage" className="rotate-[12.21deg] w-[17.125rem] h-[22.375rem] mt-40 mr-24" />
                <p className="rotate-[12.21deg] text-[2.25rem] font-dnf mt-2 mr-48"> 박 수 연 </p>
            </div> 
            <div className="flex flex-col items-center justify-center w-[50rem] h-[50rem] bg-contain bg-no-repeat bg-[url('src/assets/images/background/minipage_r.png')]">
                <div className="flex justify-center w-[43rem] h-[35rem] mt-20 bg-[#DCDCDC] border-solid border-2 border-black">
                    <p className="font-dgm text-[1.625rem] mt-6 mb-6 mr-4 ml-4">
                    피곤하다는 이유로 배달을 시키자는 말씀은 누가 들어도 적절하지 않은 제안입니다. 회사 생활은 선생님 혼자서 하는 것이 아니며, 팀워크가 매우 중요합니다. 모두가 만족할 수 있는 선택을 제안해야 합니다. 선생님 혼자 모든 것을 처리하려고 하지 마시고, 상사의 의견도 묻고, 동료들도 배려하는 마음을 가지셔야 합니다. 그러한 배려가 필요합니다. 그러므로 좀 더 유연하고 배려 깊게 행동하셔야 합니다.
                    결론적으로, 사회 생활에서 중요한 것은 팀워크와 상호 배려입니다. 이를 좀 더 신경 써서 대처하시면 선생님의 직장 생활이 훨씬 원활해질 것입니다. 마음을 가다듬고, 이제, 함께 잘해봅시다.
                    </p>
                </div>
                <div className="space-x-10 mt-7">
                    <button className="bg-contain bg-no-repeat bg-[url('src/assets/images/others/sharebutton_ui.png')] active:bg-[url('src/assets/images/others/sharebutton_ui_p.png')] font-dgm text-[1.25rem] text-center w-[9.375rem] h-[3.4375rem]">공유하기</button>
                    <button className="bg-contain bg-no-repeat bg-[url('src/assets/images/others/sharebutton_ui.png')] active:bg-[url('src/assets/images/others/sharebutton_ui_p.png')] font-dgm text-[1.25rem] text-center w-[9.375rem] h-[3.4375rem]">저장하기</button>
                </div>
            </div>
        </div>
    );
}

export default ResultPage;
