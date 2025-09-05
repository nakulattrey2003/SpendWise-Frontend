import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUser";
import axiosConfig from "../utils/axiosConfig";
import { toast } from "react-toastify";
import ExpenseList from "../components/ExpenseList";
import Modal from "../components/Modal";
import { Plus } from "lucide-react";
import AddExpenseForm from "../components/AddExpenseForm";
import DeleteAlert from "../components/DeleteAlert";
import ExpenseOverview from "../components/ExpenseOverview";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Expenses = () => {
  useUser();

  const [expenseData, setExpenseData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchExpenseDetails = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosConfig.get(
        "/expenses/getAllExpensesForCurrentMonth"
      );
      setExpenseData(response.data);

      setLoading(false);
    } catch (error) {
      toast.error("Error fetching Expenses");
      console.log("Error fetching Expenses: ", error);
    }
  };

  const fetchExpenseCategories = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosConfig.get(
        "/categories/getCategoriesByType",
        {
          params: { type: "expense" },
        }
      );
      setCategories(response.data);

      setLoading(false);
      setOpenAddExpenseModel(false);
    } catch (error) {
      toast.error("Error fetching Categories");
      console.log("Error fetching Categories: ", error);
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
    fetchExpenseCategories();
  }, []);

  const handleSubmitExpense = async (expenseData) => {
    const { name, amount, date, icon, categoryId } = expenseData;

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
      const response = await axiosConfig.post("/expenses/addExpense", {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId,
      });

      if (response.status === 201) {
        toast.success("Expense added successfully");
        setOpenAddExpenseModel(false);
        fetchExpenseDetails();
        fetchExpenseCategories();
      }
    } catch (error) {
      toast.error("Error adding Expense");
      console.log("Error adding Expense:", error);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      const response = await axiosConfig.delete(
        `/expenses/deleteExpense/${id}`
      );
      setOpenDeleteAlert({ show: false, data: null });
      if (response.status === 200) {
        toast.success("Expense deleted successfully");
        fetchExpenseDetails();
        setOpenDeleteAlert({ show: false, data: null });
      }
    } catch (error) {
      toast.error("Error deleting Expense");
      console.log("Error deleting Expense:", error);
    }
  };

  const getFormattedDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString("en-CA");
    const time = now.toTimeString().slice(0, 5).replace(":", "-");

    return `${date}_${time}`;
  };

  const handleDownloadExpenseDetailsExcel = async () => {
    try {
      const worksheet = XLSX.utils.json_to_sheet(expenseData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const dataBlob = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });

      const filename = `Expense_Detail_${getFormattedDateTime()}.xlsx`;

      saveAs(dataBlob, filename);
    } catch (error) {
      toast.error("Failed to download Excel file");
      console.error("Failed to download Excel file:", error);
    }
  };

  const handleDownloadExpenseDetailsPDF = async () => {
    try {
      window.print();
    } catch (error) {
      toast.error("Failed to open print dialog");
      console.error("Failed to print page:", error);
    }
  };

  return (
    <div>
      <Dashboard activeMenu="Expense">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold ml-4 mt-5">All Expenses</h2>
          <button
            onClick={() => setOpenAddExpenseModel(true)}
            className="add-btn flex items-center gap-1 pointer bg-purple-100 hover:bg-purple-200 hover:font-semibold text-purple-500 py-3 px-4 rounded-lg text-xs mt-5 mr-4 cursor-pointer shadow-sm"
          >
            <Plus size={15} /> Add Expense
          </button>
        </div>
        <ExpenseOverview transactions={expenseData} />

        <ExpenseList
          transactions={expenseData}
          onDownloadExcel={handleDownloadExpenseDetailsExcel}
          onDownloadPDF={handleDownloadExpenseDetailsPDF}
          onDelete={(id) => {
            setOpenDeleteAlert({ show: true, data: id });
          }}
        />

        {/* Add Expense Modal */}
        <Modal
          isOpen={openAddExpenseModel}
          onClose={() => setOpenAddExpenseModel(false)}
          title="Add Expense"
        >
          <AddExpenseForm
            onAddExpense={handleSubmitExpense}
            categories={categories}
          />
        </Modal>

        {/* Delete Confirmation Modal */}
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
              handleDeleteExpense(openDeleteAlert.data);
            }}
          />
        </Modal>
      </Dashboard>
    </div>
  );
};

export default Expenses;
