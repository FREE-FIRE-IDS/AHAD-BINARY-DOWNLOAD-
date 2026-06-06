/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { INITIAL_PAYOUTS } from '../data/mockData';
import { RecentGlobalPayout } from '../types';
import { Sparkles, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

export default function PayoutsTicker() {
  const [payouts, setPayouts] = useState<RecentGlobalPayout[]>(INITIAL_PAYOUTS);

  // Interval to add simulated global wins to show bot activity
  useEffect(() => {
    const list = [
      { user: 'Sudais_K', asset: 'AHAD-TOKEN/USDT', win: true },
      { user: 'FX_Master9', asset: 'EUR/USD (OTC)', win: true },
      { user: 'SavageTrade', asset: 'USD/JPY (OTC)', win: false },
      { user: 'GoldScalp', asset: 'GBP/USD (OTC)', win: true },
      { user: 'AdilBinary', asset: 'BTC/USDT', win: true },
      { user: 'RobotElite', asset: 'EUR/USD (OTC)', win: true },
      { user: 'Kamran_OTC', asset: 'AHAD-TOKEN/USDT', win: true }
    ];

    const interval = setInterval(() => {
      const select = list[Math.floor(Math.random() * list.length)];
      const amount = Math.floor(10 + Math.random() * 490) * 2;
      const profit = select.win ? Math.round(amount * (1.85 + Math.random() * 0.1)) : 0;
      
      const newPayout: RecentGlobalPayout = {
        id: Math.random().toString(36).substr(2, 9),
        user: select.user,
        asset: select.asset,
        amount,
        payout: profit,
        type: Math.random() > 0.5 ? 'CALL' : 'PUT',
        win: select.win,
        timeAgo: 'Just now'
      };

      setPayouts((prev) => {
        const next = [newPayout, ...prev];
        return next.slice(0, 12); // Limit list count
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="payouts-ticker" className="p-6 bg-slate-900/60 border border-slate-800 rounded-3xl backdrop-blur-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full" />
      
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-500/10 rounded-xl animate-bounce" style={{ animationDuration: '3s' }}>
          <Sparkles className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h3 className="font-sans text-lg font-bold text-slate-150">Global Cluster Settled Payouts</h3>
          <span className="text-[11px] text-slate-400 font-sans block">Dynamic activity log from active cloud instances executing AhadBinary algorithms</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {payouts.slice(0, 6).map((item) => (
          <div
            key={item.id}
            className={`p-3 bg-slate-950/40 rounded-xl border flex items-center justify-between transition-all duration-300 ${
              item.win ? 'border-emerald-500/10 hover:border-emerald-500/25 bg-emerald-950/5' : 'border-slate-850 hover:border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="shrink-0">
                {item.win ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-slate-500" />
                )}
              </div>
              <div className="flex flex-col gap-0.5 text-left">
                <span className="font-sans text-xs font-bold text-slate-200">
                  {item.user}
                </span>
                <span className="text-[9px] font-mono text-slate-400 tracking-tight flex items-center gap-1.5">
                  {item.asset}
                  <span className={`px-1 py-0.2 rounded text-[7.5px] font-bold ${
                    item.type === 'CALL' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                  }`}>{item.type}</span>
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className={`font-mono text-xs font-bold ${item.win ? 'text-emerald-400 animate-pulse' : 'text-slate-400'}`}>
                {item.win ? `+$${item.payout}` : '-$50'}
              </span>
              <span className="text-[8px] text-slate-500 block font-sans">{item.timeAgo}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
