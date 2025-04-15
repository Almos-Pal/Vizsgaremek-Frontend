import React from "react";

interface ArrowLeftIconProps {
  size?: number;
  color?: string;
}

const ArrowLeftIcon: React.FC<ArrowLeftIconProps> = ({
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
        d="M7.825 13l5.6 5.6L12 20l-8-8 8-8 1.425 1.4-5.6 5.6H20v2H7.825z"
        fill={color}
      />
    </svg>
  );
};

export default ArrowLeftIcon;
