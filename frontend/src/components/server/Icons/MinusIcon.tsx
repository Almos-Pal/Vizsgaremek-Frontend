import React from "react";


interface MinusIconProps {
  size?: number;
  color?: string;
}

const MinusIcon: React.FC<MinusIconProps> = ({
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
               d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zM6 11v2h12v-2H6z"
               fill={color}
      />
    </svg>
  );
};

export default MinusIcon;
