
import React from "react";

interface PlayUpIconProps {
  size?: number;
  color?: string;
}

const PlayUpIcon: React.FC<PlayUpIconProps> = ({
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
      <path d="M5 16h14L12 5 5 16z" fill={color} />
    </svg>
  );
};

export default PlayUpIcon;
