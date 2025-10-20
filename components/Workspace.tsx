
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppState, ImageData } from '../types';
import ImageUploader from './ImageUploader';
import ImageEditor from './ImageEditor';
import ComparisonSlider from './ComparisonSlider';
import Loader from './Loader';
import { DownloadIcon } from './icons/DownloadIcon';
import { removeObjectFromImage, enhanceImage } from '../services/geminiService';
import { fileToBase64, combineImageAndMask } from '../utils/imageUtils';

const Workspace: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback(async (file: File) => {
    setAppState(AppState.UPLOADING);
    setError(null);
    try {
      const base64 = await fileToBase64(file);
      setImageData({
        original: base64,
        edited: null,
        final: null,
        mimeType: file.type,
      });
      setAppState(AppState.EDITING);
    } catch (err) {
      setError('Failed to load image. Please try another file.');
      setAppState(AppState.ERROR);
    }
  }, []);

  const handleRemoveObject = useCallback(async (imageEl: HTMLImageElement, canvasEl: HTMLCanvasElement) => {
    if (!imageData) return;
    setAppState(AppState.PROCESSING_REMOVE);
    setError(null);
    try {
      const compositeImage = await combineImageAndMask(imageEl, canvasEl);
      const resultBase64 = await removeObjectFromImage(compositeImage, imageData.mimeType);
      setImageData(prev => prev ? { ...prev, edited: `data:${imageData.mimeType};base64,${resultBase64}` } : null);
      setAppState(AppState.EDITING); // Go back to editing for further changes or enhancement
    } catch (err) {
      console.error(err);
      setError('Failed to remove object. Please try again.');
      setAppState(AppState.ERROR);
    }
  }, [imageData]);

  const handleEnhanceImage = useCallback(async () => {
    if (!imageData || (!imageData.edited && !imageData.original)) return;
    setAppState(AppState.PROCESSING_ENHANCE);
    setError(null);
    const imageToEnhance = imageData.edited || imageData.original;
    try {
      const resultBase64 = await enhanceImage(imageToEnhance, imageData.mimeType);
      setImageData(prev => prev ? { ...prev, final: `data:${imageData.mimeType};base64,${resultBase64}` } : null);
      setAppState(AppState.DONE);
    } catch (err) {
      console.error(err);
      setError('Failed to enhance image. Please try again.');
      setAppState(AppState.ERROR);
    }
  }, [imageData]);

  const handleDownload = () => {
    if (!imageData?.final) return;
    const link = document.createElement('a');
    link.href = imageData.final;
    link.download = 'photoforge_enhanced.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleReset = () => {
    setAppState(AppState.IDLE);
    setImageData(null);
    setError(null);
  };

  const renderContent = () => {
    switch (appState) {
      case AppState.IDLE:
        return <ImageUploader onImageUpload={handleImageUpload} />;
      case AppState.UPLOADING:
        return <Loader message="Uploading your masterpiece..." />;
      case AppState.EDITING:
        if (!imageData) return <ImageUploader onImageUpload={handleImageUpload} />;
        return <ImageEditor
          imageSrc={imageData.edited || imageData.original}
          onRemoveObject={handleRemoveObject}
          onEnhance={handleEnhanceImage}
        />;
      case AppState.PROCESSING_REMOVE:
        return <Loader message="AI is magically removing the object..." />;
      case AppState.PROCESSING_ENHANCE:
        return <Loader message="Enhancing details & upscaling quality..." />;
      case AppState.DONE:
        if (!imageData?.final || !imageData?.original) return null;
        return (
          <div className="flex flex-col items-center gap-6">
            <h2 className="text-3xl font-bold text-center">Your Photo is Ready!</h2>
            <ComparisonSlider
              beforeImage={imageData.original}
              afterImage={imageData.final}
            />
            <div className="flex items-center gap-4">
              <motion.button
                onClick={handleDownload}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/30 transition-all duration-300"
              >
                <DownloadIcon />
                Download HD
              </motion.button>
              <button onClick={handleReset} className="px-6 py-3 text-slate-300 hover:text-white">Start Over</button>
            </div>
          </div>
        );
      case AppState.ERROR:
        return (
            <div className="text-center p-8 bg-red-900/20 border border-red-500/50 rounded-lg">
                <h3 className="text-xl text-red-400 font-semibold mb-2">An Error Occurred</h3>
                <p className="text-slate-300 mb-4">{error}</p>
                <button onClick={handleReset} className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg">Try Again</button>
            </div>
        )
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-6xl p-4 min-h-[600px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={appState}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Workspace;
