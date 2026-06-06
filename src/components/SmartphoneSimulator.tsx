/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, MouseEvent } from 'react';
import { WidgetType } from '../types';
import WidgetCandlestick from './WidgetCandlestick';
import WidgetSignals from './WidgetSignals';
import WidgetCockpit from './WidgetCockpit';
import WidgetMetrics from './WidgetMetrics';
import { Battery, Wifi, Signal } from 'lucide-react';

interface SmartphoneSimulatorProps {
  activeWidget: WidgetType;
  setActiveWidget: (type: WidgetType) => void;
  currentPrice: number;
  setCurrentPrice: (price: number) => void;
  selectedAsset: { symbol: string; basePrice: number; payout: number };
  setSelectedAsset: (asset: any) => void;
}

export default function SmartphoneSimulator({
  activeWidget,
  setActiveWidget,
  currentPrice,
  setCurrentPrice,
  selectedAsset,
  setSelectedAsset
}: SmartphoneSimulatorProps) {
  const [rotateX, setRotateX] = useState(12);
  const [rotateY, setRotateY] = useState(-18);
  const containerRef = useRef<HTMLDivElement>(null);

  // Advanced mouse tracker for the 3D elastic hover tilt effect
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate mouse coordinates relative to the element (from -0.5 to 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    // Amplify rotation mapping (tilt up to 25 degs max)
    setRotateX(-y * 28);
    setRotateY(x * 28);
  };

  const handleMouseLeave = () => {
    // Return gently to premium resting angle (slightly isometric)
    setRotateX(12);
    setRotateY(-18);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative transition-transform duration-300 ease-out preserve-3d cursor-grab active:cursor-grabbing select-none w-full max-w-[310px] mx-auto py-6"
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0px)`
      }}
    >
      {/* 3D Drop Shadow behind the phone */}
      <div className="absolute inset-x-6 bottom-4 h-8 bg-black/60 blur-xl rounded-full translate-y-8 scale-95 opacity-80" />

      {/* Main Bezel Body */}
      <div className="w-full aspect-[9/18.5] bg-slate-900 border-[3px] border-slate-750 rounded-[40px] p-2.5 shadow-2xl relative overflow-hidden backdrop-blur-xl preserve-3d">
        {/* Absolute High-tech glass glare overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none rounded-[36px] z-25" />
        
        {/* Dynamic Glowing neon side rails of the device */}
        <div className="absolute -inset-[1px] bg-gradient-to-b from-sky-400 via-teal-400 to-emerald-400 rounded-[40px] opacity-25 blur-[1px] -z-10 animate-pulse" />

        {/* Outer Frame details (Volume, power mock notches on sides) */}
        <div className="absolute top-24 -left-[4px] w-[2px] h-10 bg-slate-700 rounded-r-lg" />
        <div className="absolute top-36 -left-[4px] w-[2px] h-10 bg-slate-700 rounded-r-lg" />
        <div className="absolute top-28 -right-[4px] w-[2px] h-16 bg-slate-700 rounded-l-lg" />

        {/* Dynamic Screen Viewport Container */}
        <div className="w-full h-full bg-slate-950 rounded-[28px] overflow-hidden flex flex-col relative border border-slate-950/20 shadow-inner">
          
          {/* Bezel Camera Notch Segment */}
          <div className="absolute top-0 inset-x-0 h-6 flex justify-center items-center z-40 bg-slate-950/80 backdrop-blur-sm">
            <div className="w-20 h-4 bg-slate-950 border border-slate-900 rounded-b-xl flex items-center justify-between px-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-slate-800"></span>
              <span className="w-5 h-1 bg-slate-800 rounded-full"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500/80 animate-pulse"></span>
            </div>
          </div>

          {/* Device Status Header */}
          <div className="pt-7 px-4 pb-1.5 flex justify-between items-center text-slate-400 text-[10px] font-mono z-30 bg-slate-950/80">
            <span className="font-semibold tracking-tight text-white/90">09:41</span>
            <div className="flex items-center gap-1">
              <Signal className="w-3 h-3 text-emerald-400" />
              <Wifi className="w-3 h-3 text-sky-400" />
              <Battery className="w-3.5 h-3.5 text-slate-300" />
            </div>
          </div>

          {/* Active Interactive Widget Module Frame */}
          <div className="flex-1 overflow-hidden relative p-1.5 bg-slate-950">
            {activeWidget === 'chart' && (
              <WidgetCandlestick 
                currentPrice={currentPrice}
                setCurrentPrice={setCurrentPrice}
                selectedAsset={selectedAsset}
              />
            )}
            {activeWidget === 'signals' && (
              <WidgetSignals 
                onSelect={(asset) => {
                  setSelectedAsset(asset);
                  setActiveWidget('chart');
                }}
              />
            )}
            {activeWidget === 'cockpit' && (
              <WidgetCockpit 
                currentPrice={currentPrice}
                selectedAsset={selectedAsset}
              />
            )}
            {activeWidget === 'metrics' && (
              <WidgetMetrics />
            )}
          </div>

          {/* Device Home Indicator Drag Bar */}
          <div className="pb-1.5 pt-1.5 bg-slate-950 flex justify-center items-center">
            <div className="w-24 h-1 bg-white/40 rounded-full hover:bg-white/70 transition-colors cursor-pointer" />
          </div>

        </div>
      </div>

      {/* Floating Interactive Widget Switcher Tab Strip at the bottom of the simulator */}
      <div className="absolute -bottom-16 inset-x-0 bg-slate-900/90 border border-slate-800 p-2.5 rounded-2xl flex justify-around shadow-xl backdrop-blur-md z-30 max-w-[270px] mx-auto">
        {(['chart', 'cockpit', 'signals', 'metrics'] as WidgetType[]).map((tab) => {
          const label = tab === 'chart' ? 'Live' : tab === 'cockpit' ? 'Play' : tab === 'signals' ? 'AI' : 'Stats';
          return (
            <button
              key={tab}
              onClick={() => setActiveWidget(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-sans font-bold transition-all ${
                activeWidget === tab 
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' 
                  : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
