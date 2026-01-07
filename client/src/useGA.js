import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GA_ID = "G-NSQC36TS8J";

export default function useGA() {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", GA_ID, {
        page_path: location.pathname,
      });
    }
  }, [location]);
}
