import { useCallback, useState } from "react";
import { Upload, AlertCircle } from "lucide-react";

interface UploadZoneProps {
  onFilesSelected: (files: File[]) => void;
  disabled?: boolean;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_TOTAL_SIZE = 25 * 1024 * 1024;
const MAX_FILES = 20;

export function UploadZone({ onFilesSelected, disabled = false }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string>("");

  const validateFiles = useCallback((files: File[]): { valid: File[], error: string } => {
    if (files.length > MAX_FILES) {
      return { valid: [], error: `Maximum ${MAX_FILES} files allowed` };
    }

    const validFiles: File[] = [];
    let totalSize = 0;

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        return { valid: [], error: "Only image files are allowed" };
      }

      if (file.size > MAX_FILE_SIZE) {
        return { valid: [], error: `File "${file.name}" exceeds 5MB limit` };
      }

      totalSize += file.size;
      if (totalSize > MAX_TOTAL_SIZE) {
        return { valid: [], error: "Total size exceeds 25MB limit" };
      }

      validFiles.push(file);
    }

    return { valid: validFiles, error: "" };
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setError("");

    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    const { valid, error } = validateFiles(files);

    if (error) {
      setError(error);
      return;
    }

    onFilesSelected(valid);
  }, [disabled, validateFiles, onFilesSelected]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const files = Array.from(e.target.files || []);
    const { valid, error } = validateFiles(files);

    if (error) {
      setError(error);
      return;
    }

    onFilesSelected(valid);
    e.target.value = "";
  }, [validateFiles, onFilesSelected]);

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative flex flex-col items-center justify-center
          min-h-[240px] md:min-h-[320px]
          border-2 border-dashed rounded-xl
          transition-all duration-200
          ${isDragging
            ? "border-primary bg-primary/5 scale-[1.02]"
            : "border-border bg-background"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover-elevate"}
        `}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          disabled={disabled}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          data-testid="input-file-upload"
        />
        
        <Upload className={`h-16 w-16 mb-4 ${isDragging ? "text-primary" : "text-muted-foreground"}`} />
        
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {isDragging ? "Drop your images here" : "Drop images or click to upload"}
        </h3>
        
        <p className="text-sm text-muted-foreground text-center max-w-md">
          Support for JPG, PNG, GIF, WebP, BMP, TIFF, and ICO
        </p>
        
        <div className="mt-4 text-xs text-muted-foreground space-y-1 text-center">
          <p>Max file size: 5MB per image</p>
          <p>Max total size: 25MB • Max files: 20</p>
        </div>
      </div>

      {error && (
        <div className="mt-3 flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive border border-destructive/20">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <p className="text-sm" data-testid="text-upload-error">{error}</p>
        </div>
      )}
    </div>
  );
}
