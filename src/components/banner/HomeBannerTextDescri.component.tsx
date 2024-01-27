import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";

import {
  useGetBannerTextAndDescriptionQuery,
  useAddBannerTextAndDescriptionMutation,
} from "../../services/master.service";

const HomeBannerTextDescri = () => {
  const { data: bannerData } = useGetBannerTextAndDescriptionQuery();

  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  useEffect(() => {
    setUpdatedTitle(bannerData?.data?.title || "");
    setUpdatedDescription(bannerData?.data?.description || "");
  }, [bannerData?.data?.description, bannerData?.data?.title]);

  const [addData] = useAddBannerTextAndDescriptionMutation();

  const handleUpdate = () => {
    addData({
      title: updatedTitle,
      description: updatedDescription,
    });
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
            onChange={(e) => setUpdatedTitle(e.target.value)}
            name="updatedTitle"
          />
          <TextField
            label="Description"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />

          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
        </Box>
      </div>
    </>
  );
};

export default HomeBannerTextDescri;
