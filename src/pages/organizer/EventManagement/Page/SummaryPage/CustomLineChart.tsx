import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip, Line, LabelList } from 'recharts';
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '10px' }}>
        <p style={{ color: '#000', fontWeight: 'bold' }}>{payload[0].payload.month}</p>
        <p style={{ color: '#333' }}>Doanh thu: {payload[0].value.toLocaleString()} VND</p>
      </div>
    );
  }
  return null;
};

const CustomLineChart = ({ variants }: { variants: any }) => {
  // Fake Data
  const [monthlyRevenueData, setMonthlyRevenueData] = useState<any[]>([
    { month: '01-2024', revenue: 5000000 },
    { month: '02-2024', revenue: 7000000 },
    { month: '03-2024', revenue: 10000000 },
    { month: '04-2024', revenue: 8000000 },
    { month: '05-2024', revenue: 12000000 },
    { month: '06-2024', revenue: 15000000 },
    { month: '07-2024', revenue: 18000000 },
    { month: '08-2024', revenue: 11000000 },
    { month: '09-2024', revenue: 13000000 },
    { month: '10-2024', revenue: 16000000 },
    { month: '11-2024', revenue: 17000000 },
    { month: '12-2024', revenue: 20000000 },
  ]);
  const [yAxisDomain, setYAxisDomain] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    // Tính toán min và max doanh thu cho Y-axis
    const revenueArray = monthlyRevenueData.map((item) => item.revenue);
    const maxRevenue = Math.max(...revenueArray);

    // Đặt padding cho Y-axis
    const padding = maxRevenue * 0.1;
    const yAxisMin = 0;
    const yAxisMax = maxRevenue + padding;

    setYAxisDomain([yAxisMin, yAxisMax]);
  }, [monthlyRevenueData]);

  return (
    <motion.div
      variants={variants}
      className="h-[450px] w-full rounded-xl p-4 pb-20 dark:text-slate-300 xl:flex-1"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={monthlyRevenueData}>
          {/* Tùy chỉnh trục X */}
          <XAxis
            dataKey="month"
            tick={{ fill: 'white' }}
            tickFormatter={(value) => {
              return value.split('-').reverse().join('/'); // Định dạng từ "Tháng-Năm" thành "Tháng/Năm"
            }}
            axisLine={{ stroke: '#9b4dca', strokeWidth: 2 }} // Màu tím cho trục X
          />
          
          {/* Tùy chỉnh trục Y */}
          <YAxis
            domain={yAxisDomain}
            tickFormatter={(value) => {
              if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
              if (value >= 1e3) return `${(value / 1e3).toFixed(1)}k`;
              return value;
            }}
            tick={{ fill: 'white' }}
            axisLine={{ stroke: '#9b4dca', strokeWidth: 2 }} // Màu tím cho trục Y
          />
          
          <Tooltip content={<CustomTooltip />} />
          
          {/* Biểu đồ đường */}
          <Line type="monotone" dataKey="revenue" stroke="#14b8a6" strokeWidth={3} dot={false}>
            <LabelList
              dataKey="revenue"
              position="top"
              content={({ index = 0, x, y }) => (
                <g transform={`translate(${x},${y})`}>
                </g>
              )}
            />
          </Line>
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default CustomLineChart;
