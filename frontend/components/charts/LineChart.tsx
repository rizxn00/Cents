// components/LineChart.tsx

import { ResponsiveLine } from '@nivo/line';
import { FC, useEffect, useState } from 'react';
import { Loader } from '../ui/Loader';

interface ExpenseData {
    date: string;
    currentMonthExpense: number;
    lastMonthExpense: number;
}

const LineChart: FC = () => {
    const [data, setData] = useState<ExpenseData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currency, setCurrency] = useState<string>('$');

    const getData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/shared/dashboard/linechart/${localStorage.getItem("id")}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            const data = await response.json();

            if (!response.ok){
                return;
            }

            setData(data);

        } catch (error: any) {
            console.error("Error during getting line chart data:", error);

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

    const getMonthName = (monthOffset: number = 0) => {
        const date = new Date();
        date.setMonth(date.getMonth() - monthOffset);
        return date.toLocaleString('default', { month: 'long' });
    };

    const thisMonthLabel = getMonthName();
    const lastMonthLabel = getMonthName(1);

    return (
        <>
            {isLoading ? <Loader /> :
                <div style={{ height: 400 }}>
                    <ResponsiveLine
                        data={[
                            {
                                id: thisMonthLabel,
                                color: 'hsl(207, 70%, 50%)', 
                                data: data.map((d, index) => ({ x: index + 1, y: d.currentMonthExpense }))
                            },
                            {
                                id: lastMonthLabel,
                                color: 'hsl(30, 70%, 50%)', 
                                data: data.map((d, index) => ({ x: index + 1, y: d.lastMonthExpense }))
                            }
                        ]}
                        margin={{ top: 50, right: 30, bottom: 50, left: 60 }}
                        xScale={{ type: 'linear', min: 1, max: 'auto' }}
                        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 2,
                            tickRotation: 0,
                            legend: 'Expenses in range of 5 days',
                            legendOffset: 28,
                            legendPosition: 'middle',
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Expense Amount',
                            legendOffset: -50,
                            legendPosition: 'middle',
                        }}
                        colors={{ datum: 'color' }}
                        lineWidth={3}
                        pointSize={8}
                        pointColor={{ from: 'color', modifiers: [] }}
                        pointBorderWidth={2}
                        pointBorderColor={{ from: 'color', modifiers: [] }}
                        enableArea={false}
                        enablePoints={true}
                        enableGridX={false}
                        enableGridY={false}
                        useMesh={true}
                        curve="catmullRom"
                        areaOpacity={0.1}
                        legends={[
                            {
                                anchor: 'bottom',
                                direction: 'row',
                                justify: false,
                                translateX: 10,
                                translateY: 50,
                                itemsSpacing: 0,
                                itemDirection: 'left-to-right',
                                itemWidth: 80,
                                itemHeight: 14,
                                itemOpacity: 0.75,
                                symbolSize: 12,
                                symbolShape: 'circle',
                                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                                itemTextColor: 'currentColor',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemBackground: 'rgba(0, 0, 0, .03)',
                                            itemOpacity: 1
                                        }
                                    }
                                ]
                            }
                        ]}
                        tooltip={({ point }) => (
                            <div className="bg-zinc-100 text-black dark:bg-zinc-900 dark:text-white text-xs p-2 rounded-lg">
                                <strong>Expense:</strong> {currency}{point.data.yFormatted}
                            </div>
                        )}
                    />
                </div>
            }
        </>
    )
};

export default LineChart;