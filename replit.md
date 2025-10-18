# Image Converter

## Overview

This is a client-side image conversion web application that allows users to convert images between multiple formats (JPEG, PNG, WebP, GIF, BMP, TIFF, ICO) instantly in the browser. The application prioritizes user privacy by performing all conversions client-side without uploading files to any server. It features drag-and-drop upload, bulk conversion with progress tracking, and the ability to download all converted images as a ZIP file.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool

**Routing**: Wouter for lightweight client-side routing

**State Management**: 
- React hooks for local component state
- TanStack Query (React Query) for server state management (though this application is primarily client-side)

**UI Component Library**: shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling

**Design System**:
- Hybrid approach inspired by Linear's minimalist clarity and Dropbox's file management UI
- Custom color palette defined for both light and dark modes
- Typography using Inter font from Google Fonts
- Tailwind-based spacing system with consistent units

**Theme Support**: Custom ThemeProvider component managing light/dark mode with localStorage persistence

**Key Features**:
- **Client-side Image Conversion**: Uses HTML5 Canvas API to convert images entirely in the browser without server uploads
- **Drag-and-Drop Upload**: UploadZone component with file validation (max 20 files, 5MB per file, 25MB total)
- **Progress Tracking**: Individual image conversion progress and overall batch progress with elapsed time display
- **Bulk Download**: JSZip integration for downloading all converted images as a single ZIP file
- **Format Selection**: Support for 7 image formats with per-image format selection or batch format setting

### Backend Architecture

**Server Framework**: Express.js with TypeScript

**Development Setup**: 
- Vite middleware mode for development with HMR (Hot Module Replacement)
- Static file serving in production

**Database ORM**: Drizzle ORM configured for PostgreSQL (via Neon serverless driver)

**Schema**: Basic user table structure defined but not actively used in current implementation (suggests authentication features may be planned)

**Storage**: In-memory storage implementation (MemStorage) for development, with interface designed for future database integration

**Note**: The backend is minimal in this application since all image processing occurs client-side. The server primarily serves the static frontend and could be extended for user authentication or conversion history tracking.

### Core Design Patterns

**Component Composition**: Heavy use of Radix UI primitives wrapped with custom styling for consistent, accessible UI components

**Type Safety**: Full TypeScript implementation across client and server with shared types in `/shared` directory

**Separation of Concerns**: 
- UI components in `/client/src/components`
- Page components in `/client/src/pages`
- Utility functions in `/client/src/lib`
- Shared schemas and types in `/shared`

**Progressive Enhancement**: Client-side conversion ensures functionality without backend dependencies, making the app resilient and privacy-focused

### External Dependencies

**UI & Styling**:
- Radix UI component primitives (@radix-ui/react-*)
- Tailwind CSS for utility-first styling
- class-variance-authority (CVA) for component variant management
- Lucide React for icons
- Google Fonts (Inter) for typography

**Client-side Processing**:
- JSZip for creating downloadable ZIP archives
- HTML5 Canvas API (native) for image conversion

**Form Handling**:
- React Hook Form with Zod resolvers for validation

**Date Utilities**:
- date-fns for date formatting and manipulation

**Database & ORM**:
- Drizzle ORM for type-safe database operations
- @neondatabase/serverless for PostgreSQL connection
- drizzle-zod for schema validation integration

**Build Tools**:
- Vite for development server and production builds
- esbuild for server-side bundling
- PostCSS with Autoprefixer

**Development Tools**:
- Replit-specific plugins for development environment integration
- TSX for running TypeScript in Node.js

**State Management**:
- TanStack Query (React Query) for async state management

**Routing**:
- Wouter for lightweight client-side routing