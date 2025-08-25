import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const IncomeOverview = ({ transactions }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!transactions || transactions.length === 0) return;

    const usableData = transactions.map((item) => ({
      ...item,
      formattedDate: new Date(item.date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short", // Aug, Sep
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

      {/* Line Chart */}
      <div className="w-full h-80">
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="formattedDate" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              //   stroke="#10b981"
              stroke="#6F61E8"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomeOverview;
