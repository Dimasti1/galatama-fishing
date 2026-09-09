import type { SessionStatus } from "../types/game";
import { formatTime } from "../utils/formatTime";

interface SessionInfoProps {
  status: SessionStatus;
  timeRemaining: number;
}

const labels: Record<SessionStatus, string> = {
  waiting: "Menunggu",
  running: "Running",
  ended: "Sesi Berakhir",
};

export function SessionInfo({ status, timeRemaining }: SessionInfoProps) {
  const active = status === "running";
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-black/10 sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${
            active
              ? "bg-emerald-400/10 text-emerald-300"
              : status === "ended"
              ? "bg-rose-400/10 text-rose-300"
              : "bg-slate-700/60 text-slate-300"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              active
                ? "animate-pulse bg-emerald-400"
                : status === "ended"
                ? "bg-rose-400"
                : "bg-slate-400"
            }`}
          />
          {labels[status]}
        </span>
        <span className="text-xs font-semibold text-slate-500">
          SESI 60 DETIK
        </span>
      </div>
      <div className="mt-5 text-center">
        <div
          className={`font-mono text-6xl font-black tabular-nums tracking-tight sm:text-7xl ${
            timeRemaining <= 10 && active ? "text-rose-300" : "text-white"
          }`}
          aria-live="polite"
        >
          {formatTime(timeRemaining)}
        </div>
        <p className="mt-2 text-sm text-slate-500">Sisa Waktu</p>
      </div>
    </section>
  );
}
