/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { POPULAR_ASSETS } from '../data/mockData';
import { Cpu, ChevronRight, AlertCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function WidgetSignals({ onSelect }: { onSelect: (asset: any) => void }) {
  const [signalStrengths, setSignalStrengths] = useState<Record<string, { strength: number; trend: 'CALL' | 'PUT'; active: boolean }>>({});

  // Simulate ongoing predictive signals refreshing
  useEffect(() => {
    const initSignals: Record<string, { strength: number; trend: 'CALL' | 'PUT'; active: boolean }> = {};
    POPULAR_ASSETS.forEach((asset) => {
      initSignals[asset.symbol] = {
        strength: Math.round(75 + Math.random() * 20),
        trend: Math.random() > 0.5 ? 'CALL' : 'PUT',
        active: Math.random() > 0.3
      };
    });
    setSignalStrengths(initSignals);

    const interval = setInterval(() => {
      setSignalStrengths((prev) => {
        const next = { ...prev };
        const keys = Object.keys(next);
        // Randomly update one signal strength
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        const curTrend = next[randomKey]?.trend || 'CALL';
        next[randomKey] = {
          strength: Math.round(75 + Math.random() * 21),
          trend: Math.random() > 0.8 ? (curTrend === 'CALL' ? 'PUT' : 'CALL') : curTrend,
          active: Math.random() > 0.25
        };
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="widget-signals-container" className="flex flex-col h-full bg-slate-950/80 border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
      {/* Widget Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-900/60 bg-slate-950/40">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-amber-400" />
          <span className="font-sans font-semibold text-xs tracking-wide text-slate-300 uppercase">
            AI Option Engine
          </span>
        </div>
        <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest leading-none">
          88%+ threshold
        </span>
      </div>

      {/* Intro Description */}
      <div className="p-3 bg-gradient-to-b from-slate-950 to-slate-950/10 border-b border-slate-900/40 text-left">
        <p className="text-[10.5px] text-slate-400 leading-relaxed font-sans">
          The binary engine uses custom deep-learning models to analyze support-resistance zones across 5m expiries.
        </p>
      </div>

      {/* Signal Items Container */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-3 py-2 space-y-2 max-h-[300px]">
        {POPULAR_ASSETS.map((asset) => {
          const sig = signalStrengths[asset.symbol] || { strength: 85, trend: 'CALL', active: true };
          return (
            <button
              key={asset.symbol}
              onClick={() => onSelect(asset)}
              className="w-full text-left p-2.5 rounded-xl bg-slate-900/40 hover:bg-slate-900/90 border border-slate-850 hover:border-slate-800 flex items-center justify-between transition-all group"
            >
              <div className="flex flex-col gap-0.5">
                <span className="font-sans text-xs font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors">
                  {asset.symbol}
                </span>
                <span className="text-[9px] text-slate-400 font-mono tracking-tighter">
                  Multitimeframe Consensus
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <span className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded ${
                      sig.trend === 'CALL'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-rose-500/10 text-rose-400'
                    }`}>
                      {sig.trend}
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-300">
                      {sig.strength}%
                    </span>
                  </div>

                  {/* Signal Strength Line Meter */}
                  <div className="w-16 h-1 bg-slate-800 rounded-full mt-1 overflow-hidden ml-auto">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        sig.trend === 'CALL' ? 'bg-emerald-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${sig.strength}%` }}
                    />
                  </div>
                </div>

                <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Real-time Status footer */}
      <div className="p-3 bg-slate-900/60 border-t border-slate-950 flex items-center justify-start gap-1 text-[10px] text-slate-400">
        <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span className="font-sans line-clamp-1 text-left">Click any asset above to feed into the 3D Candle tracker.</span>
      </div>
    </div>
  );
}
