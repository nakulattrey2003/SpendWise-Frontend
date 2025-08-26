import React, { useState } from "react";
import EmojiPickerPopup from "./EmojiPickerPopup";

const AddExpenseForm = ({ onAddExpense, categories }) => {
  const [expense, setExpense] = useState({
    name: "",
    amount: "",
    date: "",
    icon: "",
    categoryId: "",
  });

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddExpense(expense);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 relative">
      {/* Emoji Picker */}
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) =>
          setExpense((prev) => ({ ...prev, icon: selectedIcon }))
        }
      />

      {/* Expense Name */}
      <div>
        <label htmlFor="name" className="block mb-1 font-semibold text-sm">
          Expense Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={expense.name}
          onChange={handleChange}
          placeholder="Enter expense name"
          className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          required
        />
      </div>

      {/* Amount */}
      <div>
        <label htmlFor="amount" className="block mb-1 font-semibold text-sm">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
          placeholder="Enter amount"
          className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          required
        />
      </div>

      {/* Date */}
      <div>
        <label htmlFor="date" className="block mb-1 font-semibold text-sm">
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={expense.date}
          onChange={handleChange}
          className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          required
        />
      </div>

      {/* Category */}
      <div>
        <label
          htmlFor="categoryId"
          className="block mb-1 font-semibold text-sm"
        >
          Category
        </label>
        <select
          name="categoryId"
          id="categoryId"
          value={expense.categoryId}
          onChange={handleChange}
          className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={() => setShowEmojiPicker(false)}
          className="px-3 py-2 rounded bg-gray-300 hover:bg-gray-400 transition text-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={() => setShowEmojiPicker(false)}
          className="px-3 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition text-sm"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
};

export default AddExpenseForm;
