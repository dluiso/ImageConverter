import { Check, X, Loader2, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "./ProgressBar";
import type { ImageFormat } from "./FormatSelector";

export type ConversionStatus = "pending" | "converting" | "completed" | "error";

export interface ImageItem {
  id: string;
  file: File;
  preview: string;
  status: ConversionStatus;
  progress: number;
  convertedBlob?: Blob;
  error?: string;
}

interface ImageCardProps {
  image: ImageItem;
  targetFormat: ImageFormat;
  onDownload: (id: string) => void;
  onRemove: (id: string) => void;
}

export function ImageCard({ image, targetFormat, onDownload, onRemove }: ImageCardProps) {
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const getStatusIcon = () => {
    switch (image.status) {
      case "converting":
        return <Loader2 className="h-4 w-4 text-primary animate-spin" />;
      case "completed":
        return <Check className="h-4 w-4 text-chart-2" />;
      case "error":
        return <X className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-3 p-4 rounded-lg border border-card-border bg-card hover-elevate">
      <div className="flex items-center gap-3">
        <img
          src={image.preview}
          alt={image.file.name}
          className="w-14 h-14 rounded object-cover flex-shrink-0"
          data-testid={`img-preview-${image.id}`}
        />
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-card-foreground truncate" data-testid={`text-filename-${image.id}`}>
            {image.file.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {formatFileSize(image.file.size)} → {targetFormat.toUpperCase()}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {getStatusIcon()}
          
          {image.status === "completed" && (
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onDownload(image.id)}
              data-testid={`button-download-${image.id}`}
            >
              <Download className="h-4 w-4" />
            </Button>
          )}
          
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onRemove(image.id)}
            disabled={image.status === "converting"}
            data-testid={`button-remove-${image.id}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {image.status === "converting" && (
        <ProgressBar progress={image.progress} />
      )}

      {image.status === "error" && image.error && (
        <p className="text-xs text-destructive" data-testid={`text-error-${image.id}`}>
          {image.error}
        </p>
      )}
    </div>
  );
}
