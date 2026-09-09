import type { Catch, Player } from '../types/game';

export function getRandomPlayer(players: Player[]): Player {
  if (players.length === 0) throw new Error('Cannot select a player from an empty list.');
  return players[Math.floor(Math.random() * players.length)];
}

export function generateFishWeight(): number {
  const minTenths = 5;
  const maxTenths = 100;
  const tenths = Math.floor(Math.random() * (maxTenths - minTenths + 1)) + minTenths;
  return tenths / 10;
}

export function generateCatch(players: Player[]): Catch {
  const player = getRandomPlayer(players);
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    playerId: player.id,
    playerName: player.name,
    weight: generateFishWeight(),
    timestamp: Date.now(),
  };
}

export function applyCatch(players: Player[], catchResult: Catch): Player[] {
  return players.map((player) =>
    player.id === catchResult.playerId
      ? {
        ...player,
        totalWeight: Number((player.totalWeight + catchResult.weight).toFixed(1)),
        catchCount: player.catchCount + 1,
      }
      : player,
  );
}
