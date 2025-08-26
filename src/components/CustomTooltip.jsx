const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const transaction = payload[0].payload;

    return (
      <div className="bg-white border border-gray-200 rounded-md shadow-md p-4 text-sm">
        <p className="text-gray-800 font-bold text-lg">
          {transaction.formattedDate}
        </p>
        <br className="p-2" />
        <p className="text-violet-900 font-semibold">
          <span className="font-semibold text-gray-600 ">Amount:</span> $
          {transaction.amount}
        </p>
        <p className="text-gray-600 ">
          <span className="font-semibold">Name:</span> {transaction.name}
        </p>
        <p className="text-gray-600 ">
          <span className="font-semibold">Category:</span> {transaction.icon}{" "}
          {transaction.categoryName}
        </p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
