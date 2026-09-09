import type { Catch } from "../types/game";

interface HeaviestCatchProps {
  catchResult: Catch | null;
}

export function HeaviestCatch({ catchResult }: HeaviestCatchProps) {
  return (
    <section className="rounded-2xl border border-amber-400/15 bg-linear-to-br from-amber-400/10 to-slate-900/70 p-5 shadow-xl shadow-black/10 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
        Record
      </p>
      <h2 className="mt-1 text-lg font-bold text-white">Tangkapan Terberat</h2>
      <div className="mt-6">
        {catchResult ? (
          <>
            <p className="text-2xl font-black text-white">
              {catchResult.playerName}
            </p>
            <p className="mt-1 font-mono text-4xl font-black text-amber-300">
              {catchResult.weight.toFixed(1)}{" "}
              <span className="text-lg">kg</span>
            </p>
          </>
        ) : (
          <p className="py-3 text-3xl font-black text-slate-600">—</p>
        )}
      </div>
    </section>
  );
}
