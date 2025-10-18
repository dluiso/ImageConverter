import { DownloadSection } from "../DownloadSection";
import { ThemeProvider } from "../ThemeProvider";

export default function DownloadSectionExample() {
  return (
    <ThemeProvider>
      <div className="min-h-screen relative">
        <div className="p-8 pb-32">
          <p className="text-muted-foreground">Scroll down to see the download section at the bottom</p>
        </div>
        <DownloadSection
          completedCount={5}
          totalCount={5}
          onDownloadAll={() => console.log("Download all clicked")}
          isProcessing={false}
        />
      </div>
    </ThemeProvider>
  );
}
