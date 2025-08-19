import React from "react";
import { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import { Plus } from "lucide-react";
import CategoryList from "../components/CategoryList";
import { toast } from "react-toastify";
import axiosConfig from "../utils/axiosConfig";
import Modal from "../components/Modal";
import AddCategoryForm from "../components/AddCategoryForm";
import axios from "axios";

const Category = () => {
  const [loading, setLoading] = useState(true);
  const [categoriesData, setCategoriesData] = useState([]);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategoryDetails = async () => {
    setLoading(true);

    try {
      const response = await axiosConfig.get("/categories/getCategories");
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      const data = response.data;
      // console.log("Fetched categories:", data);

      setCategoriesData(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryDetails();
  }, []);

  const handleAddCategory = async (category) => {
    const { name, icon, type } = category;

    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      const response = await axiosConfig.post("/categories/createCategory", {
        name,
        type,
        icon,
      });

      if (response.status <= 200 || response.status >= 300) {
        throw new Error("Network response was not ok");
      }

      const data = response.data;
      toast.success("Category Added Sucessfully");
      console.log("Added categories:", data);
    } catch (error) {
      toast.error("Getting error in adding the item");
      console.log("Getting error in adding the item due to: " + error);
    }

    // console.log(category);
  };

  const handleEditCategory = (categoryToEdit) => {
    setSelectedCategory(categoryToEdit);
    setIsEditCategoryModalOpen(true);
  };

  const handleUpdateCategory = async (updatedCategory) => {
    const { id, name, icon, type } = updatedCategory;

    if (!name.trim()) {
      toast.error("Category Name is required");
      return;
    }
    if (!id) {
      toast.error("Category Id is missing for update");
      return;
    }

    try {
      const response = await axiosConfig.put(`/categories/updateCategory/${id}`, {name, type, icon});
      setIsEditCategoryModalOpen(false);
      setSelectedCategory(null);

      toast.success("Category Updated Successfully");
      fetchCategoryDetails();
    } catch (error) {
      toast.error("Error Updating the field");
      console.log("Error updating the field: ", error)
    }
  };

  return (
    <div>
      <Dashboard activeMenu="Category">
        <div className="my-5 mx-auto">
          {/* Add button to add category */}

          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold ml-4">All Categories</h2>
            <button
              onClick={() => setIsAddCategoryModalOpen(true)}
              className="add-btn flex items-center gap-1 pointer bg-green-100 text-green-500 py-2 px-4 rounded-xl text-sm border-green-200 border-1 cursor-pointer"
            >
              <Plus size={15} /> Add Category
            </button>
          </div>

          {/* Category List */}
          <CategoryList
            categoriesData={categoriesData}
            onEditCategory={handleEditCategory}
          />

          {/* Adding Category Model */}
          <Modal
            title="Add Category"
            isOpen={isAddCategoryModalOpen}
            onClose={() => setIsAddCategoryModalOpen(false)}
          >
            <AddCategoryForm onAddCategory={handleAddCategory} />
          </Modal>

          {/* Updating Category Model */}
          <Modal
            isOpen={isEditCategoryModalOpen}
            title="Update Category"
            onClose={() => {
              setIsEditCategoryModalOpen(false);
              setSelectedCategory(null);
            }}
          >
            <AddCategoryForm
              initialCategoryData={selectedCategory}
              onAddCategory={handleUpdateCategory}
              isEditing={true}
            />
          </Modal>

          {/* Deleting Category Model */}
        </div>
      </Dashboard>
    </div>
  );
};

export default Category;
