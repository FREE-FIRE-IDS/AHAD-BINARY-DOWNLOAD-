/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Calculator, ArrowRight, ArrowUpRight } from 'lucide-react';

export default function TradingCalculator({ downloadUrl }: { downloadUrl: string }) {
  const [capital, setCapital] = useState(100);
  const [winRate, setWinRate] = useState(85);
  const [tradesPerDay, setTradesPerDay] = useState(10);
  const [days, setDays] = useState(7);

  // Compute standard binary compounding projection
  // Formula: current = current * (1 + (payout * winRate - (1 - winRate)))
  const payoutRate = 0.90; // Average payout
  
  const calculateResult = () => {
    let projected = capital;
    const dailyProfitRate = (payoutRate * (winRate / 100)) - (1 - (winRate / 100));
    
    // Guard against toxic negative calculations
    const multiplier = Math.max(0.01, 1 + dailyProfitRate * tradesPerDay);
    
    for (let i = 0; i < days; i++) {
      projected = projected * multiplier;
    }
    
    return Math.round(projected);
  };

  const finalProjected = calculateResult();

  return (
    <div id="trading-calculator-card" className="p-6 bg-slate-900/60 border border-slate-800 rounded-3xl backdrop-blur-xl relative overflow-hidden cyber-grid-dense">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full" />
      
      {/* Title */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-500/10 rounded-xl">
          <Calculator className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h3 className="font-sans text-lg font-bold text-slate-100">AI Earnings Projection</h3>
          <span className="text-[11px] text-slate-400 font-sans block">Estimate the power of binary compounding algorithms</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Sliders Grid */}
        <div className="space-y-5">
          {/* Starting Capital Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-sans">
              <span className="text-slate-400 font-medium">Starting Capital</span>
              <span className="text-emerald-400 font-bold font-mono">${capital}</span>
            </div>
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={capital}
              onChange={(e) => setCapital(Number(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[9px] text-slate-600 font-mono">
              <span>$10</span>
              <span>$500</span>
              <span>$1,000</span>
            </div>
          </div>

          {/* Winning Probability Target */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-sans">
              <span className="text-slate-400 font-medium">Expected Win Rate (Vetted API average: 92%)</span>
              <span className="text-sky-400 font-bold font-mono">{winRate}%</span>
            </div>
            <input
              type="range"
              min="75"
              max="95"
              step="1"
              value={winRate}
              onChange={(e) => setWinRate(Number(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
            <div className="flex justify-between text-[9px] text-slate-600 font-mono">
              <span>75% (Base)</span>
              <span>85% (Conservative)</span>
              <span>95% (Perfect Consensus)</span>
            </div>
          </div>

          {/* Daily Cycles Expiry */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-sans">
              <span className="text-slate-400 font-medium">Duration period (Days)</span>
              <span className="text-amber-400 font-bold font-mono">{days} Day Cycle</span>
            </div>
            <input
              type="range"
              min="3"
              max="30"
              step="1"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[9px] text-slate-600 font-mono">
              <span>3 Days</span>
              <span>15 Days</span>
              <span>30 Days</span>
            </div>
          </div>
        </div>

        {/* Compound Projected Result Panel */}
        <div className="bg-slate-950/70 rounded-2xl p-6 border border-slate-850 text-center relative overflow-hidden flex flex-col justify-between h-full min-h-[220px]">
          <div className="absolute inset-0 bg-radial-gradient from-emerald-500/5 via-transparent to-transparent opacity-80" />

          <div>
            <span className="text-[10px] text-slate-400 font-sans tracking-widest uppercase block">
              Compound Asset Projections
            </span>
            <div className="text-3xl md:text-4xl font-mono font-black text-emerald-400 mt-2 select-all tracking-tight filter drop-shadow-[0_2px_10px_rgba(16,185,129,0.15)]">
              ${finalProjected.toLocaleString()}
            </div>
            <span className="text-[10.5px] text-slate-500 font-sans mt-2 block">
              Estimated with dynamic {payoutRate * 100}% payout multipliers across {days * tradesPerDay} option contracts.
            </span>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-900">
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-2.5 px-4 rounded-xl transition-all shadow-lg active:scale-95 group leading-none"
            >
              <span>Download Bot Now to Begin</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-950 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
