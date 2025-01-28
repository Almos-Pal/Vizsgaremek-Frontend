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
  noBackground?: boolean; // New prop
  style?: React.CSSProperties;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  width?: number | string;
  disabled?: boolean;
  additionalClassName?: string;
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
  noBackground = false, // Default false
  iconProps,
  style,
  type,
  width,
  disabled,
  additionalClassName,
}) => {
  const className = clsx(
    styles.button,
    styles[color],
    iconOnly && styles.iconOnly,
    noPadding && styles.noPadding,
    noBackground && styles.noBackground ,
    additionalClassName && additionalClassName
  );

  const fullStyle = { ...style, width: width ?? undefined };

  let textColor;
  let iconColor;
  switch (color) {
    case "primary":
      textColor = "var(--color-dark)";
      iconColor = "var(--color-dark)";
      break;
    case "secondary":
      textColor = "var(--color-light)";
      iconColor = "var(--color-light)";
      break;
    default:
      textColor = "var(--color-dark)";
      iconColor = "var(--color-dark)";
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
        <span className={className} style={fullStyle}>
          {renderContent()}
        </span>
      </Link>
    );
  }

  return (
    <button
      className={className}
      onClick={onClick}
      style={fullStyle}
      type={type}
      disabled={disabled}
    >
      {renderContent()}
    </button>
  );
};

export default Button;
