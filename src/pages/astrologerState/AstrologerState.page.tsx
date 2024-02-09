import React, { useState } from "react";

import { Button, CircularProgress, Pagination, TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import {
  useGetAstrologersStateRecordQuery,
  useLazySearchAstrologersStateRecordQuery,
} from "../../services/master.service";
import { AstrologerStateRecord } from "../../models/astrologerOther.model";

const AstrologerState = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentSearchPage, setCurrentSearchPage] = useState<number>(1);
  const [value, setValue] = React.useState<Dayjs | null>(null);
  const [filter, setFilter] = useState({
    aid: "",
    date: "",
  });

  let resultData: AstrologerStateRecord[] = [];
  const {
    data: stateRecordData,
    isSuccess,
    isFetching,
  } = useGetAstrologersStateRecordQuery(currentPage);

  const [
    fetch,
    {
      data: searchResult,
      isSuccess: isSuccessSearch,
      isFetching: isSearchFetching,
    },
  ] = useLazySearchAstrologersStateRecordQuery();

  if (isFetching || isSearchFetching) {
    return (
      <div style={{ textAlign: "center" }}>
        <CircularProgress size={100} />
      </div>
    );
  }

  if (isSuccess) {
    resultData = stateRecordData.data || [];
  }

  let searchDataLength;

  if (isSuccessSearch && searchResult) {
    resultData = searchResult.data || [];
    searchDataLength = searchResult?.length || 0;
  }

  const queryDataLength = stateRecordData?.length || 0;
  let limit = 10;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(event);
    setCurrentPage(value);
  };

  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const handleSearch = (currentSearchPage: number) => {
    const searchFilter = { ...filter, date: value?.format("YYYY-MM-DD") };
    fetch({ filters: searchFilter, pageNumber: currentSearchPage });
  };

  const handleChangeSearchPage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    console.log(event);
    setCurrentSearchPage(value);
    handleSearch(value);
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <TextField
          label="Astrologer Id"
          name="aid"
          value={filter.aid}
          onChange={handleFilterChange}
          sx={{ mr: 1 }}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]} sx={{ mt: -1 }}>
            <DatePicker
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>

        <Button variant="contained" onClick={() => handleSearch(currentPage)}>
          Search
        </Button>
      </div>

      <h2 style={{ margin: 5 }}>Astrologer State Record</h2>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", width: "20%" }} align="left">
                Date
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", width: "20%" }} align="left">
                Time
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left">
                Astrologer Id
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left">
                Call State
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
                <TableCell component="th" scope="row">
                  {row.createdAt
                    ? new Date(row.createdAt).toLocaleTimeString()
                    : ""}
                </TableCell>

                <TableCell align="left">{row.aid || ""}</TableCell>
                <TableCell align="left">{row.callState || ""}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isSuccessSearch ? (
        <>
          <div className="pagination-container">
            <Pagination
              count={Math.ceil(searchDataLength! / limit)}
              page={currentSearchPage}
              onChange={handleChangeSearchPage}
            />
          </div>
        </>
      ) : (
        <>
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

export default AstrologerState;
