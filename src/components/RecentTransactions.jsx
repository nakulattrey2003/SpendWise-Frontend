import React from "react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment/moment";
import { ArrowRight } from "lucide-react";

const RecentTransactions = ({ transactions, onMore }) => {
  return (
    <div className="card bg-white shadow-md rounded-lg p-4 m-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg">Recent Transactions</h4>

        <button
          onClick={onMore}
          className="text-sm text-indigo-600 hover:font-bold"
        >
          View More
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.title}
            amount={item.amount}
            date={moment(item.date).format("Do MMM, YYYY")}
            icon={item.icon}
            type={item.type}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
