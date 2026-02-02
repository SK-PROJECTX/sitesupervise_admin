import AdminSidebar from "@/components/AdminSidebar";
import AuthWrapper from "@/components/AuthWrapper";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthWrapper>
      <div className="flex h-screen bg-gray-100">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </AuthWrapper>
  );
}