import AdminSidebar from "@/components/AdminSidebar";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen ">
      <AdminSidebar />
      <main className="flex-1 bg-adminBg/50 p-6 overflow-y-scroll">
        {children}
      </main>
    </div>
  );
}
