import { Download, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DownloadSectionProps {
  completedCount: number;
  totalCount: number;
  onDownloadAll: () => void;
  isProcessing: boolean;
}

export function DownloadSection({
  completedCount,
  totalCount,
  onDownloadAll,
  isProcessing,
}: DownloadSectionProps) {
  const allCompleted = completedCount === totalCount && totalCount > 0;

  if (!allCompleted || totalCount === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40">
      <div className="container mx-auto px-4 md:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-chart-2/10">
              <Package className="h-5 w-5 text-chart-2" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground" data-testid="text-conversion-complete">
                All conversions complete!
              </p>
              <p className="text-xs text-muted-foreground">
                {completedCount} {completedCount === 1 ? "image" : "images"} ready to download
              </p>
            </div>
          </div>

          <Button
            onClick={onDownloadAll}
            disabled={isProcessing}
            className="w-full sm:w-auto"
            data-testid="button-download-all"
          >
            <Download className="h-4 w-4 mr-2" />
            Download All as ZIP
          </Button>
        </div>
      </div>
    </div>
  );
}
