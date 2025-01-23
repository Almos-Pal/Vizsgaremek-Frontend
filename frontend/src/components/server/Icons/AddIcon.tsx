import React from "react";


interface AddIconProps {
  size?: number;
  color?: string;
}

const AddIcon: React.FC<AddIconProps> = ({
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
               d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zM5 13h6v6h2v-6h6v-2h-6V5h-2v6H5v2z"
               fill={color}
      />
    </svg>
  );
};

export default AddIcon;
