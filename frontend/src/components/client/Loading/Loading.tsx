"use client";
import { useEffect, useState } from "react";
import styles from "./Loading.module.scss";
import clsx from "clsx";

interface LoadingProps {
  hasParent?: boolean;
}

export const Loading = ({ hasParent = false }: LoadingProps) => {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <div
      className={clsx(
        styles.container,
        hasParent ? styles.hasParent : styles.fullScreen
      )}
    >
      {domLoaded && (
        <div className={styles.loader}>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.pulse}></div>
        </div>
      )}
    </div>
  );
};
