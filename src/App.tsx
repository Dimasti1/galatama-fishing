import { CatchNotification } from './components/CatchNotification';
import { Header } from './components/Header';
import { HeaviestCatch } from './components/HeaviestCatch';
import { Leaderboard } from './components/Leaderboard';
import { RecentCatches } from './components/RecentCatches';
import { SessionControls } from './components/SessionControls';
import { SessionInfo } from './components/SessionInfo';
import { useFishingSession } from './hooks/useFishingSession';

export default function App() {
  const session = useFishingSession();

  return (
    <main className="min-h-screen bg-[#070b12] px-4 py-6 text-slate-200 sm:px-6 sm:py-10">
      <CatchNotification notification={session.notification} />
      <div className="mx-auto max-w-5xl space-y-5 sm:space-y-6">
        <Header />
        <SessionInfo status={session.status} timeRemaining={session.timeRemaining} />
        <Leaderboard players={session.leaderboard} />
        <div className="grid gap-5 md:grid-cols-2">
          <HeaviestCatch catchResult={session.heaviestCatch} />
          <RecentCatches catches={session.catches} />
        </div>
        <SessionControls status={session.status} startSession={session.startSession} resetSession={session.resetSession} />
      </div>
    </main>
  );
}
