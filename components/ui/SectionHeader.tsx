import * as React from "react";

interface SectionHeaderProps extends React.HTMLAttributes<HTMLHeadingElement> {
  title: string;
}

export function SectionHeader({
  title,
  className = "",
  ...props
}: SectionHeaderProps) {
  return (
    <h2
      className={`text-lg font-bold text-gray-900 mb-6 uppercase tracking-wide ${className}`}
      {...props}
    >
      {title}
    </h2>
  );
}
