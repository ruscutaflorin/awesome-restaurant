"use client";
import React, { useLayoutEffect } from "react";
import AdminNavbar from "../ui/adminPage/overview/navbar";
import { useAuthStore } from "../store/user";
import { useRouter } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const token = useAuthStore((state) => state.token);
  const router = useRouter();

  useLayoutEffect(() => {
    if (token === "") {
      router.push("/login");
    }
  }, []);
  return (
    <div className="flex h-screen  md:flex-row md:overflow-hidden bg-mediumGrey">
      <AdminNavbar />
      <div className="h-screen flex justify-center items-start w-full overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;
