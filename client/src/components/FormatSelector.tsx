import { FileImage, FileCode, FileType, Image as ImageLucide } from "lucide-react";

export type ImageFormat = "jpeg" | "png" | "webp" | "gif" | "bmp" | "tiff" | "ico";

interface FormatOption {
  value: ImageFormat;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const formatOptions: FormatOption[] = [
  {
    value: "jpeg",
    label: "JPG",
    icon: <FileImage className="h-5 w-5" />,
    description: "Best for photos",
  },
  {
    value: "png",
    label: "PNG",
    icon: <ImageLucide className="h-5 w-5" />,
    description: "Lossless compression",
  },
  {
    value: "webp",
    label: "WebP",
    icon: <ImageLucide className="h-5 w-5" />,
    description: "Modern web format",
  },
  {
    value: "gif",
    label: "GIF",
    icon: <FileType className="h-5 w-5" />,
    description: "Animations supported",
  },
  {
    value: "bmp",
    label: "BMP",
    icon: <FileImage className="h-5 w-5" />,
    description: "Uncompressed",
  },
  {
    value: "tiff",
    label: "TIFF",
    icon: <FileCode className="h-5 w-5" />,
    description: "High quality",
  },
  {
    value: "ico",
    label: "ICO",
    icon: <FileImage className="h-5 w-5" />,
    description: "Icon format",
  },
];

interface FormatSelectorProps {
  selectedFormat: ImageFormat;
  onFormatChange: (format: ImageFormat) => void;
}

export function FormatSelector({ selectedFormat, onFormatChange }: FormatSelectorProps) {
  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold text-foreground mb-4">Convert to:</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {formatOptions.map((format) => (
          <button
            key={format.value}
            onClick={() => onFormatChange(format.value)}
            data-testid={`button-format-${format.value}`}
            className={`
              flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all
              hover-elevate active-elevate-2
              ${
                selectedFormat === format.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground"
              }
            `}
          >
            {format.icon}
            <span className="font-medium text-sm">{format.label}</span>
            <span className="text-xs opacity-80">{format.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
