import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { SearchIcon } from "lucide-react";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import axiosConfig from "../utils/axiosConfig";
import TransactionInfoCard from "../components/TransactionInfoCard";

const Filter = () => {
  const [type, setType] = useState("income");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("date");

  const [transactions, setTransactions] = useState([]); // Example state to hold filtered data

  // You can add API call or local filtering logic here
  const handleFiltersChange = async (e) => {
    // e.preventDefault();

    try {
      const response = await axiosConfig.post("/filter", {
        type,
        startDate,
        endDate,
        sortOrder,
        search,
      });
      setTransactions(response.data);
      console.log("Filtered data: ", response.data);
    } catch (error) {
      toast.error("Error fetching filtered data");
      console.log("Error fetching filtered data: ", error);
    }
  };

  // Call handleFiltersChange whenever a filter changes
  useEffect(() => {
    handleFiltersChange();
  }, [type, startDate, endDate, sortOrder, search, sortField]);

  return (
    <Dashboard activeMenu="Filters">
      {/* Filter Ribbon */}
      <div className="bg-white px-6 py-4 shadow-md flex flex-wrap gap-5 items-center justify-between m-3 rounded-lg">
        {/* Type Filter */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border border-gray-300 rounded-md p-2 text-sm"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Start Date */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 rounded-md p-2 text-sm"
          />
        </div>

        {/* End Date */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 rounded-md p-2 text-sm"
          />
        </div>

        {/* Sort Field */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2">Sort Field</label>
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            className="border border-gray-300 rounded-md p-2 text-sm"
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
            <option value="name">Name</option>
            {/* Add more fields as needed */}
          </select>
        </div>

        {/* Sort Order */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2">Sort</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 rounded-md p-2 text-sm"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        {/* Search */}
        <div className="flex flex-col flex-1 min-w-[200px] relative">
          <label className="text-sm font-medium mb-2">Search</label>
          <input
            type="text"
            placeholder="Search ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 pr-10 text-sm"
          />
          <FaSearch className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Example filtered data display area */}

      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">Filtered Transactions</h2>
        <div className="bg-white shadow-md rounded-lg m-3">
          {transactions.length > 0 ? (
            <div className="grid gap-x-8 gap-y-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 p-4">
              {transactions.map((txn) => (
                <TransactionInfoCard
                  key={txn._id}
                  name={txn.name}
                  categoryName={txn.categoryName || "Uncategorized"}
                  date={new Date(txn.date).toLocaleDateString()}
                  amount={txn.amount}
                  type={txn.type}
                  icon={txn.icon || "💰"} // Replace with default icon or pass your own logic
                  hideDeleteButton={true}
                  onDelete={() => {}}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-6">
              No transactions found.
            </p>
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default Filter;
