// components/DonutChart.tsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

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
      "Maintenance and repairs", "Car payments", "Fuel", "Public transportation",
      "Vehicle maintenance", "Car insurance", "Groceries", "Dining out", "Food delivery",
      "Health insurance", "Prescription medications", "Doctor visits", "Dental care", "Vision care",
      "Clothing", "Personal care (haircuts, cosmetics)", "Gym membership", "Hobbies",
      "Streaming services", "Movies/concerts", "Sports events", "Tuition", "School supplies",
      "Books", "Online courses", "Credit card payments", "Student loan payments",
      "Personal loan payments", "Emergency fund", "Retirement contributions",
      "Investment accounts", "Life insurance", "Disability insurance", "Renters insurance",
      "Charitable contributions", "Birthday/holiday gifts", "Vacations", "Business trips", "Food",
      "Veterinary care", "Grooming", "Phone bill", "Internet service", "Device purchases",
      "Daycare", "Babysitting", "Legal fees", "Accounting services", "Income tax", "Property tax",
      "Sales tax", "Magazines", "Software subscriptions", "Membership fees", "Office supplies",
      "Equipment", "Unexpected expenses", "Fees and fines", "Others",
    ],
    values: Array(63).fill(1), // Example data, replace with actual values
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
          '#FFCE56', '#FF9F40', '#4BC0C0', '#9966FF', '#FF6384', '#36A2EB', '#FFCE56', '#FF9F40',
          '#4BC0C0', '#9966FF', '#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0', '#9966FF',
          '#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0', '#9966FF', '#FF6384', '#36A2EB',
          '#FFCE56', '#FF9F40', '#4BC0C0', '#9966FF', '#FF6384', '#36A2EB', '#FFCE56', '#FF9F40',
          '#4BC0C0', '#9966FF', '#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0', '#9966FF',
          '#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0', '#9966FF', '#FF6384', '#36A2EB',
          '#FFCE56', '#FF9F40', '#4BC0C0', '#9966FF', '#FF6384',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
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




