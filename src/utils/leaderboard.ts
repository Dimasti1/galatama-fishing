import type { Player } from '../types/game';

export function sortLeaderboard(players: Player[]): Player[] {
  return [...players].sort((a, b) =>
    b.totalWeight - a.totalWeight || b.catchCount - a.catchCount || a.name.localeCompare(b.name),
  );
}
