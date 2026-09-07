"use client";

import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminAuthProvider, useAdminAuth } from "@/context/AdminAuthContext";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

function AdminGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated && !isLoginPage) router.replace("/admin/login");
    if (isAuthenticated && isLoginPage) router.replace("/admin");
  }, [isLoading, isAuthenticated, isLoginPage, router]);

  if (isLoading) return null;
  if (isLoginPage) return <>{children}</>;
  if (!isAuthenticated) return null;

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <AdminSidebar />
      <main className="flex-1 bg-surface-alt dark:bg-surface-alt-dark p-4 sm:p-6">{children}</main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminGuard>{children}</AdminGuard>
    </AdminAuthProvider>
  );
}
