import React, { useState, useEffect } from 'react';
import { SLIDES, SLIDE_DURATION_MS } from './constants';
import { SlideRenderer } from './components/SlideRenderer';
import { ProgressBar } from './components/ProgressBar';
import { NewsTicker } from './components/NewsTicker';
import { Clock, Phone, MapPin } from 'lucide-react';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentSlide = SLIDES[currentIndex];
  // Determine duration: Use slide-specific duration if available, otherwise default
  const activeSlideDuration = currentSlide.duration || SLIDE_DURATION_MS;

  // Auto-rotate logic with dynamic duration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(true);
      
      // Allow fade out before changing index
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
        setIsTransitioning(false);
      }, 1000); // Wait for full transition duration (1000ms) to switch content

    }, activeSlideDuration);

    return () => clearTimeout(timer);
  }, [currentIndex, activeSlideDuration]);

  // Format Time for the footer
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden bg-black relative flex flex-col">
      
      {/* Main Content Area */}
      <div className="flex-grow relative overflow-hidden bg-slate-900">
        <div 
          className={`w-full h-full transition-opacity duration-1000 ease-in-out ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
        >
          <SlideRenderer data={currentSlide} />
        </div>
        
        {/* Progress Bar anchored to bottom of content area */}
        <ProgressBar duration={activeSlideDuration} resetKey={currentIndex} />
      </div>

      {/* Footer System */}
      <div className="h-32 flex flex-col z-50">
        
        {/* News Ticker Bar (Top part of footer) */}
        <div className="h-10 border-b border-slate-200">
          <NewsTicker />
        </div>

        {/* Main Footer Info (Bottom part) */}
        <div className="flex-1 bg-white flex items-center justify-between px-8 shadow-2xl relative z-20">
          
          {/* Logo / Brand Area */}
          <div className="flex items-center space-x-4 border-r border-slate-200 pr-8 h-full">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-3 rounded-lg shadow-lg">
                  <span className="font-extrabold text-white text-2xl tracking-tighter">VIDDAS</span>
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-slate-800 font-bold text-lg leading-none tracking-wide">MÉDICOS E</span>
                <span className="text-blue-600 font-bold text-lg leading-none tracking-wide">DIAGNÓSTICOS</span>
              </div>
          </div>

          {/* Contact & Location Info */}
          <div className="flex space-x-12 text-slate-600 font-medium text-lg">
              <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-slate-700">Rua 24 de Maio, 206 - Centro, Alagoinhas - BA</span>
              </div>
              <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full text-green-600">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="text-slate-900 font-bold text-xl">(75) 3182-5656</span>
              </div>
          </div>

          {/* Clock Widget */}
          <div className="flex items-center space-x-4 pl-8 border-l border-slate-200 h-full">
              <div className="text-right">
                 <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                   {currentTime.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                 </div>
                 <div className="text-4xl font-bold text-slate-800 tabular-nums leading-none">
                    {currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                 </div>
              </div>
              <Clock className="w-8 h-8 text-blue-500 mb-1" />
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;