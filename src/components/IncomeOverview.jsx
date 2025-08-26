import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const IncomeOverview = ({ transactions }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!transactions || transactions.length === 0) return;

    const usableData = transactions.map((item) => ({
      ...item,
      formattedDate: new Date(item.date).toLocaleDateString("en-US", {
        month: "short", // Aug, Sep
        day: "numeric",
        // year: "numeric",
      }),
    }));

    setChartData(usableData);
    console.log(usableData);
  }, [transactions]);

  return (
    <div className="p-6 bg-white rounded-md shadow-xl m-4">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Income Overview</h2>
      <p className="text-sm text-gray-500 mb-6">
        Track your income over time and analyze trends.
      </p>

      {/* Area Chart */}
      <div className="w-full h-80">
        <ResponsiveContainer>
          <AreaChart data={chartData}>
            {/* Gradient Definition */}
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6F61E8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#6F61E8" stopOpacity={0} />
              </linearGradient>
            </defs>

            {/* Chart Elements */}
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="formattedDate" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="amount"
              stroke="#6F61E8"
              fill="url(#incomeGradient)"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomeOverview;
