import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor,
}) => {
  const colorMap = {
    "bg-purple-700": "#6b21a8",
    "bg-green-700": "#15803d",
    "bg-red-700": "#b91c1c",
  };

  return (
    <div className="w-full h-80 flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={130}
            innerRadius={100}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="amount"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colorMap[colors[index % colors.length]]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `₹ ${value}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {/* Center Label */}
      {showTextAnchor && (
        <div className="absolute text-center">
          <p className="text-lg font-semibold">{label}</p>
          <p className="text-xl font-bold">₹ {totalAmount}</p>
        </div>
      )}
    </div>
  );
};

export default CustomPieChart;
