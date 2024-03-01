import React from "react";

import { useGetUsersWithZeroCallsQuery } from "../../services/master.service";
import { Users } from "@/models/users.model";

import { downloadJSONAsCSV } from "../../utils/helpers";
import { Button } from "@mui/material";

const UserZeroCallList = () => {
  const { data, isSuccess } = useGetUsersWithZeroCallsQuery();

  let resultData: Users[] = [];
  if (isSuccess) {
    resultData = data.data || [];
  }

  const handleDownloadCsv = (data: any) => {
    downloadJSONAsCSV(data);
  };

  return (
    <>
    <div  style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "10px",
            }}>
    <h3>Users with zero calls</h3>
      <Button variant="contained" onClick={() => handleDownloadCsv(resultData)}>
        Download Csv
      </Button>
    </div>
     
      <table style={{ borderCollapse: "collapse", border: "1px solid black" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>Usernames</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Number of Calls</th>
          </tr>
        </thead>
        <tbody>
          {resultData.map((user, index) => (
            <tr key={index} >
              <td style={{ border: "1px solid black", padding: "8px" }} >
                {user.username}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {user.numberOfCall}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserZeroCallList;
