import type { Catch } from "../types/game";

interface RecentCatchesProps {
  catches: Catch[];
}

export function RecentCatches({ catches }: RecentCatchesProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-black/10 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400">
        Live Feed
      </p>
      <h2 className="mt-1 text-lg font-bold text-white">Histori Tangkapan</h2>
      <div className="mt-5 space-y-2">
        {catches.length === 0 ? (
          <p className="py-4 text-sm text-slate-600">Belum ada tangkapan.</p>
        ) : (
          catches.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl border border-white/5 bg-white/3 px-3 py-2.5"
            >
              <span className="text-sm font-semibold text-slate-300">
                {item.playerName}
              </span>
              <span className="font-mono text-sm font-bold text-white">
                {item.weight.toFixed(1)} kg
              </span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
