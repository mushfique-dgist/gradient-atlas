"use client";

import { useState, useSyncExternalStore } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHydrated } from "@/lib/use-hydrated";

const storageKey = "gradient-atlas:completed-lessons";
const listeners = new Set<() => void>();

function readProgress(): string[] {
  try {
    const value = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function LessonProgress({ slug }: { slug: string }) {
  const hydrated = useHydrated();
  const [storageAvailable, setStorageAvailable] = useState(true);
  const complete = useSyncExternalStore(
    (notify) => {
      listeners.add(notify);
      window.addEventListener("storage", notify);
      return () => {
        listeners.delete(notify);
        window.removeEventListener("storage", notify);
      };
    },
    () => readProgress().includes(slug),
    () => false,
  );

  function toggle() {
    const next = !complete;
    try {
      const current = new Set(readProgress());
      if (next) current.add(slug);
      else current.delete(slug);
      localStorage.setItem(storageKey, JSON.stringify([...current].sort()));
      listeners.forEach((notify) => notify());
      setStorageAvailable(true);
    } catch {
      setStorageAvailable(false);
    }
  }

  return (
    <div>
      <Button aria-pressed={complete} className="h-11 rounded-none px-4" disabled={!hydrated} onClick={toggle} type="button" variant={complete ? "secondary" : "default"}>
        <Check aria-hidden="true" /> {complete ? "Marked complete" : "Mark lesson complete"}
      </Button>
      {!storageAvailable && <p className="mt-2 max-w-xs text-xs text-[var(--red)]" role="status">Progress could not be saved because browser storage is unavailable.</p>}
    </div>
  );
}
