import config from "../api/apikey";

declare global {
        interface Window {
            Kakao: any;
        }
    }

export const shareKakao = (route: any, room_id: any) => {
    if (window.Kakao) {
        const kakao = window.Kakao;
        if (!kakao.isInitialized()) {
            kakao.init(config.KAKAO_API_KEY); 
        }
        kakao.Link.sendScrap({
            requestUrl: route, 
            templateId: 110283, 
            templateArgs: {
                room_id: room_id,
            },
        });
    }
};