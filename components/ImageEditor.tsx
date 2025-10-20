
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
// FIX: Import the 'Draw' type from '../hooks/useDraw' to fix the 'Cannot find name 'Draw'' error.
import { useDraw, type Draw } from '../hooks/useDraw';
import { BrushIcon } from './icons/BrushIcon';
import { EraserIcon } from './icons/EraserIcon';
import { MagicWandIcon } from './icons/MagicWandIcon';

interface ImageEditorProps {
  imageSrc: string;
  onRemoveObject: (imageEl: HTMLImageElement, canvasEl: HTMLCanvasElement) => void;
  onEnhance: () => void;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ imageSrc, onRemoveObject, onEnhance }) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);

  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
    const { x: currX, y: currY } = currentPoint;
    const lineColor = '#ef4444'; // red brush
    const lineWidth = 15;
    let startPoint = prevPoint ?? currentPoint;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();
    ctx.fillStyle = lineColor;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, lineWidth/2, 0, 2 * Math.PI);
    ctx.fill();
  }
  
  useEffect(() => {
    const image = imageRef.current;
    const canvas = canvasRef.current;
    if (image && canvas) {
      const resizeCanvas = () => {
        canvas.width = image.clientWidth;
        canvas.height = image.clientHeight;
      };
      image.onload = resizeCanvas;
      window.addEventListener('resize', resizeCanvas);
      if (image.complete) {
        resizeCanvas();
      }
      return () => {
        window.removeEventListener('resize', resizeCanvas);
      };
    }
  }, [imageSrc, canvasRef]);

  const handleRemove = () => {
    if (imageRef.current && canvasRef.current) {
        onRemoveObject(imageRef.current, canvasRef.current);
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 items-center justify-center">
      <div className="relative w-full max-w-3xl aspect-[4/3] bg-black/20 rounded-xl overflow-hidden shadow-2xl shadow-black/30">
        <img
          ref={imageRef}
          src={imageSrc}
          alt="User upload"
          className="w-full h-full object-contain"
          crossOrigin="anonymous"
        />
        <canvas
          ref={canvasRef}
          onMouseDown={onMouseDown}
          className="absolute top-0 left-0 w-full h-full cursor-crosshair"
        />
      </div>
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-64 flex flex-col gap-4 p-4 bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-xl">
        <h3 className="text-xl font-bold text-center">Tools</h3>
        <p className="text-sm text-slate-400 text-center">Use the brush to select an object you want to remove.</p>
        <div className="flex justify-center gap-2">
            <button className="p-3 bg-cyan-500/20 text-cyan-400 rounded-lg border border-cyan-500/50">
                <BrushIcon />
            </button>
            <button onClick={clear} className="p-3 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 rounded-lg border border-slate-600">
                <EraserIcon />
            </button>
        </div>
        <hr className="border-slate-700 my-2" />
        <button
          onClick={handleRemove}
          className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg shadow-purple-600/30 transition-all duration-300 hover:scale-105"
        >
          Remove Object
        </button>
        <button
          onClick={onEnhance}
          className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105"
        >
          <MagicWandIcon />
          Enhance & Upscale
        </button>
      </motion.div>
    </div>
  );
};

export default ImageEditor;