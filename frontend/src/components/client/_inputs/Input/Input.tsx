"use client";

import { Icons } from "@/components/server";
import Text from "@/components/server/Text/Text";
import clsx from "clsx";
import React, { forwardRef, useRef, useState } from "react";
import styles from "./Input.module.scss";

interface InputProps {
  className?: string;
  style?: React.CSSProperties;
  label?: string | React.ReactNode;
  name: string;
  value: string;
  onChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  error?: string;
  LeftIcon?: React.ComponentType<any>;
  RightIcon?: React.ComponentType<any>;
  type?: "text" | "email" | "password" | "date";
  flex?: boolean;
  textArea?: boolean;
  textAreaHeight?: number;
  iconProps?: {
    size?: number;
    color?: string;
  };
  isRequired?: boolean;
  disabled?: boolean;
  isSet?: boolean;
}

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  function Input(
    {
      className,
      style,
      label,
      name,
      value,
      onChange,
      placeholder,
      error,
      LeftIcon,
      RightIcon,
      type = "text",
      flex = false,
      textArea = false,
      textAreaHeight = 130,
      iconProps = {},
      isRequired,
      disabled,
      isSet = false,
      ...props
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ref
  ) {
    const [showPassword, setShowPassword] = useState(false);
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
    const handleInputClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    const handleChange = (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      if (onChange) {
        onChange(e);
      }
    };

    const iconPropsLocal = {
      size: 24,
      color: "var(--color-primary)",
      ...iconProps,
    };

    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div
        className={`${styles.container} ${disabled ? styles.disabled : ""}`}
        style={{
          flex: flex ? 1 : 0,
          ...style,
        }}
      >
        {label && (
          <label htmlFor={name}>
            <div className={styles.labelWrapper}>
              <Text variant="body-16">{label}</Text>
              {isRequired && (
                <Text
                  variant="caption"
                  color="var(--color-error)"
                  className={styles.requiredMarker}
                >
                  *
                </Text>
              )}
            </div>
          </label>
        )}
        <div
          className={clsx(
            isSet ? styles.inputSet : styles.input, // Ensuring correct class application
            className,
            error && styles.inputError,
            disabled && styles.disabled
          )}
          style={{ alignSelf: flex ? "stretch" : "initial" }}
          onClick={handleInputClick}
        >
          {LeftIcon && (
            <LeftIcon {...iconPropsLocal} style={{ marginRight: 8 }} />
          )}
          {textArea ? (
            <textarea
              id={name}
              name={name}
              value={value}
              onChange={handleChange}
              placeholder={placeholder}
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              style={{ resize: "none", minHeight: textAreaHeight }}
              disabled={disabled}
              {...props}
            ></textarea>
          ) : (
            <input
              id={name}
              size={1}
              name={name}
              value={value}
              onChange={handleChange}
              placeholder={placeholder}
              ref={inputRef as React.RefObject<HTMLInputElement>}
              type={type === "password" && showPassword ? "text" : type}
              disabled={disabled}
              {...props}
            />
          )}
          {type === "password" && (
            <div onClick={toggleShowPassword} style={{ cursor: "pointer" }}>
              {showPassword ? (
                <Icons.VisibilityOnIcon {...iconPropsLocal} />
              ) : (
                <Icons.VisibilityOffIcon {...iconPropsLocal} />
              )}
            </div>
          )}
          {RightIcon && type !== "password" && (
            <RightIcon {...iconPropsLocal} style={{ marginLeft: 8 }} />
          )}
        </div>

        {error && (
          <div className={styles.error}>
            <Text color="var(--color-error)">{error}</Text>
          </div>
        )}
      </div>
    );
  }
);

export default Input;
