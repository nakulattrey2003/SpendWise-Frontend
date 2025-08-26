import {
  Trash2Icon,
  TrendingUp,
  TrendingDown,
  UtensilsCrossed,
} from "lucide-react";
import React from "react";

const TransactionInfoCard = ({
  icon,
  name,
  date,
  amount,
  type, // "income" or "expense"
  hideDeleteButton,
  onDelete,
}) => {
  const isIncome = type === "income";

  const amountStyles = isIncome
    ? "text-green-700 bg-green-50"
    : "text-red-600 bg-red-50";

  const AmountIcon = isIncome ? TrendingUp : TrendingDown;

  return (
    <div className="group w-full flex items-center justify-between gap-4 rounded-md px-4 py-2 hover:bg-gray-50 transition-all duration-200 text-xs">
      {/* Icon */}
      <div className="bg-purple-100 text-purple-700 p-2 rounded-full text-xl flex items-center justify-center w-10 h-10">
        {icon ? <span>{icon}</span> : <UtensilsCrossed className="w-5 h-5" />}
      </div>

      {/* Name & Date */}
      <div className="flex-1">
        <p className="font-medium text-gray-800">{name}</p>
        <p className="text-xs text-gray-400">{date}</p>
      </div>

      {/* Amount */}
      <div
        className={`flex items-center gap-1 font-semibold px-3 py-2 rounded-md text-xs ${amountStyles}`}
      >
        {isIncome ? "+" : "-"} ${amount}
        <AmountIcon
          className={`w-4 h-4 ml-1 ${
            isIncome ? "text-green-700" : "text-red-600"
          }`}
        />
      </div>

      {/* Delete Button (only visible on hover) */}
      {!hideDeleteButton && onDelete && (
        <button
          onClick={onDelete}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-600 cursor-pointer"
        >
          <Trash2Icon className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default TransactionInfoCard;
