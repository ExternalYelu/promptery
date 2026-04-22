"use client";

import { useEffect, useState, useCallback } from "react";

const KEY = "promptery.bookmarks.v1";

export function useBookmarks() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setIds(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const persist = useCallback((next: string[]) => {
    setIds(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(
    (id: string) => {
      const next = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
      persist(next);
    },
    [ids, persist]
  );

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  return { ids, toggle, has };
}
