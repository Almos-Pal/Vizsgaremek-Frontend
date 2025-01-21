import React from "react";


interface EditIconProps {
  size?: number;
  color?: string;
}

const EditIcon: React.FC<EditIconProps> = ({
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
        d="M5 19h1.425L16.2 9.225 14.775 7.8 5 17.575V19zm-2 2v-4.25L16.2 3.575c.2-.183.42-.325.663-.425.241-.1.495-.15.762-.15s.525.05.775.15c.25.1.467.25.65.45L20.425 5c.2.183.346.4.438.65a2.165 2.165 0 010 1.512 1.874 1.874 0 01-.438.663L7.25 21H3zM15.475 8.525l-.7-.725L16.2 9.225l-.725-.7z"
        fill={color}
      />
    </svg>
  );
};

export default EditIcon;
