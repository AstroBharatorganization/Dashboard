import React, { useState } from "react";

import { Button, CircularProgress, Pagination, TextField } from "@mui/material";
import { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import IncomeTable from "../../components/income/IncomeTable.component";

import {
  useGetIncomeQuery,
  useLazyGetSearchIncomeQuery,
} from "../../services/master.service";

const Income = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentSearchPage, setCurrentSearchPage] = useState<number>(1);
  const [filter, setFilter] = useState({
    name: "",
    date: "",
    aid: "",
  });
  const [value, setValue] = React.useState<Dayjs | null>(null);

  const [
    fetch,
    {
      data: searchResult,
      isSuccess: isSuccessSearch,
      isFetching: isSearchFetching,
    },
  ] = useLazyGetSearchIncomeQuery();

  let searchData;
  let searchDataLength;
  if (isSuccessSearch && searchResult) {
    searchData = searchResult.data || [];
    searchDataLength = searchResult.length || 0;
  }

  const {
    data: IncomeRecord,
    isFetching,
    isSuccess,
  } = useGetIncomeQuery(currentPage);

  if (isFetching || isSearchFetching) {
    return (
      <div style={{ textAlign: "center" }}>
        <CircularProgress size={100} />
      </div>
    );
  }

  let incomeTableData;
  if (isSuccess) {
    incomeTableData = IncomeRecord.data || [];
  }

  const incomeRecordLength = IncomeRecord?.length || 0;
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

  const isFilterEmpty =
    Object.values(filter).every((value) => value === "") && !value;

  const handleReset = () => {
    setFilter({
      name: "",
      date: "",
      aid: "",
    });
    setValue(null);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <TextField
          label="Astrologer Name"
          name="name"
          value={filter.name}
          onChange={handleFilterChange}
          sx={{ mr: 1 }}
        />
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
      <h2 style={{ margin: 5 }}>Income Records</h2>

      {isSuccessSearch ? (
        <>
          <IncomeTable data={searchData!} />

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
          <IncomeTable data={incomeTableData!} />

          <div className="pagination-container">
            <Pagination
              count={Math.ceil(incomeRecordLength / limit)}
              page={currentPage}
              onChange={handleChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Income;
