import React, { useEffect, useState } from "react";
import EmojiPickerPopup from "./EmojiPickerPopup";

const AddCategoryForm = ({ onAddCategory, initialCategoryData, isEditing }) => {
  // Manage entire category as one state object

  // Define your category type options upfront
  const categoryTypeOptions = [
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" }, // fixed typo from "enxense"
  ];

  // Initial state for the category form
  const initialCategoryState = {
    name: "",
    type: "income",
    icon: "", // placeholder, you can add icon logic later
  };

  const [category, setCategory] = useState(initialCategoryState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isEditing && initialCategoryData) {
      setCategory(initialCategoryData);
    } else {
      setCategory({ name: "", type: "income", icon: "" });
    }
  }, [isEditing, initialCategoryData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCategory(category);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Emoji Pcker */}
      <EmojiPickerPopup
        icon={category.icon}
        onSelect={(selectedIcon) =>
          setCategory((prev) => ({ ...prev, icon: selectedIcon }))
        }
      />

      {/* Name */}
      <div>
        <label htmlFor="name" className="block mb-1 font-semibold text-sm">
          Category Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={category.name}
          onChange={handleChange}
          placeholder="Enter category name"
          className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />
      </div>
      {/* Type */}
      <div>
        <label className="block mb-1 font-semibold text-sm">
          Category Type
        </label>
        <select
          name="type"
          value={category.type}
          onChange={handleChange}
          className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          {categoryTypeOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      {/* Buttons */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          // onClick={onCancel}
          className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-950 transition"
          // onClick={handleSubmit}
        >
          {isEditing ? "Update Category" : "Add Category"}
        </button>
      </div>
    </form>
  );
};

export default AddCategoryForm;
