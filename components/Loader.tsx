
import React from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  message: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8">
      <motion.div
        style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          border: '4px solid rgba(255, 255, 255, 0.2)',
          borderTopColor: '#38bdf8', // cyan-400
        }}
        animate={{ rotate: 360 }}
        transition={{
          loop: Infinity,
          ease: 'linear',
          duration: 1,
        }}
      />
      <p className="text-lg text-slate-300 font-medium">{message}</p>
    </div>
  );
};

export default Loader;
