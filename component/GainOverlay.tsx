
import React from 'react';

const GrainOverlay: React.FC = () => {
  return (
    <div 
      className="fixed top-0 left-0 h-full w-full pointer-events-none z-[100] opacity-[0.04]"
      style={{
        backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Noise_Texture.png')`,
        backgroundRepeat: 'repeat',
      }}
    />
  );
};

export default GrainOverlay;
