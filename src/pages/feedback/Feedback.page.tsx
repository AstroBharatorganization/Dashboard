import { useState } from "react";

import { CircularProgress, Pagination } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useGetFeedbackRecordsQuery } from "../../services/master.service";

const Feedback = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  let resultData: any[] = [];

  const {
    data: feedbackData,
    isSuccess,
    isFetching,
  } = useGetFeedbackRecordsQuery(currentPage, {
    refetchOnMountOrArgChange: true,
  });

  if (isFetching) {
    return (
      <div style={{ textAlign: "center" }}>
        <CircularProgress size={100} />
      </div>
    );
  }
  if (isSuccess) {
    resultData = feedbackData.data || [];
  }

  const feedbackDataLength = feedbackData?.length || 0;
  let limit = 10;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(event);
    setCurrentPage(value);
  };

  return (
    <>
      <h2>Feedbacks</h2>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", width: "20%" }} align="left">
                Date
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left">
                Feedback
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resultData!.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.createdAt
                    ? new Date(row.createdAt).toLocaleDateString()
                    : ""}
                </TableCell>
                <TableCell align="left">{row.feedback || ""}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="pagination-container">
        <Pagination
          count={Math.ceil(feedbackDataLength / limit)}
          page={currentPage}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default Feedback;
