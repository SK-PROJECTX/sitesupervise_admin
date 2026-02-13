import * as React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
}

export function Card({
  className = "",
  children,
  noPadding = false,
  ...props
}: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 ${
        noPadding ? "" : "p-6 md:p-8"
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
