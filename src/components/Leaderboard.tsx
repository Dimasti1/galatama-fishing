import type { Player } from "../types/game";

interface LeaderboardProps {
  players: Player[];
}

export function Leaderboard({ players }: LeaderboardProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 shadow-xl shadow-black/10">
      <div className="border-b border-white/10 px-5 py-4 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
          Live Standings
        </p>
        <h2 className="mt-1 text-xl font-bold text-white">Leaderboard</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-fixed text-left text-sm">
          <thead className="bg-white/3 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-5 py-3 font-semibold">No</th>
              <th className="px-2 py-3 font-semibold">Pemancing</th>
              <th className="px-2 py-3 text-right font-semibold">Tangkapan</th>
              <th className="px-5 py-3 text-right font-semibold">
                Total Berat
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {players.map((player, index) => (
              <tr
                key={player.id}
                className="transition-colors hover:bg-white/3"
              >
                <td className="px-5 py-4 font-mono font-bold text-slate-500">
                  {String(index + 1).padStart(2, "0")}
                </td>
                <td className="px-2 py-4 font-semibold text-slate-200">
                  {player.name}
                </td>
                <td className="px-2 py-4 text-right font-mono text-slate-400">
                  {player.catchCount}
                </td>
                <td className="px-5 py-4 text-right font-mono font-bold text-white">
                  {player.totalWeight.toFixed(1)}{" "}
                  <span className="text-xs font-normal text-slate-500">kg</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
