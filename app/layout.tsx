import AdminSidebar from "@/components/AdminSidebar";

import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your App",
  description: "Description here",
};

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="EN" className="">
      <body>{children}</body>
    </html>
  );
}
