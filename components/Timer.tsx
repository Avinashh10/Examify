"use client";

import { useEffect, useRef, useState } from "react";

interface TimerProps {
  duration: number;
  onTimeUp: () => void;
}

export default function Timer({ duration, onTimeUp }: TimerProps) {
  const initialSeconds = Number.isFinite(duration)
    ? Math.max(0, Math.floor(duration * 60))
    : 0;
  const [timerState, setTimerState] = useState({
    durationSeconds: initialSeconds,
    secondsRemaining: initialSeconds,
  });
  const secondsRemaining =
    timerState.durationSeconds === initialSeconds
      ? timerState.secondsRemaining
      : initialSeconds;
  const remainingRef = useRef(initialSeconds);
  const onTimeUpRef = useRef(onTimeUp);
  const didNotifyRef = useRef(false);
  const previousDurationRef = useRef(initialSeconds);

  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  useEffect(() => {
    if (previousDurationRef.current !== initialSeconds) {
      previousDurationRef.current = initialSeconds;
      didNotifyRef.current = false;
    }

    remainingRef.current = initialSeconds;

    if (initialSeconds === 0) {
      if (!didNotifyRef.current) {
        didNotifyRef.current = true;
        onTimeUpRef.current();
      }
      return;
    }

    const intervalId = window.setInterval(() => {
      const nextSeconds = Math.max(0, remainingRef.current - 1);
      remainingRef.current = nextSeconds;
      setTimerState({
        durationSeconds: initialSeconds,
        secondsRemaining: nextSeconds,
      });

      if (nextSeconds === 0) {
        window.clearInterval(intervalId);
        if (!didNotifyRef.current) {
          didNotifyRef.current = true;
          onTimeUpRef.current();
        }
      }
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [initialSeconds]);

  const minutes = Math.floor(secondsRemaining / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (secondsRemaining % 60).toString().padStart(2, "0");
  const isUrgent = secondsRemaining < 60;

  return (
    <div
      className={`rounded-xl border px-4 py-3 text-right ${
        isUrgent
          ? "border-rose-200 bg-rose-50 text-rose-800"
          : "border-border bg-surface text-navy"
      }`}
    >
      <p className={`text-xs font-medium ${isUrgent ? "text-rose-700" : "text-muted"}`}>
        Time Remaining
      </p>
      <p
        role="timer"
        aria-live="off"
        className={`mt-0.5 font-mono text-xl font-bold tabular-nums ${
          isUrgent ? "text-rose-800" : "text-navy"
        }`}
      >
        {minutes}:{seconds}
      </p>
    </div>
  );
}
