"use client";
import React, { useEffect, useState, useRef } from "react";
import { CircularProgress } from "@mui/material";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

import { CategoryDetailed, RestaurantDetailed } from "@/app/types/types";
import { createOrder, getRestaurant } from "@/app/api/restaurants";
import { useAuthStore } from "@/app/store/user";
import ProductCard from "@/app/ui/restaurant/card-products";
import FloatingCategoryButton from "@/app/ui/restaurant/floating-button";
import CategoryCard from "@/app/ui/restaurantsPage/category-card";
import FloatingCartButton from "@/app/ui/restaurant/floating-cart";
const RestaurantHomePage: React.FC = () => {
  const { push } = useRouter();
  const [restaurant, setRestaurant] = useState<RestaurantDetailed | null>(null);
  const [categories, setCategories] = useState<CategoryDetailed[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const token = useAuthStore((state) => state.token);
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const effect = async () => {
      try {
        const response = await getRestaurant(params.uuid, token);
        setRestaurant(response.data);
        setCategories(
          response.data.categories.filter(
            (category: CategoryDetailed) =>
              category.products && category.products.length > 0
          )
        );
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    effect();
  }, [params.uuid, token, restaurant?.id]);

  const scrollToCategory = (categoryName: string) => {
    const categoryElement = categoryRefs.current[categoryName];
    if (categoryElement) {
      categoryElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const addToCart = (product: any) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const updateCart = (product: any, action: string) => {
    setCart((prevCart) => {
      if (action === "increase") {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else if (action === "decrease") {
        return prevCart
          .map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0);
      }
      return prevCart;
    });
  };

  const calculateTotalPrice = (cartItems: any[]): number => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const onFinishPayment = async () => {
    const restaurantUUID = restaurant?.uuid;
    try {
      if (restaurant?.id) {
        const order = await createOrder(
          restaurant?.id,
          cart,
          calculateTotalPrice(cart),
          "Pending"
        );
        const response = await axios.post("/api/checkout-session", {
          cartItems: cart,
          restaurantUUID,
          restaurantID: restaurant?.id,
          totalAmount: calculateTotalPrice(cart),
          orderId: order.data.id,
        });

        const data = response.data;
        const paymentLink = data.paymentLink;

        if (paymentLink && restaurant?.id) {
          push(paymentLink);
        } else {
          console.error("No payment link provided");
        }
      }
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div className="p-4">
      <FloatingCategoryButton
        categories={categories}
        scrollToCategory={scrollToCategory}
      />
      <FloatingCartButton
        cartItems={cart}
        updateCart={updateCart}
        onFinishPayment={onFinishPayment}
        totalAmount={calculateTotalPrice(cart)}
      />
      <div id="all-categories" className="mt-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="my-4"
            ref={(el) => (categoryRefs.current[category.name] = el)}
          >
            <CategoryCard
              categoryName={category.name}
              itemCount={category.products.length}
            />
            <div className="flex flex-wrap justify-center">
              {category.products.map((product, index) => (
                <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-2">
                  <ProductCard
                    key={product.id}
                    product={product}
                    addToCart={addToCart}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantHomePage;
