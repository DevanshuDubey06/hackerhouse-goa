'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, ZoomIn, ZoomOut, RotateCcw, Move } from 'lucide-react';

interface PhotoUploaderProps {
  onPhotoChange: (photo: string | null) => void;
  currentPhoto: string | null;
}

const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB
const SUPPORTED_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
  'image/heic-sequence',
];

export function PhotoUploader({
  onPhotoChange,
  currentPhoto,
}: PhotoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProcessingHeic, setIsProcessingHeic] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDraggingPhoto, setIsDraggingPhoto] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    async (file: File) => {
      setError(null);
      const filename = (file.name || '').toLowerCase();
      const isHeic =
        file.type.includes('heic') ||
        file.type.includes('heif') ||
        filename.endsWith('.heic') ||
        filename.endsWith('.heif');

      if (!isHeic && !file.type.startsWith('image/') && !SUPPORTED_TYPES.includes(file.type)) {
        setError('Unsupported format. Use JPG, PNG, WEBP, or HEIC (iPhone photo).');
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setError('Photo too large. Try a file under 15MB.');
        return;
      }

      if (isHeic) {
        try {
          setIsProcessingHeic(true);
          const heic2any = (await import('heic2any')).default;
          const convertedBlob = await heic2any({
            blob: file,
            toType: 'image/jpeg',
            quality: 0.9,
          });

          const blobToUse = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
          const reader = new FileReader();
          reader.onload = (e) => {
            const result = e.target?.result as string;
            onPhotoChange(result);
            setZoom(1);
            setPosition({ x: 0, y: 0 });
            setIsProcessingHeic(false);
          };
          reader.readAsDataURL(blobToUse);
          return;
        } catch (err) {
          console.warn('[HEIC conversion fallback]:', err);
          setIsProcessingHeic(false);
        }
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onPhotoChange(result);
        setZoom(1);
        setPosition({ x: 0, y: 0 });
      };
      reader.readAsDataURL(file);
    },
    [onPhotoChange]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleRemove = useCallback(() => {
    onPhotoChange(null);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [onPhotoChange]);

  const handleReset = useCallback(() => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  // Pan handling
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!currentPhoto) return;
      setIsDraggingPhoto(true);
      dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    },
    [currentPhoto, position]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingPhoto) return;
      setPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y,
      });
    };
    const handleMouseUp = () => setIsDraggingPhoto(false);

    if (isDraggingPhoto) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingPhoto]);

  return (
    <div>
      <AnimatePresence mode="wait">
        {!currentPhoto ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Drop zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed cursor-pointer transition-all p-8 text-center ${
                isDragging
                  ? 'border-hot-pink bg-hot-pink/5'
                  : 'border-dark-ink/30 hover:border-hot-pink/50 bg-cream-light'
              }`}
              role="button"
              tabIndex={0}
              aria-label="Upload photo"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  fileInputRef.current?.click();
                }
              }}
            >
              <Upload
                className={`mx-auto mb-3 ${
                  isDragging ? 'text-hot-pink' : 'text-dark-ink/30'
                }`}
                size={32}
              />
              <p className="font-display text-lg text-dark-ink font-bold mb-1">
                Drop Your Photo
              </p>
              <p className="text-label text-xs text-dark-ink/50 mb-4">
                or click to browse
              </p>
              <span className="btn-primary text-xs">Upload Photo</span>
              <p className="text-label text-xs text-dark-ink/30 mt-4">
                JPG, PNG, WEBP, HEIC (iPhone) &middot; MAX 15MB
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif,image/*"
              onChange={handleFileSelect}
              className="hidden"
              aria-label="Select photo file"
            />
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Photo preview with controls */}
            <div
              className="relative aspect-square bg-dark-ink overflow-hidden cursor-move"
              style={{ border: '2px solid #17251C' }}
              onMouseDown={handleMouseDown}
            >
              <img
                src={currentPhoto}
                alt="Uploaded photo"
                className="w-full h-full object-cover select-none"
                draggable={false}
                style={{
                  transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                  transition: isDraggingPhoto ? 'none' : 'transform 0.2s ease',
                }}
              />

              {/* Remove button */}
              <button
                onClick={handleRemove}
                className="absolute top-2 right-2 bg-hot-pink text-white p-1.5 hover:bg-hot-pink-dark transition-colors"
                aria-label="Remove photo"
              >
                <X size={16} />
              </button>

              {/* Pan indicator */}
              <div className="absolute bottom-2 left-2 bg-dark-ink/60 text-cream text-label text-xs px-2 py-1 flex items-center gap-1">
                <Move size={10} />
                Drag to reposition
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                className="p-2 bg-cream border-2 border-dark-ink hover:bg-cream-dark transition-colors"
                aria-label="Zoom out"
              >
                <ZoomOut size={14} className="text-dark-ink" />
              </button>

              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.05"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="flex-1 accent-hot-pink h-1"
                aria-label="Zoom level"
              />

              <button
                onClick={() => setZoom(Math.min(2.5, zoom + 0.1))}
                className="p-2 bg-cream border-2 border-dark-ink hover:bg-cream-dark transition-colors"
                aria-label="Zoom in"
              >
                <ZoomIn size={14} className="text-dark-ink" />
              </button>

              <button
                onClick={handleReset}
                className="p-2 bg-cream border-2 border-dark-ink hover:bg-cream-dark transition-colors ml-1"
                aria-label="Reset position"
              >
                <RotateCcw size={14} className="text-dark-ink" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-3 bg-hot-pink/10 border border-hot-pink/30 text-hot-pink text-label text-xs"
        >
          {error}
        </motion.div>
      )}
    </div>
  );
}
