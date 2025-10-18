import { ImageCard, type ImageItem } from "../ImageCard";
import { ThemeProvider } from "../ThemeProvider";

const mockImage: ImageItem = {
  id: "1",
  file: new File([""], "vacation-photo.jpg", { type: "image/jpeg" }),
  preview: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%236366f1' width='100' height='100'/%3E%3C/svg%3E",
  status: "completed",
  progress: 100,
};

export default function ImageCardExample() {
  return (
    <ThemeProvider>
      <div className="p-8 max-w-md">
        <ImageCard
          image={mockImage}
          targetFormat="webp"
          onDownload={(id) => console.log("Download:", id)}
          onRemove={(id) => console.log("Remove:", id)}
        />
      </div>
    </ThemeProvider>
  );
}
