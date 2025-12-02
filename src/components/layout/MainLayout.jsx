import { useState } from "react";
import Sidebar from "./Sidebar";
import TabArea from "./TabArea";
import Box from "@mui/material/Box";

export default function MainLayout() {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);

  const handleOpenModule = (module) => {
    if (!tabs.find((t) => t.key === module.key)) {
      setTabs([...tabs, module]);
    }
    setActiveTab(module.key);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar onOpenModule={handleOpenModule} />
      <Box sx={{ flexGrow: 1, p: 2, width: "80%" }}>
        <TabArea
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </Box>
    </Box>
  );
}
