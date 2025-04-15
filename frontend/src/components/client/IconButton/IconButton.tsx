"use client";

import { Icons } from "@/components/server";
import clsx from "clsx";
import Link from "next/link";
import React, { ButtonHTMLAttributes } from "react";
import styles from "./IconButton.module.scss";

interface IconButtonProps {
  /** Button style variant */
  color?: "primary" | "secondary" | "transparent";
  /** Click handler (for <button>) */
  onClick?: () => void;
  /** If provided, renders as a link instead of a button */
  href?: string | null;
  /** Additional props for the <Link> (e.g., target="_blank", rel="noopener") */
  hrefProps?: { target?: string; rel?: string };
  /** The name of the icon to render from the Icons map */
  icon: keyof typeof Icons;
  /** Additional props passed down to the icon component */
  iconProps?: { size?: number; color?: string; filled?: boolean };
  /** Inline styles for the button */
  style?: React.CSSProperties;
  /** Button type attribute */
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  /** Optional fixed width for the button */
  width?: number | string;
  /** Disables the button if true */
  disabled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  color = "primary",
  onClick,
  href = null,
  hrefProps,
  icon,
  iconProps,
  style,
  type,
  width,
  disabled,
}) => {
  const className = clsx(
    styles.button,
    styles[color],
    styles.iconOnly 
  );

  const fullStyle: React.CSSProperties = {
    ...style,
    width: width ?? undefined,
  };

  let iconColor = "var(--color-dark)";
  if (color === "secondary") {
    iconColor = "var(--color-light)";
  } else if (color === "transparent") {
    iconColor = "var(--color-grey-300)";
  }

  const finalIconProps = {
    size: 24, 
    color: iconColor,
    ...iconProps,
  };

  const IconElement = React.createElement(Icons[icon], finalIconProps);

  if (href) {
    return (
      <Link href={href} {...(hrefProps || {})}>
        <span className={className} style={fullStyle}>
          {IconElement}
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
      {IconElement}
    </button>
  );
};

export default IconButton;