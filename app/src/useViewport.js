// useViewport — breakpoint + input-mode flags, computed via matchMedia so the
// rest of the app can branch layout/interaction the same way it already
// branches on theme/density (plain booleans, no CSS-class system to fight).
//
// Breakpoints: mobile < 640px, tablet 640–1023px, desktop >= 1024px.
import React from "react";

const QUERIES = {
  mobile: "(max-width: 639px)",
  tablet: "(min-width: 640px) and (max-width: 1023px)",
  touch: "(pointer: coarse)",
};

function read() {
  if (typeof window === "undefined" || !window.matchMedia) {
    return { isMobile: false, isTablet: false, isDesktop: true, isTouch: false };
  }
  const isMobile = window.matchMedia(QUERIES.mobile).matches;
  const isTablet = window.matchMedia(QUERIES.tablet).matches;
  return {
    isMobile,
    isTablet,
    isDesktop: !isMobile && !isTablet,
    isTouch: window.matchMedia(QUERIES.touch).matches,
  };
}

export function useViewport() {
  const [state, setState] = React.useState(read);

  React.useEffect(() => {
    const mqls = Object.values(QUERIES).map((q) => window.matchMedia(q));
    const onChange = () => setState(read());
    mqls.forEach((mql) => mql.addEventListener("change", onChange));
    return () => mqls.forEach((mql) => mql.removeEventListener("change", onChange));
  }, []);

  return state;
}
