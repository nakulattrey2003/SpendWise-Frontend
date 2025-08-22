// import { Trash2Icon, TrashIcon, TrendingUp, UtensilsCrossed } from "lucide-react";
// import React from "react";

// const TransactionInfoCard = ({
//   icon,
//   name,
//   date,
//   amount,
//   type,
//   hideDeleteButton,
//   onDelete,
// }) => {
//   const getAmountStyles = () =>
//     type === "income" ? "text-green-700" : "text-red-500";

//   return (
//     <div className="w-full flex items-center justify-between gap-4 rounded-md transition-all duration-200 text-xs">
//       {/* Icon */}
//       <div className="bg-purple-100 text-purple-700 p-2 rounded-full text-xl flex items-center justify-center w-10 h-10">
//         {icon ? <span>{icon}</span> : <UtensilsCrossed className="w-5 h-5" />}
//       </div>

//       {/* Name, Date, Category */}
//       <div className="flex-1">
//         <p className="font-medium text-gray-800">{name}</p>
//         <p className="text-xs text-gray-400">{date}</p>
//       </div>

//       {/* Amount */}
//       <div
//         className={`flex items-center gap-1 font-semibold bg-green-50 px-3 py-1 rounded-md text-xs ${getAmountStyles()}`}
//       >
//         {type === "income" ? "+" : "-"}₹{amount}
//         <TrendingUp className="w-4 h-4 ml-1 text-green-700" />
//       </div>

//       {/* Optional Delete Button */}
//       {/* {!hideDeleteButton && onDelete && ( */}
//         <button
//           onClick={onDelete}
//           className="text-gray-200 hover:text-red-700 transition"
//         >
//           <Trash2Icon className="w-5 h-5" />
//         </button>
//       {/* )} */}
//     </div>
//   );
// };

// export default TransactionInfoCard;
import { Trash2Icon, TrendingUp, UtensilsCrossed } from "lucide-react";
import React from "react";

const TransactionInfoCard = ({
  icon,
  name,
  date,
  amount,
  type,
  hideDeleteButton,
  onDelete,
}) => {
  const getAmountStyles = () =>
    type === "income" ? "text-green-700" : "text-red-500";

  return (
    <div className="group w-full flex items-center justify-between gap-4 rounded-md px-4 py-2 hover:bg-purple-50 transition-all duration-200 text-xs">
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
        className={`flex items-center gap-1 font-semibold bg-green-50 px-3 py-2 rounded-md text-xs ${getAmountStyles()}`}
      >
        {type === "income" ? "+" : "-"}  ${amount}
        <TrendingUp className="w-4 h-4 ml-1 text-green-700" />
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
