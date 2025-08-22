import { Download, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";

const IncomeList = ({ transactions, onDelete }) => {
  return (
    <div className="p-4">
      {transactions.length > 0 ? (
        <div className="bg-white p-10 rounded-md">
          <div className="flex items-center justify-between mb-6">
            {/* Heading */}
            <h2 className="text-md font-bold -mt-4 mb-6 text-purple-900 border-l-4 border-purple-900 rounded-md p-2 px-3 w-fit">
              Income Sources
            </h2>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2 mb-4 text-xs -mt-4">
              <button className="flex items-center gap-1 bg-purple-50 text-purple-900 px-3 py-2 rounded-md hover:bg-purple-100 hover:shadow-md transition-all duration-200 border-1 border-purple-200">
                <Mail size={16} />
                Email
              </button>
              <button className="flex items-center gap-1 bg-purple-50 text-purple-900 px-3 py-2 rounded-md hover:bg-purple-100 hover:shadow-md transition-all duration-200 border-1 border-purple-200">
                <Download size={16} />
                Download
              </button>
            </div>
          </div>

          {/* Income Cards */}
          <div className="grid gap-x-8 gap-y-4 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2">
            {transactions?.map((income) => (
              <div
                key={income.id}
                className="flex items-center justify-between px-4 py-2 rounded-lg hover:bg-purple-50 hover:shadow-md transition-all duration-300"
              >
                <TransactionInfoCard
                  name={income.name}
                  categoryName={income.categoryName}
                  date={moment(income.date).format("Do MMM YYYY")}
                  amount={income.amount}
                  type="income"
                  icon={income.icon}
                  onDelete={() => onDelete(income.id)}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">
          No income sources found
        </p>
      )}
    </div>
  );
};

export default IncomeList;
