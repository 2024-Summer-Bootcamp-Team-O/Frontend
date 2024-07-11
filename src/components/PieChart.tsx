// src/components/PieChart.tsx
import React, { useRef, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions, ChartTypeRegistry } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Filled', 'Unfilled'],
  datasets: [
    {
      data: [75.0, 25.0], // 채워지는 부분과 빈 부분 비율
      backgroundColor: [], // 그라데이션을 추가하기 위해 빈 배열로 설정
      borderColor: [
        'rgba(0, 0, 0, 1)', // 채워지는 부분 경계선 색상 (블랙)
        'rgba(255, 255, 255, 0)', // 빈 부분 경계선 색상 (블랙)
      ],
      borderWidth: 2,
    },
  ],
};

const options: ChartOptions<'pie'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false, // 범례 표시 안함
    },
    tooltip: {
      enabled: false, // 툴팁 비활성화
    },
  },
  animation: {
    animateRotate: true, // 회전 애니메이션 활성화
    duration: 2000, // 애니메이션 지속 시간 (밀리초)
    easing: 'easeInOutQuad', // 애니메이션 이징 함수
  },
};

const PieChart: React.FC = () => {
  const chartRef = useRef<ChartJS<'pie'>>(null);

  useEffect(() => {
    const chartInstance = chartRef.current;
    if (chartInstance) {
      const ctx = chartInstance.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
      gradient.addColorStop(0.1444, '#FFF5BF');
      gradient.addColorStop(0.8494, '#909F32');

      chartInstance.data.datasets[0].backgroundColor = [gradient, 'rgba(255, 255, 255, 0)'];
      chartInstance.update();
    }
  }, []);

  return (
    <div className="flex justify-center items-center w-64 h-64 relative">
      {/* 흰 배경의 원 */}
      <div className="absolute inset-0 flex justify-center items-center bg-white rounded-full border-4 border-black z-10">
        {/* 퍼센테이지가 채워지는 원형 그래프 */}
        <div className="w-full h-full">
          <Pie ref={chartRef} data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default PieChart;
