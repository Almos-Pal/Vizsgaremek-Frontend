"use client";
import { useEffect, useState } from "react";
import { SunspotLoader } from "react-awesome-loaders";

interface LoadingProps {
  hasParent?: boolean;
}

export const Loading = ({ hasParent = false }: LoadingProps) => {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <div className={`${hasParent ? "flex items-center justify-center w-full h-full" : "flex items-center justify-center h-screen w-screen"}`}>
      {domLoaded && (
        <SunspotLoader
          gradientColors={["var(--color-primary)", "var(--color-primary-10)"]}
          shadowColor={"var(--color-primary-90)"}
          desktopSize="128px"
          mobileSize="100px"
        />
      )}
    </div>
  );
};
