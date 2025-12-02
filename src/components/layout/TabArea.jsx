import { Tabs, Tab, Box } from "@mui/material";
import HospitalityRecords from "../../pages/HospitalityRecords";
import InvoiceConflicts from "../../pages/InvoiceConflicts";
import Department from "../../pages/master_data/Department";
import Counterparty from "../../pages/master_data/Counterparty";
import Position from "../../pages/master_data/Position";
import Grade from "../../pages/master_data/Grade";

const componentMap = {
  records: <HospitalityRecords />,
  conflicts: <InvoiceConflicts />,
  department: <Department />,
  counterparty: <Counterparty />,
  position: <Position />,
  grade: <Grade />,
};

export default function TabArea({ tabs, activeTab, setActiveTab }) {
  return (
    <Box>
      <Tabs
        value={activeTab} //which tab is currently selected
        onChange={(e, v) => setActiveTab(v)} // e is event object, which we don't use. v is the value of the tab selected
        aria-label="module tabs" //for accessibility
      >
        {tabs.map((tab) => (
          <Tab key={tab.key} label={tab.label} value={tab.key} />
        ))}
      </Tabs>

      <Box sx={{ mt: 2 }}>{activeTab && componentMap[activeTab]}</Box>
    </Box>
  );
}
