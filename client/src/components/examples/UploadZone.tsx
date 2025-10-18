import { UploadZone } from "../UploadZone";
import { ThemeProvider } from "../ThemeProvider";

export default function UploadZoneExample() {
  const handleFiles = (files: File[]) => {
    console.log("Files selected:", files);
  };

  return (
    <ThemeProvider>
      <div className="p-8 max-w-2xl">
        <UploadZone onFilesSelected={handleFiles} />
      </div>
    </ThemeProvider>
  );
}
