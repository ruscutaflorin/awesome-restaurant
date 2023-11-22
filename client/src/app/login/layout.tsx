"use client";

// Use usePathname for catching route name.
import { usePathname } from "next/navigation";
import { LayoutProps } from "../../../.next/types/app/layout";
import React from "react";

export const LayoutProvider = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  return <>{children}</>;
};
export default LayoutProvider;
