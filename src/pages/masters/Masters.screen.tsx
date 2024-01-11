// style
import "./masters.style.scss";
// Libraries
import { useState, useEffect } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Alert, AlertTitle } from "@mui/material";
import { Link } from "react-router-dom";

// Components
import DataTable from "../../components/dataTable/DataTable.component";
import OnboardingForm from "../../components/onboaringForm/OnboardingForm.component";
// services

import { useGetAstrologersQuery } from "../../services/master.service";

const columns: GridColDef[] = [
  {
    field: "profile",
    headerName: "",
    width: 75,
    renderCell: (params) => (
      <img
        src={
          params.value && params.value.url
            ? params.value.url
            : "https://example.com/default-image.jpg"
        }
        alt="Profile"
        style={{
          width: 40,
          height: 40,
          borderRadius: 50,
          border: "2px solid #ccc",
          objectFit: "cover",
        }}
      />
    ),
  },
  { field: "_id", headerName: "ID", width: 150 },
  { field: "aid", headerName: "aid", width: 150 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "mostTrusted", headerName: "Most Trusted", width: 150 },
  { field: "callStatus", headerName: "Call Status", width: 150 },
  {
    field: "updateButton",
    headerName: "Update",
    width: 150,
    renderCell: (params) => (
      <Link to={`/update/${params.row._id}`}>
        <button>Update</button>
      </Link>
    ),
  },
];
interface Status {
  visible: boolean;
  isError: boolean;
  error: string;
}

const Masters = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [masters, setMasters] = useState<object[]>([]);

  const [status, setStatus] = useState<Status>({
    visible: false,
    isError: false,
    error: "",
  });

  const { data: astrologers = [], refetch: refetchAstrologers } =
    useGetAstrologersQuery("");

  useEffect(() => {
    if (astrologers.data) {
      setMasters(astrologers.data);
    }
  }, [astrologers]);

  console.log(masters);

  useEffect(() => {
    if (open || status.isError === false) {
      refetchAstrologers();
    }
  }, [open, status, refetchAstrologers]);

  const handleToggleForm = () => {
    setOpen(!open);
  };

  return (
    <div className="masters">
      {status.visible && (
        <Alert severity={status.isError ? "error" : "success"}>
          <AlertTitle>{status.isError ? "Error" : "Success"}</AlertTitle>
          {status.error}
        </Alert>
      )}

      <div className="info">
        <button onClick={handleToggleForm}>
          {open ? "Back" : "Add New Master"}
        </button>
      </div>

      {open ? (
        <div>
          <h2>Master Registration</h2>
          <OnboardingForm setStatus={setStatus} />
        </div>
      ) : (
        <div className="table">
          <h2>Masters</h2>
          {masters.length > 0 ? (
            <DataTable columns={columns} rows={masters} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Masters;
