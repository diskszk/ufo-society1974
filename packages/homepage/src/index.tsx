import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { worker } from "./mocks/browser";

if (process.env.NODE_ENV === "development") {
  void worker.start({ onUnhandledRequest: "bypass" });
}
const container = document.getElementById("app");

if (!container) {
  throw new Error("Can not find app root.");
}

createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
