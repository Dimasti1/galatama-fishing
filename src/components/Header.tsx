export function Header() {
  return (
    <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-400">
          Fishing Competition
        </p>
        <h1 className="mt-1 text-3xl font-black tracking-tight text-white sm:text-4xl">
          Galatama Fishing
        </h1>
      </div>
      <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300">
        5 Pemancing Virtual
      </div>
    </header>
  );
}
