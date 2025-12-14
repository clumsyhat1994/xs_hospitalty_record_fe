import { useMemo, useRef, useState } from "react";
import {
  IconButton,
  Paper,
  Popper,
  ClickAwayListener,
  Box,
} from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ItemsTable from "./ItemsTable";
import { estimateItemTableHeight } from "../../utils/estimateItemsTableHeight";

function useSmartPlacement(anchorEl, estimatedHeight) {
  return useMemo(() => {
    if (!anchorEl) return "bottom-start";
    const rect = anchorEl.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    return spaceBelow >= estimatedHeight || spaceBelow >= spaceAbove
      ? "bottom-start"
      : "top-start";
  }, [anchorEl, estimatedHeight]);
}

export function ItemsPopperCell({ items = [] }) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const estimatedHeight = useMemo(
    () => estimateItemTableHeight({ rowCount: items.length }),
    [items.length]
  );
  const placement = useSmartPlacement(anchorEl, estimatedHeight);

  return (
    <>
      <IconButton
        size="small"
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
          setOpen((v) => !v);
        }}
      >
        <ListAltIcon fontSize="small" />
      </IconButton>

      <Popper
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        sx={{ zIndex: 1300 }}
      >
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <Paper
            elevation={6}
            sx={{ width: 520, maxHeight: 280, overflow: "auto", p: 1 }}
          >
            <Box sx={{ px: 1, py: 0.5, fontWeight: 600 }}>招待明细</Box>
            <ItemsTable items={items} />
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
}
