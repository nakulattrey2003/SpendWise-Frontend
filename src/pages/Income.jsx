import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUser";
import axiosConfig from "../utils/axiosConfig";
import { toast } from "react-toastify";
import IncomeList from "../components/IncomeList";

const Income = () => {
  useUser();

  const [incomeData, setIncomeData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosConfig.get(
        "/incomes/getAllIncomesForCurrentMonth"
      );
      setIncomeData(response.data);
      console.log("Fetched Income:", response.data);

      setLoading(false);
    } catch (error) {
      toast.error("Error fetching Income");
      console.log("Error fetching Income: ", error);
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  return (
    <div>
      <Dashboard activeMenu="Income"><IncomeList transactions={incomeData} /></Dashboard>
    </div>
  );
};

export default Income;
