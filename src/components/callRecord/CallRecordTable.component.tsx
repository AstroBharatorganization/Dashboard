import { CallRecords } from "@/models/callRecord.model";
import React, { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useRefundCallRecordMutation } from "../../services/master.service";

interface CallRecordTableProps {
  data: CallRecords[];
  refetchData: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CallRecordTable: React.FC<CallRecordTableProps> = ({
  data,
  refetchData,
}) => {
  const [selectedId, setSelectedId] = useState<any>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const [refundCallRecordMutation] = useRefundCallRecordMutation();

  const handleRefundClick = (id: number) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedId(null);
    setModalOpen(false);
  };

  const handleConfirmRefund = async () => {
    await refundCallRecordMutation(selectedId);

    handleModalClose();
    refetchData();
  };

  const formatTime = (totalSeconds: number) => {
    if (totalSeconds <= 60) {
      return `${totalSeconds} secs`;
    } else {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${minutes} min ${seconds} sec`;
    }
  };

  if (data?.length === 0) {
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
              <TableCell sx={{ fontWeight: "bold" }} align="left">
                Date
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left">
                User
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left">
                Astrologer
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left">
                Call Status
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left">
                Call Duration
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left">
                Call type
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left">
                Refund
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
                  {row.createdAt
                    ? new Date(row.createdAt).toLocaleDateString()
                    : ""}
                </TableCell>
                <TableCell align="left">{row.username || ""}</TableCell>
                <TableCell align="left">{row.astrologerName || ""}</TableCell>
                <TableCell align="left">{row.callStatus || ""}</TableCell>
                <TableCell align="left">
                  {formatTime(row.callDuration) || ""}
                </TableCell>
                <TableCell
                  align="left"
                  style={{ color: row.wallet === 0 ? "green" : "black" }}
                >
                  {row.wallet === 0 ? "Free" : "Paid"}
                </TableCell>
                <TableCell align="left">
                  <Button
                    onClick={() => handleRefundClick(row._id)}
                    disabled={row.refund || row.wallet === 0 || !row.wallet}
                  >
                    Refund
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" id="modal-title">
            Confirm Refund
          </Typography>
          <Typography id="modal-description">
            Are you sure you want to refund the selected call record?
          </Typography>
          <Button onClick={handleConfirmRefund}>Confirm</Button>
          <Button onClick={handleModalClose}>Cancel</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default CallRecordTable;
