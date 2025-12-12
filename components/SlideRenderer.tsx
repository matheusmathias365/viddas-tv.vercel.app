import React, { useState, useEffect } from 'react';
import { LayoutType, SlideData } from '../types';
import { CheckCircle2, CalendarCheck, ArrowRight, HeartPulse, Info, QrCode, Stethoscope } from 'lucide-react';

interface SlideRendererProps {
  data: SlideData;
}

const Wrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`w-full h-full ${className || ''}`}>
    {children}
  </div>
);

// Componente para alternar os itens um por um (Efeito "Piscar")
const CyclingItems: React.FC<{ items: string[] }> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!items || items.length === 0) return;

    // Reset index when items change
    setCurrentIndex(0);
    setIsVisible(true);

    const interval = setInterval(() => {
      // 1. Inicia o Fade Out
      setIsVisible(false);

      // 2. Aguarda o Fade Out terminar, troca o texto e inicia o Fade In
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
        setIsVisible(true);
      }, 300); // Faster transition (300ms)

    }, 2000); // 2 seconds per item

    return () => clearInterval(interval);
  }, [items]);

  return (
    <div className="mt-12 h-32 flex items-center">
      <div 
        className={`transform transition-all duration-300 ease-in-out flex items-center space-x-6 p-6 bg-white rounded-2xl shadow-lg border-l-8 border-blue-600 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}
      >
        <div className="bg-blue-100 p-3 rounded-full">
            <CheckCircle2 className="w-10 h-10 text-blue-600" />
        </div>
        <span className="text-5xl font-bold text-slate-800 tracking-tight">
          {items[currentIndex]}
        </span>
      </div>
    </div>
  );
};

export const SlideRenderer: React.FC<SlideRendererProps> = ({ data }) => {
  // Common Text Styles
  const titleClass = "text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-slide-up delay-100";
  const subtitleClass = `text-2xl md:text-3xl font-semibold mb-4 uppercase tracking-widest animate-slide-up ${data.accentColor || 'text-blue-600'}`;
  const descClass = "text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl animate-slide-up delay-200";

  // Mantemos o grid apenas para o layout INFO_GRID
  const GridItems = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 relative z-10 max-w-7xl mx-auto w-full">
        {data.items?.map((item, idx) => (
        <div 
            key={idx} 
            className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-start hover:shadow-lg transition-all duration-500 animate-slide-up"
            style={{ animationDelay: `${300 + (idx * 100)}ms` }}
        >
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
            <span className="text-blue-600 font-bold text-xl">{idx + 1}</span>
            </div>
            <p className="text-xl text-slate-700 font-medium leading-snug">{item}</p>
        </div>
        ))}
    </div>
  );

  switch (data.layout) {
    case LayoutType.SPLIT_LEFT:
      return (
        <Wrapper key={data.id} className="flex bg-slate-50">
          <div className="w-[45%] h-full relative overflow-hidden shadow-[4px_0_24px_rgba(0,0,0,0.1)] z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-transparent z-10" />
            <img 
              src={data.imageUrl} 
              alt={data.title} 
              className="w-full h-full object-cover animate-[ping_30s_linear_infinite] scale-105" 
              style={{ animation: 'kenburns 40s infinite alternate' }}
            />
          </div>
          <div className="w-[55%] h-full p-20 flex flex-col justify-center bg-grid-pattern relative">
             <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full" />
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4 animate-slide-up">
                 <Stethoscope className={`w-8 h-8 ${data.accentColor?.replace('text-', 'text-') || 'text-blue-600'}`} />
                 <h3 className={subtitleClass.replace('mb-4', 'mb-0')}>{data.subtitle}</h3>
              </div>
              <h1 className={`text-slate-900 ${titleClass}`}>{data.title}</h1>
              <div className="w-24 h-2 bg-blue-500 mb-8 rounded-full animate-slide-up delay-200" />
              <p className={descClass}>{data.description}</p>
              
              {/* Aqui usamos o CyclingItems em vez de listar todos */}
              {data.items && <CyclingItems items={data.items} />}
            </div>
          </div>
        </Wrapper>
      );

    case LayoutType.SPLIT_RIGHT:
      return (
        <Wrapper key={data.id} className="flex bg-slate-50">
          <div className="w-[55%] h-full p-20 pl-24 flex flex-col justify-center bg-grid-pattern relative">
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-50 to-transparent rounded-tr-full" />
             <div className="relative z-10">
                <h3 className={subtitleClass}>{data.subtitle}</h3>
                <h1 className={`text-slate-900 ${titleClass}`}>{data.title}</h1>
                <div className="w-24 h-2 bg-blue-500 mb-8 rounded-full animate-slide-up delay-200" />
                <p className={descClass}>{data.description}</p>
                
                {/* Aqui usamos o CyclingItems em vez de listar todos */}
                {data.items && <CyclingItems items={data.items} />}
             </div>
          </div>
          <div className="w-[45%] h-full relative overflow-hidden shadow-[-4px_0_24px_rgba(0,0,0,0.1)] z-10">
             <div className="absolute inset-0 bg-gradient-to-l from-blue-900/30 to-transparent z-10" />
            <img 
              src={data.imageUrl} 
              alt={data.title} 
              className="w-full h-full object-cover" 
              style={{ animation: 'kenburns 40s infinite alternate' }}
            />
          </div>
        </Wrapper>
      );

    case LayoutType.OVERLAY:
      return (
        <Wrapper key={data.id} className="relative">
          <div className="absolute inset-0 bg-blue-900/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/50 z-10" />
          
          <img 
            src={data.imageUrl} 
            alt={data.title} 
            className="w-full h-full object-cover" 
            style={{ animation: 'kenburns 40s infinite alternate' }}
          />
          
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-20">
            <div className="max-w-6xl p-12 bg-black/30 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl">
              <h3 className={`${data.accentColor || 'text-blue-300'} text-3xl font-bold tracking-[0.2em] uppercase mb-6 animate-slide-up`}>{data.subtitle}</h3>
              <h1 className="text-7xl md:text-8xl text-white font-bold mb-8 drop-shadow-lg animate-slide-up delay-100">{data.title}</h1>
              <p className="text-3xl text-white/90 leading-relaxed font-light animate-slide-up delay-200 max-w-4xl mx-auto">{data.description}</p>
            </div>
          </div>
        </Wrapper>
      );
    
    case LayoutType.CENTERED:
      return (
        <Wrapper key={data.id} className="bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          
          <div className="z-10 flex flex-row items-center gap-16 max-w-7xl mx-auto p-12">
            
            {/* Left Side: Content */}
            <div className="flex-1 text-left">
               <div className="inline-block px-4 py-2 bg-blue-600 rounded-lg text-sm font-bold uppercase tracking-widest mb-6 animate-slide-up">
                 {data.subtitle}
               </div>
               <h1 className="text-7xl font-bold mb-8 animate-slide-up delay-100 leading-tight">{data.title}</h1>
               <p className="text-2xl text-slate-300 leading-relaxed mb-10 animate-slide-up delay-200">{data.description}</p>
               
               <div className="flex items-center space-x-4 animate-slide-up delay-300">
                  <div className="p-4 bg-white/10 rounded-full">
                    <ArrowRight className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-3xl font-bold text-blue-400">(75) 3182-5656</span>
               </div>
            </div>

            {/* Right Side: Visual/QR */}
            <div className="w-96 h-96 bg-white p-6 rounded-3xl shadow-2xl flex flex-col items-center justify-center animate-slide-up delay-200 transform rotate-2">
                <QrCode className="w-64 h-64 text-slate-800 mb-4" />
                <span className="text-slate-500 font-semibold text-center text-sm uppercase tracking-wide">Aponte a câmera do celular</span>
            </div>

          </div>
        </Wrapper>
      );

    case LayoutType.INFO_GRID:
      return (
        <Wrapper key={data.id} className="bg-slate-50 flex flex-col p-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-green-500 to-blue-500"></div>
          
          <div className="text-center mb-12 relative z-10">
            <div className="flex items-center justify-center space-x-3 mb-4">
               <Info className="w-10 h-10 text-blue-600 animate-slide-up" />
               <h3 className="text-3xl font-bold text-blue-600 uppercase tracking-widest animate-slide-up">{data.subtitle}</h3>
            </div>
            <h1 className="text-6xl text-slate-800 font-bold animate-slide-up delay-100">{data.title}</h1>
            <p className="text-2xl text-slate-500 mt-4 animate-slide-up delay-200">{data.description}</p>
          </div>

          <GridItems />
          
          {/* Background decoration */}
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        </Wrapper>
      );

    default:
      return null;
  }
};