import React from "react";


interface InfoIconProps {
  size?: number;
  color?: string;
}

const InfoIcon: React.FC<InfoIconProps> = ({
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
         d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-6h2v6h-2zm0-10v2h2V7h-2z"
         fill={color}
      />
    </svg>
  );
};

export default InfoIcon;
