"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import AuthWrapper from "@/components/AuthWrapper";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Routes where sidebar should NOT appear
  const hideSidebarRoutes = ["/admin/chat", "/admin/meeting"];

  const hideSidebar = hideSidebarRoutes.some((route) =>
    pathname.startsWith(route),
  );

  return (
    <AuthWrapper>
      <div className="flex h-screen bg-gray-100 overflow-hidden">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {!hideSidebar && (
          <AdminSidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        )}

        <div className="flex-1 flex flex-col h-full w-full overflow-hidden">
          {/* Mobile Header */}
          {!hideSidebar && (
            <header className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between flex-shrink-0">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-1 hover:bg-gray-100 rounded-md"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
              <span className="font-bold text-gray-800">SITE SUPERVISE</span>
              <div className="w-6" /> {/* Spacer for centering if needed */}
            </header>
          )}

          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </AuthWrapper>
  );
}
