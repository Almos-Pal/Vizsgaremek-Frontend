import React from "react";


interface SettingsIconProps {
  size?: number;
  color?: string;
}

const SettingsIcon: React.FC<SettingsIconProps> = ({
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
         d="M10.504 0L9.007 3.561c-.299.09-.568.24-.837.39L4.608 2.453 2.454 4.608 3.95 8.17c-.15.299-.27.538-.389.837L0 10.504v2.992l3.561 1.496c.12.3.24.54.39.838l-1.497 3.562 2.154 2.154L8.17 20.05c.269.12.538.27.837.389L10.504 24h2.992l1.496-3.561c.27-.12.57-.24.838-.39l3.562 1.497 2.154-2.154-1.496-3.562c.12-.269.27-.568.389-.838L24 13.496v-2.992l-3.561-1.497c-.09-.269-.24-.568-.39-.837l1.497-3.562-2.154-2.154L15.83 3.95c-.269-.12-.568-.27-.838-.389L13.496 0h-2.992zM12 7.481a4.483 4.483 0 014.489 4.49A4.483 4.483 0 0112 16.458a4.483 4.483 0 01-4.489-4.489A4.483 4.483 0 0112 7.481z"
        fill={color}
      />
    </svg>
  );
};

export default SettingsIcon;
