"use client";

import { Icons } from "@/components/server";
import Text from "@/components/server/Text/Text";
import clsx from "clsx";
import Link from "next/link";
import React, { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  children?: React.ReactNode;
  color?: "primary" | "secondary";
  onClick?: () => void;
  href?: string | null;
  hrefProps?: { target?: string; rel?: string };
  leftIcon?: keyof typeof Icons;
  rightIcon?: keyof typeof Icons;
  iconOnly?: boolean;
  iconProps?: { size?: number; color?: string; filled?: boolean };
  noPadding?: boolean;
  style?: React.CSSProperties;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  width?: number | string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  color = "primary",
  onClick,
  href = null,
  hrefProps,
  leftIcon,
  rightIcon,
  iconOnly = false,
  noPadding = false,
  iconProps,
  style,
  type,
  width,
  disabled,
}) => {
  //   const [hover, setHover] = useState(false);

  //   const handleMouseEnter = () => {
  //     setHover(true);
  //   };

  //   const handleMouseLeave = () => {
  //     setHover(false);
  //   };

  const className = clsx(
    styles.button,
    styles[color],
    iconOnly && styles.iconOnly,
    noPadding && styles.noPadding
  );

  const fullStyle = { ...style, width: width ?? undefined };

  let textColor;
  let iconColor;
  switch (color) {
    case "primary":
      textColor = "var(--color-white)";
      iconColor = "var(--color-white)";
      break;
    case "secondary":
      textColor = "var(--color-black)";
      iconColor = "var(--color-black)";
      break;
    default:
      textColor = "var(--color-black)";
      iconColor = "var(--color-black)";
  }

  const iconSize = 24;
  const finalIconProps = { size: iconSize, color: iconColor, ...iconProps };

  const renderContent = () => (
    <>
      {leftIcon && React.createElement(Icons[leftIcon], finalIconProps)}
      {!iconOnly && (
        <Text variant="button" color={textColor}>
          {children}
        </Text>
      )}
      {rightIcon && React.createElement(Icons[rightIcon], finalIconProps)}
    </>
  );

  if (href) {
    return (
      <Link href={href} {...(hrefProps && hrefProps)}>
        <span
          className={className}
          //   onMouseEnter={handleMouseEnter}
          //   onMouseLeave={handleMouseLeave}
          style={fullStyle}
        >
          {renderContent()}
        </span>
      </Link>
    );
  }

  return (
    <button
      className={className}
      onClick={onClick}
      //   onMouseEnter={handleMouseEnter}
      //   onMouseLeave={handleMouseLeave}
      style={fullStyle}
      type={type}
      disabled={disabled}
    >
      {renderContent()}
    </button>
  );
};

export default Button;
