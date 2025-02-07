import { Text } from "@/components/server/";
import styles from "./ContentLayout.module.scss";
import { Navbar } from "@/components/client";

interface ContentLayoutProps {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  filter?: React.ReactNode;
  
}

export default function ContentLayout({ children, header,filter  }: ContentLayoutProps) {
  return (
    <>
    <Navbar/>
    <div className={styles["content-layout"]}>
      <div className={styles["content-layout__container"]}>

      <div className={styles.header}>
        <Text variant="h1">{header}</Text>
      </div>
      <div className={styles.filter}>{filter}</div>
      <div className={styles["content"]}>

      {children}
      </div>
      </div>

    </div>
    </>

  );
}
