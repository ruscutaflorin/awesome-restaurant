"use client";
import "../app/styles/global.css";
import { Inter as FontSans } from "next/font/google";
import { usePathname } from "next/navigation";
import Header from "./ui/components/navbar/header";
import ToastProvider from "../lib/utils/ToastProvider";
import { cn } from "@/lib/utils";
// export const metadata: Metadata = {
//   title: {
//     template: "%s | Deliver Ready",
//     default: "Deliver Ready",
//   },
//   description: "The official App Created By RFL si A TA NA SEEEE.",
//   metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
// };

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Check if the route is "/login" or starts with "/restaurants"
  const excludeHeaderRoutes = ["/login", "/restaurants/"];
  const shouldExcludeHeader = excludeHeaderRoutes.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ToastProvider>
          {!shouldExcludeHeader && <Header />}
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
