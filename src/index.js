import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./Context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider> {/* ✅ Wrap the app inside AuthProvider */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthProvider>
);
