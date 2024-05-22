"use client";
import React, { useEffect, useState } from "react";
import CategoryForm from "@/app/ui/adminPage/management/category/CategoryForm";
import { restaurantCategories } from "@/app/api/admin";
import { Category } from "@/app/types/types";
import DisplayCategories from "@/app/ui/adminPage/management/category/DisplayCategories";
import { useAuthStore } from "@/app/store/user";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const restaurantId = useAuthStore((state) => state.user?.restaurantId);
  const token = useAuthStore((state) => state.token);
  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (restaurantId && token) {
          const categories = await restaurantCategories(restaurantId, token);
          setCategories(categories);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <DisplayCategories categories={categories} />
          {isFormVisible && (
            <CategoryForm
              categories={categories}
              onClose={toggleFormVisibility}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Categories;
