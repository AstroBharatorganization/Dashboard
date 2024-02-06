import React, { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  CircularProgress,
  Pagination,
  Typography,
} from "@mui/material";

import {
  useGetAstrologersQueryQuery,
  useUpdateAstrologerQueryRecordMutation,
} from "../../services/master.service";

import { AstrologerQueryRecord } from "../../models/query.model";
import { Link } from "react-router-dom";

const AstrologerQuery = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    data: queryRecordData,
    isSuccess,
    isFetching,
    refetch,
  } = useGetAstrologersQueryQuery(currentPage);

  const [statusUpdateMutation] = useUpdateAstrologerQueryRecordMutation();

  let resultData: AstrologerQueryRecord[] = [];

  if (isFetching) {
    return (
      <div style={{ textAlign: "center" }}>
        <CircularProgress size={100} />
      </div>
    );
  }
  if (isSuccess) {
    resultData = queryRecordData.data || [];
  }

  const handleToggleClosed = async (id: number) => {
    await statusUpdateMutation(id);
    refetch();
  };

  const queryDataLength = queryRecordData?.length || 0;
  let limit = 10;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(event);
    setCurrentPage(value);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
          justifyContent: "space-between",
        }}
      >
        <h2>Astrologer Queries</h2>
        <Link to="/queries">
          <button>Go to User Query</button>
        </Link>
      </div>

      {resultData.length === 0 ? (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 50,
            }}
          >
            <Typography variant="h6" color="textSecondary">
              No Queries Found
            </Typography>
          </div>
        </>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }} align="left">
                    Date
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="left">
                    Astrologer ID
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="left">
                    Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="left">
                    Query
                  </TableCell>

                  <TableCell sx={{ fontWeight: "bold" }} align="left">
                    Status
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold" }}
                    align="left"
                  ></TableCell>
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
                    <TableCell align="left">{row.astrologerId || ""}</TableCell>
                    <TableCell align="left">{row.name || ""}</TableCell>
                    <TableCell align="left">{row.query || ""}</TableCell>
                    <TableCell
                      align="left"
                      style={{ color: row.isAnswered ? "green" : "red" }}
                    >
                      {row.isAnswered ? "Closed" : "Pending"}
                    </TableCell>

                    <TableCell>
                      {!row.isAnswered && (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleToggleClosed(row._id)}
                        >
                          Close
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="pagination-container">
            <Pagination
              count={Math.ceil(queryDataLength / limit)}
              page={currentPage}
              onChange={handleChange}
            />
          </div>
        </>
      )}
    </>
  );
};

export default AstrologerQuery;
