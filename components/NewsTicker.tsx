import React from 'react';
import { TICKER_MESSAGES } from '../constants';
import { Info } from 'lucide-react';

export const NewsTicker: React.FC = () => {
  // Join messages with a separator
  const content = TICKER_MESSAGES.join("  •  ");

  return (
    <div className="flex items-center h-full w-full overflow-hidden bg-slate-100 relative group">
      <div className="bg-blue-600 h-full px-4 flex items-center justify-center z-20 shadow-lg">
        <Info className="text-white w-6 h-6" />
        <span className="ml-2 font-bold text-white text-sm uppercase tracking-wider hidden md:block">Informativo</span>
      </div>
      
      <div className="ticker-wrap flex-1 flex items-center h-full">
        <div className="ticker text-slate-700 text-xl font-medium">
          {content} • {content} • {content}
        </div>
      </div>
      
      {/* Gradient overlay for smooth fade out on edges if needed, though simple solid bg is cleaner for signage */}
    </div>
  );
};