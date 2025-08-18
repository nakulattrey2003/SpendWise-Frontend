// import React from "react";

// const CategoryList = ({
//   categoriesData,
//   qonEditCategory,
//   onDeleteCategory,
// }) => {
//   return (
//     <div>
//       <div>
//         {categoriesData.length > 0 ? (
//           categoriesData.map((category) => (
//             <div key={category.id}>
//               <span>{category.name}</span>
//               <span>{category.type}</span>
//               {/* <button onClick={() => onEditCategory(category)}>Edit</button>
//               <button onClick={() => onDeleteCategory(category.id)}>
//                 Delete
//               </button> */}
//             </div>
//           ))
//         ) : (
//           <p>No categories found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CategoryList;
import { Layers } from "lucide-react";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const CategoryList = ({ categoriesData, onEditCategory, onDeleteCategory }) => {
  return (
    <div className="p-4">
      {categoriesData.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {categoriesData.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between p-4 rounded-lg shadow-md bg-white hover:shadow-lg transition-all duration-300"
            >
              {/* Left: Icon + Name + Type */}
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 text-purple-700 p-2 rounded-full text-lg">
                  <Layers />
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
                  className="flex items-center gap-1 px-1 py-1 rounded-md text-purple-900 text-xl opacity-0 group-hover:opacity-100 transition duration-200"
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
