import React from "react";


interface CheckIconProps {
  size?: number;
  color?: string;
}

const CheckIcon: React.FC<CheckIconProps> = ({
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
         d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10S2 17.52 2 12zm3 0l5 5 9-9-1.41-1.42L10 14.17l-3.59-3.58L5 12z"
         fill={color}
      />
    </svg>
  );
};

export default CheckIcon;
