import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUser";
import axiosConfig from "../utils/axiosConfig";
import { toast } from "react-toastify";
import IncomeList from "../components/IncomeList";
import Modal from "../components/Modal";
import { Plus } from "lucide-react";
import AddIncomeForm from "../components/AddIncomeForm";
import DeleteAlert from "../components/DeleteAlert";
import IncomeOverview from "../components/IncomeOverview";

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
      // console.log("Fetched Income:", response.data);

      setLoading(false);
    } catch (error) {
      toast.error("Error fetching Income");
      console.log("Error fetching Income: ", error);
    }
  };

  const fetchIncomeCategories = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosConfig.get(
        "/categories/getCategoriesByType",
        {
          params: { type: "income" },
        }
      );
      setCategories(response.data);
      // console.log("Fetched Categories:", response.data);

      setLoading(false);
      // setIsAddCategoryModalOpen(false);
      setOpenAddIncomeModel(false);
    } catch (error) {
      toast.error("Error fetching Categories");
      console.log("Error fetching Categories: ", error);
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
    fetchIncomeCategories();
  }, []);

  const handleSubmitIncome = async (incomeData) => {
    // console.log(incomeData);
    const { name, amount, date, icon, categoryId } = incomeData;

    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Invalid amount");
      return;
    }
    if (!date) {
      toast.error("Date is required");
      return;
    }

    const todayDate = new Date();
    const selectedDate = new Date(date);

    if (todayDate < selectedDate) {
      toast.error("Date cannot be in future");
      return;
    }
    if (!categoryId) {
      toast.error("Category is required");
      return;
    }

    try {
      const reposnse = await axiosConfig.post("/incomes/addIncome", {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId,
      });

      if (reposnse.status === 201) {
        toast.success("Income added successfully");
        setOpenAddIncomeModel(false);
        fetchIncomeDetails();
        fetchIncomeCategories();
      }
      // console.log(reposnse);
    } catch (error) {
      toast.error("Error adding Income");
      console.log("Error adding Income:", error);
    }
  };

  const handleDeleteIncome = async (id) => {
    try {
      const response = await axiosConfig.delete(`/incomes/deleteIncome/${id}`);
      setOpenDeleteAlert({ show: false, data: null });
      if (response.status === 200) {
        toast.success("Income deleted successfully");
        fetchIncomeDetails();
        setOpenDeleteAlert({ show: false, data: null });
      }
    } catch (error) {
      toast.error("Error deleting Income");
      console.log("Error deleting Income:", error);
    }
  };

  return (
    <div>
      <Dashboard activeMenu="Income">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold ml-4 mt-5">All Incomes</h2>
          <button
            onClick={() => setOpenAddIncomeModel(true)}
            className="add-btn flex items-center gap-1 pointer bg-green-100 text-green-500 py-2 px-4 rounded-lg text-xs mt-5 mr-4 cursor-pointer"
          >
            <Plus size={15} /> Add Income
          </button>
        </div>
        <IncomeOverview transactions={incomeData} />

        <IncomeList
          transactions={incomeData}
          onDelete={(id) => {
            setOpenDeleteAlert({ show: true, data: id });
          }}
        />

        {/* Add Income Model  */}
        <Modal
          isOpen={openAddIncomeModel}
          onClose={() => setOpenAddIncomeModel(false)}
          title="Add Income"
        >
          <AddIncomeForm
            onAddIncome={handleSubmitIncome}
            categories={categories}
          />
        </Modal>

        {/* Delete From Model */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => {
            setOpenDeleteAlert({ show: false, data: null });
          }}
          title="Delete Transaction"
        >
          <DeleteAlert
            content={"Are you sure you want to delete this?"}
            onDelete={() => {
              handleDeleteIncome(openDeleteAlert.data);
            }}
          />
        </Modal>
      </Dashboard>
    </div>
  );
};

export default Income;
