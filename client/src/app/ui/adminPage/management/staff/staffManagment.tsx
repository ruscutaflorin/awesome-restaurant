"use client";
import React, { useState } from "react";
import { StaffUserDetailed } from "@/app/types/types";

interface StaffManagementProps {
  staffUsers: StaffUserDetailed[];
}

const StaffManagement: React.FC<StaffManagementProps> = ({ staffUsers }) => {
  const [selectedStaff, setSelectedStaff] = useState<StaffUserDetailed | null>(
    null
  );

  const handleStaffClick = (staff: StaffUserDetailed) => {
    setSelectedStaff(staff);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Staff Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {staffUsers.map((staff) => (
          <div
            key={staff.id}
            className="border rounded-md p-4 cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
            onClick={() => handleStaffClick(staff)}
          >
            <p className="font-bold">Staff ID: {staff.id}</p>
            <p>Name: {staff.name}</p>
            <p>Role: {staff.role}</p>
          </div>
        ))}
      </div>
      {selectedStaff && (
        <div className="mt-8 p-4 border rounded-md">
          <h2 className="text-xl font-bold mb-2">Selected Staff</h2>
          <p>Staff ID: {selectedStaff.id}</p>
          <p>Name: {selectedStaff.name}</p>
          <p>Role: {selectedStaff.role}</p>
          {/* Add more details or actions here */}
        </div>
      )}
    </div>
  );
};

export default StaffManagement;
