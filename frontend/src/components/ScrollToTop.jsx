import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // force scroll window to top
    window.scrollTo(0, 0);

    // also scroll any scrollable element
    const el =
      document.scrollingElement || document.documentElement || document.body;

    el.scrollTop = 0;
  }, [pathname]);

  return null;
}
