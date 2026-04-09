import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import Loading from "../components/Loading";

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number) => void;
}

export const LoadingContext = createContext<LoadingType | null>(null);

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(0);

  const value = {
    isLoading,
    setIsLoading,
    setLoading,
  };
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    let intervalId: ReturnType<typeof setInterval> | undefined;

    if (isMobile) {
      // On mobile, no 3D model loads — drive progress to 100 ourselves
      let p = 0;
      intervalId = setInterval(() => {
        p = Math.min(100, p + 5);
        setLoading(p);
        if (p >= 100 && intervalId) {
          clearInterval(intervalId);
          intervalId = undefined;
        }
      }, 50);
    }

    import("../components/utils/initialFX").then((module) => {
      if (module.initialFX) {
        setTimeout(() => {
          module.initialFX();
        }, 100);
      }
    });

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  // Safety: force dismiss loading after 10s max (prevents permanent stuck state)
  useEffect(() => {
    const safetyTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 10000);
    return () => clearTimeout(safetyTimeout);
  }, []);

  return (
    <LoadingContext.Provider value={value as LoadingType}>
      {isLoading && <Loading percent={loading} />}
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
