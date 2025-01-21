
import React from "react";

interface TrashCanIconProps {
  size?: number;
  color?: string;
}

const TrashCanIcon: React.FC<TrashCanIconProps> = ({
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
        d="M7 21c-.55 0-1.02-.196-1.412-.587A1.926 1.926 0 015 19V6H4V4h5V3h6v1h5v2h-1v13c0 .55-.196 1.02-.587 1.413A1.926 1.926 0 0117 21H7zM17 6H7v13h10V6zM9 17h2V8H9v9zm4 0h2V8h-2v9z"
        fill={color}
    />
    </svg>
  );
};

export default TrashCanIcon;
