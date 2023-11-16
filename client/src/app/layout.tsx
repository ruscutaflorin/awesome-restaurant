import "../app/styles/global.css";
import { inter } from "@/app/ui/typography/fonts";
import { Metadata } from "next";
import Navbar from "./ui/components/navbar/navbar";

export const metadata: Metadata = {
  title: {
    template: "%s | Deliver Ready",
    default: "Deliver Ready",
  },
  description: "The official App Created By RFL si A TA NA SEEEE.",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
