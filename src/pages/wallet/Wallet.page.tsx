import {
  useGetWalletQuery,
  useLazyGetSearchWalletQuery,
} from "../../services/master.service";
import React, { useState } from "react";

import WalletTable from "../../components/wallet/WalletTable.components";
import WalletSearch from "../../components/wallet/WalletSearch.component";
import {
  Button,
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

const Wallet = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState({
    status: "",
    transactionType: "",
    username: "",
    date: "",
  });
  const [value, setValue] = React.useState<Dayjs | null>(null);

  const {
    data: WalletRecord,
    isFetching,
    isSuccess,
  } = useGetWalletQuery(currentPage);

  const [fetch, { data: searchResult, isSuccess: isSuccessSearch }] =
    useLazyGetSearchWalletQuery();
  let searchData;
  if (isSuccessSearch && searchResult) {
    console.log(searchResult, "result");
    searchData = searchResult.data || [];
  }

  const isSearchResultAvailable = isSuccessSearch && searchResult;

  const walletLength = WalletRecord?.length || 0;

  let limit = 10;

  if (isFetching) {
    return <p>Loading...</p>;
  }
  let walletTableData;
  if (isSuccess) {
    walletTableData = WalletRecord.data || [];
  }

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
        <FormControl sx={{ minWidth: 220 }}>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            label="Status"
            name="status"
            value={filter.status}
            onChange={handleFilterChange}
            sx={{ mr: 1 }}
            placeholder="Select"
          >
            <MenuItem value="Created">Created</MenuItem>
            <MenuItem value="Authorized">Authorized</MenuItem>
            <MenuItem value="Captured">Captured</MenuItem>
            <MenuItem value="Refunded">Refunded</MenuItem>
            <MenuItem value="Failed">Failed</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 222 }}>
          <InputLabel id="demo-simple-select-label">
            Transaction Type
          </InputLabel>
          <Select
            label="Transaction type"
            name="transactionType"
            value={filter.transactionType}
            onChange={handleFilterChange}
            sx={{ mr: 1 }}
          >
            <MenuItem value="credit">Credit</MenuItem>
            <MenuItem value="debit">Debit</MenuItem>
          </Select>
        </FormControl>

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
      <h2 style={{ margin: 5 }}>Wallet Records</h2>
      {isSearchResultAvailable ? (
        <>
          <WalletSearch data={searchData!} />
        </>
      ) : (
        <>
          <WalletTable data={walletTableData!} />

          <div className="pagination-container">
            <Pagination
              count={Math.ceil(walletLength / limit)}
              page={currentPage}
              onChange={handleChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Wallet;
