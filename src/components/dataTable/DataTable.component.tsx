import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface DataTableProps {
  columns: GridColDef[];
  rows: Object[];
  currentPage: number;
}

const DataTable: React.FC<DataTableProps> = ({ columns, rows }) => {
  const getRowId = (row: any) => row._id;

  return (
    <div style={{ height: 600, width: "100%" }}>
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
