import "./walletChart.style.scss";
import { useState } from "react";

import { Button } from "@mui/material";
import { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import {
  useGetWalletChartQuery,
  useLazySearchWalletChartQuery,
} from "../../services/master.service";

const WalletChart = () => {
  const [value, setValue] = useState<Dayjs | null>(null);
  const [monthValue, setMonthValue] = useState<Dayjs | null>(null);

  const { data, isSuccess: isQuerySuccess } = useGetWalletChartQuery();

  const [fetch, { data: searchResult, isSuccess: isSuccessSearch }] =
    useLazySearchWalletChartQuery();

  let walletChartData;

  if (isQuerySuccess) {
    walletChartData = data || {};
  }

  let searchData;
  if (isSuccessSearch && searchResult) {
    searchData = searchResult.data || [];
  }

  const handleSearch = () => {
    const searchFilter = {
      date: value?.format("YYYY-MM-DD"),
      year: monthValue?.format("YYYY"),
      month: monthValue?.format("MM"),
    };
    fetch(searchFilter);
  };

  const handleReset = () => {
    setValue(null);
    setMonthValue(null);
  };

  const isSearchButtonDisabled = !value && !monthValue;

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]} sx={{ mt: -1 }}>
            <DatePicker
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]} sx={{ mt: -1 }}>
            <DatePicker
              value={monthValue}
              views={["year", "month"]}
              onChange={(newValue) => setMonthValue(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>

        <Button variant="contained" onClick={handleReset}>
          Reset
        </Button>

        <Button
          variant="contained"
          onClick={handleSearch}
          disabled={isSearchButtonDisabled}
        >
          Search
        </Button>
      </div>

      {searchData ? (
        <>
          <div>
            <h2>Search Result</h2>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="boxes">
                <h3>Total Payments</h3>
                <h2> {searchData.totalCount}</h2>
              </div>
              <div className="boxes">
                <h3>Total Amount</h3>
                <h2> &#8377; {searchData.totalPayment}</h2>
              </div>

              <div className="boxes">
                <h3>User Wallet </h3>
                <h2>&#8377; {searchData.totalUserWalletAmount}</h2>
              </div>

              <div className="boxes">
                <h3>Gst Amount</h3>
                <h2>&#8377; {searchData.totalGstAmount}</h2>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {isQuerySuccess && (
            <>
              <div>
                <h2>Day Report</h2>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="boxes">
                    <h3>Total Payments</h3>
                    <h2> {walletChartData!.data.totalCountDay}</h2>
                  </div>
                  <div className="boxes">
                    <h3>Total Amount</h3>
                    <h2> &#8377; {walletChartData!.data.totalPaymentDay}</h2>
                  </div>

                  <div className="boxes">
                    <h3>User Wallet </h3>
                    <h2>
                      &#8377; {walletChartData!.data.totalUserWalletAmountDay}
                    </h2>
                  </div>

                  <div className="boxes">
                    <h3>Gst Amount</h3>
                    <h2>&#8377; {walletChartData!.data.totalGstAmountDay}</h2>
                  </div>
                </div>
              </div>

              <h2>Monthly Report</h2>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="boxes">
                  <h3>Total Payments</h3>
                  <h2> {walletChartData!.data.totalCountMonth}</h2>
                </div>

                <div className="boxes">
                  <h3>Total Amount</h3>
                  <h2> &#8377; {walletChartData!.data.totalPaymentMonth}</h2>
                </div>
                <div className="boxes">
                  <h3>User Wallet </h3>
                  <h2>
                    &#8377; {walletChartData!.data.totalUserWalletAmountMonth}
                  </h2>
                </div>
                <div className="boxes">
                  <h3>Gst Amount</h3>
                  <h2> &#8377; {walletChartData!.data.totalGstAmountMonth}</h2>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default WalletChart;
