
import React, { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageUpload(e.dataTransfer.files[0]);
    }
  }, [onImageUpload]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-2xl mx-auto text-center flex flex-col items-center">
        <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-slate-100 to-slate-400 text-transparent bg-clip-text">
            Restore. Remove. Enhance.
        </motion.h1>
        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-400 mb-8">
            Perfect your photos in one click. Upload any blurred or unclear photo to begin.
        </motion.p>
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full"
        >
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onClick={handleClick}
            className={`relative w-full h-64 border-2 border-dashed rounded-2xl flex flex-col justify-center items-center cursor-pointer transition-all duration-300
            ${isDragging ? 'border-cyan-400 bg-slate-800/80' : 'border-slate-700 bg-slate-800/50'}`}
        >
            <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${isDragging ? 'shadow-[inset_0_0_20px_rgba(56,189,248,0.4),0_0_20px_rgba(56,189,248,0.2)]' : ''}`}></div>
            <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleFileChange}
            />
            <p className="text-slate-400">Drag & Drop your image here</p>
            <p className="text-slate-500 text-sm mt-2">or</p>
            <button
            type="button"
            className="mt-4 px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-colors"
            >
            Browse Files
            </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ImageUploader;
