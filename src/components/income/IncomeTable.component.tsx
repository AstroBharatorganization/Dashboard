import { IncomeRecord } from "../../models/income.model";
import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

interface IncomeTableProps {
  data: IncomeRecord[];
}

const IncomeTable: React.FC<IncomeTableProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 50,
        }}
      >
        <Typography variant="h6" color="textSecondary">
          No data found.
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <TableContainer sx={{ mr: 20 }} component={Paper}>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Astrologer</TableCell>
              <TableCell align="left">Astrologer Cut</TableCell>
              <TableCell align="left">Company Cut</TableCell>
              <TableCell align="left">Ratio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.createdAt
                    ? new Date(row.createdAt).toLocaleDateString()
                    : ""}
                </TableCell>
                <TableCell align="left">{row.name || ""}</TableCell>
                <TableCell align="left">{row.astrologerCut || ""}</TableCell>
                <TableCell align="left">{row.companyCut || ""}</TableCell>
                <TableCell align="left">{row.ratio || ""}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default IncomeTable;