"use client";
import React, { useEffect, useState } from "react";
import CategoryForm from "@/app/ui/adminPage/management/category/CategoryForm";
import { restaurantCategories } from "@/app/api/admin";
import { Category } from "@/app/types/types";
import DisplayCategories from "@/app/ui/adminPage/management/category/DisplayCategories";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await restaurantCategories(1);
        setCategories(categories);
        setLoading(false);
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
          <CategoryForm categories={categories} />
        </div>
      )}
    </div>
  );
};

export default Categories;
