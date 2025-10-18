import { useState } from "react";
import { FormatSelector, type ImageFormat } from "../FormatSelector";
import { ThemeProvider } from "../ThemeProvider";

export default function FormatSelectorExample() {
  const [format, setFormat] = useState<ImageFormat>("webp");

  return (
    <ThemeProvider>
      <div className="p-8">
        <FormatSelector selectedFormat={format} onFormatChange={setFormat} />
        <p className="mt-4 text-sm text-muted-foreground">Selected: {format}</p>
      </div>
    </ThemeProvider>
  );
}
