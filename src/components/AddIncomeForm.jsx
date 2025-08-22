// import EmojiPicker from "emoji-picker-react";
// import React, { useState } from "react";

// const AddIncomeForm = ({ onAddIncome, categories }) => {
//   const [income, setIncome] = useState({
//     name: "",
//     amount: "",
//     date: "",
//     icon: "",
//     categoryId: "",
//   });

//   const handleChange = (key, value) => {
//     setIncome({ ...income, [key]: value });
//   };

//   const categoryOptions = categories.map((category) => ({
//     value: category.id,
//     label: category.name,
//   }));

//   return (
//     <div>
//       <EmojiPicker
//         icon={income.icon}
//         onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
//       />

//       {/* Name */}
//       <div>
//         <label htmlFor="name" className="block mb-1 font-semibold text-sm">
//           Category Name
//         </label>
//         <input
//           type="text"
//           id="name"
//           name="name"
//           value={income.name}
//           onChange={handleChange}
//           placeholder="Enter income name"
//           className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
//           required
//         />
//       </div>
//       {/* Type */}
//       <div>
//         <label className="block mb-1 font-semibold text-sm">
//           Category Type
//         </label>
//         <select
//           name="type"
//           value={income.type}
//           onChange={handleChange}
//           className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
//         >
//           {/* {categoryTypeOptions.map(({ value, label }) => (
//             <option key={value} value={value}>
//               {label}
//             </option>
//           ))} */}
//         </select>
//       </div>
//       {/* Buttons */}
//       <div className="flex justify-end gap-3">
//         <button
//           type="button"
//           // onClick={onCancel}
//           className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-950 transition"
//           // onClick={handleSubmit}
//         >
//           {/* {isEditing ? "Update Category" : "Add Category"} */}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddIncomeForm;

import EmojiPicker from "emoji-picker-react";
import React, { useState } from "react";
import EmojiPickerPopup from "./EmojiPickerPopup";

const AddIncomeForm = ({ onAddIncome, categories }) => {
  const [income, setIncome] = useState({
    name: "",
    amount: "",
    date: "",
    icon: "",
    categoryId: "",
  });

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncome({ ...income, [name]: value });
  };

  const handleIconSelect = (iconData) => {
    console.log("iconData:", iconData);
    setIncome({ ...income, icon: iconData.emoji });
    setShowEmojiPicker(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddIncome(income);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onAddIncome(income);
      }}
      className="space-y-4 relative"
    >
      {/* Emoji Picker */}
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) =>
          setIncome((prev) => ({ ...prev, icon: selectedIcon }))
        }
      />

      {/* Name */}
      <div>
        <label htmlFor="name" className="block mb-1 font-semibold text-sm">
          Income Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={income.name}
          onChange={handleChange}
          placeholder="Enter income name"
          className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
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
          value={income.amount}
          onChange={handleChange}
          placeholder="Enter amount"
          className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
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
          value={income.date}
          onChange={handleChange}
          className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
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
          value={income.categoryId}
          onChange={handleChange}
          className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
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
          className="px-3 py-2 rounded bg-purple-800 text-white hover:bg-purple-950 transition text-sm"
        >
          Add Income
        </button>
      </div>
    </form>
  );
};

export default AddIncomeForm;
