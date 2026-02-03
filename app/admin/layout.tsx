"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import AuthWrapper from "@/components/AuthWrapper";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Routes where sidebar should NOT appear
  const hideSidebarRoutes = [
    "/admin/chat",
    "/admin/meeting",
  ];

  const hideSidebar = hideSidebarRoutes.some(route =>
    pathname.startsWith(route)
  );

  return (
    <AuthWrapper>
      <div className="flex h-screen bg-gray-100">
        {!hideSidebar && <AdminSidebar />}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </AuthWrapper>
  );
}
