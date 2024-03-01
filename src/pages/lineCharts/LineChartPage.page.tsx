import "./lineChart.style.scss";

import LineChart from "../../components/home/lineChart/LineChart.component";

import {
  useGetDailyReportDataQuery,
  useCreateDailyReportDataMutation,
} from "../../services/master.service";
import { DailyDataReport } from "@/models/dailyData.model";
import { Button, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { useEffect } from "react";

interface Metric {
  label: string;
  field: keyof DailyDataReport;
  borderColor: string;
}

const LineChartPage = () => {
  const {
    data: queryData,
    isSuccess: isSuccessQuery,
    isFetching: isFetchingQuery,
    refetch,
  } = useGetDailyReportDataQuery();

  const [createReportMutation, { isLoading, isError, error }] =
    useCreateDailyReportDataMutation();

  let dailyReport: DailyDataReport[] = [];

  if (isFetchingQuery) {
    return (
      <div style={{ textAlign: "center" }}>
        <CircularProgress size={100} />
      </div>
    );
  }

  if (isSuccessQuery) {
    dailyReport = queryData.data || [];
  }

  if (error) {
    if ("status" in error) {
      const errMsg =
        "error" in error ? error.error : JSON.stringify(error.data);
       
    } else {
      
    }
  }

  const metrics: Metric[] = [
    {
      label: " New Users",
      field: "totalNewUsers",
      borderColor: "blue",
    },
    {
      label: "Total Completed Calls",
      field: "totalCompletedCalls",
      borderColor: "green",
    },
    {
      label: "Completed Payments Count",
      field: "completedPaymentsCount",
      borderColor: "orange",
    },
    {
      label: "Total Failed Calls",
      field: "totalFailedCalls",
      borderColor: "red",
    },
  ];

  const handleRefresh = async () => {
    await createReportMutation();
    refetch()
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
          margin: "5px",
        }}
      >
        <Button
          variant="contained"
          onClick={handleRefresh}
          disabled={isLoading}
        >
          Refresh
        </Button>
      </div>

      <div className="line-chart-container">
        {metrics.map((metric, index) => (
          <div key={index} className="chart-item">
            <LineChart data={dailyReport} metric={metric} />
          </div>
        ))}
      </div>
    </>
  );
};

export default LineChartPage;
