import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Link } from "react-router-dom";

import { useGetQueryRecordsQuery } from "../../services/master.service";
import { CircularProgress } from "@mui/material";
import { useEffect } from "react";

const Queries = () => {
  const {
    data: queryRecordData,
    isSuccess,
    isFetching,
    refetch,
  } = useGetQueryRecordsQuery();

  useEffect(() => {
    refetch();
  }, []);

  let resultData;

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

  return (
    <>
      <h2>Queriesss</h2>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }} align="left">
                Date
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left">
                Username
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left">
                Type
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left">
                Status
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left"></TableCell>
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
                <TableCell align="left">{row.username || ""}</TableCell>
                <TableCell align="left">{row.type || ""}</TableCell>
                <TableCell
                  align="left"
                  style={{ color: row.closed ? "green" : "red" }}
                >
                  {row.closed ? "Closed" : "Pending"}
                </TableCell>
                <TableCell align="left">
                  {" "}
                  <Link to={`/queries/details/${row._id}`}>Details</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Queries;
