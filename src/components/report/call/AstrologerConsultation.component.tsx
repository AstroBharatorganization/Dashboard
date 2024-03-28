import React from 'react'

import { CallRecordByAstrologer } from "@/models/callRecord.model";
import { useGetConsultationByAstrologerQuery } from "../../../services/master.service";
import { downloadJSONAsCSV } from "../../../utils/helpers";
import { Button } from "@mui/material";

const AstrologerConsultation = () => {

    const {data,isSuccess} = useGetConsultationByAstrologerQuery()
    let resultData: CallRecordByAstrologer[] = [];
    if (isSuccess) {
        resultData = data.data || [];
      }

      console.log(resultData,"sdfcshcbjs")
    
      const handleDownloadCsv = (data: any) => {
        downloadJSONAsCSV(data);
      };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "10px",
        }}
      >
        <h3>Astrologer consultation list</h3>
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
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Astrologer Name
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Number of calls
            </th>
          </tr>
        </thead>
        <tbody>
          {resultData.map((user, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {user.astrologerName}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {user.totalCalls}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AstrologerConsultation
