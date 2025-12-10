import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Checkbox,
  IconButton,
  Stack,
  TablePagination,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import hospitalityApi from "../../api/hospitalityApi";

function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString();
}

function formatAmount(value) {
  if (value === null || value === undefined || value === "") return "";
  return Number(value).toFixed(2);
}

export default function HospitalityRecordsTable({
  records,
  setRecords,
  selectedIds,
  onToggleAll,
  onToggleOne,
  onEditRow,
  onDeleteRow,
  page,
  setPage,
  filters,
}) {
  const [loading, setLoading] = useState(false);

  const [size, setSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);

  const allSelected =
    records.length > 0 && selectedIds.length === records.length;
  const indeterminate =
    selectedIds.length > 0 && selectedIds.length < records.length;

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        const res = await hospitalityApi.filtered_list(page, size, filters);
        if (!cancelled) {
          const data = res.data;
          setRecords(data.content);
          setTotalElements(data.totalElements);
        }
      } catch (e) {
        if (!cancelled) console.error(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [page, size, setRecords, filters]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setSize(newSize);
    setPage(0);
  };

  return (
    <TableContainer sx={{ maxHeight: "80vh", overflowX: "auto" }}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                checked={allSelected}
                indeterminate={indeterminate}
                onChange={(e) => onToggleAll(e.target.checked)}
              />
            </TableCell>
            <TableCell padding="checkbox" align="center">
              操作
            </TableCell>
            <TableCell sx={{ minWidth: 120 }}>接待日期</TableCell>
            <TableCell sx={{ minWidth: 150 }}>接待对象</TableCell>
            <TableCell sx={{ minWidth: 110 }}>报销部门</TableCell>
            <TableCell sx={{ minWidth: 100 }}>经手人</TableCell>
            <TableCell sx={{ minWidth: 110 }}>接待类型</TableCell>
            <TableCell sx={{ minWidth: 100 }}>地点</TableCell>
            <TableCell align="right" sx={{ minWidth: 110 }}>
              发票金额（元）
            </TableCell>
            <TableCell align="right" sx={{ minWidth: 110 }}>
              总接待金额（含酒水）
            </TableCell>
            <TableCell sx={{ minWidth: 200 }}>发票号</TableCell>
            <TableCell sx={{ minWidth: 120 }}>发票日期</TableCell>
            <TableCell sx={{ minWidth: 120 }}>部门负责人审批日期</TableCell>
            <TableCell sx={{ minWidth: 120 }}>
              党总支书记（分管领导）审批日期
            </TableCell>
            <TableCell align="right" sx={{ minWidth: 100 }}>
              来访人数
            </TableCell>
            <TableCell align="right" sx={{ minWidth: 100 }}>
              我方人数
            </TableCell>
            <TableCell align="right" sx={{ minWidth: 100 }}>
              合计人数
            </TableCell>
            <TableCell align="right" sx={{ minWidth: 110 }}>
              人均金额
            </TableCell>
            <TableCell sx={{ minWidth: 120 }}>我方主持招待人员职务</TableCell>
            <TableCell sx={{ minWidth: 120 }}>对方主持招待人员职务</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {loading ? (
            Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell padding="checkbox">
                  <Skeleton variant="rectangular" width={24} height={28} />
                </TableCell>

                <TableCell padding="checkbox">
                  <Stack direction="row" spacing={1}>
                    <Skeleton variant="circular" width={28} height={28} />
                    <Skeleton variant="circular" width={28} height={28} />
                  </Stack>
                </TableCell>

                <TableCell>
                  <Skeleton height={26} />
                </TableCell>
                <TableCell>
                  <Skeleton height={26} />
                </TableCell>
                <TableCell>
                  <Skeleton height={26} />
                </TableCell>
                <TableCell>
                  <Skeleton height={26} />
                </TableCell>
                <TableCell>
                  <Skeleton height={26} />
                </TableCell>
                <TableCell>
                  <Skeleton height={26} />
                </TableCell>

                <TableCell align="right">
                  <Skeleton height={26} />
                </TableCell>
                <TableCell align="right">
                  <Skeleton height={26} />
                </TableCell>

                <TableCell>
                  <Skeleton height={26} />
                </TableCell>
                <TableCell>
                  <Skeleton height={26} />
                </TableCell>
                <TableCell>
                  <Skeleton height={26} />
                </TableCell>
                <TableCell>
                  <Skeleton height={26} />
                </TableCell>

                <TableCell align="right">
                  <Skeleton height={26} />
                </TableCell>
                <TableCell align="right">
                  <Skeleton height={26} />
                </TableCell>
                <TableCell align="right">
                  <Skeleton height={26} />
                </TableCell>

                <TableCell align="right">
                  <Skeleton height={26} />
                </TableCell>
                <TableCell>
                  <Skeleton height={26} />
                </TableCell>
                <TableCell>
                  <Skeleton height={26} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <>
              {records.map((record) => {
                const selected = selectedIds.includes(record.id);
                return (
                  <TableRow key={record.id} hover selected={selected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selected}
                        onChange={() => onToggleOne(record.id)}
                      />
                    </TableCell>

                    <TableCell padding="checkbox">
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          size="small"
                          onClick={() => onEditRow(record)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => onDeleteRow(record.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </TableCell>

                    <TableCell>{formatDate(record.receptionDate)}</TableCell>
                    <TableCell>{record.counterpartyName}</TableCell>
                    <TableCell>{record.departmentName}</TableCell>
                    <TableCell>{record.handlerName}</TableCell>
                    <TableCell>{record.hospitalityTypeName}</TableCell>
                    <TableCell>{record.location}</TableCell>
                    <TableCell align="right">
                      {formatAmount(record.invoiceAmount)}
                    </TableCell>
                    <TableCell align="right">
                      {formatAmount(record.totalAmount)}
                    </TableCell>
                    <TableCell>{record.invoiceNumberString}</TableCell>
                    <TableCell>{record.invoiceDate}</TableCell>
                    <TableCell>
                      {formatDate(record.deptHeadApprovalDate)}
                    </TableCell>
                    <TableCell>
                      {formatDate(record.partySecretaryApprovalDate)}
                    </TableCell>
                    <TableCell align="right">{record.theirCount}</TableCell>
                    <TableCell align="right">{record.ourCount}</TableCell>
                    <TableCell align="right">{record.totalCount}</TableCell>
                    <TableCell align="right">
                      {formatAmount(record.perCapitaAmount)}
                    </TableCell>
                    <TableCell>{record.ourHostPosition}</TableCell>
                    <TableCell>{record.theirHostPosition}</TableCell>
                  </TableRow>
                );
              })}

              {records.length === 0 && (
                <TableRow>
                  <TableCell colSpan={18} align="left">
                    您已抵达台帐宇宙的尽头~
                  </TableCell>
                </TableRow>
              )}
            </>
          )}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={totalElements}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={size}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </TableContainer>
  );
}
