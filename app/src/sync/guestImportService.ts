// guestImportService — reads/clears whatever guest chat snapshot is still
// sitting in sessionStorage after a sign-in. Guests persist under the same
// key App.jsx already uses for its localStorage/sessionStorage split
// (`storage = isGuest ? sessionStorage : localStorage`) — this file only
// ever touches sessionStorage, never localStorage, since it exists
// specifically to find *guest* leftovers.
import type { LocalBranch } from "./types";

// Must match the LS_KEY constant in App.jsx — duplicated rather than
// imported to avoid a circular import between this module and App.jsx.
const LS_KEY = "bsc.app.v4";

interface GuestSnapshot {
  branches: Record<string, LocalBranch>;
  activeId: string | null;
}

function readRaw(): GuestSnapshot | null {
  try {
    const raw = sessionStorage.getItem(LS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || !parsed.branches) return null;
    return { branches: parsed.branches, activeId: parsed.activeId ?? null };
  } catch {
    return null;
  }
}

export function hasGuestSnapshot(): boolean {
  const snap = readRaw();
  return !!snap && Object.keys(snap.branches).length > 0;
}

export function readGuestSnapshot(): GuestSnapshot | null {
  return readRaw();
}

export function clearGuestSnapshot(): void {
  try {
    sessionStorage.removeItem(LS_KEY);
  } catch {
    // ignore
  }
}
