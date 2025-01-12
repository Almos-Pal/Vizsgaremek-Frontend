import React from "react";

interface VisibilityOnIconProps {
  size?: number;
  color?: string;
}

const VisibilityOnIcon: React.FC<VisibilityOnIconProps> = ({
  size = 24,
  color = "var(--color-white)",
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 27 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.09 0C4.5 0 0 9 0 9s4.5 9 12.09 9C19.5 18 24 9 24 9s-4.5-9-11.91-9zM12 3c3.33 0 6 2.7 6 6 0 3.33-2.67 6-6 6-3.3 0-6-2.67-6-6 0-3.3 2.7-6 6-6zm0 3c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3c0-.3-.12-.57-.18-.84-.24.48-.72.84-1.32.84-.84 0-1.5-.66-1.5-1.5 0-.6.36-1.08.84-1.32C12.57 6.09 12.3 6 12 6z"
        fill={color}
      />
    </svg>
  );
};

export default VisibilityOnIcon;
