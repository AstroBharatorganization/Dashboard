import React from "react";

interface UserSearchResultsProps {
  results: any;
}

const UsersSearchResult: React.FC<UserSearchResultsProps> = ({ results }) => {

  console.log(results ,"at search")
  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {/* {results.map((user:any) => (
        <li key={user._id}>
          <strong>{user.username}</strong> - {user.wallet}
        </li>
      ))} */}
      </ul>
    </div>
  );
};

export default UsersSearchResult;
