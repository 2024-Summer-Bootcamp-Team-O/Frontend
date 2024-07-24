import React, { useState, useEffect } from "react";
import "../index.css"; // 공통 스타일을 가져옵니다

const CustomCursor: React.FC = () => {
const [coord, setCoord] = useState({ x: 0, y: 0 });

const mouseMove = (e: MouseEvent) => {
    setCoord({ x: e.clientX, y: e.clientY });
    };

useEffect(() => {
    window.addEventListener("mousemove", mouseMove);
    return () => {
    window.removeEventListener("mousemove", mouseMove);
    };
}, []);

return (
    <div className="custom-cursor"
        style={{transform: `translate(${coord.x}px, ${coord.y}px)`,}}/>
    );};

export default CustomCursor;
