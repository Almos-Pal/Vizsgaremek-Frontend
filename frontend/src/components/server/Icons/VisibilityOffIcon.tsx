import React from "react";

interface ArrowLeftIconProps {
  size?: number;
  color?: string;
}

const ArrowLeftIcon: React.FC<ArrowLeftIconProps> = ({
  size = 24,
  color = "var(--color-light)",
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
        d="M14.09 1C6.5 1 2 10 2 10s4.5 9 12.09 9C21.5 19 26 10 26 10s-4.5-9-11.91-9zM14 4c3.33 0 6 2.7 6 6 0 3.33-2.67 6-6 6-3.3 0-6-2.67-6-6 0-3.3 2.7-6 6-6zm0 3c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3c0-.3-.12-.57-.18-.84-.24.48-.72.84-1.32.84-.84 0-1.5-.66-1.5-1.5 0-.6.36-1.08.84-1.32C14.57 7.09 14.3 7 14 7z"
        fill={color}
      />
      <path
        transform="rotate(33.287 1.646 0)"
        fill={color}
        d="M1.64648 0H33.64648V3H1.64648z"
      />
    
    </svg>
  );
};

export default ArrowLeftIcon;


