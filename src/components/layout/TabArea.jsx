import { Tabs, Tab, Box } from "@mui/material";
import HospitalityRecords from "../../pages/HospitalityRecords";
import InvoiceConflicts from "../../pages/InvoiceConflicts";
import Department from "../../pages/master_data/Department";
import Counterparty from "../../pages/master_data/Counterparty";
import Position from "../../pages/master_data/Position";
import Grade from "../../pages/master_data/Grade";
import { MasterDataProvider } from "../../context/MasterDataContext";
import SequentialInvoiceNumber from "../../pages/SequentialInvoiceNumber";

const componentMap = {
  records: <HospitalityRecords />,
  conflicts: <InvoiceConflicts />,
  department: <Department />,
  counterparty: <Counterparty />,
  position: <Position />,
  grade: <Grade />,
  invoice_conflicts: <SequentialInvoiceNumber />,
};

export default function TabArea({ tabs, activeTab, setActiveTab }) {
  return (
    <Box>
      <Tabs
        value={activeTab} //which tab is currently selected
        onChange={(e, v) => setActiveTab(v)}
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
