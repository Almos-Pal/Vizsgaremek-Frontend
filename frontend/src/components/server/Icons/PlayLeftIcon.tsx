import React from "react";

interface PlayLeftIconProps {
  size?: number;
  color?: string;
}

const PlayLeftIcon: React.FC<PlayLeftIconProps> = ({
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
    <path d="M16 19V5L5 12l11 7z"
     fill={color} 
     />
    </svg>
  );
};

export default PlayLeftIcon;
