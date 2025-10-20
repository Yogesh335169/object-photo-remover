
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full p-8 text-center text-slate-400 text-sm z-20">
      <p>&copy; {new Date().getFullYear()} PhotoForge AI. All rights reserved.</p>
      <div className="flex justify-center space-x-4 mt-2">
        <a href="#" className="hover:text-cyan-400 transition-colors duration-300">Privacy Policy</a>
        <a href="#" className="hover:text-cyan-400 transition-colors duration-300">Terms of Service</a>
      </div>
    </footer>
  );
};

export default Footer;
