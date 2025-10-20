
import React, { useState, useRef } from 'react';
import { motion, PanInfo } from 'framer-motion';

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
}

const ComparisonSlider: React.FC<ComparisonSliderProps> = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const newPosition = (info.point.x - containerRef.current.getBoundingClientRect().left) / containerWidth * 100;
      setSliderPosition(Math.max(0, Math.min(100, newPosition)));
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-3xl aspect-[4/3] rounded-xl overflow-hidden cursor-ew-resize select-none shadow-2xl shadow-black/30"
    >
      <img
        src={beforeImage}
        alt="Before"
        className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
      />
      <motion.div
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
        animate={{ width: `${sliderPosition}%` }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <img
          src={afterImage}
          alt="After"
          className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
          style={{ width: containerRef.current?.offsetWidth }}
        />
      </motion.div>
      <motion.div
        className="absolute top-0 h-full w-1 bg-white/50 backdrop-blur-sm cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
        drag="x"
        dragConstraints={containerRef}
        dragElastic={0.1}
        dragMomentum={false}
        onDrag={handleDrag}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/50 backdrop-blur-lg border-2 border-white/80 flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

export default ComparisonSlider;
