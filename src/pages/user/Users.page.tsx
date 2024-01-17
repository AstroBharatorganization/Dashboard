import { useState } from "react";
import UsersList from "../../components/users/UsersList.component";
import UsersSearchResult from "../../components/users/UsersSearchResult.componenet";
import { useLazySearchUsersQuery } from "../../services/master.service";
import { CircularProgress } from "@mui/material";

const UsersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [fetch, { data, isFetching, isSuccess, isError }] =
    useLazySearchUsersQuery();

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      setError("Please enter the Username.");
      return;
    }

    setError(null);
    fetch({ searchQuery });
  };

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <h2 style={{ marginRight: "10px", marginBottom: 0 }}>Users</h2>
        <div style={{ flex: 1 }}></div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={error || "Search by name"}
          style={{ padding: "5px", borderColor: error ? "red" : undefined }}
        />

        <button
          onClick={handleSearch}
          style={{ marginLeft: "10px", padding: "5px", cursor: "pointer" }}
        >
          Search
        </button>
      </div>

      {isFetching && (
        <div style={{ textAlign: "center" }}>
          <CircularProgress size={100} />
        </div>
      )}

      {isSuccess && data ? <UsersSearchResult results={data} /> : <UsersList />}

      {isError && <p>Error</p>}
    </div>
  );
};

export default UsersPage;
