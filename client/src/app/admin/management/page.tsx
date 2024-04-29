"use client";
import React, { useEffect } from "react";
import { Restaurant, StaffUserDetailed } from "@/app/types/types";
import StaffForm from "@/app/ui/adminPage/management/restaurant/StaffForm";
import DetailsForm from "../../ui/adminPage/management/restaurant/DetailsForm";
import { restaurantDetails, restaurantStaff } from "@/app/api/admin";
import DisplayStaff from "@/app/ui/adminPage/management/restaurant/DisplayStaff";

const RestaurantDetails = () => {
  const [restaurant, setRestaurant] = React.useState({} as Restaurant);
  const [loading, setLoading] = React.useState(true);
  const [staffUsers, setStaffUsers] = React.useState<StaffUserDetailed[]>([]);
  const [isFormVisible, setIsFormVisible] = React.useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const restaurant = await restaurantDetails(1);
        const staffUsers = await restaurantStaff(1);
        setRestaurant(restaurant);
        setStaffUsers(staffUsers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex justify-center items-center">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex-row">
          <div className="flex-grow">
            <DetailsForm restaurant={restaurant} />
          </div>
          <div className="flex-grow">
            <div className="flex justify-center mb-5">
              {isFormVisible && (
                <StaffForm
                  staffUsers={staffUsers}
                  onClose={toggleFormVisibility}
                />
              )}
            </div>
            <DisplayStaff staff={staffUsers} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetails;
