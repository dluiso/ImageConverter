import { Check, X, Loader2, Download, Trash2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProgressBar } from "./ProgressBar";
import type { ImageFormat } from "./FormatSelector";

export type ConversionStatus = "pending" | "converting" | "completed" | "error";

export interface ImageItem {
  id: string;
  file: File;
  preview: string;
  status: ConversionStatus;
  progress: number;
  targetFormat: ImageFormat;
  convertedBlob?: Blob;
  error?: string;
}

interface ImageCardProps {
  image: ImageItem;
  onDownload: (id: string) => void;
  onRemove: (id: string) => void;
  onFormatChange: (id: string, format: ImageFormat) => void;
  onReconvert: (id: string) => void;
}

const formatOptions: ImageFormat[] = ["jpeg", "png", "webp", "gif", "bmp", "tiff", "ico"];

export function ImageCard({ image, onDownload, onRemove, onFormatChange, onReconvert }: ImageCardProps) {
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
          <div className="flex items-center gap-2 mt-1">
            <p className="text-xs text-muted-foreground">
              {formatFileSize(image.file.size)} →
            </p>
            <Select
              value={image.targetFormat}
              onValueChange={(value) => onFormatChange(image.id, value as ImageFormat)}
              disabled={image.status === "converting"}
            >
              <SelectTrigger className="h-6 w-20 text-xs" data-testid={`select-format-${image.id}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {formatOptions.map((format) => (
                  <SelectItem key={format} value={format}>
                    {format.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {getStatusIcon()}
          
          {image.status === "completed" && (
            <>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onDownload(image.id)}
                data-testid={`button-download-${image.id}`}
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onReconvert(image.id)}
                data-testid={`button-reconvert-${image.id}`}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </>
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
