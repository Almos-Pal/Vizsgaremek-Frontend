import React from "react";


interface ArrowRightIconProps {
  size?: number;
  color?: string;
}

const ArrowRightIcon: React.FC<ArrowRightIconProps> = ({
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
        d="M16.175 13H4v-2h12.175l-5.6-5.6L12 4l8 8-8 8-1.425-1.4 5.6-5.6z"
        fill={color}
      />
    </svg>
  );
};

export default ArrowRightIcon;
