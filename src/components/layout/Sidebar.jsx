import { Collapse } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { useState } from "react";

export default function Sidebar({ onOpenModule }) {
  const [masterOpen, setMasterOpen] = useState(true);
  const toggleMaster = () => {
    setMasterOpen((prev) => !prev);
  };
  return (
    <Box sx={{ width: 250, borderRight: "1px solid #ddd" }}>
      <List>
        <ListItemButton
          onClick={() =>
            onOpenModule({ key: "records", label: "Hospitality Records" })
          }
        >
          <ListItemText primary="Hospitality Records" />
        </ListItemButton>

        <ListItemButton
          onClick={() =>
            onOpenModule({ key: "conflicts", label: "Invoice Conflicts" })
          }
        >
          <ListItemText primary="Invoice Conflicts" />
        </ListItemButton>

        <ListItemButton onClick={toggleMaster}>
          <ListItemText primary="Master Data" sx={{ pl: 2, pt: 2 }} />
          {masterOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={masterOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              onClick={() =>
                onOpenModule({ key: "department", label: "Department" })
              }
            >
              <ListItemText primary="Department" />
            </ListItemButton>

            <ListItemButton
              onClick={() =>
                onOpenModule({ key: "counterparty", label: "Counterparty" })
              }
            >
              <ListItemText primary="Counterparty" />
            </ListItemButton>

            <ListItemButton
              onClick={() =>
                onOpenModule({ key: "position", label: "Position" })
              }
            >
              <ListItemText primary="Position" />
            </ListItemButton>

            <ListItemButton
              onClick={() => onOpenModule({ key: "grade", label: "Grade" })}
            >
              <ListItemText primary="Grade" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Box>
  );
}
