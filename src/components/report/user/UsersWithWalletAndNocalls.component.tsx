

import { Button } from "@mui/material";
import { downloadJSONAsCSV } from "../../../utils/helpers";

import { Users } from "@/models/users.model";

import { useGetUsersWithWalletAndNoCallsQuery } from "../../../services/master.service";

const UsersWithWalletAndNocalls= () => {

    const {data,isSuccess} = useGetUsersWithWalletAndNoCallsQuery()

    let resultData :Users[]=[]

    if(isSuccess){
      resultData = data.data || []
    }
  
    
    const handleDownloadCsv = (data: any) => {
      downloadJSONAsCSV(data);
    };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "10px",
        }}
      >
        <h3>Users with wallet balance and no calls</h3>
        <Button
          variant="contained"
          onClick={() => handleDownloadCsv(resultData)}
        >
          Download Csv
        </Button>
      </div>

      <table style={{ borderCollapse: "collapse", border: "1px solid black" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
             Username
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Wallet</th>
            
          </tr>
        </thead>
        <tbody>
          {resultData.map((user, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {user.name}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {user.username}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {user.wallet}
              </td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default UsersWithWalletAndNocalls