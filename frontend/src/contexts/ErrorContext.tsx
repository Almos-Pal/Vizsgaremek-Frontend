import { createContext, useContext, useState, ReactNode } from "react";

interface ErrorContextType {
  hasError: boolean;
  setError: (error: boolean) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export function ErrorProvider({ children }: { children: ReactNode }) {
  const [hasError, setHasError] = useState(false);

  const setError = (error: boolean) => {
    setHasError(error);
  };

  return (
    <ErrorContext.Provider value={{ hasError, setError }}>
      {children}
    </ErrorContext.Provider>
  );
}

export function useError() {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error("useError must be used within a ErrorProvider");
  }
  return context;
}
