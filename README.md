# Image Format Converter

A modern, privacy-focused web application for converting images between multiple formats entirely in your browser. No uploads, no tracking - all processing happens client-side using the Canvas API.

## Features

- **7 Image Formats**: Convert between JPG, PNG, WebP, GIF, BMP, TIFF, and ICO
- **Bulk Conversion**: Upload up to 20 images (5MB each, 25MB total)
- **Manual Control**: "Convert Now" button for on-demand conversion
- **Re-conversion**: Change formats and re-convert without page reload
- **Privacy First**: All conversions happen in your browser - files never leave your device
- **Dark Mode**: Toggle between light and dark themes
- **Progress Tracking**: Real-time progress for individual and batch conversions
- **Flexible Downloads**: Download individually or as a ZIP file
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: Radix UI, shadcn/ui
- **State Management**: TanStack Query
- **Routing**: Wouter
- **Build Tool**: Vite
- **Backend**: Express.js (serves static frontend)

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/dluiso/ImageConverter.git
cd image-converter
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

### Build for Production

```bash
npm run build
npm start
```

## Docker Deployment

### Using Docker

1. Build the image:
```bash
docker build -t image-converter .
```

2. Run the container:
```bash
docker run -d -p 5000:5000 --name image-converter-app image-converter
```

The application will be available at `http://localhost:5000`

### Using Docker Compose

1. Start the application:
```bash
docker-compose up -d
```

2. Stop the application:
```bash
docker-compose down
```

3. View logs:
```bash
docker-compose logs -f
```

### Docker Health Check

The container includes a built-in health check that verifies the application is running properly. Check status:

```bash
docker ps
```

Look for "healthy" in the STATUS column.

## Environment Variables

The application works without any environment variables. Optional configurations:

- `NODE_ENV`: Set to `production` or `development` (default: `development`)
- `PORT`: Server port (default: `5000`)

## Project Structure

```
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── lib/         # Utility functions and helpers
│   │   └── App.tsx      # Main application component
├── server/              # Express backend
│   ├── index.ts         # Server entry point
│   └── routes.ts        # API routes (if any)
├── shared/              # Shared types and schemas
├── Dockerfile           # Docker configuration
├── docker-compose.yml   # Docker Compose configuration
└── package.json         # Project dependencies
```

## Usage Guide

1. **Select Format**: Choose your target format from the selector at the top
2. **Upload Images**: Drag and drop images or click to browse
3. **Convert**: Click "Convert Now" to start batch conversion
4. **Download**: Download individual images or all as a ZIP file
5. **Re-convert**: Change any image's format and click the refresh icon to re-convert

## File Limitations

- Maximum file size: 5MB per image
- Maximum total size: 25MB
- Maximum files: 20 images per batch
- Supported input formats: All common image formats (JPG, PNG, GIF, WebP, BMP, TIFF, ICO)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE). You may use, copy, modify, distribute, and use it commercially under the terms of that license.

## Privacy

This application processes all images entirely in your browser using the Canvas API. No files are uploaded to any server. Your images never leave your device.
