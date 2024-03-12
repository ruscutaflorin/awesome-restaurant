"use client";
import "../app/styles/global.css";
import { inter } from "@/app/ui/typography/fonts";
import { usePathname } from "next/navigation";
import Header from "./ui/components/navbar/header";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
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

  // Check if the route is "/login" or starts with "/restaurants"
  const excludeHeaderRoutes = ["/login", "/restaurants/"];
  const shouldExcludeHeader = excludeHeaderRoutes.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            {!shouldExcludeHeader && <Header />}
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
