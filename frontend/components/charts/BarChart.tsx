import { ResponsiveBar } from '@nivo/bar';
import { useEffect, useState } from 'react';
import { Loader } from '../ui/Loader';


const Barchart = () => {

  const [data, setData] = useState<[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [currency, setCurrency] = useState<string>('$');

  const getData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/shared/dashboard/barchart/${localStorage.getItem("id")}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return
      }

      setData(data)

    } catch (error: any) {
      console.error("Error during getting bar chart data:", error);

    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCurrency = localStorage.getItem('currency');
      if (storedCurrency) {
        setCurrency(storedCurrency);
      }
    }
    getData()
  }, [])


  return (
    <>
      {isLoading ?
        <Loader /> :
        <div style={{ height: 400 }}>
          <ResponsiveBar
            data={data}
            keys={['income', 'expense']}
            indexBy="month"
            margin={{ top: 50, right: 20, bottom: 50, left: 60 }}
            padding={0.2}
            innerPadding={3}
            groupMode="grouped"
            colors={({ id }) => id === 'income' ? '#16a34a' : '#dc2626'}  // Green for income, red for expense
            borderRadius={2}
            axisTop={null}
            axisRight={null}
            enableGridX={false}
            enableGridY={false}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Month',
              legendPosition: 'middle',
              legendOffset: 40,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Amount',
              legendPosition: 'middle',
              legendOffset: -50,
            }}
            role="img"
            enableLabel={false}
            tooltip={({ id, value, color }) => (
              <div className="bg-zinc-100 text-black dark:bg-zinc-900 dark:text-white text-xs p-2 rounded-lg">
                <strong>{id}</strong>: {currency}{value}
              </div>
            )}
          />
        </div>
      }
    </>

  )
};

export default Barchart;
