import { WalletRecord } from "../../models/wallet.model";
import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface WalletTableProps {
  data: WalletRecord[];
}

const WalletTable: React.FC<WalletTableProps> = ({ data }) => {
  return (
    <TableContainer sx={{ mr: 20 }} component={Paper}>
      <Table sx={{ minWidth: 200 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }} align="left">
              Date
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="left">
              Time
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="left">
              Description
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="left">
              Username
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="left">
              Payment Id
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="left">
              Status
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="left">
              Transaction type
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="left">
              Refund
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="left">
              Total Payment
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="left">
              User Wallet Amount
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="left">
              Gst AMount
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="left">
              Coupon Used
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.time}
              </TableCell>
              <TableCell align="left">{row.description || ""}</TableCell>
              <TableCell align="left">{row.username || ""}</TableCell>
              <TableCell align="left">{row.phonePePaymentId || "_"}</TableCell>
              <TableCell align="left">{row.status || ""}</TableCell>
              <TableCell
                align="left"
                style={{
                  color: row.transactionType === "credit" ? "green" : "red",
                }}
              >
                {row.transactionType || ""}
              </TableCell>
              <TableCell align="left">{row.refund ? "Yes" : "No"}</TableCell>
              <TableCell align="left">{row.totalPayment || ""}</TableCell>
              <TableCell align="left">{row.userWalletAmount || ""}</TableCell>
              <TableCell align="left">{row.gstAmount || ""}</TableCell>
              <TableCell align="left">
                {row.couponUsed ? "Yes" : "No"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WalletTable;
