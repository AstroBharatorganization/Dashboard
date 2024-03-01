import { useGetIncomeReportBetweenDatesQuery } from "../../services/master.service";
import { downloadJSONAsCSV } from "../../utils/helpers";
import { IncomeReport } from "@/models/income.model";
import {
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const IncomeReport = () => {
  const { data, isSuccess, isFetching } = useGetIncomeReportBetweenDatesQuery();

  let resultData: IncomeReport[] = [];

  if (isFetching) {
    return (
      <div style={{ textAlign: "center" }}>
        <CircularProgress size={100} />
      </div>
    );
  }

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
        <h2> Astrologer Income Report</h2>
        <Button
          variant="contained"
          onClick={() => handleDownloadCsv(resultData)}
        >
          Download Csv
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }} align="left">
                Aid
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left">
                Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="left">
                Total Income
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resultData!.map((row) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{row.astrologerId || ""}</TableCell>
                <TableCell align="left">{row.astrologerName || ""}</TableCell>
                <TableCell align="left">{row.totalIncome || ""}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default IncomeReport;
