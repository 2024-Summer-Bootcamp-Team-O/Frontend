import React, { useState, useCallback, useRef, useEffect } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';

interface CameraModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CameraModal: React.FC<CameraModalProps> = ({ isOpen, onClose }) => {
    const [isCaptureEnable, setCaptureEnable] = useState(false);
    const webcamRef = useRef<Webcam>(null);
    const [url, setUrl] = useState<string | undefined>(undefined);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const navigate = useNavigate();

    const capture = useCallback(() => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            setCaptureEnable(true);
            if (imageSrc) {
                axios.get(imageSrc, { responseType: 'blob' })
                .then(response => {
                    const file = new File([response.data], 'userCapture.jpg', { type: 'image/jpeg' });
                    setImageFile(file); 
                    setUrl(imageSrc);
                })
                .catch(error => console.error("Error in fetching image:", error));
            }
        }   
    }, [webcamRef]);

    const recapture = () => {
        setCaptureEnable(false);
        setImageFile(null);
    };

    const handleConfirm = async () => {
        if (imageFile) {
            const formData = new FormData();
            formData.append('image', imageFile);
            try {
                const token = localStorage.getItem('access');
                const response = await axios.post('http://localhost:8000/apps/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                
                const { message, url } = response.data; 
                if (response.status === 200) {
                    console.log("Image upload successful:", message, url);
                    onClose(); 
                    navigate('/result'); 
                } else {
                    console.error("Image upload failed:", message, url);
                }
            } catch (error) {
                console.error("Error during image upload:", error);
            }
        }
    };
    
    useEffect(() => {
        console.log('Webcam reference:', webcamRef.current);
    }, []);

    if (!isOpen) return null;

    return (
    <div className="fixed top-0 left-0 flex flex-col items-center justify-between w-full h-full bg-black bg-opacity-80">
        <div className="items-center justify-center">
            <img src="src/assets/images/others/strap_s.png" alt="" className="w-[25.75rem] h-[19rem] z-20" />
            <div className="flex items-center justify-center w-[25.75rem] h-[37rem] z-10 -mt-10 bg-contain bg-no-repeat bg-[url('src/assets/images/others/memberCard_s.png')]">
                <div className="flex flex-col items-center mt-28 justify-self-center">
                    <div className="flex items-center w-[14.75rem] h-[21.5625rem]">
                    {isCaptureEnable ? (
                        <img src={url} alt="Captured" className="object-cover w-full h-full rounded-lg" />
                    ) : (
                        <>
                            <Webcam
                                audio={false}
                                mirrored={true}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                className="object-cover w-full h-full rounded-lg"
                                videoConstraints={{ facingMode: "user" }}
                            />
                        </>
                    )}
                    </div>
                    <div className="flex space-x-4 ">
                        {isCaptureEnable ? (
                            <>
                                <button onClick={recapture} className="flex items-center justify-start w-[7.5rem] h-[2.0rem] mt-4 mb-10 bg-[#ECFFD9] hover:bg-[#DEFDFF] rounded-lg text-black border-[2.0px] border-black border-solid font-dgm text-[0.95rem]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 11 11" fill="none" className='ml-3 mr-2 w-[0.9rem]'>
                                        <g clip-path="url(#clip0_755_26)">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.0325 0.0199207C5.98174 -0.0610867 6.93574 0.105862 7.80106 0.504414C8.66638 0.902966 9.41333 1.51945 9.96875 2.29348V1.20311C9.96875 1.06636 10.0231 0.935205 10.1198 0.838506C10.2165 0.741808 10.3476 0.687483 10.4844 0.687483C10.6211 0.687483 10.7523 0.741808 10.849 0.838506C10.9457 0.935205 11 1.06636 11 1.20311V4.12498H8.07812C7.94137 4.12498 7.81022 4.07066 7.71352 3.97396C7.61682 3.87726 7.5625 3.74611 7.5625 3.60936C7.5625 3.47261 7.61682 3.34145 7.71352 3.24476C7.81022 3.14806 7.94137 3.09373 8.07812 3.09373H9.26544C8.79527 2.35804 8.11988 1.7762 7.32271 1.42008C6.52555 1.06395 5.64152 0.94915 4.77983 1.08985C3.91815 1.23055 3.11655 1.62059 2.47407 2.21179C1.83158 2.80299 1.37636 3.56945 1.16463 4.41648C1.14901 4.48302 1.12032 4.54579 1.08022 4.60114C1.04013 4.65649 0.989431 4.70332 0.931077 4.7389C0.872723 4.77448 0.807878 4.7981 0.740312 4.8084C0.672746 4.81869 0.603807 4.81545 0.537505 4.79887C0.471202 4.78228 0.408858 4.75268 0.354099 4.71178C0.29934 4.67088 0.253258 4.61951 0.218532 4.56064C0.183806 4.50177 0.16113 4.43659 0.151822 4.36888C0.142514 4.30117 0.14676 4.23229 0.164312 4.16623C0.442436 3.05415 1.06109 2.05676 1.93379 1.31348C2.8065 0.570205 3.88964 0.118185 5.03181 0.0206082L5.0325 0.0199207ZM2.695 10.2307C3.43199 10.6675 4.26084 10.9261 5.11547 10.9859C5.9701 11.0457 6.82688 10.905 7.61752 10.5751C8.40816 10.2451 9.11078 9.73505 9.66939 9.08549C10.228 8.43593 10.6271 7.66485 10.835 6.83373C10.866 6.70187 10.8438 6.56312 10.7733 6.44747C10.7027 6.33183 10.5896 6.24857 10.4582 6.2157C10.3268 6.18282 10.1877 6.20298 10.071 6.2718C9.95437 6.34062 9.86947 6.45258 9.83469 6.58348C9.62284 7.43034 9.16759 8.1966 8.52517 8.78765C7.88274 9.3787 7.08127 9.76864 6.21973 9.90933C5.35819 10.05 4.47431 9.93529 3.67724 9.57932C2.88016 9.22334 2.20481 8.6417 1.73456 7.90623H2.92188C3.05863 7.90623 3.18978 7.85191 3.28648 7.75521C3.38318 7.65851 3.4375 7.52736 3.4375 7.39061C3.4375 7.25386 3.38318 7.1227 3.28648 7.02601C3.18978 6.92931 3.05863 6.87498 2.92188 6.87498H0V9.79686C0 9.93361 0.0543246 10.0648 0.151023 10.1615C0.247722 10.2582 0.378873 10.3125 0.515625 10.3125C0.652377 10.3125 0.783528 10.2582 0.880227 10.1615C0.976925 10.0648 1.03125 9.93361 1.03125 9.79686V8.70648C1.47454 9.32407 2.04104 9.84305 2.695 10.2307Z" fill="black"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_755_26">
                                            <rect width="11" height="11" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    다시 찍기
                                </button>
                                <button onClick={handleConfirm} className="flex items-center justify-start w-[7.5rem] h-[2.0rem] mt-4 mb-10 bg-[#ECFFD9] hover:bg-[#DEFDFF] rounded-lg text-black border-[2.0px] border-black border-solid font-dgm text-[1.0rem]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 12 12" fill="none" className='ml-3 mr-5 w-[1.1rem]'>
                                        <path d="M1 6.25C1 3.35051 3.35051 1 6.25 1C9.14952 1 11.5 3.35051 11.5 6.25C11.5 9.14952 9.14952 11.5 6.25 11.5C3.35051 11.5 1 9.14952 1 6.25Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M3.91699 6.25016L5.66699 8.00016L8.58366 5.0835" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    확인
                                </button>
                            </>
                        ) : (
                            <button onClick={capture} className="mb-5 -mt-2 group">
                                <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 68 68" fill="none">
                                    <path className="group-hover:fill-[#DEFDFF]" d="M30.0532 48.5158H37.5113C42.749 48.5158 45.3687 48.5158 47.25 47.2823C48.0618 46.7502 48.7609 46.0637 49.3075 45.2617C50.5645 43.4156 50.5645 40.8429 50.5645 35.7008C50.5645 30.5571 50.5645 27.986 49.3075 26.14C48.7609 25.338 48.0618 24.6514 47.25 24.1194C46.0417 23.3256 44.5279 23.042 42.2103 22.9413C41.1044 22.9413 40.1528 22.1189 39.9363 21.0533C39.7709 20.2727 39.341 19.5731 38.7194 19.0729C38.0977 18.5726 37.3224 18.3023 36.5245 18.3077H31.04C29.382 18.3077 27.9538 19.4573 27.6282 21.0533C27.4117 22.1189 26.4602 22.9413 25.3542 22.9413C23.0383 23.042 21.5245 23.3273 20.3145 24.1194C19.5033 24.6515 18.8047 25.3381 18.2587 26.14C17 27.986 17 30.5571 17 35.7008C17 40.8429 17 43.414 18.257 45.2617C18.8007 46.0605 19.4989 46.7469 20.3145 47.2823C22.1958 48.5158 24.8155 48.5158 30.0532 48.5158Z" fill="#ECFFD9" stroke="#373131" stroke-width="1.75"/>
                                    <path d="M45.5298 30.0557H43.8516H45.5298Z" fill="#DEFDFF"/>
                                    <path d="M45.5298 30.0557H43.8516" stroke="#373131" stroke-width="1.75" stroke-linecap="round"/>
                                    <path className="group-hover:fill-[#DEFDFF]" d="M33.7827 40.125C36.5633 40.125 38.8174 37.8709 38.8174 35.0903C38.8174 32.3098 36.5633 30.0557 33.7827 30.0557C31.0021 30.0557 28.748 32.3098 28.748 35.0903C28.748 37.8709 31.0021 40.125 33.7827 40.125Z" fill="#ECFFD9" stroke="#373131" stroke-width="1.75"/>
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
        <p className="text-[2.7rem] text-white font-dgm mb-36">
            여러분의 사원증을 만들어드립니다. 활짝 웃어보세요 !
        </p>
    </div>
    );
};

export default CameraModal;
