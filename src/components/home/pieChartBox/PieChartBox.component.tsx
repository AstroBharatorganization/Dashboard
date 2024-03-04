// Styles
import "./pieChartBox.style.scss";
// libraries
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { useGetCallMonthPieChartQuery } from "../../../services/master.service";

const PieChartBox = () => {
  const { data: monthlyData, isSuccess } = useGetCallMonthPieChartQuery();

  let dataFetch;
  if (isSuccess) {
    const { totalCompletedCalls, totalFailedCalls } = monthlyData.data[0];
    dataFetch = [
      { name: "Completed", value: totalCompletedCalls, color: "#0088FE" },
      { name: "Failed", value: totalFailedCalls, color: "#FF8042" },
    ];
  }

  return (
    <div className="pieChartBox">
      <h1>Call Report</h1>
      <h5>Last 30 Days</h5>

      {dataFetch && (
        <>
          <div className="chart">
            <ResponsiveContainer width="99%" height={300}>
              <PieChart>
                <Tooltip
                  contentStyle={{ background: "white", borderRadius: "5px" }}
                />
                <Pie
                  data={dataFetch}
                  innerRadius={"70%"}
                  outerRadius={"90%"}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dataFetch!.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="options">
            {dataFetch!.map((item) => (
              <div className="option" key={item.name}>
                <div className="title">
                  <div
                    className="dot"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.name}</span>
                </div>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PieChartBox;
