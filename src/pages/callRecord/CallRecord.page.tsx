import React, { useState } from "react";

import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
} from "@mui/material";
import { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import {
  useGetCallRecordsQuery,
  useLazyGetSearchCallRecordQuery,
  useLazyGetDownloadQuery,
} from "../../services/master.service";

import CallRecordTable from "../../components/callRecord/CallRecordTable.component";

import { downloadJSONAsCSV } from "../../utils/helpers";

const CallRecord = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [currentSearchPage, setCurrentSearchPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  console.log(setLimit);

  const [filter, setFilter] = useState({
    astrologerName: "",
    date: "",
    username: "",
    callstatus: "",
  });

  const [value, setValue] = React.useState<Dayjs | null>(null);

  const {
    data: CallRecordData,
    isFetching,
    isSuccess,
    refetch,
  } = useGetCallRecordsQuery(
    { page: currentPage, limit },
    { refetchOnMountOrArgChange: true }
  );

  const [
    fetch,
    {
      data: searchResult,
      isSuccess: isSuccessSearch,
      isFetching: isFetchingSearch,
    },
  ] = useLazyGetSearchCallRecordQuery();

  const [fetchDownload, { data: downLoadData, isSuccess: isDownloadSuccess }] =
    useLazyGetDownloadQuery();

  let downLoadResult: any;
  if (isDownloadSuccess) {
    downLoadResult = downLoadData!.data || [];
  }

  let searchData: any;
  let searchDataLength;
  if (isSuccessSearch && searchResult) {
    searchData = searchResult.data || [];
    searchDataLength = searchResult?.length || 0;
  }

  if (isFetching || isFetchingSearch) {
    return (
      <div style={{ textAlign: "center" }}>
        <CircularProgress size={100} />
      </div>
    );
  }
  let callRecordTableData: any;
  if (isSuccess) {
    callRecordTableData = CallRecordData.data || [];
  }

  const callRecordLength = CallRecordData?.length || 0;

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

  const isFilterEmpty =
    Object.values(filter).every((value) => value === "") && !value;

  const handleReset = () => {
    setFilter({
      astrologerName: "",
      date: "",
      username: "",
      callstatus: "",
    });
    setValue(null);
    setCurrentSearchPage(1);
  };

  const handleDownloadCsv = (callRecordTableData: any) => {
    downloadJSONAsCSV(callRecordTableData);
  };

  const handleSearchDownload = async () => {
    const searchFilter = { ...filter, date: value?.format("YYYY-MM-DD") };
    await fetchDownload({
      filters: searchFilter,
      pageNumber: currentSearchPage,
      limit: 50,
    });

    
    if (downLoadResult) {
      downloadJSONAsCSV(downLoadResult);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <TextField
          label="Astrologer Name / Aid"
          name="astrologerName"
          value={filter.astrologerName}
          onChange={handleFilterChange}
          sx={{ mr: 1 }}
        />
        <TextField
          label="Username"
          name="username"
          value={filter.username}
          onChange={handleFilterChange}
          sx={{ mr: 1 }}
        />

        <FormControl sx={{ minWidth: 220 }}>
          <InputLabel id="demo-simple-select-label">Call Status</InputLabel>
          <Select
            label="callstatus"
            name="callstatus"
            value={filter.callstatus}
            onChange={handleFilterChange}
            sx={{ mr: 1 }}
            placeholder="Select"
          >
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="	failed">Failed</MenuItem>
            <MenuItem value="no-answer">No Answer</MenuItem>
            <MenuItem value="canceled">Canceled</MenuItem>
          </Select>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]} sx={{ mt: -1 }}>
            <DatePicker
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>

        <Button
          variant="contained"
          onClick={() => handleSearch(currentSearchPage)}
          disabled={isFilterEmpty}
        >
          Search
        </Button>

        <Button variant="contained" onClick={handleReset}>
          Reset
        </Button>
      </div>

      {isSuccessSearch ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "10px",
            }}
          >
            <h2 style={{ marginTop: 5 }}>Call Records</h2>
            <Button
              variant="contained"
              onClick={handleSearchDownload}
              // onClick={() => handleDownloadCsv(searchData)}
            >
              Download Csv
            </Button>
          </div>

          <CallRecordTable data={searchData!} refetchData={refetch} />

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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "10px",
            }}
          >
            {" "}
            <h2 style={{ marginTop: 5 }}>Call Records</h2>
            <Button
              variant="contained"
              onClick={() => handleDownloadCsv(callRecordTableData)}
            >
              Download Csv
            </Button>
          </div>
          <CallRecordTable data={callRecordTableData!} refetchData={refetch} />

          <div className="pagination-container">
            <Pagination
              count={Math.ceil(callRecordLength / limit)}
              page={currentPage}
              onChange={handleChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CallRecord;
