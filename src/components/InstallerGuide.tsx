/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DownloadCloud, Settings, Flame, ShieldCheck } from 'lucide-react';

export default function InstallerGuide({ downloadUrl }: { downloadUrl: string }) {
  const steps = [
    {
      id: '01',
      title: 'Download App Package',
      description: 'Click the primary download button to fetch the secure AHADBINARY-TRADING APK file mirrored on MediaFire.',
      icon: DownloadCloud,
      color: 'text-sky-400 bg-sky-500/10'
    },
    {
      id: '02',
      title: 'Authorize APK Package',
      description: 'Open your android device settings. Toggle "Allow installation from Unknown Sources" or authorize your web browser.',
      icon: Settings,
      color: 'text-amber-400 bg-amber-500/10'
    },
    {
      id: '03',
      title: 'Initialize & Compound',
      description: 'Launch the application, register in the secure panel, choose daily budget target ceilings, and deploy the bot.',
      icon: Flame,
      color: 'text-emerald-400 bg-emerald-500/10'
    }
  ];

  return (
    <div id="installation-pipeline-card" className="p-6 bg-slate-900/60 border border-slate-800 rounded-3xl backdrop-blur-xl relative">
      {/* Title */}
      <div className="flex items-center justify-between gap-3 mb-8 pb-4 border-b border-slate-800/60">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-sky-500/10 rounded-xl">
            <ShieldCheck className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <h3 className="font-sans text-lg font-bold text-slate-100">Android Setup Blueprint</h3>
            <span className="text-[11px] text-slate-400 font-sans block">Run high-performance binary options bots on any Android system</span>
          </div>
        </div>
        <span className="text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20 uppercase tracking-wide">
          Play Protect Verified
        </span>
      </div>

      {/* Grid of Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={step.id} className="p-5 bg-slate-950/40 rounded-2xl border border-slate-900 relative group hover:border-slate-800 transition-all flex flex-col justify-between min-h-[170px]">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2.5 rounded-xl ${step.color} transition-transform group-hover:scale-105`}>
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-700 select-all">{step.id}</span>
                </div>
                
                <h4 className="font-sans text-sm font-bold text-slate-200 mb-1.5">{step.title}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{step.description}</p>
              </div>

              {/* Arrow details connecting step lines */}
              {idx < 2 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 bg-slate-900 text-slate-700 pointer-events-none p-1 shrink-0 rounded-full border border-slate-800">
                  👉
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
