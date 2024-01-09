// style
import "./masters.style.scss";
// Libraries
import { useState, useEffect } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Alert, AlertTitle } from "@mui/material";
// Components
import DataTable from "../../components/dataTable/DataTable.component";
import OnboardingForm from "../../components/onboaringForm/OnboardingForm.component";
// services

// Data
// import { master } from "../../data";

const columns: GridColDef[] = [
  { field: "badge", headerName: "Badge", width: 150 },
  { field: "contract", headerName: "Contract", width: 150 },
  { field: "country", headerName: "Country", width: 150 },
  { field: "created", headerName: "Created", width: 150 },
  { field: "cutPrice", headerName: "Cut Price", width: 150 },
  { field: "divide", headerName: "Divide", width: 150 },
  { field: "email", headerName: "Email", width: 150 },
  { field: "experience", headerName: "Experience", width: 150 },
  { field: "followers", headerName: "Followers", width: 150 },
  { field: "free", headerName: "Free", width: 150 },
  { field: "gender", headerName: "Gender", width: 200 },
  { field: "masterCategories", headerName: "Master Categories", width: 250 },
  { field: "masterDateOfBirth", headerName: "Date of Birth", width: 200 },
  { field: "masterIntroduction", headerName: "Introduction", width: 200 },
  { field: "masterName", headerName: "Master Name", width: 200 },
  { field: "mid", headerName: "ID", width: 90 },
  { field: "phoneNumber", headerName: "Phone Number", width: 200 },
  { field: "price", headerName: "Price", width: 200 },
  { field: "profile_url", headerName: "Profile URL", width: 200 },
  { field: "ratings", headerName: "Ratings", width: 200 },
  { field: "registrationDate", headerName: "Registration Date", width: 200 },
  { field: "segments", headerName: "Segments", width: 200 },
  { field: "skills", headerName: "Skills", width: 200 },
  { field: "status", headerName: "Status", width: 200 },
  { field: "tags", headerName: "Tags", width: 200 },
];
interface Status {
  visible: boolean;
  isError: boolean;
  error: string;
}
export interface PaginationModel {
  pageSize: number;
  page: number;
}
const Masters = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [masters, setMasters] = useState<object[]>([]);

  const [status, setStatus] = useState<Status>({
    visible: false,
    isError: false,
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the master's list data from your API or data source
        const response = await fetch("your_api_endpoint");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setMasters(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setMasters([]); // Set an empty array or handle error as needed
      }
    };

    fetchData();
  }, [open, status]);

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
        <h1>Masters</h1>
      </div>

      {open ? (
        <OnboardingForm setStatus={setStatus} />
      ) : (
        <div className="table">
          <DataTable slug="products" columns={columns} rows={masters} />
        </div>
      )}
    </div>
  );
};

export default Masters;
