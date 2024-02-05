import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  useGetBannerTextAndDescriptionQuery,
  useAddBannerTextAndDescriptionMutation,
} from "../../services/master.service";

const HomeBannerTextDescri = () => {
  const { data: bannerData } = useGetBannerTextAndDescriptionQuery();

  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  const [isChanged, setIsChanged] = useState(false);
  useEffect(() => {
    setUpdatedTitle(bannerData?.data?.title || "");
    setUpdatedDescription(bannerData?.data?.description || "");
  }, [bannerData?.data?.description, bannerData?.data?.title]);

  const [addData] = useAddBannerTextAndDescriptionMutation();

  const handleChangeTitle = (e: any) => {
    setUpdatedTitle(e.target.value);
    setIsChanged(true);
  };

  const handleChangeDescription = (e: any) => {
    setUpdatedDescription(e.target.value);
    setIsChanged(true);
  };

  const handleUpdate = () => {
    addData({
      title: updatedTitle,
      description: updatedDescription,
    });
    toast.success(" Updated successfully!");
    setIsChanged(false);
  };

  return (
    <>
      <div
        style={{
          textAlign: "left",
          padding: "20px",
          border: "1px solid #ccc",
          marginTop: 10,
        }}
      >
        <h2>Home Banner Text and Description</h2>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "50ch" },
          }}
          noValidate
        >
          <TextField
            label="Text"
            value={updatedTitle}
            onChange={handleChangeTitle}
            name="updatedTitle"
          />
          <TextField
            label="Description"
            value={updatedDescription}
            onChange={handleChangeDescription}
          />

          <Button
            variant="contained"
            onClick={handleUpdate}
            disabled={!isChanged}
          >
            Update
          </Button>
        </Box>
      </div>
    </>
  );
};

export default HomeBannerTextDescri;
