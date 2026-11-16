import { useEffect, useState } from "react";

export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  /**
   * @param {MediaQueryListEvent} event
   */
  const handleMatch = (event) => {
    console.log("change!", "landscape?", event.matches);
    setMatches(event.matches);
  };

  useEffect(() => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", handleMatch);
    console.log("attach listener", query);
    return () => {
      mql.removeEventListener(handleMatch);
    };
  }, []);

  return matches;
}
