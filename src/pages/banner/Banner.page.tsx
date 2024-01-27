import { Button } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SecondBannerList from "../../components/banner/SecondBannerList.component";
import HomeBannerTextDescri from "../../components/banner/HomeBannerTextDescri.component";
import BannerTitle from "../../components/banner/BannerTitle.component";

import {
  useAddSingleBannerMutation,
  useGetSingleBannerQuery,
} from "../../services/master.service";

const Banner = () => {
  const [selectedMainBanner, setSelectedMainBannner] = useState<File | null>(
    null
  );
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    setSelectedMainBannner(file!);
    setUploadComplete(false);
  };

  const [addSingleBanner] = useAddSingleBannerMutation();

  const { data: singleBanner } = useGetSingleBannerQuery();

  const handleUpload = async () => {
    if (selectedMainBanner) {
      const formData = new FormData();

      formData.append("firstBanner", selectedMainBanner);

      await addSingleBanner(formData).unwrap();
      setUploadComplete(true);
      toast.success(" Banner Updated successfully!");
    }
  };

  return (
    <>
      <h2 style={{ margin: 5 }}>Banner</h2>

      <div
        style={{ textAlign: "left", padding: "20px", border: "1px solid #ccc" }}
      >
        <h2>Main Banner</h2>

        <div style={{ marginBottom: "20px", alignItems: "center" }}>
          {selectedMainBanner ? (
            <div className="profile-picture-container">
              <img
                src={URL.createObjectURL(selectedMainBanner)}
                alt="Selected Banner"
                className="profile-picture-thumbnail"
                style={{ width: "200px", height: "200px" }}
              />
            </div>
          ) : (
            <div className="profile-picture-container">
              <img
                src={singleBanner?.data}
                alt="Default Banner"
                className="profile-picture-thumbnail"
                style={{ width: "200px", height: "200px" }}
              />
            </div>
          )}

          <label htmlFor="profile-picture-input">
            <Button variant="contained" color="primary" component="span">
              Choose Banner
            </Button>
            <input
              accept="image/*"
              id="profile-picture-input"
              type="file"
              onChange={handleProfilePictureChange}
              style={{ display: "none" }}
            />
          </label>
        </div>

        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!selectedMainBanner || uploadComplete}
        >
          Upload Banner
        </Button>
      </div>
      <SecondBannerList />
      <HomeBannerTextDescri />
      <BannerTitle />
    </>
  );
};

export default Banner;
