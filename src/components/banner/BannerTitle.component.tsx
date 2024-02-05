import { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { toast } from "react-toastify";

import {
  useGetBannerTitleQuery,
  useAddBannerTitleMutation,
} from "../../services/master.service";

const BannerTitle = () => {
  const { data: bannerData } = useGetBannerTitleQuery();

  const [updatedTitle, setUpdatedTitle] = useState("");

  const [isTitleChanged, setIsTitleChanged] = useState(false);

  useEffect(() => {
    setUpdatedTitle(bannerData?.data?.title || "");
  }, [bannerData?.data?.title]);

  const [addData] = useAddBannerTitleMutation();

  const handleChange = (event: any) => {
    setUpdatedTitle(event.target.value);
    setIsTitleChanged(true);
  };

  const handleUpdate = () => {
    addData({
      title: updatedTitle,
    });
    toast.success(" Title  Updated successfully!");
    setIsTitleChanged(false);
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

          <Button
            variant="contained"
            onClick={handleUpdate}
            disabled={!isTitleChanged}
          >
            Update
          </Button>
        </Box>
      </div>
    </>
  );
};

export default BannerTitle;
