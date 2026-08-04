import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./design-system/styles.css";
import "./app.css";
import { App } from "./App.jsx";
import { AuthProvider } from "./auth/contexts/AuthContext.tsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);
