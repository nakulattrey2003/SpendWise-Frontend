import React from "react";
import moment from "moment";
import TransactionInfoCard from "./TransactionInfoCard";

const Transactions = ({ transactions = [], onMore, type }) => {
  return (
    <div className="card bg-white shadow-md rounded-lg p-4 m-4">
      {/* Heading */}
      <div className="flex items-center justify-between">
        <h4 className="text-lg capitalize">
          {type === "income" ? "Income Transactions" : "Expense Transactions"}
        </h4>

        <button
          onClick={onMore}
          className="text-sm text-indigo-600 hover:font-bold"
        >
          View More
        </button>
      </div>

      {/* List */}
      <div className="mt-6">
        {transactions && transactions.length > 0 ? (
          transactions
            .slice(0, 5)
            .map((txn) => (
              <TransactionInfoCard
                key={txn._id}
                title={txn.category}
                amount={txn.amount}
                date={moment(txn.date).format("Do MMM, YYYY")}
                type={type}
                icon={txn.icon}
                hideDeleteBtn
              />
            ))
        ) : (
          <p className="text-gray-500 text-sm">
            No {type} transactions available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Transactions;
