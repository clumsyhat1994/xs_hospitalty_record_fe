import { useEffect, useState } from "react";

import {
  Box,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Checkbox,
  IconButton,
  Button,
  Toolbar,
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import hospitalityApi from "../api/hospitalityApi";
import HospitalityRecordsToolBar from "../components/hospitality/HospitalityRecordsToolbar";
import HospitalityRecordDialog from "../components/hospitality/HospitalityRecordsDialog";
import HospitalityRecordsTable from "../components/hospitality/HospitalityRecordsTable";
import masterDataApi from "../api/masterDataApi";
const emptyRecord = {
  id: null,
  receptionDate: "2025-12-30",
  counterpartyId: "1",
  invoiceAmount: "1688",
  handlerName: "张三",
  deptHeadApprovalDate: "2023-10-28",
  partySecretaryApprovalDate: "2023-10-29",
  invoiceDate: "2023-10-30",
  invoiceNumberString: "25444000000006604608",
  departmentId: "1",
  hospitalityTypeId: "1",
  location: "餐厅",
  theirCount: "8",
  ourCount: "4",
  ourHostPositionId: "1",
  theirHostPositionId: "2",
  items: [
    { itemName: "白菜", unitPrice: 12, quantity: 3 },
    { itemName: "香菇", unitPrice: 120, quantity: 5 },
  ],
};

export default function HospitalityRecords() {
  const [records, setRecords] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [hospitalityTypes, setHospitalityTypes] = useState([]);
  const [counterparties, setCounterparties] = useState([]);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    let cancelled = false;

    // hospitalityApi
    //   .filtered_list()
    //   .then((res) => {
    //     console.log(res.data);
    //     if (!cancelled) {
    //       setRecords(res.data.content);
    //     }
    //   })
    //   .catch((err) => console.error(err));

    masterDataApi
      .listDepartments()
      .then((res) => {
        console.log(res.data);
        if (!cancelled) setDepartments(res.data.content || []);
      })
      .catch((err) => console.error("Failed to load departments", err));

    masterDataApi
      .listHospitalityTypes()
      .then((res) => {
        console.log(res.data);
        if (!cancelled) setHospitalityTypes(res.data.content || []);
      })
      .catch((err) => console.error("Failed to load hospitality types", err));

    masterDataApi
      .listCounterParties()
      .then((res) => {
        console.log(res.data);
        if (!cancelled) setCounterparties(res.data.content || []);
      })
      .catch((err) => console.error("Failed to load counterparties", err));

    masterDataApi
      .listPositions()
      .then((res) => {
        console.log(res.data);
        if (!cancelled) setPositions(res.data.content || []);
      })
      .catch((err) => console.error("Failed to load positions", err));

    return () => {
      cancelled = true;
    };
  }, []);

  const handleToggleAll = (checked) => {
    if (checked) {
      setSelectedIds(records.map((r) => r.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleCreateClick = () => {
    setEditingRecord(null);
    setDialogOpen(true);
  };

  const handleEditRow = (record) => {
    setEditingRecord(record);
    setDialogOpen(true);
  };

  const handleDeleteRow = (id) => {
    if (!window.confirm("Delete this record?")) return;
    hospitalityApi.deleteOne(id).catch((err) => console.error(err));
    setRecords((prev) => prev.filter((r) => r.id !== id));
    setSelectedIds((prev) => prev.filter((x) => x !== id));
  };

  const handleBatchDeleteClick = () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Delete ${selectedIds.length} selected records?`)) {
      return;
    }
    // TODO: call hospitalityApi.batchDelete(selectedIds)
    setRecords((prev) => prev.filter((r) => !selectedIds.includes(r.id)));
    setSelectedIds([]);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogSave = async (values) => {
    // try {
    //   let res;
    if (editingRecord) {
      // update
      // res = await hospitalityApi.update(editingRecord.id, values);
      // console.log(res.data);
      setRecords((prev) =>
        prev.map((r) => (r.id === editingRecord.id ? { ...r, ...values } : r))
      );
    } else {
      // create
      // res = hospitalityApi.create(values);

      // console.log(res.response.data);
      setRecords((prev) => [values, ...prev]);
    }
    setDialogOpen(false);
    // } catch (err) {
    //   console.error(err);
    // }
  };

  return (
    <Box>
      <Paper elevation={2}>
        <HospitalityRecordsToolBar
          selectedCount={selectedIds.length}
          onCreate={handleCreateClick}
          onBatchDelete={handleBatchDeleteClick}
        />
        <HospitalityRecordsTable
          records={records}
          setRecords={setRecords}
          selectedIds={selectedIds}
          onToggleAll={handleToggleAll}
          onToggleOne={handleToggleOne}
          onEditRow={handleEditRow}
          onDeleteRow={handleDeleteRow}
        />
      </Paper>
      <HospitalityRecordDialog
        open={dialogOpen}
        initialValues={editingRecord || emptyRecord}
        isEditMode={!!editingRecord}
        onClose={handleDialogClose}
        onSave={handleDialogSave}
        departments={departments}
        hospitalityTypes={hospitalityTypes}
        counterparties={counterparties}
        positions={positions}
      />
    </Box>
  );
}
