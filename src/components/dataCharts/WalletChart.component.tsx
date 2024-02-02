import React from "react";

import "./walletChart.style.scss";
import { useGetWalletChartQuery } from "../../services/master.service";

const WalletChart = () => {
  const { data, isSuccess } = useGetWalletChartQuery();

  let walletChartData;

  if (isSuccess) {
    walletChartData = data || {};
  }

  return (
    <>
      {isSuccess && (
        <>
          <div>
            <h2>Day Report</h2>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="boxes">
                <h3>Total Payment</h3>
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
              <h3>Total Payment</h3>
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
  );
};

export default WalletChart;
