import { Product, RestaurantDetailed } from "@/app/types/types";
import React from "react";

type MenuProps = {
  restaurant: RestaurantDetailed | null;
};
const Menu: React.FC<MenuProps> = ({ restaurant }): JSX.Element => {
  if (!restaurant) {
    return <div>Error: Restaurant data not available</div>;
  }

  if (!restaurant.categories) {
    return <div>Error: Categories not available for the restaurant</div>;
  }

  return (
    <section id="menu" className="menu bg-gray-100 py-16">
      <div className="container mx-auto max-w-6xl" data-aos="fade-up">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-4">Menu</h2>
          <p className="text-gray-600">Check Our Tasty Menu</p>
        </div>
        <div
          className="flex justify-center mt-8"
          data-aos="fade-up"
          data-aos-delay={100}
        >
          <div className="col-span-12 flex justify-center">
            <ul className="flex">
              <li className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md mr-2">
                All
              </li>
              {restaurant.categories.map((category) => (
                <li
                  key={category.id}
                  className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
          data-aos="fade-up"
          data-aos-delay={200}
        >
          {restaurant.categories.map((category) => (
            <div key={category.id}>
              <h3>{category.name}</h3>
              <ul>
                {category.products.map((product: Product) => (
                  <li key={product.id}>
                    {product.name} - ${product.price}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
