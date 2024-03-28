import { useGetNewUsersDaywiseListQuery } from "../../../services/master.service";
import { Users } from "@/models/users.model";
import { Button } from "@mui/material";
import { downloadJSONAsCSV } from "../../../utils/helpers";

const NewUsersCount = () => {
  const { data, isSuccess } = useGetNewUsersDaywiseListQuery();

  let resultData: Users[] = [];
  if (isSuccess) {
    resultData = data.data || [];
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
        <h3>New Users Daily</h3>
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
            <th style={{ border: "1px solid black", padding: "8px" }}>Date</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              New users
            </th>
          </tr>
        </thead>
        <tbody>
          {resultData.map((user, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {user._id}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {user.totalNewUsers}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default NewUsersCount;
