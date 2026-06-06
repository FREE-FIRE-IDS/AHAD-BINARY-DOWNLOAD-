/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { TradeSimulation } from '../types';
import { Play, TrendingUp, TrendingDown, Hourglass, ShieldAlert, Coins, History, CheckCircle2, XCircle } from 'lucide-react';

interface WidgetCockpitProps {
  currentPrice: number;
  selectedAsset: { symbol: string; basePrice: number; payout: number };
}

export default function WidgetCockpit({ currentPrice, selectedAsset }: WidgetCockpitProps) {
  const [balance, setBalance] = useState(1000);
  const [tradeAmount, setTradeAmount] = useState(50);
  const [activeTrade, setActiveTrade] = useState<TradeSimulation | null>(null);
  const [tradeHistory, setTradeHistory] = useState<TradeSimulation[]>([]);
  const [recentWin, setRecentWin] = useState<{ amount: number; isWin: boolean } | null>(null);
  
  const tickAudioRef = useRef<HTMLAudioElement | null>(null);
  const priceHistoryRef = useRef<number[]>([]);

  // Track price history for the active trade
  useEffect(() => {
    priceHistoryRef.current.push(currentPrice);
    if (priceHistoryRef.current.length > 20) {
      priceHistoryRef.current.shift();
    }
  }, [currentPrice]);

  // Trade timer ticker
  useEffect(() => {
    if (!activeTrade) return;

    const timer = setInterval(() => {
      setActiveTrade((prev) => {
        if (!prev) return null;
        
        const newTimeLeft = prev.timeLeft - 1;
        
        if (newTimeLeft <= 0) {
          // Evaluate outcome!
          const entry = prev.entryPrice;
          const exit = currentPrice;
          let win = false;
          
          if (prev.type === 'CALL') {
            win = exit > entry;
          } else {
            win = exit < entry;
          }
          
          const profit = win ? Math.round(prev.amount * (1 + selectedAsset.payout)) : 0;
          const finalTrade: TradeSimulation = {
            ...prev,
            timeLeft: 0,
            expiryPrice: exit,
            payout: profit,
            status: win ? 'WIN' : 'LOSS'
          };
          
          // Apply payout transaction
          setBalance((prevBal) => prevBal + profit);
          
          // History update
          setTradeHistory((hist) => [finalTrade, ...hist.slice(0, 9)]);
          
          // Trigger winning overlay
          setRecentWin({ amount: profit, isWin: win });
          setTimeout(() => setRecentWin(null), 3500);
          
          return null; // Terminate active trade
        }
        
        return {
          ...prev,
          timeLeft: newTimeLeft
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeTrade, currentPrice, selectedAsset]);

  const handleExecute = (type: 'CALL' | 'PUT') => {
    if (activeTrade) return; // Only one simulation at a time
    if (balance < tradeAmount) {
      alert("Demo balance depleted! Click Reset to top-up.");
      return;
    }

    // Deduct entry amount
    setBalance((prev) => prev - tradeAmount);

    const newTrade: TradeSimulation = {
      id: Math.random().toString(36).substr(2, 9),
      asset: selectedAsset.symbol,
      type,
      entryPrice: currentPrice,
      amount: tradeAmount,
      durationSeconds: 10,
      timeLeft: 10,
      status: 'PENDING',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    setActiveTrade(newTrade);
  };

  const handleResetBalance = () => {
    setBalance(1000);
    setTradeHistory([]);
  };

  return (
    <div id="widget-cockpit" className="flex flex-col h-full bg-slate-950/80 border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl relative">
      
      {/* Visual reward flash overlay */}
      {recentWin && (
        <div className={`absolute inset-0 z-30 flex flex-col items-center justify-center p-4 backdrop-blur-md transition-all ${
          recentWin.isWin 
            ? 'bg-emerald-950/90 border-2 border-emerald-500 animate-pulse' 
            : 'bg-rose-950/90 border-2 border-rose-500 animate-pulse'
        }`}>
          {recentWin.isWin ? (
            <div className="text-center">
              <span className="text-[3rem] block">🎉</span>
              <h4 className="font-sans text-xl font-bold text-emerald-400">CONTRACT LIQUIDATED</h4>
              <p className="text-2xl font-mono text-emerald-300 font-bold mt-1">
                +${recentWin.amount.toFixed(2)} USD
              </p>
              <p className="text-[10px] text-slate-300 font-medium tracking-wide mt-2">
                AHADBINARY prediction was 100% accurate
              </p>
            </div>
          ) : (
            <div className="text-center">
              <span className="text-[3rem] block">📉</span>
              <h4 className="font-sans text-xl font-bold text-rose-400">CONTRACT EXPIRED</h4>
              <p className="text-2xl font-mono text-rose-300 font-bold mt-1">
                $0.00 RETURN
              </p>
              <p className="text-[10px] text-slate-300 mt-2 font-medium tracking-wide">
                Binary options contain high volatility. Retry now!
              </p>
            </div>
          )}
        </div>
      )}

      {/* Widget Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-900/60 bg-slate-950/40">
        <div className="flex items-center gap-2">
          <Coins className="w-4 h-4 text-sky-400" />
          <span className="font-sans font-semibold text-xs tracking-wide text-slate-300 uppercase">
            Execution Center
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] text-slate-400 font-sans">DEMO BALANCE</span>
          <span className="font-mono text-xs font-bold text-sky-400">${balance.toLocaleString()}</span>
        </div>
      </div>

      {/* Simulator Inputs Grid */}
      <div className="p-4 space-y-4 bg-slate-950/30">
        {/* Trade amount selector */}
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-[11px] text-slate-400 font-sans">Trade Contract Amount ($)</span>
            <button 
              onClick={handleResetBalance}
              className="text-[9px] text-sky-400 underline hover:text-sky-300 font-mono"
            >
              Reset Demo Funds
            </button>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {[10, 50, 100, 250].map((val) => (
              <button
                key={val}
                disabled={!!activeTrade}
                onClick={() => setTradeAmount(val)}
                className={`py-1 rounded-lg text-xs font-mono font-bold border transition-all ${
                  tradeAmount === val
                    ? 'bg-sky-500/10 text-sky-400 border-sky-500'
                    : 'bg-slate-900/40 text-slate-400 border-slate-800 hover:bg-slate-900'
                }`}
              >
                ${val}
              </button>
            ))}
          </div>
        </div>

        {/* Binary Trigger CTA Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            disabled={!!activeTrade}
            onClick={() => handleExecute('CALL')}
            className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border shadow-lg transition-all ${
              activeTrade 
                ? 'bg-slate-900/20 text-slate-600 border-slate-900 cursor-not-allowed'
                : 'bg-emerald-500 text-white hover:bg-emerald-400 border-emerald-600 active:scale-95 hover:shadow-emerald-500/10'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-white" />
            <span>CALL (UP)</span>
          </button>

          <button
            disabled={!!activeTrade}
            onClick={() => handleExecute('PUT')}
            className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border shadow-lg transition-all ${
              activeTrade 
                ? 'bg-slate-900/20 text-slate-600 border-slate-900 cursor-not-allowed'
                : 'bg-rose-500 text-white hover:bg-rose-400 border-rose-600 active:scale-95 hover:shadow-rose-500/10'
            }`}
          >
            <TrendingDown className="w-4 h-4 text-white" />
            <span>PUT (DOWN)</span>
          </button>
        </div>
      </div>

      {/* Active Contract Ticker and Counter */}
      <div className="flex-1 p-4 flex flex-col justify-center border-t border-b border-slate-900 bg-slate-950/50">
        {activeTrade ? (
          <div className="text-center space-y-3">
            <div className="relative inline-flex items-center justify-center">
              {/* Radial Countdown indicator */}
              <div className="w-16 h-16 rounded-full border-4 border-sky-500/20 flex flex-col items-center justify-center border-t-sky-400 animate-spin" style={{ animationDuration: '3s' }} />
              <span className="absolute font-mono text-lg font-bold text-sky-400">
                {activeTrade.timeLeft}s
              </span>
            </div>
            
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono block">Pending Expiry</span>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xs font-sans text-slate-300">
                  Entry: <span className="font-mono text-slate-100 font-bold">{activeTrade.entryPrice}</span>
                </span>
                <span className="text-slate-600 text-xs">|</span>
                <span className="text-xs font-sans text-slate-300">
                  Current: <span className={`font-mono font-bold ${
                    activeTrade.type === 'CALL'
                      ? currentPrice >= activeTrade.entryPrice ? 'text-emerald-400' : 'text-rose-400'
                      : currentPrice <= activeTrade.entryPrice ? 'text-emerald-400' : 'text-rose-400'
                  }`}>{currentPrice}</span>
                </span>
              </div>
            </div>

            {/* Simulated Live Win/Loss projection */}
            <div className="flex justify-center">
              <span className={`text-[10px] font-bold px-3 py-1 rounded-full border uppercase tracking-wider ${
                activeTrade.type === 'CALL'
                  ? currentPrice >= activeTrade.entryPrice ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25' : 'bg-rose-500/10 text-rose-400 border-rose-500/25'
                  : currentPrice <= activeTrade.entryPrice ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25' : 'bg-rose-500/10 text-rose-400 border-rose-500/25'
              }`}>
                {activeTrade.type === 'CALL'
                  ? currentPrice >= activeTrade.entryPrice ? '🟢 IN THE MONEY' : '🔴 OUT OF THE MONEY'
                  : currentPrice <= activeTrade.entryPrice ? '🟢 IN THE MONEY' : '🔴 OUT OF THE MONEY'
                }
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <Hourglass className="w-8 h-8 text-slate-600 mx-auto mb-2 animate-bounce" />
            <p className="text-xs text-slate-400 font-sans max-w-[200px] mx-auto">
              Select contract value above and click up/down triggers to initiate active binary prediction.
            </p>
          </div>
        )}
      </div>

      {/* Historical logs panel */}
      <div className="p-3 bg-slate-950/60 max-h-[140px] overflow-y-auto no-scrollbar">
        <div className="flex items-center gap-1 mb-2">
          <History className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[10px] text-slate-400 font-sans font-bold uppercase tracking-wider">Demo Trade Logs</span>
        </div>
        
        {tradeHistory.length === 0 ? (
          <p className="text-[10px] text-slate-600 italic">No static contracts executed in this session.</p>
        ) : (
          <div className="space-y-1.5">
            {tradeHistory.slice(0, 3).map((item) => (
              <div key={item.id} className="flex justify-between items-center bg-slate-900/35 p-1.5 rounded-lg border border-slate-900">
                <div className="flex items-center gap-1 text-[10px]">
                  {item.status === 'WIN' ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  )}
                  <span className="font-sans font-semibold text-slate-300">{item.asset}</span>
                  <span className={`font-mono text-[8px] font-bold px-1 rounded ${
                    item.type === 'CALL' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                  }`}>{item.type}</span>
                </div>

                <div className="text-right flex items-center gap-1.5">
                  <span className="text-[9px] text-slate-500 font-mono font-medium">{item.timestamp}</span>
                  <span className={`font-mono text-[10.5px] font-bold ${
                    item.status === 'WIN' ? 'text-emerald-400' : 'text-slate-500'
                  }`}>
                    {item.status === 'WIN' ? `+$${item.payout}` : '-$50'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
