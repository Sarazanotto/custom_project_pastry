import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConfigProvider } from "antd";
import { defaultTheme } from "./styles/theme.js";
import { AuthProvider } from "./context/AuthContext.jsx";
import "antd/dist/reset.css";
import "./index.css";
import App from "./App.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider theme={defaultTheme}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ConfigProvider>
  </StrictMode>,
);
