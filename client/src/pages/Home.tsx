import { useState, useCallback, useEffect } from "react";
import JSZip from "jszip";
import { Header } from "@/components/Header";
import { FormatSelector, type ImageFormat } from "@/components/FormatSelector";
import { UploadZone } from "@/components/UploadZone";
import { ImageCard, type ImageItem } from "@/components/ImageCard";
import { OverallProgress } from "@/components/OverallProgress";
import { DownloadSection } from "@/components/DownloadSection";
import { convertImage, generateFileName } from "@/lib/imageConverter";

export default function Home() {
  const [selectedFormat, setSelectedFormat] = useState<ImageFormat>("webp");
  const [images, setImages] = useState<ImageItem[]>([]);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isConverting, setIsConverting] = useState(false);

  useEffect(() => {
    if (!isConverting || images.length === 0) return;

    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isConverting, images.length]);

  const handleFilesSelected = useCallback((files: File[]) => {
    const newImages: ImageItem[] = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
      status: "pending" as const,
      progress: 0,
    }));

    setImages((prev) => [...prev, ...newImages]);
    setElapsedSeconds(0);
    setIsConverting(true);

    newImages.forEach((image) => {
      convertSingleImage(image);
    });
  }, [selectedFormat]);

  const convertSingleImage = async (image: ImageItem) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === image.id ? { ...img, status: "converting" as const } : img
      )
    );

    try {
      const blob = await convertImage(
        image.file,
        selectedFormat,
        (progress) => {
          setImages((prev) =>
            prev.map((img) =>
              img.id === image.id ? { ...img, progress } : img
            )
          );
        }
      );

      setImages((prev) =>
        prev.map((img) =>
          img.id === image.id
            ? { ...img, status: "completed" as const, convertedBlob: blob, progress: 100 }
            : img
        )
      );
    } catch (error) {
      setImages((prev) =>
        prev.map((img) =>
          img.id === image.id
            ? {
                ...img,
                status: "error" as const,
                error: error instanceof Error ? error.message : "Conversion failed",
              }
            : img
        )
      );
    }
  };

  const handleDownload = useCallback((id: string) => {
    const image = images.find((img) => img.id === id);
    if (!image || !image.convertedBlob) return;

    const url = URL.createObjectURL(image.convertedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = generateFileName(image.file.name, selectedFormat);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [images, selectedFormat]);

  const handleRemove = useCallback((id: string) => {
    setImages((prev) => {
      const image = prev.find((img) => img.id === id);
      if (image) {
        URL.revokeObjectURL(image.preview);
      }
      return prev.filter((img) => img.id !== id);
    });
  }, []);

  const handleDownloadAll = useCallback(async () => {
    const completedImages = images.filter((img) => img.status === "completed" && img.convertedBlob);
    
    if (completedImages.length === 0) return;

    const zip = new JSZip();

    completedImages.forEach((image) => {
      const fileName = generateFileName(image.file.name, selectedFormat);
      zip.file(fileName, image.convertedBlob!);
    });

    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `converted-images-${selectedFormat}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [images, selectedFormat]);

  const completedCount = images.filter((img) => img.status === "completed").length;
  const hasImages = images.length > 0;

  useEffect(() => {
    if (completedCount === images.length && images.length > 0) {
      setIsConverting(false);
    }
  }, [completedCount, images.length]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 md:px-8 py-8 pb-24">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Convert Images Instantly
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Transform your images to any format with secure client-side conversion.
              Your files never leave your device.
            </p>
          </div>

          <FormatSelector
            selectedFormat={selectedFormat}
            onFormatChange={setSelectedFormat}
          />

          {!hasImages ? (
            <UploadZone onFilesSelected={handleFilesSelected} />
          ) : (
            <div className="space-y-4">
              <OverallProgress
                completedCount={completedCount}
                totalCount={images.length}
                elapsedSeconds={elapsedSeconds}
              />

              <div className="space-y-3">
                {images.map((image) => (
                  <ImageCard
                    key={image.id}
                    image={image}
                    targetFormat={selectedFormat}
                    onDownload={handleDownload}
                    onRemove={handleRemove}
                  />
                ))}
              </div>

              <UploadZone
                onFilesSelected={handleFilesSelected}
                disabled={isConverting}
              />
            </div>
          )}
        </div>
      </main>

      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <p>All conversions happen in your browser. Files never leave your device.</p>
      </footer>

      <DownloadSection
        completedCount={completedCount}
        totalCount={images.length}
        onDownloadAll={handleDownloadAll}
        isProcessing={isConverting}
      />
    </div>
  );
}
