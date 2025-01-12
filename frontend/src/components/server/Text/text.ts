//here will go all of imports
import React, { JSX } from "react";
import styles from "./Text.module.scss";

interface TextProps {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "body-16"
    | "subtitle-16"
    | "body-15"
    | "subtitle-15"
    | "button"
    | "caption";
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  element?: keyof JSX.IntrinsicElements;
}

const Text: React.FC<TextProps> = ({
  variant = "body-16",
  color = "--color-dark",
  style,
  className,
  children,
  element,
}) => {
  const variantClass = styles[variant] || styles["body-16"];
  const combinedClassName = `${variantClass} ${className || ""}`;

  const customStyle = {
    color,
    ...style,
  };

  let Element: keyof JSX.IntrinsicElements = "p";

  if (element) {
    Element = element;
  } else {
    if (variant === "h1") {
      Element = "h1";
    } else if (variant === "h2") {
      Element = "h2";
    } else if (variant === "h3") {
      Element = "h3";
    } else if (variant === "h4") {
      Element = "h4";
    } else if (variant === "h5") {
        Element = "h5";
    } else {
      Element = "p";
    }
  }

  const customProps = {
    className: combinedClassName,
    style: customStyle,
  };

  const CustomElement = React.createElement(Element, customProps, children);

  return CustomElement;
};

export default Text;
