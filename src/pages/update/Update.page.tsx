import React from "react";

import { useGetAstrologersQuery, useUpdateAstrologerMutation } from "../../services/master.service";
import { useParams } from "react-router-dom";
import UpdateForm from "../../components/updateForm/UpdateForm.component";
const Update: React.FC = () => {
  const { id } = useParams();

  console.log(id);
  const { data: astrologer, isLoading, error } = useGetAstrologersQuery([]);
  let selectedAstrologer: any = null;
  if (astrologer) {
    selectedAstrologer = astrologer.data?.find((a: any) => a._id === id);

    console.log(selectedAstrologer);
  }

  const [updateAstrologer] =
  useUpdateAstrologerMutation();

  const handleFormSubmit = async(values: any) => {
    try {
      // Make the update request using the updateAstrologer mutation
      const updatedAstrologer = await updateAstrologer({
        _id: id,
        name:name,
        // Include any other fields you want to update
        // This should match the fields available in the AstrologerFormData interface
        ...values,
      }).unwrap();

      console.log("Astrologer updated successfully:", updatedAstrologer);
    } catch (error) {
      console.error("Error updating astrologer:", error);
    }
  };

  return (
    <div>
      <h2>update</h2>
      {selectedAstrologer && (
        <UpdateForm
          astrologer={selectedAstrologer}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default Update;
