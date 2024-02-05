import { Button } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";

import {
  useAddSecondBannerListMutation,
  useGetSecondBannerListQuery,
} from "../../services/master.service";

const SecondBannerList = () => {
  const [selectedSecondBanners, setSelectedSecondBanners] =
    useState<FileList | null>(null);

  const [uploadComplete, setUploadComplete] = useState(false);

  const handleSecondBannersChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    setSelectedSecondBanners(files);
    setUploadComplete(false);
  };

  const [addSecondBanner] = useAddSecondBannerListMutation();

  const { data: secondBannerList } = useGetSecondBannerListQuery();

  const handleUpload = async () => {
    if (selectedSecondBanners && selectedSecondBanners.length > 0) {
      const formData = new FormData();

      Array.from(selectedSecondBanners).forEach((file) => {
        formData.append(`secondBannerList`, file);
      });

      await addSecondBanner(formData).unwrap();
      setUploadComplete(true);
      toast.success(" Banner Updated successfully!");
    }
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
        <h2>Second Banners</h2>

        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {selectedSecondBanners
            ? Array.from(selectedSecondBanners).map((file, index) => (
                <div key={index} className="profile-picture-container">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Selected Banner ${index + 1}`}
                    className="profile-picture-thumbnail"
                    style={{ width: "200px", height: "200px" }}
                  />
                </div>
              ))
            : secondBannerList?.data.map((banner, index) => (
                <div key={index} className="profile-picture-container">
                  <img
                    src={banner}
                    alt={`Existing Banner ${index + 1}`}
                    className="profile-picture-thumbnail"
                    style={{ width: "200px", height: "200px" }}
                  />
                </div>
              ))}
        </div>
        <label htmlFor="second-banner-input">
          <Button variant="contained" color="primary" component="span">
            Choose Second Banners
          </Button>
          <input
            accept="image/*"
            id="second-banner-input"
            type="file"
            onChange={handleSecondBannersChange}
            multiple
            style={{ display: "none" }}
          />
        </label>

        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!selectedSecondBanners || uploadComplete}
        >
          Upload Second Banners
        </Button>
      </div>
    </>
  );
};

export default SecondBannerList;
