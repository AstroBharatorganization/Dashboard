import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { CallRecordByAstrologer } from "../../models/callRecord.model";

import {
  useGetCallRecordReportQuery,
  useGetAstrologerCallReportQuery,
} from "../../services/master.service";
import { Box, CircularProgress, Typography } from "@mui/material";

const CallReport = () => {
  const {
    data: AstrologersCallReport,
    isSuccess: isSuccessAstrologer,
    isFetching: isFetchingAstrologer,
  } = useGetAstrologerCallReportQuery();

  let resultData: CallRecordByAstrologer[] = [];
  let dailyData;

  const {
    data: DailyReport,
    isSuccess: isSuccessDailyReport,
    isFetching: isFetchingDailyReport,
  } = useGetCallRecordReportQuery();

  if (isFetchingAstrologer || isFetchingDailyReport) {
    return (
      <div style={{ textAlign: "center" }}>
        <CircularProgress size={100} />
      </div>
    );
  }

  if (isSuccessAstrologer) {
    resultData = AstrologersCallReport.data || [];
  }

  if (isSuccessDailyReport) {
    dailyData = DailyReport.data;
  }

  return (
    <>
      <h2> Daily Call Report</h2>

      <Box display="flex" justifyContent="space-between">
        <Box width="auto" height="50px">
          <Typography variant="h6" align="center" color="textPrimary">
            Total completed calls: {dailyData?.totalCompleted}
          </Typography>
        </Box>

        <Box width="auto" height="50px">
          <Typography variant="h6" align="center" color="textPrimary">
            Total Failed calls:{dailyData?.totalFailed}
          </Typography>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }} align="left">
                Aid
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left">
                Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left">
                Total Call
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resultData!.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{row.astrologerId || ""}</TableCell>
                <TableCell align="left">{row.astrologerName || ""}</TableCell>
                <TableCell align="left">{row.totalCompleted || ""}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CallReport;
