import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import AppFooter from "./components/layout/AppFooter";

export default function AppShell() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Outlet />

      <AppFooter />
    </Box>
  );
}
