import * as React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  children,
  className = "",
}: PageHeaderProps) {
  return (
    <div
      className={`bg-white border-b border-gray-200 px-8 py-6 w-full flex flex-col md:flex-row md:items-center justify-between gap-4 ${className}`}
    >
      <div>
        <h1 className="text-xl text-[#001220] font-bold mb-1 font-poppins">
          {title}
        </h1>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      {children && <div className="flex items-center gap-3">{children}</div>}
    </div>
  );
}
