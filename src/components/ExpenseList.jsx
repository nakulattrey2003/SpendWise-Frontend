import { Download } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import { MdPictureAsPdf } from "react-icons/md";

const ExpenseList = ({
  transactions = [],
  onDelete,
  onDownloadExcel,
  onDownloadPDF,
}) => {
  return (
    <div className="p-4">
      {transactions.length > 0 ? (
        <div className="bg-white p-10 rounded-md shadow-xl">
          <div className="flex items-center justify-between mb-6">
            {/* Heading */}
            <h2 className="text-md font-bold text-red-900 border-l-4 border-red-900 rounded-md p-2 px-3 w-fit">
              Expense Sources
            </h2>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2 text-xs">
              <button
                aria-label="Download expense list as PDF"
                onClick={onDownloadPDF}
                className="flex items-center gap-1 bg-red-50 text-red-900 px-3 py-2 rounded-md hover:bg-red-100 hover:shadow-md transition-all duration-200 shadow-sm"
              >
                <MdPictureAsPdf size={16} />
                Download PDF
              </button>
              <button
                aria-label="Download expense list as Excel"
                onClick={onDownloadExcel}
                className="flex items-center gap-1 bg-red-50 text-red-900 px-3 py-2 rounded-md hover:bg-red-100 hover:shadow-md transition-all duration-200 shadow-sm"
              >
                <Download size={16} />
                Download Excel
              </button>
            </div>
          </div>

          {/* Expense Cards */}
          <div className="grid gap-x-8 gap-y-4 grid-cols-1 lg:grid-cols-2">
            {transactions.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between px-4 py-2 rounded-lg transition-all duration-300"
              >
                <TransactionInfoCard
                  name={expense.name}
                  categoryName={expense.categoryName}
                  date={new Date(expense.date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                  amount={expense.amount}
                  type="expense"
                  icon={expense.icon}
                  onDelete={() => onDelete(expense.id)}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-md shadow text-center text-gray-500">
          No expense sources found
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
