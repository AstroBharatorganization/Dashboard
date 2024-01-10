import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface DataTableProps {
  columns: GridColDef[];
  rows: Object[];
}

const DataTable: React.FC<DataTableProps> = ({ columns, rows }) => {
  const getRowId = (row: any) => row._id;

  console.log(rows);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
        checkboxSelection
      />
    </div>
  );
};

export default DataTable;
