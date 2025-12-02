import { Toolbar, Typography, Stack, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

export default function HospitalityRecordsToolbar({
  selectedCount,
  onCreate,
  onBatchDelete,
}) {
  return (
    <Toolbar
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      <Typography variant="h6">招待台帐</Typography>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={onCreate}>
          新建记录
        </Button>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          disabled={selectedCount === 0}
          onClick={onBatchDelete}
        >
          Batch Delete
        </Button>
      </Stack>
    </Toolbar>
  );
}
