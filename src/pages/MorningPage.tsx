import React, { useState, useEffect } from 'react';
import '../index.css';
import CharacterModal from '@components/CharacterModal';

const MorningPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [buttonImage, setButtonImage] = useState('src/assets/images/others/sendbutton_ui.png');

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (inputValue.trim() !== '') {
            setButtonImage('src/assets/images/others/sendbutton_ui_a.png'); 
        } else {
            setButtonImage('src/assets/images/others/sendbutton_ui.png'); 
        }
    }, [inputValue]);

    return (
        <div className="flex items-center justify-center w-screen h-screen bg-cover bg-[url('src/assets/images/background/office_m.png')]">
            {isModalOpen ? (
                <div className="modal-overlay">
                    <div className="modal-container animate-modal">
                        <CharacterModal onClose={closeModal} />
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center self-end justify-center animate-fade-in w-[45rem] h-[61rem] bg-contain bg-no-repeat bg-[url('src/assets/images/standing/nice_m_long.png')]">
                    <div className='translate-y-3/4'>
                        <div className="flex items-center justify-center w-[86.25rem] h-[11.125rem] bg-contain bg-no-repeat bg-[url('src/assets/images/others/script_ui.png')]">
                            <p className="ml-12 mt-4 text-black text-center font-dgm text-[2.562rem]">다들 좋은 아침입니다.</p>
                        </div>
                        <div className="flex -mt-1 justify-between items-center w-[86.25rem] h-[5.4375rem] bg-contain bg-no-repeat bg-[url('src/assets/images/others/input_ui.png')]">
                            <input 
                                type="text" 
                                placeholder="답변을 입력하세요" 
                                className='flex-grow ml-10 text-4xl text-black bg-transparent border-none outline-none font-dgm'
                                value={inputValue} 
                                onChange={(e) => setInputValue(e.target.value)} 
                            />
                            <button className='flex-none'>
                                <img src={buttonImage} alt="button" className='w-12 h-12 mr-9'/>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MorningPage;
