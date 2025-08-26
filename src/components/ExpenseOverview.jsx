import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const ExpenseOverview = ({ transactions }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!transactions || transactions.length === 0) return;

    const usableData = [...transactions]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((item) => ({
        ...item,
        amount: Number(item.amount),
        formattedDate: new Date(item.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
      }));

    setChartData(usableData);
  }, [transactions]);

  if (!transactions || transactions.length === 0) {
    return (
      <div className="p-6 bg-white rounded-md shadow-xl m-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Expense Overview
        </h2>
        <p className="text-sm text-gray-500">No expense data available yet.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-md shadow-xl m-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Expense Overview
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Track your expenses over time and analyze spending patterns.
      </p>

      <div className="w-full h-80">
        <ResponsiveContainer>
          <AreaChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6F61E8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#6F61E8" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="formattedDate" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="amount"
              stroke="#6F61E8"
              fill="url(#expenseGradient)"
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

export default ExpenseOverview;
