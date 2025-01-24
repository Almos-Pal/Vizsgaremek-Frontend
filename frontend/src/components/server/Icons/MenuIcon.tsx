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
        d="M12 0L0 10.286h3V24h6v-6.857h6V24h6V10.183l3 .103L12 0z"
        fill={color}
      />
    </svg>
  );
};

export default MenuIcon;
