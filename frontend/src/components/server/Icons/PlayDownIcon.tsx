
import React from "react";

interface PlayDownIconProps {
  size?: number;
  color?: string;
}

const PlayDownIcon: React.FC<PlayDownIconProps> = ({
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
      <path d="M19 8H5l7 11 7-11z" fill={color} />
    </svg>
  );
};

export default PlayDownIcon;
