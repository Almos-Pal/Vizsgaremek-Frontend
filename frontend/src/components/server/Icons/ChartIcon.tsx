
import React from "react";

interface ChartIconProps {
  size?: number;
  color?: string;
}

const ChartIcon: React.FC<ChartIconProps> = ({
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
      <path      d="M0 0v21h24v-3H3V0H0zm15 0v15h6V0h-6zM6 6v9h6V6H6z"
       fill={color}
    />
    </svg>
  );
};

export default ChartIcon;
