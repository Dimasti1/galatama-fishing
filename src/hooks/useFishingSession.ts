import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { initialPlayers } from '../data/players';
import type { Catch, CatchNotification, Player, SessionStatus } from '../types/game';
import { applyCatch, generateCatch } from '../utils/catchSimulator';
import { sortLeaderboard } from '../utils/leaderboard';

const SESSION_DURATION = 60;
const MIN_CATCH_DELAY = 3000;
const MAX_CATCH_DELAY = 6000;
const NOTIFICATION_DURATION = 2000;

const createInitialPlayers = (): Player[] => initialPlayers.map((player) => ({ ...player }));

const getRandomDelay = (): number =>
  Math.floor(Math.random() * (MAX_CATCH_DELAY - MIN_CATCH_DELAY + 1)) + MIN_CATCH_DELAY;

export function useFishingSession() {
  const [status, setStatus] = useState<SessionStatus>('waiting');
  const [timeRemaining, setTimeRemaining] = useState(SESSION_DURATION);
  const [players, setPlayers] = useState<Player[]>(createInitialPlayers);
  const [catches, setCatches] = useState<Catch[]>([]);
  const [heaviestCatch, setHeaviestCatch] = useState<Catch | null>(null);
  const [notification, setNotification] = useState<CatchNotification | null>(null);

  const catchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const notificationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sessionIdRef = useRef(0);
  const statusRef = useRef<SessionStatus>('waiting');
  const playersRef = useRef<Player[]>(players);

  const updateStatus = useCallback((nextStatus: SessionStatus) => {
    statusRef.current = nextStatus;
    setStatus(nextStatus);
  }, []);

  const clearCatchTimeout = useCallback(() => {
    if (catchTimeoutRef.current !== null) {
      clearTimeout(catchTimeoutRef.current);
      catchTimeoutRef.current = null;
    }
  }, []);

  const clearNotificationTimeout = useCallback(() => {
    if (notificationTimeoutRef.current !== null) {
      clearTimeout(notificationTimeoutRef.current);
      notificationTimeoutRef.current = null;
    }
  }, []);

  const stopSession = useCallback(() => {
    clearCatchTimeout();
    updateStatus('ended');
    setTimeRemaining(0);
  }, [clearCatchTimeout, updateStatus]);

  const scheduleCatch = useCallback(() => {
    clearCatchTimeout();
    if (statusRef.current !== 'running') return;

    const sessionId = sessionIdRef.current;
    catchTimeoutRef.current = setTimeout(() => {
      catchTimeoutRef.current = null;

      if (statusRef.current !== 'running' || sessionId !== sessionIdRef.current) return;

      const result = generateCatch(playersRef.current);
      const nextPlayers = applyCatch(playersRef.current, result);
      playersRef.current = nextPlayers;
      setPlayers(nextPlayers);
      setCatches((current) => [result, ...current]);
      setHeaviestCatch((current) =>
        current === null || result.weight > current.weight ? result : current,
      );

      clearNotificationTimeout();
      setNotification({
        id: result.id,
        message: `${result.playerName} mendapatkan ikan ${result.weight.toFixed(1)} kg!`,
        isBigCatch: result.weight > 7,
      });
      notificationTimeoutRef.current = setTimeout(() => {
        setNotification(null);
        notificationTimeoutRef.current = null;
      }, NOTIFICATION_DURATION);

      scheduleCatch();
    }, getRandomDelay());
  }, [clearCatchTimeout, clearNotificationTimeout]);

  useEffect(() => {
    if (status !== 'running') return;

    const timerId = setInterval(() => {
      setTimeRemaining((current) => Math.max(0, current - 1));
    }, 1000);

    return () => clearInterval(timerId);
  }, [status]);

  useEffect(() => {
    if (status === 'running' && timeRemaining === 0) {
      stopSession();
    }
  }, [status, timeRemaining, stopSession]);

  useEffect(() => {
    playersRef.current = players;
  }, [players]);

  useEffect(() => {
    if (status === 'running') scheduleCatch();
    return clearCatchTimeout;
  }, [status, scheduleCatch, clearCatchTimeout]);

  useEffect(() => {
    return () => {
      sessionIdRef.current += 1;
      clearCatchTimeout();
      clearNotificationTimeout();
    };
  }, [clearCatchTimeout, clearNotificationTimeout]);

  const startSession = useCallback(() => {
    if (statusRef.current !== 'waiting') return;
    sessionIdRef.current += 1;
    setTimeRemaining(SESSION_DURATION);
    updateStatus('running');
  }, [updateStatus]);

  const resetSession = useCallback(() => {
    sessionIdRef.current += 1;
    clearCatchTimeout();
    clearNotificationTimeout();
    const resetPlayers = createInitialPlayers();
    playersRef.current = resetPlayers;
    setPlayers(resetPlayers);
    setCatches([]);
    setHeaviestCatch(null);
    setNotification(null);
    setTimeRemaining(SESSION_DURATION);
    updateStatus('waiting');
  }, [clearCatchTimeout, clearNotificationTimeout, updateStatus]);

  const leaderboard = useMemo(() => sortLeaderboard(players), [players]);

  return {
    status,
    timeRemaining,
    leaderboard,
    catches: catches.slice(0, 10),
    heaviestCatch,
    notification,
    startSession,
    resetSession,
  };
}
