
import React from "react";

interface PlayRightIconProps {
  size?: number;
  color?: string;
}

const PlayRightIcon: React.FC<PlayRightIconProps> = ({
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
      <path d="M8 19V5l11 7-11 7z"
       fill={color}
    />
    </svg>
  );
};

export default PlayRightIcon;
