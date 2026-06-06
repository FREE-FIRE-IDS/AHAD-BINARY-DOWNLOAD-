/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BarChart3, TrendingUp, Cpu, Award, Zap } from 'lucide-react';

export default function WidgetMetrics() {
  const currentStreak = 14;
  const executionSpeedMs = 18;
  const overallWinRate = 92.4;

  const stats = [
    { label: 'Weekly Payout', value: '$8,421.50', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Active Signals', value: '41,209', icon: Cpu, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { label: 'Avg Execution', value: `${executionSpeedMs}ms`, icon: Zap, color: 'text-sky-400', bg: 'bg-sky-500/10' },
    { label: 'Streak Peak', value: `${currentStreak} Wins`, icon: Award, color: 'text-indigo-400', bg: 'bg-indigo-500/10' }
  ];

  return (
    <div id="widget-metrics" className="flex flex-col h-full bg-slate-950/80 border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
      {/* Widget Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-900/60 bg-slate-950/40">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-purple-400" />
          <span className="font-sans font-semibold text-xs tracking-wide text-slate-300 uppercase">
            Performance Matrix
          </span>
        </div>
        <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
          Verified Audit
        </span>
      </div>

      {/* Hero Stats Panel */}
      <div className="p-4 bg-gradient-to-b from-slate-950 to-slate-950/20 text-center">
        <span className="text-[10px] text-slate-400 font-sans tracking-wide uppercase block">Backtested Win Rate</span>
        <h4 className="font-sans text-3xl font-extrabold text-white mt-1 select-none tracking-tight">
          {overallWinRate}%
        </h4>
        <div className="mt-2 flex items-center justify-center gap-1.5 text-[11px] text-emerald-400 font-sans bg-emerald-500/5 py-1 px-3 rounded-full border border-emerald-500/10 w-fit mx-auto">
          <span>Active Streak:</span>
          <span className="font-mono font-bold">{currentStreak} Consecutive Wins</span>
        </div>
      </div>

      {/* Grid of details */}
      <div className="flex-1 p-3 grid grid-cols-2 gap-2">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="p-2.5 bg-slate-900/30 border border-slate-900 rounded-xl flex flex-col justify-between">
              <div className="flex items-center gap-1.5">
                <div className={`p-1.5 rounded-lg ${stat.bg}`}>
                  <Icon className={`w-3.5 h-3.5 ${stat.color}`} />
                </div>
                <span className="text-[9.5px] text-slate-400 font-sans">{stat.label}</span>
              </div>
              <span className="font-mono text-sm font-bold text-slate-200 mt-2 block text-left">
                {stat.value}
              </span>
            </div>
          );
        })}
      </div>

      {/* Dynamic latency visual progress */}
      <div className="p-3 bg-slate-900/40 border-t border-slate-950 space-y-1.5 text-left">
        <div className="flex justify-between items-center text-[9px]">
          <span className="text-slate-400 font-sans">Execution Dispatcher Latency</span>
          <span className="font-mono text-emerald-400 font-bold">{executionSpeedMs}ms</span>
        </div>
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-500 to-sky-400 rounded-full animate-pulse" style={{ width: '18%' }} />
        </div>
      </div>
    </div>
  );
}
