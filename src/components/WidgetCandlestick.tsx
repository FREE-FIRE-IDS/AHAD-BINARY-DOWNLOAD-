/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, ReferenceLine } from 'recharts';
import { PriceTick } from '../types';
import { TrendingUp, TrendingDown, RefreshCw, Layers } from 'lucide-react';

interface WidgetCandlestickProps {
  currentPrice: number;
  setCurrentPrice: (price: number) => void;
  selectedAsset: { symbol: string; basePrice: number; payout: number };
}

export default function WidgetCandlestick({
  currentPrice,
  setCurrentPrice,
  selectedAsset
}: WidgetCandlestickProps) {
  const [data, setData] = useState<PriceTick[]>([]);
  const [direction, setDirection] = useState<'UP' | 'DOWN'>('UP');
  const [prediction, setPrediction] = useState<'BULLISH' | 'BEARISH'>('BULLISH');
  const [aiConfidence, setAiConfidence] = useState(94.2);
  const countRef = useRef(0);
  const dataRef = useRef<PriceTick[]>([]);

  // Sync state data to ref
  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  // Initialize and tick chart data
  useEffect(() => {
    // Generate starting data points
    const points: PriceTick[] = [];
    let price = selectedAsset.basePrice;
    
    for (let i = 20; i >= 0; i--) {
      const isUp = Math.random() > 0.48;
      const change = (Math.random() * 0.0008 + 0.0001) * (isUp ? 1 : -1);
      price += change;
      
      const minAgo = new Date(Date.now() - i * 5000);
      const timeStr = minAgo.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      
      points.push({
        time: timeStr,
        price: parseFloat(price.toFixed(5)),
        sma: parseFloat((price * 1.0001).toFixed(5)),
        ema: parseFloat((price * 0.9999).toFixed(5)),
      });
    }
    
    setData(points);
    setCurrentPrice(parseFloat(price.toFixed(5)));
  }, [selectedAsset, setCurrentPrice]);

  // Real-time ticking feed
  useEffect(() => {
    const interval = setInterval(() => {
      const currentPoints = dataRef.current;
      if (currentPoints.length === 0) return;
      const lastPoint = currentPoints[currentPoints.length - 1];
      
      // Random binary style price movement
      const isUp = Math.random() > 0.46;
      const changeFactor = selectedAsset.symbol.includes('JPY') ? 0.05 : 
                           selectedAsset.symbol.includes('BTC') ? 15 : 0.0002;
      const change = (Math.random() * changeFactor + 0.0001) * (isUp ? 1 : -1);
      const nextPrice = parseFloat((lastPoint.price + change).toFixed(selectedAsset.symbol.includes('JPY') ? 2 : selectedAsset.symbol.includes('BTC') ? 1 : 5));
      
      setCurrentPrice(nextPrice);
      setDirection(isUp ? 'UP' : 'DOWN');
      
      // Update prediction and confidence dynamically every couple of ticks
      countRef.current += 1;
      if (countRef.current % 4 === 0) {
        setPrediction(Math.random() > 0.4 ? 'BULLISH' : 'BEARISH');
        setAiConfidence(parseFloat((85 + Math.random() * 13).toFixed(1)));
      }

      const newTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const movingAverageSum = currentPoints.slice(-5).reduce((sum, item) => sum + item.price, 0) / 5;
      
      const nextPoints = [
        ...currentPoints.slice(1),
        {
          time: newTime,
          price: nextPrice,
          sma: parseFloat(movingAverageSum.toFixed(selectedAsset.symbol.includes('JPY') ? 2 : 5)),
          ema: parseFloat(((movingAverageSum + nextPrice) / 2).toFixed(selectedAsset.symbol.includes('JPY') ? 2 : 5))
        }
      ];
      setData(nextPoints);
    }, 2000);

    return () => clearInterval(interval);
  }, [selectedAsset, setCurrentPrice]);

  return (
    <div id="widget-candlestick-container" className="flex flex-col h-full bg-slate-950/80 border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
      {/* Widget Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-900/60 bg-slate-950/40">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-ring"></div>
          <span className="font-sans font-semibold text-xs tracking-wide text-slate-300 uppercase">
            3D Waver Core™
          </span>
        </div>
        <div className="flex items-center gap-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 px-2 py-0.5 rounded-full">
          <Layers className="w-3.6 h-3.6 text-emerald-400" />
          <span className="font-mono text-[9px] font-bold tracking-tight">OTC LIVE FEED</span>
        </div>
      </div>

      {/* Hero Financial Ticker Area */}
      <div className="p-4 flex justify-between items-baseline bg-gradient-to-b from-slate-950 to-slate-950/20">
        <div>
          <h3 className="font-sans text-sm text-slate-400 font-medium">{selectedAsset.symbol}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className={`font-mono text-xl font-bold tracking-tight transition-all duration-300 ${
              direction === 'UP' ? 'text-emerald-400' : 'text-rose-400'
            }`}>
              {currentPrice}
            </span>
            <span className={`p-0.5 rounded-full text-[10px] font-bold ${
              direction === 'UP' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
            }`}>
              {direction === 'UP' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            </span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-slate-400 block font-sans">Payout Multiplier</span>
          <span className="font-mono text-sm font-bold text-teal-400">+{Math.round(selectedAsset.payout * 100)}%</span>
        </div>
      </div>

      {/* Live Chart Visualizer */}
      <div className="flex-1 w-full min-h-[140px] px-2 relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 5, left: 5, bottom: 5 }}>
            <defs>
              <linearGradient id="priceGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={direction === 'UP' ? '#10b981' : '#f43f5e'} stopOpacity={0.25} />
                <stop offset="95%" stopColor={direction === 'UP' ? '#10b981' : '#f43f5e'} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <YAxis 
              domain={['dataMin', 'dataMax']} 
              hide 
            />
            <XAxis 
              dataKey="time" 
              hide 
            />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke={direction === 'UP' ? '#34d399' : '#fb7185'} 
              strokeWidth={2} 
              fillOpacity={1} 
              fill="url(#priceGlow)" 
              dot={false}
              isAnimationActive={false}
            />
            {/* AI Prediction Line */}
            <ReferenceLine 
              y={currentPrice} 
              stroke={prediction === 'BULLISH' ? '#10b981' : '#f43f5e'} 
              strokeDasharray="3 3" 
              strokeWidth={1}
            />
          </AreaChart>
        </ResponsiveContainer>

        {/* Floating Indicator Layer */}
        <div className="absolute right-4 bottom-4 bg-slate-900/90 border border-slate-800 p-2 rounded-xl backdrop-blur-md max-w-[120px]">
          <span className="text-[9px] text-slate-400 block mb-0.5">MA Indicator</span>
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            EMA: {(currentPrice * 1.00003).toFixed(selectedAsset.symbol.includes('JPY') ? 2 : 5)}
          </div>
        </div>
      </div>

      {/* AI Bot Signal Overlay bar */}
      <div className="p-3 bg-slate-900/60 border-t border-slate-900 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="bg-slate-950 p-1.5 rounded-lg border border-slate-850">
            <RefreshCw className="w-3.5 h-3.5 text-teal-400 animate-spin" style={{ animationDuration: '4s' }} />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">AI PREDICT</span>
            <span className={`font-bold font-sans ${prediction === 'BULLISH' ? 'text-emerald-400' : 'text-rose-400'}`}>
              {prediction}
            </span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-slate-400 block">AI Confidence</span>
          <span className="font-mono font-bold text-slate-200">{aiConfidence}%</span>
        </div>
      </div>
    </div>
  );
}
