"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  Home,
  Users,
  FolderOpen,
  Settings,
  BarChart3,
  Activity,
  AlertTriangle,
  HelpCircle,
  LogOut,
} from "lucide-react";

interface SidebarChild {
  label: string;
  href: string;
}

interface SidebarItem {
  icon: React.ReactNode;
  href?: string;
  label: string;
  children?: SidebarChild[];
}

const sidebarItems: SidebarItem[] = [
  {
    icon: <Home className="w-5 h-5" />,
    label: "DASHBOARD (Home)",
    href: "/admin",
  },
  {
    icon: <Users className="w-5 h-5" />,
    label: "USER MANAGEMENT",
    children: [
      { label: "User Directory", href: "/admin/user-management" },
      { label: "Role Management", href: "/admin/role-management" },
      { label: "Permission Sets", href: "/admin/permission-sets" },
      { label: "User Analytics", href: "/admin/user-analytics" },
    ],
  },
  {
    icon: <FolderOpen className="w-5 h-5" />,
    label: "PROJECT MANAGEMENT",
    children: [
      {
        label: "Project Analytics",
        href: "/admin/project-management/#analytics",
      },
      { label: "Active Directory", href: "/admin/project-management/#active" },
      { label: "Project Archive", href: "/admin/project-management/#archive" },
      {
        label: "Project Templates",
        href: "/admin/project-management/#templates",
      },
    ],
  },
  {
    icon: <Settings className="w-5 h-5" />,
    label: "SYSTEM SETTINGS",
    children: [
      { label: "General Settings", href: "/admin/settings/#general" },
      { label: "API & Integrations", href: "/admin/settings/#integrations" },
      {
        label: "Security & Compliance",
        href: "/admin/settings/#security-compliance",
      },
      { label: "Module Configuration", href: "/admin/settings/#module-config" },
    ],
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    label: "ANALYTICS & REPORTS",
    children: [
      { label: "Platform Usage", href: "/admin/analytics/#platform-usage" },
      { label: "Billing & Revenue", href: "/admin/billing" },
      {
        label: "Performance Metrics",
        href: "/admin/analytics/#performance-metrics",
      },
      { label: "Custom Reports", href: "/admin/analytics/#custom-reports" },
    ],
  },
  {
    icon: <Activity className="w-5 h-5" />,
    label: "SYSTEM HEALTH",
    children: [
      { label: "Health Monitor", href: "/admin/health/monitor" },
      { label: "Service Status", href: "/admin/health/service-status" },
      {
        label: "Database Management",
        href: "/admin/health/database-management",
      },
      { label: "Backup & Restore", href: "/admin/health/backup-restore" },
    ],
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    label: "ALERT CENTER",
    children: [
      { label: "Active Alerts", href: "/admin/alerts/active" },
      { label: "Alert Rules", href: "/admin/alerts/rules" },
      {
        label: "Notification Settings",
        href: "/admin/alerts/notification-settings",
      },
      { label: "Alert Analytics", href: "/admin/alerts/analytics" },
    ],
  },
];

export default function AdminSidebar() {
  // Start with all sections expanded to match the image
  const initialExpanded = sidebarItems.map((i) => i.label);
  const [expandedItems, setExpandedItems] = useState<string[]>(initialExpanded);

  const pathname = usePathname();

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );
  };

  const isParentActive = (item: SidebarItem) => {
    if (!item.children) return pathname === "/admin" || pathname === "/";
    return item.children.some(
      (c) => pathname === c.href || pathname.startsWith(c.href + "/"),
    );
  };

  return (
    <div className="w-72 bg-[#0f172a] text-white flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          {/* Placeholder for logo - replace src with actual logo path */}
          <img
            src="/favicon.ico"
            alt="Site Supervise"
            className="w-8 h-8 mr-4"
          />

          <div>
            <div className="font-bold text-lg">SITE SUPERVISE</div>
            <div className="text-xs text-gray-400">SUPER ADMIN DASHBOARD</div>
          </div>
        </div>
      </div>

      {/* Main Menu */}
      <div className="flex-1 overflow-y-auto py-4">
        <div className="px-4">
          <div className="text-xs uppercase text-gray-400 mb-4 tracking-wider">
            Main Menu
          </div>
          {sidebarItems.map((item) => (
            <div key={item.label} className="mb-1">
              <button
                onClick={() => item.children && toggleExpanded(item.label)}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-colors ${
                  isParentActive(item) ? "bg-gray-700" : "hover:bg-gray-700/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  {item.href ? (
                    <Link href={item.href}>
                      <span>{item.label}</span>
                    </Link>
                  ) : (
                    <span>{item.label}</span>
                  )}
                </div>
                {item.children && (
                  <>
                    {expandedItems.includes(item.label) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </>
                )}
              </button>

              {item.children && expandedItems.includes(item.label) && (
                <div className="mt-1 ml-8 space-y-1">
                  {item.children.map((child) => {
                    const isActive =
                      pathname === child.href ||
                      pathname.startsWith(child.href + "/");
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block px-3 py-1.5 text-sm rounded-lg transition-colors ${
                          isActive
                            ? "bg-gray-700 text-white"
                            : "text-gray-300 hover:bg-gray-700/50"
                        }`}
                      >
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <Link
          href="/help"
          className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-gray-700/50 transition-colors"
        >
          <HelpCircle className="w-5 h-5" />
          <span>Help Center</span>
        </Link>
        <Link
          href="/logout"
          className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-gray-700/50 transition-colors mt-2"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
}
