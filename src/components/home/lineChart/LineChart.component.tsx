import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import { DailyDataReport } from "@/models/dailyData.model";

interface LineChartProps {
  data: DailyDataReport[];
  metric: Metric;
}

interface Metric {
  label: string;
  field: keyof DailyDataReport;
  borderColor: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, metric }) => {
  const formatDateToLocalString = (date: Date) => {
    return date.toLocaleDateString();
  };

  const dates = data.map((entry) =>
    formatDateToLocalString(new Date(entry.date))
  );

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: metric.label,
        data: data.map((entry) => entry[metric.field]),
        borderColor: metric.borderColor,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      // title: {
      //   display: true,
      //   text: `${metric.label}`,
      // },
    },
  };

  return (
    <>
      <div>
        {/* <h3>{metric.label}</h3> */}
        <Line data={chartData} options={options} />
      </div>
    </>
  );
};

export default LineChart;
