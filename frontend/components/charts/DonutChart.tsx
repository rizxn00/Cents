import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { Unbounded } from 'next/font/google';

const unbounded = Unbounded({ subsets: ['latin'] });

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface DonutChartProps {
  data?: {
    labels: string[];
    values: number[];
  };
}

const expenseData = {
    labels: [
      "Rent/Mortgage", "Property taxes", "Home insurance", "Utilities (electricity, water, gas)",
    ],
    values: Array(4).fill(1), 
  };


const DonutChart: React.FC<DonutChartProps> = ({}) => {
  const chartData = {
    labels: expenseData.labels,
    datasets: [
      {
        label: 'Expense Distribution',
        data: expenseData.values,
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0', '#9966FF', '#FF6384', '#36A2EB',
          
        ],
        borderColor:'transparent',
        spacing: 9, 
        borderRadius: 6,
      },
    ],
  };

  const options = {
    cutout: '30%',
    aspectRatio: 1,        
    plugins: {
      legend: {
        display:true,
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 8, 
          boxHeight: 8, 
          padding: 12,
          // todo font
          font: {
            
        }
          }
      },
      title: {
        display: true,
        text: 'Expense Distribution',
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
};

export default DonutChart;




