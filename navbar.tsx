
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full z-50 p-6 md:p-8 flex justify-between items-center border-b border-black/10">
      <div className="flex flex-col">
        <span className="font-display font-black text-sm tracking-tighter uppercase text-dark leading-none">
          Living The Why Not
        </span>
        <span className="font-mono text-[8px] text-posterOrange uppercase tracking-[0.3em] mt-1 font-bold">@maheyshjadhav</span>
      </div>
      <div className="flex gap-6 md:gap-8 text-[10px] md:text-xs font-mono uppercase tracking-widest text-dark/80 font-bold">
        <a href="#philosophy" className="hover:text-posterOrange transition-colors">Philosophy</a>
        <a href="#archives" className="hover:text-posterOrange transition-colors">Archives</a>
        <a href="#contact" className="hover:text-posterOrange transition-colors">Social</a>
      </div>
    </nav>
  );
};

export default Navbar;
