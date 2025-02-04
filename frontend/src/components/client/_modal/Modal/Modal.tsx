"use client";

import { Icons } from "@/components/server";
import clsx from "clsx";
import React from "react";
import styles from "./Modal.module.scss";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  showCloseButton?: boolean;
  allowScroll?: boolean;
  width?: number;
  disableBackdropClick?: boolean;
  footerComponent?: React.ReactNode;
  isRelative?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  children,
  showCloseButton = true,
  allowScroll = false,
  disableBackdropClick = false,
  footerComponent,
  width,
  isRelative,
}) => {
  if (!visible) return null;
console.log(title)
  return (
    <div
      className={clsx(isRelative ? styles.relative : styles.backdrop)}
      onMouseDown={disableBackdropClick ? () => {} : onClose}
    >
      <div
        className={styles.modalContent}
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.header}>
          {showCloseButton && (
            <button onClick={onClose} className={styles.closeButton}>
              <Icons.CancelIcon size={28} color="var(--color-light)" />
            </button>
          )}
        </div>
        <div
          className={styles.body}
          style={{
            overflowY: allowScroll ? "scroll" : undefined,
            // overflowX: "hidden",
            maxHeight: allowScroll ? "80vh" : undefined,
            width: width ?? undefined,
          }}
        >
          {children}
        </div>
        <div className="pt-4">{footerComponent && footerComponent}</div>
      </div>
    </div>
  );
};

export default Modal;
