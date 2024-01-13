import React, { useState } from "react";
import UsersList from "../../components/users/UsersList.component";
import UsersSearchResult from "../../components/users/UsersSearchResult.componenet";
import { useLazySearchUsersQuery } from "../../services/master.service";

const UsersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [fetch, { data, isFetching, isSuccess, isError, error }] =
    useLazySearchUsersQuery();

  const handleSearch = async () => {
    fetch({ searchQuery });
    // Perform the search using your API or service
    // Update searchResults based on the search query

    // For example, assuming useSearchUsersQuery is used for searching
    console.log(data,"datas");

    // Mock data for testing
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {isSuccess ? (
        <UsersSearchResult results={data} />
      ) : (
        <UsersList />
      )}
    
    </div>
  );
};

export default UsersPage;
