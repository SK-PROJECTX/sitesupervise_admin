import { ArrowUpRight } from "lucide-react";
import { Card } from "../ui/Card";

interface StatCardProps {
  title: string;
  value: string | number;
  badge?: string;
  badgeColor?: "green" | "red" | "blue" | "gray" | "yellow";
  className?: string;
  style?: "default" | "dark" | "outlined";
  corner?: "tl" | "tr" | "bl" | "br" | "all";
  onClick?: () => void;
}

export function StatCard({
  title,
  value,
  badge,
  badgeColor = "green",
  className = "",
  style = "default",
  corner = "all",
  onClick,
}: StatCardProps) {
  const cornerClassMap: Record<string, string> = {
    tl: "rounded-3xl rounded-tl-none",
    tr: "rounded-3xl rounded-tr-none",
    bl: "rounded-3xl rounded-bl-none",
    br: "rounded-3xl rounded-br-none",
    all: "rounded-3xl",
  };

  const styleClasses = {
    default: "bg-white text-gray-900 border-gray-200",
    dark: "bg-slate-900 text-white border-slate-800",
    outlined: "bg-white text-gray-900 border-2 border-gray-200",
  };

  const textClasses = {
    default: "text-gray-900",
    dark: "text-white",
    outlined: "text-gray-900",
  };

  const subTextClasses = {
    default: "text-gray-600",
    dark: "text-gray-400",
    outlined: "text-gray-600",
  };

  const badgeColorClasses = {
    green: "bg-green-500 text-white",
    red: "bg-red-500 text-white",
    blue: "bg-blue-500 text-white",
    gray: "bg-gray-500 text-white",
    yellow: "bg-yellow-500 text-white",
  };

  return (
    <div
      className={`
        relative overflow-hidden flex flex-col justify-between p-6
        border
        transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer
        ${styleClasses[style]}
        ${cornerClassMap[corner]}
        ${className}
      `}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`text-sm font-medium ${subTextClasses[style]}`}>
          {title}
        </span>

        <button className="p-2 rounded-full bg-[#D9D9D9] hover:bg-gray-300 transition-colors">
          <ArrowUpRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div
        className={`text-3xl md:text-4xl xl:text-5xl font-bold mb-2 ${textClasses[style]}`}
      >
        {value}
      </div>

      {badge && (
        <div
          className={`inline-block ${badgeColorClasses[badgeColor]} rounded-full text-xs px-2 py-1 mt-4 w-fit text-center font-medium`}
        >
          {badge}
        </div>
      )}
    </div>
  );
}
