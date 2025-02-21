

import React from "react";


interface FavoriteIconProps {
  size?: number;
  color?: string;
}

const FavoriteIcon: React.FC<FavoriteIconProps> = ({
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
        d="M5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625 7.2.625-5.45 4.725L18.175 22 12 18.275 5.825 22z"
    fill={color}
      />
    </svg>
  );
};

export default FavoriteIcon;
