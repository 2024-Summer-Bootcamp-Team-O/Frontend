import React from 'react';
import '../index.css'; 

const LLoadingPage: React.FC = () => {
    return(
		<div className="flex items-center justify-center w-screen h-screen bg-cover bg-main_h">
			<div className="flex justify-between w-[70rem] h-[53rem] bg-cover bg-[url('src/assets/images/background/minipage_l.png')]">
				<div>
					<p className="mt-3 ml-6 text-[2.8rem] text-black top-36 left-30 font-dgm">점심이다!</p>
					<img src="src/assets/images/icon/human_icon.png" alt="human" className='w-32 h-32 mt-[5.7rem]'/>
					<img src="src/assets/images/icon/progress.png" alt="progress" className='mt-1 w-7 h-[3.625rem] ml-[0.4rem]'/>
				</div>
				<img src="src/assets/images/icon/food_icon.png" alt="destination" className='w-28 h-28 mr-20 mt-[11.7rem] '/>
			</div>
		</div>
    );
}

export default LLoadingPage;