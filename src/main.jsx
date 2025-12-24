import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import axios from "axios";
import App from "./App.jsx";
//import { getBaseUrl } from "./config/runtimeConfig.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { zhCN } from "@mui/material/locale";
import { AuthProvider } from "./context/AuthProvider.jsx";

const theme = createTheme(
  {
    components: {
      MuiButtonBase: {
        defaultProps: {
          // The props to change the default for.
          disableRipple: true,
        },
      },

      // 2) Dialog transition speed
      MuiDialog: {
        defaultProps: {
          transitionDuration: 0,
        },
      },
    },
  },
  zhCN
);

// async function loadConfig() {
//   try {
//     const res = await fetch("/runtime-config.json", {
//       cache: "no-store",
//     });
//     window.__APP_CONFIG__ = await res.json();
//     axios.defaults.baseURL = getBaseUrl();
//     //console.log("window app config: ", window.__APP_CONFIG__);
//   } catch (e) {
//     console.error("Failed to load runtime config:", e);
//     window.__APP_CONFIG__ = {};
//   }
// }

//loadConfig().then(() =>
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
//);
