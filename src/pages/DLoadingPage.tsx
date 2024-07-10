import React from 'react';
import '../index.css'; 

function DLoadingPage(){
    return(
			<div className="flex items-center justify-center w-screen h-screen bg-cover bg-main_h">
				<div className='flex'>
					<img src="src/assets/images/background/minipage_l.png" alt="page" className='w-[70rem] h-[53rem]'/>
					<span className="absolute ml-6 text-[2.8rem] text-black top-36 left-30 font-dgm">퇴근이다!</span>
					<img src="src/assets/images/icon/human_icon.png" alt="human" className='absolute w-32 h-32 top-[19rem]'/>
					<img src="src/assets/images/icon/home_icon.png" alt="destination" className='absolute w-40 h-36 left-[75rem] top-[18.1rem]'/>
					<img src="src/assets/images/icon/progress.png" alt="progress" className='absolute w-7 h-[3.625rem] ml-[0.4rem] mt-[18.8rem]'/>
				</div>
			</div>
    );
}

export default DLoadingPage;