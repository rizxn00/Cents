import { PieTooltipProps, ResponsivePie } from '@nivo/pie';
import { FC, useEffect, useState } from 'react';
import { Loader } from '../ui/Loader';

const DonutChart: FC = () => {

    const [data, setData] = useState<[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currency, setCurrency] = useState<string>('$');

    const getData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/shared/dashboard/donutchart/${localStorage.getItem("id")}`, {
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

    return (
        <>
            {isLoading ? <Loader /> :
                <div style={{ height: 400, width: '100%' }} className="text-sm text-black dark:text-white">
                    <ResponsivePie
                        data={data}
                        margin={{ top: 100, right: 40, bottom: 100, left: 80 }}
                        innerRadius={0.5}
                        padAngle={0.7}
                        cornerRadius={3}
                        activeOuterRadiusOffset={8}
                        colors={{ scheme: 'accent' }}
                        borderWidth={1}
                        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                        arcLinkLabelsSkipAngle={10}
                        arcLinkLabelsTextColor="currentColor"
                        arcLabelsRadiusOffset={0.6}
                        arcLabelsSkipAngle={10}
                        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                        enableArcLabels={false}
                        fit={false}
                        tooltip={({ datum }: PieTooltipProps<any>) => (
                            <div className="bg-zinc-100 text-black dark:bg-zinc-900 dark:text-white text-xs p-2 rounded-lg">
                                <strong>{datum.id}</strong>: {currency}{datum.value}
                            </div>
                        )}
                        role="img"
                    />
                </div>
            }
        </>
    );
};

export default DonutChart;
