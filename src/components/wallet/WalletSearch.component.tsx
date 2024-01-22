import { WalletRecord } from "../../models/wallet.model";
import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

interface WalletTableProps {
  data: WalletRecord[];
}

const WalletSearch: React.FC<WalletTableProps> = ({ data }) => {
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
          Sorry, no search results found.
        </Typography>
      </div>
    );
  }

  const hasUsername = data.some((record) => record.username !== undefined);
  return (
    <>
      <TableContainer sx={{ mr: 20 }} component={Paper}>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Date</TableCell>
              <TableCell>Description</TableCell>

              {hasUsername && <TableCell align="left">Username</TableCell>}
              <TableCell align="left">Payment Id</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Transaction type</TableCell>
              <TableCell align="left">Total Payment</TableCell>
              <TableCell align="left">User Wallet Amount</TableCell>
              <TableCell align="left">Gst AMount</TableCell>
              <TableCell align="left">Coupon Used</TableCell>
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

                <TableCell align="left">{row.description || ""}</TableCell>
                {hasUsername && (
                  <TableCell align="left">{row.username || ""}</TableCell>
                )}
                <TableCell align="left">{row.totalPayment || ""}</TableCell>
                <TableCell align="left">{row.status || ""}</TableCell>
                <TableCell align="left">{row.transactionType || ""}</TableCell>
                <TableCell align="left">{row.totalPayment || ""}</TableCell>
                <TableCell align="left">{row.userWalletAmount || ""}</TableCell>
                <TableCell align="left">{row.gstAmount || ""}</TableCell>
                <TableCell align="left">{row.couponUsed || ""}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default WalletSearch;