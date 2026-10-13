import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { initSmoothScroll } from "./lib/motion";
import "lenis/dist/lenis.css";
import "./index.css";

// Before React mounts, so the preloader can lock scrolling on its first effect
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
window.scrollTo(0, 0);
initSmoothScroll();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
