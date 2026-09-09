export type SessionStatus = 'waiting' | 'running' | 'ended';

export interface Player {
  id: string;
  name: string;
  totalWeight: number;
  catchCount: number;
}

export interface Catch {
  id: string;
  playerId: string;
  playerName: string;
  weight: number;
  timestamp: number;
}

export interface CatchNotification {
  id: string;
  message: string;
  isBigCatch: boolean;
}
