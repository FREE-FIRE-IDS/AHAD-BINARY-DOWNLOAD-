/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WidgetMeta, RecentGlobalPayout } from '../types';

export const WIDGETS_METADATA: WidgetMeta[] = [
  {
    id: 'chart',
    title: '3D Binary Waver™',
    subtitle: 'Real-time Charting',
    description: 'High-fidelity dynamic charting engine with real-time indicators, customizable moving averages, and live prediction vectors.',
    iconName: 'LineChart',
    gradient: 'from-emerald-500/20 to-teal-500/20 shadow-emerald-500/10',
    badge: 'Real-time AI Feed'
  },
  {
    id: 'cockpit',
    title: 'Instant Execution Cockpit',
    subtitle: 'Simulated Execution',
    description: 'Try the AHADBINARY bot speed yourself! Execute a custom mock binary CALL/PUT trade with a 10s interactive timer and live payout validation.',
    iconName: 'Zap',
    gradient: 'from-sky-500/20 to-indigo-500/20 shadow-sky-500/10',
    badge: '100% Interactive'
  },
  {
    id: 'signals',
    title: 'AI Signal Analyzer',
    subtitle: 'Binary Probability Grid',
    description: 'Continuous predictive scans across major binary currences. Filter key setups with confidence ratings exceeding 88%.',
    iconName: 'Cpu',
    gradient: 'from-amber-500/20 to-orange-500/20 shadow-amber-500/10',
    badge: 'Machine Learning'
  },
  {
    id: 'metrics',
    title: 'Performance Matrix',
    subtitle: 'Verified Profit Stats',
    description: 'Historical backtests, dynamic payout ratios, verified winning streaks, and precise execution speed statistics.',
    iconName: 'BarChart3',
    gradient: 'from-rose-500/20 to-purple-500/20 shadow-rose-500/10',
    badge: 'Audit Verified'
  }
];

export const POPULAR_ASSETS = [
  { symbol: 'EUR/USD (OTC)', name: 'Euro / US Dollar OTC', basePrice: 1.0845, payout: 0.92, category: 'Forex' },
  { symbol: 'GBP/USD (OTC)', name: 'British Pound / US Dollar OTC', basePrice: 1.2682, payout: 0.90, category: 'Forex' },
  { symbol: 'USD/JPY (OTC)', name: 'US Dollar / Japanese Yen OTC', basePrice: 156.41, payout: 0.88, category: 'Forex' },
  { symbol: 'BTC/USDT', name: 'Bitcoin / Tether Spot', basePrice: 68425.50, payout: 0.85, category: 'Crypto' },
  { symbol: 'AHAD-TOKEN/USDT', name: 'Ahad Index Premium', basePrice: 350.25, payout: 0.95, category: 'Synthetics' }
];

export const INITIAL_PAYOUTS: RecentGlobalPayout[] = [
  { id: '1', user: 'Ahsan_FX', asset: 'EUR/USD (OTC)', amount: 50, payout: 96, type: 'CALL', win: true, timeAgo: '2s ago' },
  { id: '2', user: 'Binary_Dictator', asset: 'GBP/USD (OTC)', amount: 120, payout: 228, type: 'CALL', win: true, timeAgo: '14s ago' },
  { id: '3', user: 'Trader_Sudais', asset: 'AHAD-TOKEN/USDT', amount: 300, payout: 585, type: 'CALL', win: true, timeAgo: '30s ago' },
  { id: '4', user: 'AlphaTrader', asset: 'BTC/USDT', amount: 100, payout: 0, type: 'PUT', win: false, timeAgo: '45s ago' },
  { id: '5', user: 'Kamran_OTC', asset: 'USD/JPY (OTC)', amount: 200, payout: 376, type: 'PUT', win: true, timeAgo: '1m ago' },
  { id: '6', user: 'BinaryQueen', asset: 'EUR/USD (OTC)', amount: 80, payout: 153.6, type: 'CALL', win: true, timeAgo: '2m ago' }
];

export const FAQ_ITEMS = [
  {
    question: "Is AHADBINARY safe to download and install?",
    answer: "Yes. Our APK is strictly built on a secure, zero-permission container model. Android devices scan all downloaded files automatically via Play Protect to guarantee files are malware-free. Since our app is a premium binary trading tool, we host the official secure APK directly on MediaFire."
  },
  {
    question: "How do I start automation on the mobile trading bot?",
    answer: "Simply download our official APK, sign in or connect your demo trading credentials, select one of the vetted bot templates (Conservative, Compound, or Hyper-Scalping), and hit 'Start Robot'. The system works directly with API connection layers to run 24/7."
  },
  {
    question: "What assets can the bot trade?",
    answer: "It operates with unmatched precision across OTC currency pairs (EUR/USD, GBP/USD, USD/JPY), high-liquidity cryptocurrency pairs, and custom volatility composite markers designed for quick binary contract expiry terms (1 minute to 15 minutes)."
  },
  {
    question: "How does the simulated widget help?",
    answer: "The interactive simulated cockpit on our landing page lets you test-drive our exact trading algorithms in a real-time reactive sandbox. Use it to practice binary timing and observe the precision of call/put signals before launching the production Bot APK."
  }
];
