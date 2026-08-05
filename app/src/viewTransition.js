// withViewTransition — wraps a state update in the native View Transitions
// API so the resulting DOM change (e.g. a theme swap) animates instead of
// snapping. Falls back to a plain synchronous call wherever unsupported.
export function withViewTransition(callback) {
  if (typeof document !== "undefined" && document.startViewTransition) {
    document.startViewTransition(callback);
  } else {
    callback();
  }
}
