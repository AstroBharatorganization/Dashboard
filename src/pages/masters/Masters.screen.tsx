// style
import "./masters.style.scss";
// Libraries
import { useState, useEffect } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Alert, AlertTitle, CircularProgress, Pagination } from "@mui/material";
import { Link } from "react-router-dom";

// Components
import DataTable from "../../components/dataTable/DataTable.component";
import OnboardingForm from "../../components/onboaringForm/OnboardingForm.component";
// services

import {
  useGetAstrologersQuery,
  useLazySearchAstrologersQuery,
} from "../../services/master.service";

interface Status {
  visible: boolean;
  isError: boolean;
  error: string;
}

const Masters = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [masters, setMasters] = useState<object[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [status, setStatus] = useState<Status>({
    visible: false,
    isError: false,
    error: "",
  });

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
        <Link to={`/update/${params.row._id}?page=${currentPage}`}>
          <button>Update</button>
        </Link>
      ),
    },
  ];

  interface Filters {
    name: string;
    aid: string;
    mobileNumber: string;
    consultationMobileNumber: string;
    gender: string;
    callStatus: string;
    language: string;
  }

  const [filters, setFilters] = useState<Filters>({
    name: "",
    aid: "",
    gender: "",
    mobileNumber: "",
    consultationMobileNumber: "",
    callStatus: "",
    language: "",
  });

  const {
    data: GetAstrologer,
    refetch: refetchAstrologers,
    isFetching,
  } = useGetAstrologersQuery(currentPage);

  const astrologersLength = GetAstrologer?.length || 0;
  let limit = 10;

  console.log(astrologersLength, "at page");

  const [fetch, { data: searchResult, isSuccess: isSuccessSearch }] =
    useLazySearchAstrologersQuery();

  useEffect(() => {
    if (GetAstrologer) {
      setMasters(GetAstrologer.data);
      console.log(masters);
    }
  }, [GetAstrologer]);

  useEffect(() => {
    if (isSuccessSearch && searchResult) {
      setMasters(searchResult.data);
    }
  }, [searchResult]);

  console.log(searchResult, "d");

  console.log(masters, "ss");

  useEffect(() => {
    if (open || status.isError === false) {
      refetchAstrologers();
    }
  }, [open, status, refetchAstrologers]);

  const handleToggleForm = () => {
    setOpen(!open);
  };

  const handleSearch = () => {
    setFilters(filters);
    fetch({ filters });
    console.log(filters, "ds");
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <div className="masters">
      <div className="info">
        <button onClick={handleToggleForm}>
          {open ? "Back" : "Add New Master"}
        </button>
      </div>
      {!open ? (
        <div className="searchContainer">
          <label>
            Name:
            <input
              className="searchLabel"
              type="text"
              value={filters.name}
              onChange={(e) =>
                setFilters({ ...filters, name: e.target.value.toLowerCase() })
              }
            />
          </label>
          <label>
            aid:
            <input
              className="searchLabel"
              type="text"
              value={filters.aid}
              onChange={(e) => setFilters({ ...filters, aid: e.target.value })}
            />
          </label>
          <label>
            Mobile Number:
            <input
              className="searchLabel"
              type="text"
              value={filters.mobileNumber}
              onChange={(e) =>
                setFilters({ ...filters, mobileNumber: e.target.value })
              }
            />
          </label>
          <label>
            Gender:
            <select
              className="searchLabel"
              value={filters.gender}
              onChange={(e) =>
                setFilters({ ...filters, gender: e.target.value })
              }
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          <label>
            Consultation Mobile:
            <input
              className="searchLabel"
              type="text"
              value={filters.consultationMobileNumber}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  consultationMobileNumber: e.target.value,
                })
              }
            />
          </label>

          <label>
            Call Status:
            <select
              className="searchLabel"
              value={filters.callStatus}
              onChange={(e) =>
                setFilters({ ...filters, callStatus: e.target.value })
              }
            >
              <option value="">Select Call Status</option>
              <option value="live">Live</option>
              <option value="offline">Offline</option>
              <option value="busy">Busy</option>
            </select>
          </label>

          <label>
            Language:
            <select
              value={filters.language}
              onChange={(e) =>
                setFilters({ ...filters, language: e.target.value })
              }
            >
              <option value="">Select a language</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Bengali">Bengali</option>
              <option value="Punjabi">Punjabi</option>
              <option value="Gujarati">Gujarati</option>
              <option value="Marathi">Marathi</option>
              <option value="Marwadi">Marwadi</option>
              <option value="Odia">Odia</option>
              <option value="Konkani">Konkani</option>
              <option value="Sindi">Sindi</option>
              <option value="Tamil">Tamil</option>
              <option value="Malayalam">Malayalam</option>
              <option value="Kannada">Kannada</option>
              <option value="Telugu">Telugu</option>
            </select>
          </label>

          <button onClick={handleSearch}>Search</button>
        </div>
      ) : (
        ""
      )}

      {status.visible && (
        <Alert severity={status.isError ? "error" : "success"}>
          <AlertTitle>{status.isError ? "Error" : "Success"}</AlertTitle>
          {status.error}
        </Alert>
      )}

      {open ? (
        <div>
          <h2>Master Registration</h2>
          <OnboardingForm setStatus={setStatus} />
        </div>
      ) : (
        <div className="table">
          <h2>Masters</h2>
          {isFetching ? (
            <div style={{ textAlign: "center" }}>
              <CircularProgress size={100} />
            </div>
          ) : masters.length ? (
            <>
              <DataTable
                columns={columns}
                rows={masters}
                currentPage={currentPage}
              />

              <div className="pagination-container">
                <Pagination
                  count={Math.ceil(astrologersLength / limit)}
                  page={currentPage}
                  onChange={handleChange}
                />
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center" }}>
              <p>No masters available.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Masters;
