import type { CatchNotification as Notification } from "../types/game";

interface CatchNotificationProps {
  notification: Notification | null;
}

export function CatchNotification({ notification }: CatchNotificationProps) {
  if (!notification) return null;
  return (
    <div
      className={`fixed inset-x-4 top-5 z-50 mx-auto max-w-md rounded-2xl border px-4 py-3 shadow-2xl backdrop-blur-md sm:left-auto sm:right-6 sm:inset-x-auto ${
        notification.isBigCatch
          ? "animate-bounce border-orange-300/30 bg-orange-950/90"
          : "border-emerald-300/20 bg-slate-950/95"
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3">
        <span className="text-xl">{notification.isBigCatch ? "🔥" : "🎣"}</span>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {notification.isBigCatch ? "TANGKAPAN BESAR!" : "Tangkapan Baru"}
          </p>
          <p className="mt-0.5 text-sm font-bold text-white">
            {notification.message}
          </p>
        </div>
      </div>
    </div>
  );
}
