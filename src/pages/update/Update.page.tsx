import React, { useState } from "react";
import {
  useUpdateAstrologerMutation,
  useGetAstrologersByIdQuery,
} from "../../services/master.service";
import { useParams } from "react-router-dom";
import UpdateForm from "../../components/updateForm/UpdateForm.component";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const Update: React.FC = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const { id } = useParams();

  const {
    data: astrologer,
    isFetching,
    isSuccess,
    refetch,
  } = useGetAstrologersByIdQuery(id);

  const navigate = useNavigate();

  let selectedAstrologer;

  if (isSuccess) {
    selectedAstrologer = astrologer.data[0];
  }

  const [updatedAstrologer, { isLoading: isUpdating }] =
    useUpdateAstrologerMutation();

  const handleFormSubmit = async (values: any) => {
    try {
      const formDataWithFiles = new FormData();

      for (const [key, value] of Object.entries(values)) {
        if (value instanceof File && key === "new") {
          formDataWithFiles.append("profile", value);
        } else if (Array.isArray(value) && key === "newGallery") {
          value.forEach((file) => {
            formDataWithFiles.append(`gallery`, file);
          });
        } else if (Array.isArray(value)) {
          value.forEach((item, index) => {
            formDataWithFiles.append(`${key}[${index}]`, item);
          });
        } else if (typeof value === "string") {
          formDataWithFiles.append(key, value);
        } else if (typeof value === "boolean" || typeof value === "number") {
          formDataWithFiles.append(key, value.toString());
        }
      }

      await updatedAstrologer({
        _id: id,
        updatedAstrologer: formDataWithFiles,
      }).unwrap();
      toast.success("Updated successfully!");
      refetch();
      navigate("/masters");
    } catch (error) {
      toast.error("Update Failed.. Please try again.");

      const errMsg = await extractErrorMessage(error);
      setErrorMsg(errMsg);
      console.error("Error updating astrologer:", error);
    }
  };

  function extractErrorMessage(error: any) {
    if ("status" in error && "error" in error) {
      console.log("here");
      return error.error; // For FetchBaseQueryError
    } else {
      return error.message || "An error occurred."; // For other errors
    }
  }

  if (isUpdating || isFetching) {
    return (
      <div style={{ textAlign: "center" }}>
        <CircularProgress size={100} />
      </div>
    );
  }

  return (
    <div>
      <h2>Update</h2>
      {isFetching && (
        <div style={{ textAlign: "center" }}>
          <CircularProgress size={100} />
        </div>
      )}

      {!isFetching && selectedAstrologer && (
        <UpdateForm
          astrologer={selectedAstrologer}
          onSubmit={handleFormSubmit}
          isUpdating={isUpdating}
        />
      )}
    </div>
  );
};

export default Update;
