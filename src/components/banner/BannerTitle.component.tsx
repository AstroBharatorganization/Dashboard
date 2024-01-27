import { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";

import {
  useGetBannerTitleQuery,
  useAddBannerTitleMutation,
} from "../../services/master.service";

const BannerTitle = () => {
  const { data: bannerData } = useGetBannerTitleQuery();

  const [updatedTitle, setUpdatedTitle] = useState("");

  useEffect(() => {
    setUpdatedTitle(bannerData?.data?.title || "");
  }, [bannerData?.data?.title]);

  const [addData] = useAddBannerTitleMutation();

  const handleChange = (event: any) => {
    setUpdatedTitle(event.target.value);
  };

  const handleUpdate = () => {
    addData({
      title: updatedTitle,
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
        <h2>Home Banner Title</h2>
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
            onChange={handleChange}
          />

          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
        </Box>
      </div>
    </>
  );
};

export default BannerTitle;
