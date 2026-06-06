/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PriceTick {
  time: string;
  price: number;
  sma?: number;
  ema?: number;
  prediction?: 'UP' | 'DOWN';
}

export type WidgetType = 'chart' | 'signals' | 'cockpit' | 'orderbook' | 'metrics';

export interface WidgetMeta {
  id: WidgetType;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  gradient: string;
  badge: string;
}

export interface TradeSimulation {
  id: string;
  asset: string;
  type: 'CALL' | 'PUT';
  entryPrice: number;
  expiryPrice?: number;
  amount: number;
  payout?: number;
  durationSeconds: number;
  timeLeft: number;
  status: 'PENDING' | 'WIN' | 'LOSS';
  timestamp: string;
}

export interface RecentGlobalPayout {
  id: string;
  user: string;
  asset: string;
  amount: number;
  payout: number;
  type: 'CALL' | 'PUT';
  win: boolean;
  timeAgo: string;
}
