"use client";
import { useState } from "react";
import { Category } from "@/app/types/types";

interface ModifyCategoryProps {
  categories: Category[];
}

const ModifyCategory: React.FC<ModifyCategoryProps> = ({ categories }) => {
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleSave = () => {
    const newCategory: Category = {
      id: categories.length + 1,
      name: newCategoryName,
      restaurantId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const updatedCategories = [...categories, newCategory];
    setNewCategoryName("");
  };

  const handleDelete = (categoryId: number) => {
    const updatedCategories = categories.filter(
      (category) => category.id !== categoryId
    );
  };

  const handleEdit = (categoryId: number, newName: string) => {
    const updatedCategories = categories.map((category) => {
      if (category.id === categoryId) {
        return { ...category, name: newName };
      }
      return category;
    });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Modify Categories</h2>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Existing Categories</h3>
        <ul className="list-disc pl-5">
          {categories.map((category) => (
            <li key={category.id} className="flex items-center justify-between">
              <span>{category.name}</span>
              <div className="flex space-x-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  onClick={() =>
                    handleEdit(
                      category.id,
                      prompt("Enter new category name", category.name) ||
                        category.name
                    )
                  }
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleDelete(category.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <input
          type="text"
          className="form-input mt-1 block w-full"
          placeholder="Enter category name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
      </div>
      <button
        className="block mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleSave}
      >
        Add Category
      </button>
    </div>
  );
};

export default ModifyCategory;
