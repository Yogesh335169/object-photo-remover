
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Workspace from './components/Workspace';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-700/[0.2] [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-20%] w-[40%] h-[40%] bg-gradient-to-r from-purple-600/50 to-blue-600/50 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[40%] h-[40%] bg-gradient-to-l from-pink-600/50 to-cyan-600/50 rounded-full filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
      </div>
      
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 z-10">
        <Workspace />
      </main>
      <Footer />
    </div>
  );
};

export default App;
