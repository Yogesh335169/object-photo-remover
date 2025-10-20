
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full p-4 flex justify-center items-center z-20">
      <div className="w-full max-w-6xl mx-auto">
        <nav className="bg-slate-800/30 backdrop-blur-lg border border-slate-700/50 rounded-xl p-4 flex justify-between items-center shadow-lg shadow-black/20">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
            PhotoForge AI
          </h1>
          <button className="px-4 py-2 text-sm font-medium bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(100,180,255,0.3)]">
            Try Demo
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
