import { ProgressBar } from "./ProgressBar";

interface OverallProgressProps {
  completedCount: number;
  totalCount: number;
  elapsedSeconds: number;
}

export function OverallProgress({ completedCount, totalCount, elapsedSeconds }: OverallProgressProps) {
  if (totalCount === 0) return null;

  const progress = (completedCount / totalCount) * 100;
  const isComplete = completedCount === totalCount;

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  return (
    <div className="w-full p-4 rounded-lg border border-card-border bg-card">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-card-foreground">
          Overall Progress
        </p>
        <p className="text-sm text-muted-foreground" data-testid="text-progress-count">
          {completedCount} of {totalCount} {isComplete ? "completed" : "converting"}
        </p>
      </div>
      
      <ProgressBar progress={progress} className="mb-2" />
      
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{Math.round(progress)}%</span>
        <span data-testid="text-elapsed-time">Elapsed: {formatTime(elapsedSeconds)}</span>
      </div>
    </div>
  );
}
