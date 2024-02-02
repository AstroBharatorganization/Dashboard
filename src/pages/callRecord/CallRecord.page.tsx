import React, { useState } from "react";

import { Button, CircularProgress, Pagination, TextField } from "@mui/material";
import { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import {
  useGetCallRecordsQuery,
  useLazyGetSearchCallRecordQuery,
} from "../../services/master.service";

import CallRecordTable from "../../components/callRecord/CallRecordTable.component";

const CallRecord = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [filter, setFilter] = useState({
    astrologerName: "",
    date: "",
    username: "",
  });

  const [value, setValue] = React.useState<Dayjs | null>(null);

  const {
    data: CallRecordData,
    isFetching,
    isSuccess,
    refetch
  } = useGetCallRecordsQuery(currentPage);

  const [
    fetch,
    {
      data: searchResult,
      isSuccess: isSuccessSearch,
      isFetching: isFetchingSearch,
    },
  ] = useLazyGetSearchCallRecordQuery();

  let searchData;
  if (isSuccessSearch && searchResult) {
    searchData = searchResult.data || [];
  }

  if (isFetching || isFetchingSearch) {
    return (
      <div style={{ textAlign: "center" }}>
        <CircularProgress size={100} />
      </div>
    );
  }
  let callRecordTableData;
  if (isSuccess) {
    callRecordTableData = CallRecordData.data || [];
  }

  const callRecordLength = CallRecordData?.length || 0;
  let limit = 10;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(event);
    setCurrentPage(value);
  };

  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const handleSearch = () => {
    const searchFilter = { ...filter, date: value?.format("YYYY-MM-DD") };
    fetch(searchFilter);
  };

  const isFilterEmpty =
    Object.values(filter).every((value) => value === "") && !value;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <TextField
          label="Astrologer Name"
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
          onClick={handleSearch}
          disabled={isFilterEmpty}
        >
          Search
        </Button>
      </div>
      <h2 style={{ margin: 5 }}>Call Records</h2>

      {isSuccessSearch ? (
        <CallRecordTable data={searchData!} refetchData={refetch} />
      ) : (
        <>
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
