import { useState, useEffect } from "react";
import { ProgressBar } from "../ProgressBar";
import { ThemeProvider } from "../ThemeProvider";

export default function ProgressBarExample() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeProvider>
      <div className="p-8 space-y-4">
        <ProgressBar progress={progress} />
        <p className="text-sm text-muted-foreground">Progress: {progress}%</p>
      </div>
    </ThemeProvider>
  );
}
