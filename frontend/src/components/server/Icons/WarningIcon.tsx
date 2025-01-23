import React from "react";


interface WarningIconProps {
  size?: number;
  color?: string;
}

const WarningIcon: React.FC<WarningIconProps> = ({
  size = 24,
  color = "var(--color-light)",
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
         <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M23 21L12 2 1 21h22zm-12-3v-2h2v2h-2zm0-4h2v-4h-2v4z"
          fill={color}
      />
    </svg>
  );
};

export default WarningIcon;
