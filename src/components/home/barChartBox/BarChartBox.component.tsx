// Styles
import "./barChartBox.style.scss";
// libraries
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

import { useGetUsersAgeBarChartQuery } from "../../../services/master.service";

const BarChartBox = () => {
  const { data, isSuccess } = useGetUsersAgeBarChartQuery();
  let resultData;
  if (isSuccess) {
    resultData = data.data;
  }

  console.log(resultData);

  return (
    <div className="barChartBox">
      <h1>User Age Demographics </h1>
      {isSuccess && resultData && (
        <div className="chart">
          <ResponsiveContainer width="99%" height={400}>
            <BarChart data={data.data}>
              <XAxis dataKey="_id" />

              <Tooltip
                contentStyle={{ background: "#DAE0E2", borderRadius: "5px" }}
              />
              <Bar dataKey="users" fill={"#218F76"} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default BarChartBox;
