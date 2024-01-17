import React from "react";
import "./usersList.style.scss";
import { GetUsers } from "../../models/users.model";

interface UserSearchResultsProps {
  results: GetUsers;
}

const UsersSearchResult: React.FC<UserSearchResultsProps> = ({ results }) => {
  return (
    <div className="user-search-results-container">
      {results.data.length === 0 ? (
        <div className="no-users-found-message">No users found</div>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Wallet Detail</th>
            </tr>
          </thead>
          <tbody>
            {results.data.map((user: any) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.wallet}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersSearchResult;
