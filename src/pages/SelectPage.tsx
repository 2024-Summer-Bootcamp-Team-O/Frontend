import React from 'react';
import '../index.css'; 

function SelectPage(){
    return(
		<div className="flex flex-col items-center justify-start w-screen h-screen bg-cover bg-main_v">
			<div className="flex justify-center items-end w-[108rem] h-[50rem] bg-cover bg-[url('src/assets/images/background/office_m.png')]">
				<img src="src/assets/images/standing/office_nice.png" alt="man" className="w-[37rem] h-[47.125rem]" />
			</div>
			<div className="flex mt-12 space-x-32">
				<div className="flex items-center justify-start w-[44rem] h-24 bg-cover bg-[url('src/assets/images/others/select_a.png')]">
					<p className="ml-7 text-[2.8rem] text-black font-dgm ">A. 누구세요?</p>
				</div>
				<div className="flex items-center justify-start w-[44rem] h-24 bg-cover bg-[url('src/assets/images/others/select_b.png')]">
					<p className="ml-7 text-[2.8rem] text-black font-dgm ">B. 안녕하십니까?</p>
				</div>
			</div>
			<div className="flex mt-10 space-x-32">
				<div className="flex items-center justify-start w-[44rem] h-24 bg-cover bg-[url('src/assets/images/others/select_c.png')]">
						<p className="ml-7 text-[2.8rem] text-black font-dgm ">C. 날씨 안좋은거 안보이세요?</p>
				</div>
				<div className="flex items-center justify-start w-[44rem] h-24 bg-cover bg-[url('src/assets/images/others/select_d.png')]">
						<p className="ml-7 text-[2.8rem] text-black font-dgm ">D. 좋은 아침입니다!</p>
				</div>
			</div>
		</div>
    );
}

export default SelectPage;