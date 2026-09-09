import type { Player } from '../types/game';

export const initialPlayers: Player[] = [1, 2, 3, 4, 5].map((number) => ({
  id: `bot-${number}`,
  name: `Bot ${number}`,
  totalWeight: 0,
  catchCount: 0,
}));
