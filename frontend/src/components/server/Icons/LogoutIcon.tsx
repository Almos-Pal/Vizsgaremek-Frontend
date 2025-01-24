import React from "react";


interface LogoutIconProps {
  size?: number;
  color?: string;
}

const LogoutIcon: React.FC<LogoutIconProps> = ({
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
         d="M9 0v3.429h12V20.57H9V24h15V0H9zM6 6.857L0 12l6 5.143v-3.429h12v-3.428H6V6.857z"
         fill={color}
      />
    </svg>
  );
};

export default LogoutIcon;
