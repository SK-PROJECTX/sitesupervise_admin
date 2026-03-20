"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  Home,
  Users,
  FolderOpen,
  Settings,
  BarChart3,
  Activity,
  HelpCircle,
  LogOut,
  MessageCircle,
  BadgeInfo,
  Wallet,
  Headphones,
} from "lucide-react";
import { clearAuthTokens, logout as authLogout } from "../lib/auth";
import { Button } from "./ui/Button";

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
      // { label: "Permission Sets", href: "/admin/permission-sets" },
      // { label: "User Analytics", href: "/admin/user-analytics" },
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
      // { label: "Project Archive", href: "/admin/project-management/#archive" },
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
    icon: <Wallet className="w-5 h-5" />,
    label: "BILLING & REVENUE",
    href: "/admin/billing",
  },
  {
    icon: <MessageCircle className="w-5 h-5" />,
    label: "MESSAGES",
    href: "/admin/chat",
  },
  {
    icon: <Headphones className="w-5 h-5" />,
    label: "CONFERENCES",
    href: "/admin/meeting",
  },
  {
    icon: <BadgeInfo className="w-5 h-5" />,
    label: "SUPPORT MANAGEMENT",
    children: [
      { label: "Ticket Management", href: "/admin/support/#active" },
      { label: "Support Analytics", href: "/admin/support/#rules" },
    ],
  },
];

export default function AdminSidebar({
  isOpen = false,
  onClose = () => {},
}: {
  isOpen?: boolean;
  onClose?: () => void;
}) {
  // Start with all sections expanded to match the image
  const initialExpanded = sidebarItems.map((i) => i.label);
  const [expandedItems, setExpandedItems] = useState<string[]>(initialExpanded);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    try {
      await authLogout();
      clearAuthTokens();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggingOut(false);
    }
  };

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );
  };

  const isParentActive = (item: SidebarItem) => {
    if (item.children) {
      return item.children.some(
        (c) => pathname === c.href || pathname.startsWith(c.href + "/"),
      );
    }

    if (!item.href) return false;

    // Strict match for dashboard to avoid matching /admin/something
    if (item.href === "/admin") {
      return pathname === "/admin";
    }

    return pathname === item.href || pathname.startsWith(item.href + "/");
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-72 bg-[var(--color-sidebar-bg)] text-[var(--color-sidebar-text)] flex flex-col h-screen transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-[var(--color-sidebar-border)] flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* Placeholder for logo - replace src with actual logo path */}
          <img
            src="/favicon.ico"
            alt="Site Supervise"
            className="w-8 h-8 mr-4"
          />

          <div>
            <div className="font-bold text-lg">SITE SUPERVISE</div>
            <div className="text-xs text-[var(--color-sidebar-text-muted)]">
              SUPER ADMIN DASHBOARD
            </div>
          </div>
        </div>
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="md:hidden text-[var(--color-sidebar-text-muted)] hover:text-white hover:bg-transparent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Button>
      </div>

      {/* Main Menu */}
```tsx
      <div className="flex-1 overflow-y-auto py-4 scrollbar-hide">
```
        <div className="px-4">
          <div className="text-xs uppercase text-[var(--color-sidebar-text-muted)] mb-4 tracking-wider">
            Main Menu
          </div>
          {sidebarItems.map((item) => (
            <div key={item.label} className="mb-1">
              <button
                onClick={() => {
                  if (item.children) {
                    toggleExpanded(item.label);
                  } else {
                    handleLinkClick();
                    if (item.href) router.push(item.href);
                  }
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-colors ${
                  isParentActive(item)
                    ? "bg-[var(--color-sidebar-active)]"
                    : "hover:bg-[var(--color-sidebar-hover)]"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  {item.href ? (
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLinkClick();
                      }}
                      className="flex-1"
                    >
                      <span className="text-left w-full inline-block">
                        {item.label}
                      </span>
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
                        onClick={handleLinkClick}
                        className={`block px-3 py-1.5 text-sm rounded-lg transition-colors ${
                          isActive
                            ? "bg-[var(--color-sidebar-active)] text-white"
                            : "text-[var(--color-sidebar-text-muted)] hover:bg-[var(--color-sidebar-hover)]"
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
      <div className="p-4 border-t border-[var(--color-sidebar-border)]">
        <Link
          href="/help"
          onClick={handleLinkClick}
          className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-[var(--color-sidebar-hover)] transition-colors"
        >
          <HelpCircle className="w-5 h-5" />
          <span>Help Center</span>
        </Link>
        <Button
          onClick={handleLogout}
          variant="ghost"
          disabled={isLoggingOut}
          className="flex items-center justify-start gap-3 px-3 py-2 text-sm h-auto rounded-lg hover:bg-[var(--color-sidebar-hover)] hover:text-white transition-colors mt-2 w-full text-left disabled:opacity-50"
        >
          <LogOut
            className={`w-5 h-5 ${isLoggingOut ? "animate-pulse" : ""}`}
          />
          <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
        </Button>
      </div>
    </div>
  );
}
