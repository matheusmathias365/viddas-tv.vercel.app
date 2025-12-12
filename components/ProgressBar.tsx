import React, { useEffect, useState } from 'react';

interface ProgressBarProps {
  duration: number;
  resetKey: number; // Used to restart animation
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ duration, resetKey }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Reset immediately
    setWidth(0);
    
    // Small delay to allow react to render the 0 width, then trigger transition
    const timer = setTimeout(() => {
      setWidth(100);
    }, 50);

    return () => clearTimeout(timer);
  }, [resetKey]);

  return (
    <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-800/30 z-50">
      <div 
        className="h-full bg-blue-500 linear"
        style={{ 
          width: `${width}%`, 
          transition: `width ${duration}ms linear` 
        }}
      />
    </div>
  );
};