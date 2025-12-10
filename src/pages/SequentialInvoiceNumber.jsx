import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TablePagination,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import invoiceRunsApi from "../api/invoiceRunsApi";

export default function SequentialInvoiceNumber() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setSize(newSize);
    setPage(0);
  };
  useEffect(() => {
    invoiceRunsApi
      .list()
      .then((res) => {
        console.log(res);
        setRows(res.data.content);
        setTotalElements(res.data.totalElements);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>发票号</TableCell>

            <TableCell>招待日期</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.invoiceNumberStrings.join(", ")}</TableCell>

              <TableCell>{row.receptionDates.join(", ")}</TableCell>
            </TableRow>
          ))}
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
    </>
  );
}
