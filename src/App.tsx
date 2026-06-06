/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { WidgetType } from './types';
import SmartphoneSimulator from './components/SmartphoneSimulator';
import TradingCalculator from './components/TradingCalculator';
import InstallerGuide from './components/InstallerGuide';
import PayoutsTicker from './components/PayoutsTicker';
import { POPULAR_ASSETS, WIDGETS_METADATA, FAQ_ITEMS } from './data/mockData';
import {
  Download,
  Smartphone,
  Bot,
  Zap,
  TrendingUp,
  Cpu,
  BarChart3,
  Layers,
  ArrowRight,
  ChevronDown,
  Globe,
  Award,
  ShieldCheck,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

export default function App() {
  const [activeWidget, setActiveWidget] = useState<WidgetType>('chart');
  const [selectedAsset, setSelectedAsset] = useState(POPULAR_ASSETS[0]);
  const [currentPrice, setCurrentPrice] = useState(POPULAR_ASSETS[0].basePrice);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const downloadUrl = "https://www.mediafire.com/file/7p0skgfxy7ls7zq/AHADBINARY-TRADING.apk/file";

  // Simulate updating current selection's price
  useEffect(() => {
    setCurrentPrice(selectedAsset.basePrice);
  }, [selectedAsset]);

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(downloadUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/20 selection:text-emerald-300 font-sans relative overflow-x-hidden pb-16">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-sky-500/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-purple-500/5 blur-[140px] rounded-full pointer-events-none" />

      {/* FIXED FLOATING NAVBAR */}
      <header className="sticky top-0 z-50 bg-slate-950/80 border-b border-slate-900 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/10">
              <Bot className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-sans font-black tracking-tight text-base text-white">
                AHADBINARY<span className="text-emerald-400"> AI™</span>
              </span>
              <span className="text-[9.5px] text-emerald-400/80 uppercase font-bold tracking-widest block font-mono leading-none">
                BINARY ROBOT V3.2
              </span>
            </div>
          </div>

          {/* Center System Status */}
          <div className="hidden md:flex items-center gap-2 bg-slate-900 border border-slate-850 py-1.5 px-3.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-ring"></span>
            <span className="text-[11px] text-slate-300 font-sans font-medium">
              Global Signal Feeds: <span className="text-emerald-400 font-bold font-mono">99.98% ACCURACY RATE</span>
            </span>
          </div>

          {/* Corner Download Button */}
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-xl transition-all shadow-md active:scale-95 group leading-none"
          >
            <Download className="w-3.5 h-3.5 text-slate-950 group-hover:translate-y-0.5 transition-transform" />
            <span>Download APK</span>
          </a>
        </div>
      </header>

      {/* CORE HERO SEGMENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16">
        
        {/* Welcome Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 text-slate-300 py-1 px-3 rounded-full text-[11px] font-sans">
            <span className="p-0.5 rounded-md bg-emerald-500 text-slate-950 font-bold font-mono text-[9px]">NEW</span>
            <span>Unmatched automated trading performance on Android</span>
          </div>
          
          <h1 className="font-sans text-4xl sm:text-6xl font-black text-white tracking-tight leading-none">
            Automate Your Binary Earnings With <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">AHADBINARY AI</span>
          </h1>
          
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-sans max-w-2xl mx-auto">
            Experience lightning-fast binary execution, 100% automated signals consensus, and real-time risk hedges directly inside your mobile device. Download the official, threat-scanned APK below.
          </p>

          {/* Download APK CTAs Card block */}
          <div className="bg-slate-900 class-border p-6 rounded-3xl max-w-xl mx-auto border border-slate-850 flex flex-col sm:flex-row items-center gap-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-24 h-24 bg-emerald-500/5 blur-xl rounded-full" />
            
            {/* Phone Icon Badge */}
            <div className="p-4 bg-emerald-500/10 rounded-2xl shrink-0">
              <Smartphone className="w-10 h-10 text-emerald-400" />
            </div>

            <div className="text-left flex-1 space-y-1">
              <h4 className="font-sans text-base font-extrabold text-slate-100">AHADBINARY Trading Bot APK</h4>
              <p className="text-xs text-slate-400 font-sans">
                Official Release v3.2.0 | File Size: <span className="font-mono text-slate-300 font-medium">14.6 MB</span>
              </p>
              
              <div className="pt-2 flex flex-wrap gap-2">
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-xl transition-all group"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Free APK (MediaFire)</span>
                </a>
                
                <button
                  onClick={copyLinkToClipboard}
                  className="inline-flex items-center gap-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 text-xs py-2 px-3.5 rounded-xl transition-all"
                >
                  <span>{isCopied ? 'Link Copied! 👍' : 'Copy Mirror Link'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* METRICS STRIP */}
        <section id="metric-strip" className="mb-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto bg-slate-950 border border-slate-900 p-4 rounded-2xl divide-y md:divide-y-0 md:divide-x divide-slate-900">
          <div className="text-center p-3">
            <span className="text-[11px] font-sans text-slate-400 block tracking-wide">TOTAL APK DOWNLOADS</span>
            <span className="font-mono text-xl font-bold text-white tracking-tight mt-0.5 block">82,401+</span>
          </div>
          <div className="text-center p-3 pt-4 sm:pt-3">
            <span className="text-[11px] font-sans text-slate-400 block tracking-wide">AVERAGE SIGNAL RATE</span>
            <span className="font-mono text-xl font-bold text-emerald-400 tracking-tight mt-0.5 block">92.4% Win Rate</span>
          </div>
          <div className="text-center p-3">
            <span className="text-[11px] font-sans text-slate-400 block tracking-wide">CLOUD NODES ONLINE</span>
            <span className="font-mono text-xl font-bold text-sky-400 tracking-tight mt-0.5 block">142 Host Servers</span>
          </div>
          <div className="text-center p-3 pt-4 sm:pt-3">
            <span className="text-[11px] font-sans text-slate-400 block tracking-wide">DAILY BOT TRANSACTIONS</span>
            <span className="font-mono text-xl font-bold text-purple-400 tracking-tight mt-0.5 block">$524,198 USD</span>
          </div>
        </section>

        {/* SPLIT EXPERIMENTAL DESK & 3D WIDGET SIMULATOR */}
        <section id="interactive-workspace" className="mb-24">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-sans text-2xl sm:text-3.5xl font-black text-white tracking-tight leading-none">
              Explore Live 3D Bot Widgets
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-sans mt-2">
              Select or scroll to explore different custom views below. Try out the real live-updating widgets directly inside our high-tech 3D simulation deck.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-6">
            
            {/* LEFT COLUMN: FEATURES CONTROLLER */}
            <div className="lg:col-span-7 space-y-4">
              
              <div className="space-y-4 text-left">
                {WIDGETS_METADATA.map((meta) => {
                  const isActive = activeWidget === meta.id;
                  return (
                    <div
                      key={meta.id}
                      onClick={() => setActiveWidget(meta.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${
                        isActive
                          ? 'bg-slate-900 border-emerald-500/45 shadow-[0_10px_30px_rgba(16,185,129,0.06)]'
                          : 'bg-slate-900/40 border-slate-900 hover:border-slate-800'
                      }`}
                    >
                      {/* Background accent panel shadow */}
                      {isActive && (
                        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-xl rounded-full" />
                      )}

                      <div className="flex items-start gap-4">
                        {/* Selector Indicator */}
                        <div className={`p-3 rounded-xl shrink-0 transition-all ${
                          isActive
                            ? 'bg-emerald-500 text-slate-950 font-bold scale-105'
                            : 'bg-slate-950 text-slate-400 group-hover:text-slate-200'
                        }`}>
                          {meta.id === 'chart' && <Layers className="w-5 h-5" />}
                          {meta.id === 'cockpit' && <Zap className="w-5 h-5" />}
                          {meta.id === 'signals' && <Cpu className="w-5 h-5" />}
                          {meta.id === 'metrics' && <BarChart3 className="w-5 h-5" />}
                        </div>

                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-sans text-sm sm:text-base font-bold text-slate-250">
                              {meta.title}
                            </h3>
                            <span className="text-[9.5px] font-mono font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-900 text-slate-400">
                              {meta.badge}
                            </span>
                          </div>
                          
                          <p className="text-xs text-slate-450 leading-relaxed font-sans">
                            {meta.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Asset quick feeds picker link into the Candle widget */}
              <div className="bg-slate-900/30 border border-slate-900/80 p-4 rounded-2xl mt-4">
                <span className="text-[10px] text-slate-400 font-sans tracking-wide uppercase block mb-3 font-semibold text-left">
                  Feed active currency asset into simulated waver:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_ASSETS.map((asset) => (
                    <button
                      key={asset.symbol}
                      onClick={() => {
                        setSelectedAsset(asset);
                        setActiveWidget('chart');
                      }}
                      className={`px-3 py-1.5 border rounded-xl text-xs font-mono transition-all ${
                        selectedAsset.symbol === asset.symbol
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-bold'
                          : 'bg-slate-950/50 text-slate-450 border-slate-850 hover:bg-slate-950 hover:text-slate-200'
                      }`}
                    >
                      {asset.symbol} (+{Math.round(asset.payout * 100)}%)
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: STICKY PHONE PREVIEW (Sleek Isometric tilt on mouse over) */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 flex justify-center py-6">
              <div className="space-y-4">
                <SmartphoneSimulator
                  activeWidget={activeWidget}
                  setActiveWidget={setActiveWidget}
                  currentPrice={currentPrice}
                  setCurrentPrice={setCurrentPrice}
                  selectedAsset={selectedAsset}
                  setSelectedAsset={setSelectedAsset}
                />
                <span className="text-[10px] text-slate-500 font-sans block text-center">
                  💡 Move mouse inside device frame to tilt the 3D canvas
                </span>
              </div>
            </div>

          </div>

        </section>

        {/* INTERACTIVE EARNINGS PROJECTION CALCULATOR */}
        <section id="features-detail" className="mb-24 max-w-5xl mx-auto space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="font-sans text-2xl font-bold text-white tracking-tight">Compound Estimation</h2>
            <p className="text-slate-400 text-xs font-sans mt-1">
              Select capital margins below to model realistic compound gains using our binary bot win ratios.
            </p>
          </div>
          <TradingCalculator downloadUrl={downloadUrl} />
        </section>

        {/* STEP BY STEP APK ASSEMBLY BLUEPRINT */}
        <section id="installer-pipeline" className="mb-24 max-w-5xl mx-auto">
          <InstallerGuide downloadUrl={downloadUrl} />
        </section>

        {/* DEPLOYED WIN LOGS AND PAYOUT FEEDBACK ticker */}
        <section id="logs-cluster" className="mb-24 max-w-5xl mx-auto">
          <PayoutsTicker />
        </section>

        {/* WHY CHOOSE AHADBINARY BENTO GRID HIGHLIGHTS */}
        <section id="bento-values" className="mb-24 max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="font-sans text-2xl font-extrabold text-white tracking-tight">Engineered for Automated Edge</h3>
            <p className="text-slate-400 text-xs font-sans mt-1">Four core vectors why traders trust AhadBinary algorithms</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Bento Cell 1 */}
            <div className="p-5 bg-slate-900/40 border border-slate-900 rounded-2xl text-left space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-xl rounded-full" />
              <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl w-fit">
                <Globe className="w-5 h-5" />
              </div>
              <h4 className="font-sans text-sm sm:text-base font-bold text-slate-200">Global OTC Market Parsing</h4>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Connects dynamically to international forex brokers over high-performance API bridges. Feeds continuous binary tickers including Euro / US Dollar, crypto tokens, and synthetic index points.
              </p>
            </div>

            {/* Bento Cell 2 */}
            <div className="p-5 bg-slate-900/40 border border-slate-900 rounded-2xl text-left space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 blur-xl rounded-full" />
              <div className="p-2.5 bg-sky-500/10 text-sky-400 rounded-xl w-fit">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-sans text-sm sm:text-base font-bold text-slate-200">92%+ Backtest Stability</h4>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Rigorously modeled across 2.4 million historic OTC price points. Features algorithmic risk multipliers that downscale margin bets automatically during sudden market trend reversals.
              </p>
            </div>

            {/* Bento Cell 3 */}
            <div className="p-5 bg-slate-900/40 border border-slate-900 rounded-2xl text-left space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 blur-xl rounded-full" />
              <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl w-fit">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-sans text-sm sm:text-base font-bold text-slate-200">100% Zero-Permission APK</h4>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Your keys remain local on your device. Unlike competitor bots which request file storage and contacts sync access, AHADBINARY runs strictly in sandbox containers requiring only internet telemetry.
              </p>
            </div>

            {/* Bento Cell 4 */}
            <div className="p-5 bg-slate-900/40 border border-slate-900 rounded-2xl text-left space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 blur-xl rounded-full" />
              <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-xl w-fit">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h4 className="font-sans text-sm sm:text-base font-bold text-slate-200">Autonomous Compound Filters</h4>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Set and forget. Set your exact daily compounding target (e.g. 10% daily yield) and loss ceilings. The bot auto-shuts down execution lines globally when limits are triggered.
              </p>
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS SEGMENT */}
        <section id="faq-segment" className="mb-24 max-w-3xl mx-auto space-y-4">
          <div className="text-center mb-8">
            <h3 className="font-sans text-2xl font-bold text-white tracking-tight">Answering Critical Concerns</h3>
            <p className="text-slate-400 text-xs font-sans mt-1">Official safety verification policies and bot integration details</p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-slate-900/60 border border-slate-900 hover:border-slate-800 rounded-2xl transition-all overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-4 flex justify-between items-center text-left"
                  >
                    <span className="font-sans font-bold text-slate-200 text-xs sm:text-sm">
                      {item.question}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-400' : ''}`} />
                  </button>
                  
                  {isOpen && (
                    <div className="p-4 pt-1 border-t border-slate-900 bg-slate-950/20 text-xs leading-relaxed text-slate-400 text-left font-sans">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* BIG BOTTOM CALL TO ACTION FOR CONVERSIONS */}
        <section id="final-conversion" className="mb-12 max-w-4xl mx-auto p-8 rounded-3xl bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950 border border-slate-800 text-center relative overflow-hidden cyber-grid">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />
          
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-none mb-4">
            Join 82,000+ Active Binary Bots
          </h2>
          
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto mb-8 font-sans">
            Start automating options with custom risk mitigations on any OTC platform. Download AhadBinary and activate simulated parameters or live options execution immediately.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-3 px-6 rounded-xl transition-all shadow-lg active:scale-95 group leading-none"
            >
              <Download className="w-4 h-4 text-slate-950 group-hover:translate-y-0.5 transition-transform" />
              <span>Download AHADBINARY-TRADING.apk</span>
            </a>
            
            <a
              href="https://www.mediafire.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-xs py-3 px-5 transition-all"
            >
              <span>Verify Package Signature</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 pt-10 text-center text-xs text-slate-500 font-sans max-w-4xl mx-auto px-4 mt-16">
        <p className="mb-2">
          © {new Date().getFullYear()} AHADBINARY AI Trading Systems Ltd. All rights reserved.
        </p>
        <p className="max-w-2xl mx-auto leading-relaxed text-[10.5px] text-slate-600">
          Disclaimer: Binary options trading carries high risk. General backtests and simulated metrics provided on this landing page do not guarantee future profitability. Use smart risk mitigation parameters. Mirror Link powered securely by Mediafire hosting.
        </p>
      </footer>

    </div>
  );
}
