import AdminSidebar from "@/components/AdminSidebar";

import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});


export const metadata: Metadata = {
  title: "Site Supervise Admin Dashboard",
  description: "Description here",
};

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="EN" className="poppins.variable">
      <body>{children}</body>
    </html>
  );
}
