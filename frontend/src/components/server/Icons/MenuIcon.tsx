import React from "react";


interface MenuIconProps {
  size?: number;
  color?: string;
}

const MenuIcon: React.FC<MenuIconProps> = ({
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
        d="M3 18v-2h18v2H3zm0-5v-2h18v2H3zm0-5V6h18v2H3z"
        fill={color}
      />
    </svg>
  );
};

export default MenuIcon;
