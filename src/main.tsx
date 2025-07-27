import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import Header from "./components/Header.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="container mx-auto max-w-7xl px-4">
      <Header />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </div>
  </StrictMode>
);
