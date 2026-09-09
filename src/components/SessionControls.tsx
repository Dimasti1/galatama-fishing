import type { SessionStatus } from "../types/game";

interface SessionControlsProps {
  status: SessionStatus;
  startSession: () => void;
  resetSession: () => void;
}

export function SessionControls({
  status,
  startSession,
  resetSession,
}: SessionControlsProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-black/10 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row">
        {status === "waiting" ? (
          <button
            type="button"
            onClick={startSession}
            className="flex-1 rounded-xl bg-amber-400 px-5 py-3.5 text-sm font-black uppercase tracking-wider text-slate-950 shadow-lg shadow-amber-400/10 transition hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-slate-950 active:scale-[0.99]"
          >
            Mulai Sesi
          </button>
        ) : (
          <button
            type="button"
            onClick={resetSession}
            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-black uppercase tracking-wider text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 focus:ring-offset-slate-950 active:scale-[0.99]"
          >
            Mulai Ulang
          </button>
        )}
      </div>
      <p className="mt-3 text-center text-xs text-slate-400">
        {status === "running"
          ? "Session berjalan. Tangkapan muncul secara acak setiap 3–6 detik."
          : status === "ended"
          ? "Session selesai. Tekan Mulai Ulang untuk memulai dari kondisi bersih."
          : "Tekan Mulai Sesi untuk memulai kompetisi."}
      </p>
    </section>
  );
}
