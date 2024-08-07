import React, { useEffect, useState } from 'react';
import { ResponsiveHeatMap, TooltipProps } from '@nivo/heatmap';
import { Loader } from '../ui/Loader';

interface ExpenseDataPoint {
  day: number;
  category: string;
  amount: number;
}

interface FormattedDataPoint {
  id: string;
  data: { x: string; y: number }[];
}

const ExpenseHeatMap: React.FC = () => {

  const [data, setData] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currency, setCurrency] = useState<string>('$');

  const getData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/shared/dashboard/heatmapchart/${localStorage.getItem("id")}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return;
      }

      setData(data);

    } catch (error: any) {
      console.error("Error during getting donut chart data:", error);

    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCurrency = localStorage.getItem('currency');
      if (storedCurrency) {
        setCurrency(storedCurrency);
      }
    }
    getData();
  }, []);

  const formatData = (data: ExpenseDataPoint[]): FormattedDataPoint[] => {
    const categories = Array.from(new Set(data.map(d => d.category)));
    const days = Array.from(new Set(data.map(d => d.day))).sort((a, b) => a - b);
    return categories.map(category => ({
      id: category,
      data: days.map(day => {
        const expense = data.find(d => d.category === category && d.day === day);
        return { x: day.toString(), y: expense ? expense.amount : 0 };
      })
    }));
  };

  const formattedData = formatData(data);

  const CustomTooltip: React.FC<TooltipProps<{ x: string; y: number }>> = ({ cell }) => (
    <div className="bg-zinc-100 text-black dark:bg-zinc-900 dark:text-white text-xs p-2 rounded-lg">
      <strong>{cell.serieId}:</strong> {currency}{cell.value} <br />
      <strong>Day:</strong> {cell.data?.x} <br />
    </div>
  );

  return (
    <>
      {isLoading ? <Loader /> :
        <div style={{ height: '400px' }}>
          <ResponsiveHeatMap
            data={formattedData}
            margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
            axisTop={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legendPosition: 'middle',
              legend: 'Day of Month',
              legendOffset: -40
            }}
            borderRadius={0}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Category',
              legendPosition: 'middle',
              legendOffset: 1070
            }}
            colors={{
              type: 'sequential',
              scheme: 'oranges',
            }}
            legends={[
              {
                anchor: 'bottom',
                translateX: 0,
                translateY: 30,
                length: 400,
                thickness: 8,
                direction: 'row',
                tickPosition: 'after',
                tickSize: 3,
                tickSpacing: 4,
                tickOverlap: false,
                title: 'Expense Amount ($) →',
                titleAlign: 'start',
                titleOffset: 4,
              }
            ]}
            tooltip={CustomTooltip}
          />
        </div>
      }
    </>

  );
};

export default ExpenseHeatMap;
