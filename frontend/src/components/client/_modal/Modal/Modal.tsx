"use client";

import React from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";
import { Icons } from "@/components/server";
import styles from "./Modal.module.scss";
import { Text } from "@/components/server";
interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  showCloseButton?: boolean;
  allowScroll?: boolean;
  width?: number;
  height?: number;
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
  height,
  isRelative,
}) => {
  if (!visible) return null;

  const modalContent = (
    <div
      className={clsx(isRelative ? styles.relative : styles.backdrop)}
      onMouseDown={disableBackdropClick ? () => {} : onClose}
    >
      <div
        className={styles.modalContent}
        style={{
          height: height ? `${height}px` : undefined,
          width: width ? `${width}px` : undefined,
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          {showCloseButton && (
            <button onClick={onClose} className={styles.closeButton}>
              <Icons.CancelIcon size={28} color="var(--color-light)" />
            </button>
          )}
          {title && <Text variant="h5" style={{margin: 'auto'}}>{title}</Text>}
        </div>
        <div
          className={styles.body}
          style={{
            overflowY: allowScroll ? "scroll" : undefined,
            maxHeight: allowScroll ? "80vh" : undefined,
          }}
        >
          {children}
        </div>
        <div className="pt-4">{footerComponent && footerComponent}</div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default Modal;
