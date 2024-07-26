declare global {
        interface Window {
            Kakao: any;
        }
    }

export const shareKakao = (route: any, room_id: any) => {
    if (window.Kakao) {
        const kakao = window.Kakao;
        if (!kakao.isInitialized()) {
            kakao.init(import.meta.env.VITE_APP_KAKAO_KEY); 
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