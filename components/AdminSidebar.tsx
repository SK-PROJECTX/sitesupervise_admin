"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  Home,
  Users,
  Briefcase,
  Settings,
  BarChart3,
  Heart,
  AlertCircle,
  HelpCircle,
  LogOut,
} from "lucide-react";

interface SidebarChild {
  label: string;
  href: string;
}

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  children?: SidebarChild[];
}

// Sidebar items with prepared hrefs for routing and lucide icons
const sidebarItems: SidebarItem[] = [
  {
    icon: <Home className="w-4 h-4" />,
    label: "DASHBOARD (Home)",
  },
  {
    icon: <Users className="w-4 h-4" />,
    label: "USER MANAGEMENT",
    children: [
      { label: "User Directory", href: "/admin/user-management" },
      { label: "Role Management", href: "/admin/user-management#" },
      { label: "Permission Sets", href: "/admin/user-management#permissions" },
      { label: "User Analytics", href: "/admin/user-analytics" },
    ],
  },
  {
    icon: <Briefcase className="w-4 h-4" />,
    label: "PROJECT MANAGEMENT",
    children: [
      { label: "Active Directory", href: "/admin/projects/active" },
      { label: "Project Archive", href: "/admin/projects/archive" },
      { label: "Project Analytics", href: "/admin/projects/analytics" },
      { label: "Project Templates", href: "/admin/projects/templates" },
    ],
  },
  {
    icon: <Settings className="w-4 h-4" />,
    label: "SYSTEM SETTINGS",
    children: [
      { label: "General Settings", href: "/admin/settings/" },
      { label: "API & Integrations", href: "/admin/settings/integrations" },
      { label: "Security & Compliance", href: "/admin/settings/security" },
      { label: "Module Configuration", href: "/admin/settings/modules" },
    ],
  },
  {
    icon: <BarChart3 className="w-4 h-4" />,
    label: "ANALYTICS & REPORTS",
    children: [
      { label: "Platform Usage", href: "/admin/analytics" },
      { label: "Billing & Revenue", href: "/admin/reports/billing" },
      { label: "Performance Metrics", href: "/admin/reports/performance" },
      { label: "Custom Reports", href: "/admin/reports/custom" },
    ],
  },
  {
    icon: <Heart className="w-4 h-4" />,
    label: "SYSTEM HEALTH",
    children: [
      { label: "Health Monitor", href: "/admin/health/monitor" },
      { label: "Service Status", href: "/admin/health/services" },
      { label: "Database Management", href: "/admin/health/database" },
      { label: "Backup & Restore", href: "/admin/health/backup" },
    ],
  },
  {
    icon: <AlertCircle className="w-4 h-4" />,
    label: "ALERT CENTER",
    children: [
      { label: "Active Alerts", href: "/admin/alerts/active" },
      { label: "Alert Rules", href: "/admin/alerts/rules" },
      { label: "Notification Settings", href: "/admin/alerts/notifications" },
      { label: "Alert Analytics", href: "/admin/alerts/analytics" },
    ],
  },
];

export default function AdminSidebar() {
  // open all collapses by default
  const initialExpanded = sidebarItems.map((i) => i.label);
  const [expandedItems, setExpandedItems] = useState<string[]>(initialExpanded);
  const pathname = usePathname() || "/";

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  return (
    <div className="w-64 bg-slate-800 text-white h-full min-h-screen overflow-y-auto relative">
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
            <span className="text-slate-800 font-bold text-sm">SS</span>
          </div>
          <span className="font-bold text-sm">SITE SUPERVISE</span>
        </div>
        <div className="text-xs text-slate-400 mt-2">SUPER ADMIN DASHBOARD</div>
      </div>

      <div className="p-4">
        <div className="text-xs text-slate-400 mb-4">MAIN MENU</div>

        {sidebarItems.map((item) => (
          <div key={item.label} className="mb-2">
            {(() => {
              const parentActive = item.children
                ? item.children.some(
                    (c) => pathname === c.href || pathname.startsWith(c.href)
                  )
                : pathname === "/admin" || pathname === "/";

              return (
                <button
                  onClick={() => toggleExpanded(item.label)}
                  className={`w-full flex items-center justify-between p-2 text-sm rounded transition-colors ${
                    parentActive ? "bg-slate-700" : "hover:bg-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{item.icon}</span>
                    <span className="text-xs">{item.label}</span>
                  </div>
                  {item.children &&
                    item.children.length > 0 &&
                    (expandedItems.includes(item.label) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    ))}
                </button>
              );
            })()}

            {expandedItems.includes(item.label) && item.children && (
              <div className="ml-6 mt-1">
                {item.children.map((child) => {
                  const isActive =
                    pathname === child.href || pathname.startsWith(child.href);
                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`block w-full text-left p-2 text-xs rounded transition-colors ${
                        isActive
                          ? "bg-slate-700 text-white"
                          : "text-slate-300 hover:bg-slate-700"
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

      <div className="absolute1 bottom-0 w-full p-4 border-t border-slate-700">
        <Link
          href="/help"
          className="flex items-center gap-2 text-sm hover:bg-slate-700 p-2 rounded transition-colors w-full"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Help Center</span>
        </Link>
        <Link
          href="/logout"
          className="flex items-center gap-2 text-sm hover:bg-slate-700 p-2 rounded transition-colors w-full mt-2"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
}
