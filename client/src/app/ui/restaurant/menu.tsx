// import React from "react";
// import { RestaurantDetailed } from "@/app/types/types";

// const Menu: React.FC<RestaurantDetailed> = (
//   restaurant: RestaurantDetailed
// ): JSX.Element => {
//   return (
//     <section id="menu" className="menu bg-gray-100 py-16">
//       <div className="container mx-auto max-w-6xl" data-aos="fade-up">
//         <div className="text-center">
//           <h2 className="text-3xl font-semibold mb-4">Menu</h2>
//           <p className="text-gray-600">Check Our Tasty Menu</p>
//         </div>
//         <div
//           className="flex justify-center mt-8"
//           data-aos="fade-up"
//           data-aos-delay={100}
//         >
//           <div className="col-span-12 flex justify-center">
//             <ul className="flex">
//               <li className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md mr-2">
//                 All
//               </li>
//               <li className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md mr-2">
//                 Drinks
//               </li>
//               <li className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md mr-2">
//                 Salads
//               </li>
//               <li className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md">
//                 Specialty
//               </li>
//             </ul>
//           </div>
//         </div>
//         <div
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
//           data-aos="fade-up"
//           data-aos-delay={200}
//         >
//           {/* Menu Item 1 */}
//           <div className="menu-item filter-drinks">
//             <img
//               src="assets/img/menu/schweppes-tonic.jpg"
//               className="menu-img w-full h-64 object-cover rounded-md"
//               alt=""
//             />
//             <div className="menu-item-details mt-4">
//               <div className="menu-content">
//                 <a
//                   href="#"
//                   className="text-xl font-semibold text-gray-800 hover:text-blue-500"
//                 >
//                   Schweppes Tonic
//                 </a>
//                 <span className="block text-gray-600">5.0 dt</span>
//               </div>
//             </div>
//           </div>

//           {/* Menu Item 2 */}
//           <div className="menu-item filter-specialty">
//             <img
//               src="assets/img/menu/cleopatra.jfif"
//               className="menu-img w-full h-64 object-cover rounded-md"
//               alt=""
//             />
//             <div className="menu-item-details mt-4">
//               <div className="menu-content">
//                 <a
//                   href="#"
//                   className="text-xl font-semibold text-gray-800 hover:text-blue-500"
//                 >
//                   Cleopatra
//                 </a>
//                 <span className="block text-gray-600">32.0 dt</span>
//               </div>
//               <div className="menu-ingredients">
//                 Fillet Of Sea Bream On A Bed Of Prawns, Shrimps, Mushrooms,
//                 Basil Leaves, Zucchinis
//               </div>
//             </div>
//           </div>

//           {/* Menu Item 3 */}
//           <div className="menu-item filter-drinks">
//             <img
//               src="assets/img/menu/juice.jpeg"
//               className="menu-img w-full h-64 object-cover rounded-md"
//               alt=""
//             />
//             <div className="menu-item-details mt-4">
//               <div className="menu-content">
//                 <a
//                   href="#"
//                   className="text-xl font-semibold text-gray-800 hover:text-blue-500"
//                 >
//                   Fresh Orange Juice
//                 </a>
//                 <span className="block text-gray-600">7.0 dt</span>
//               </div>
//             </div>
//           </div>

//           {/* Add similar divs for other menu items */}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Menu;
import React from "react";
import { RestaurantDetailed } from "@/app/types/types";
import img from "@/../public/assets/screenshot.png";
type MenuProps = {
  restaurant: RestaurantDetailed | null;
};

const Menu: React.FC<MenuProps> = ({ restaurant }): JSX.Element => {
  // Ensure that restaurant and categories are defined
  if (!restaurant || !restaurant.categories) {
    // You might want to add error handling or a loading state here
    return <div>Error: Restaurant data not available</div>;
  }

  // Extract unique categories from restaurant
  const uniqueCategories = Array.from(new Set(restaurant.categories));

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
              {uniqueCategories.map((category) => (
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
          {/* You can render menu items based on the restaurant.categories if needed */}
          {/* For simplicity, I'm just displaying a message here */}
          <div className="menu-item">Menu items will be displayed here</div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
