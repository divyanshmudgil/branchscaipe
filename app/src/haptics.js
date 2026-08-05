// haptics — lightweight fallback via the Vibration API. Gracefully a no-op
// wherever it's unsupported (desktop browsers, iOS Safari) or blocked.
export function vibrate(ms = 10) {
  try { navigator.vibrate?.(ms); } catch { /* unsupported — ignore */ }
}
