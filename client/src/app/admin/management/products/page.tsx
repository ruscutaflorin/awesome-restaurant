"use client";
import { restaurantCategories, restaurantProducts } from "@/app/api/admin";
import { Category, Product } from "@/app/types/types";
import DisplayProducts from "@/app/ui/adminPage/management/product/DisplayProducts";
import ProductForm from "@/app/ui/adminPage/management/product/ProductForm";
import React, { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await restaurantProducts(1);
        const categories = await restaurantCategories(1);
        setProducts(products);
        setCategories(categories);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="flex flex-row justify-center items-center">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <DisplayProducts products={products} />
          {isFormVisible && (
            <ProductForm
              product={products[0]}
              categories={categories}
              onClose={toggleFormVisibility}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
