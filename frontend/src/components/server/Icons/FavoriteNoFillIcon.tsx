import React from "react";


interface FavoriteNoFillIconProps {
  size?: number;
  color?: string;
}

const FavoriteNoFillIcon: React.FC<FavoriteNoFillIconProps> = ({
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
        d="M8.85 17.825l3.15-1.9 3.15 1.925-.825-3.6 2.775-2.4-3.65-.325-1.45-3.4-1.45 3.375-3.65.325 2.775 2.425-.825 3.575zM5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625 7.2.625-5.45 4.725L18.175 22 12 18.275 5.825 22z"
        fill={color}
      />
    </svg>
  );
};

export default FavoriteNoFillIcon;
