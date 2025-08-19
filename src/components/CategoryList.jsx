import { Layers } from "lucide-react";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const CategoryList = ({ categoriesData, onEditCategory, onDeleteCategory }) => {
  return (
    <div className="p-4">
      {categoriesData.length > 0 ? (
        <div className="grid gap-x-5 gap-y-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-white p-10 rounded-md">
          {/* <div className="block w-full">Category</div> */}
          {categoriesData.map((category) => (
            <div
              onClick={() => onEditCategory(category)}
              key={category.id}
              className="flex items-center justify-between p-4 rounded-lg hover:bg-purple-50 hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Left: Icon + Name + Type */}
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 text-purple-700 p-2 rounded-full text-xl">
                  {category.icon != null ? (
                    <span>{category.icon}</span>
                  ) : (
                    <Layers />
                  )}
                  {/* <Layers /> */}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{category.name}</p>
                  <p className="text-sm text-gray-500">{category.type}</p>
                </div>
              </div>

              {/* Right: Action buttons */}
              <div className="grid group relative">
                <button
                  onClick={() => onEditCategory(category)}
                  className="flex items-center gap-1 px-1 py-1 text-purple-900 text-xl opacity-0 bg-purple-50 rounded-full p-4 group-hover:opacity-100 transition duration-200"
                >
                  <MdEdit />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">No categories found</p>
      )}
    </div>
  );
};

export default CategoryList;
