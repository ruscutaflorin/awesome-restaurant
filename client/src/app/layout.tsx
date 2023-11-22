"use client";
import "../app/styles/global.css";
import { inter } from "@/app/ui/typography/fonts";
import { Metadata } from "next";
// import Navbar from "./ui/components/navbar/navbar";
import { usePathname } from "next/navigation";
import { LayoutProvider } from "./login/layout";
import Header from "./ui/components/navbar/header";

// export const metadata: Metadata = {
//   title: {
//     template: "%s | Deliver Ready",
//     default: "Deliver Ready",
//   },
//   description: "The official App Created By RFL si A TA NA SEEEE.",
//   metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
// };
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body className={inter.className}>
        {pathname !== "/login" && <Header />}
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
}
