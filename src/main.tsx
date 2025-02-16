import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Popup } from "./chrome-extension/popup/index";
import "./chrome-extension/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div>
      <h1 className="text-3xl font-bold text-black">Hello</h1>
    </div>
  </StrictMode>
);
