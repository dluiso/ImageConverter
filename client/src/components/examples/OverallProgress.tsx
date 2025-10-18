import { useState, useEffect } from "react";
import { OverallProgress } from "../OverallProgress";
import { ThemeProvider } from "../ThemeProvider";

export default function OverallProgressExample() {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeProvider>
      <div className="p-8 max-w-xl">
        <OverallProgress completedCount={3} totalCount={8} elapsedSeconds={elapsed} />
      </div>
    </ThemeProvider>
  );
}
