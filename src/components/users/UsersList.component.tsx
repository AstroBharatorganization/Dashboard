import React, { useState } from "react";
import { useGetUsersQuery } from "../../services/master.service";
import "./usersList.style.scss";
import { Pagination, CircularProgress } from "@mui/material";

const UsersList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isFetching } = useGetUsersQuery(currentPage);

  const usersLength = data?.length || 0;
  let limit = 10;
  const users = data?.data || [];

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <div className="user">
      {isFetching ? (
        <div style={{ textAlign: "center" }}>
          <CircularProgress size={100} />
        </div>
      ) : (
        <>
          <table className="user-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Wallet Detail</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.wallet}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-container">
            <Pagination
              count={Math.ceil(usersLength / limit)}
              page={currentPage}
              onChange={handleChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UsersList;
