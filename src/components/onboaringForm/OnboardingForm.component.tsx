// Styles
import "./onBoardingForm.style.scss";

import { useState } from "react";

import { AstrologerFormData } from "@/models/master.model";
import { validateForm } from "../../validation/Register/Register.validation";
import { useCreateAstrologerMutation } from "../../services/master.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";

import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

interface OnboardingFormProps {
  setStatus: (status: any) => void;
}

const OnboardingForm: React.FC<OnboardingFormProps> = ({ setStatus }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<AstrologerFormData>({
    mobileNumber: "",
    consultationMobileNumber: "",
    introduction: "",
    gender: "",
    name: "",
    dateOfBirth: "",
    specialties: [],
    languages: [],
    profile: null,
    gallery: [],
    incomeRatio: 0.5,
    callStatus: "live",
    fullCallFee: 0,
    CutCallFee: 0,
    experience: 0,
    country: "",
    skills: [],
    rating: 0,
    mostTrusted: false,
    hideInApp: false,
    hideInDashboard: false,
    fees: {
      call: {
        cut: 0,
        full: 0,
      },
    },
    galleryUrl: [],
  });

  const [validationErrors, setValidationErrors] = useState<
    Partial<Record<keyof AstrologerFormData, string>>
  >({});
  const [createAstrologer, { isSuccess }] = useCreateAstrologerMutation();

  const handleChange = (field: any, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    handleChange("profile", file);
  };

  const handleGalleryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const selectedImages = [];

    if (files) {
      for (let i = 0; i < files.length; i++) {
        selectedImages.push(files[i]);
      }
    }

    setFormData({
      ...formData,
      gallery: selectedImages,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const errors = validateForm(formData);

    if (Object.keys(errors).length === 0) {
      try {
        const formDataWithFiles = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (key === "profile") {
            value && formDataWithFiles.append(key, value);
          } else if (key === "gallery") {
            formData.gallery.forEach((image) => {
              formDataWithFiles.append("gallery", image);
            });
          } else if (key === "skills") {
            formData.skills.forEach((value) => {
              formDataWithFiles.append("skills", value);
            });
          } else if (key === "specialties") {
            formData.specialties.forEach((value) => {
              formDataWithFiles.append("specialties", value);
            });
          } else if (key === "languages") {
            formData.languages.forEach((value) => {
              formDataWithFiles.append("languages", value);
            });
          } else {
            formDataWithFiles.append(key, value);
          }
        });

        await createAstrologer(formDataWithFiles).unwrap();
        toast.success("Registration successful!");
        setStatus({
          visible: true,
          isError: false,
          error: "",
        });
        if (isSuccess) {
          navigate("/masters");
          console.log("Form submitted:", formData);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setValidationErrors(errors);
      console.log("Validation errors:", errors);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container">
        <div className="form-section">
          <div>
            <TextField
              label="Mobile Number"
              value={formData.mobileNumber}
              onChange={(e) =>
                handleChange(
                  "mobileNumber",
                  e.target.value.replace(/\D/g, "").slice(0, 10)
                )
              }
              error={Boolean(validationErrors.mobileNumber)}
              helperText={validationErrors.mobileNumber}
            />
            <br />

            <TextField
              sx={{ mt: 2 }}
              label="Consultation Mobile Number"
              value={formData.consultationMobileNumber}
              onChange={(e) =>
                handleChange(
                  "consultationMobileNumber",
                  e.target.value.replace(/\D/g, "").slice(0, 10)
                )
              }
              error={Boolean(validationErrors.consultationMobileNumber)}
              helperText={validationErrors.consultationMobileNumber}
            />
            <br />

            <FormControl sx={{ minWidth: 222, mt: 2 }}>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.gender}
                label="Gender"
                onChange={(e) => handleChange("gender", e.target.value)}
                error={Boolean(validationErrors.gender)}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
              {validationErrors.gender && (
                <div
                  style={{ color: "red", fontSize: "0.7rem", marginTop: "8px" }}
                >
                  {validationErrors.gender}
                </div>
              )}
            </FormControl>

            <br />

            <TextField
              sx={{ mt: 2 }}
              label="Name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              error={Boolean(validationErrors.name)}
              helperText={validationErrors.name}
            />

            <br />

            <TextField
              sx={{ mt: 2 }}
              label="Date of Birth"
              value={formData.dateOfBirth}
              onChange={(e) => {
                const inputDate = e.target.value.replace(/\D/g, "").slice(0, 8);
                const formattedDate = inputDate.replace(
                  /(\d{2})(\d{2})(\d{4})/,
                  "$1-$2-$3"
                );

                handleChange("dateOfBirth", formattedDate);
              }}
              error={Boolean(validationErrors.dateOfBirth)}
              helperText={validationErrors.dateOfBirth}
              placeholder="dd-mm-yyyy"
            />

            <br />

            <TextField
              sx={{ mt: 2 }}
              label="Experience"
              value={formData.experience}
              onChange={(e) => {
                const inputFee = parseFloat(e.target.value);
                handleChange("experience", inputFee);
              }}
              error={Boolean(validationErrors.experience)}
              helperText={validationErrors.experience}
              type="number"
            />

            <br />

            <FormControl sx={{ minWidth: 222, mt: 2 }}>
              <InputLabel id="demo-simple-select-label">Call Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.callStatus}
                onChange={(e) => handleChange("callStatus", e.target.value)}
                label="Specialties"
              >
                <MenuItem value="offline">Offline</MenuItem>
                <MenuItem value="live">Live</MenuItem>
                <MenuItem value="busy">Busy</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="twoColumn">
            <TextField
              label="Full Call Fee"
              value={formData.fullCallFee}
              onChange={(e) => {
                const inputFee = parseFloat(e.target.value);
                handleChange("fullCallFee", inputFee);
              }}
              error={Boolean(validationErrors.fullCallFee)}
              helperText={validationErrors.fullCallFee}
              type="number"
            />
            <br />

            <TextField
              sx={{ mt: 2 }}
              label="Cut Call Fee"
              value={formData.CutCallFee}
              onChange={(e) => {
                const inputFee = parseFloat(e.target.value);
                handleChange("CutCallFee", inputFee);
              }}
              error={Boolean(validationErrors.CutCallFee)}
              helperText={validationErrors.CutCallFee}
              type="number"
            />
            <br />

            <TextField
              sx={{ mt: 2 }}
              label="Country"
              value={formData.country}
              onChange={(e) => handleChange("country", e.target.value)}
              error={Boolean(validationErrors.country)}
              helperText={validationErrors.country}
            />
            <br />

            <FormControl sx={{ minWidth: 222, mt: 2 }}>
              <InputLabel id="demo-simple-select-label">
                Income Ratio
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.incomeRatio}
                onChange={(e) => handleChange("incomeRatio", e.target.value)}
                label="Income Ratio"
              >
                <MenuItem value={0.1}>10%</MenuItem>
                <MenuItem value={0.2}>20%</MenuItem>
                <MenuItem value={0.3}>30%</MenuItem>
                <MenuItem value={0.4}>40%</MenuItem>
                <MenuItem value={0.5}>50%</MenuItem>
                <MenuItem value={0.6}>60%</MenuItem>
                <MenuItem value={0.7}>70%</MenuItem>
                <MenuItem value={0.8}>80%</MenuItem>
                <MenuItem value={0.9}>90%</MenuItem>
                <MenuItem value={1}>100%</MenuItem>
              </Select>
            </FormControl>
            <br />
            <FormControl sx={{ minWidth: 222, mt: 2 }}>
              <InputLabel id="demo-simple-select-label">Specialties</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                multiple
                value={formData.specialties}
                onChange={(e) => handleChange("specialties", e.target.value)}
                label="Specialties"
                // input={<Input />}
                error={Boolean(validationErrors.specialties)}
              >
                <MenuItem value="Love">Love</MenuItem>
                <MenuItem value="Marriage">Marriage</MenuItem>
                <MenuItem value="Career">Career</MenuItem>
                <MenuItem value="Life">Life</MenuItem>
                <MenuItem value="Business">Business</MenuItem>
                <MenuItem value="Health">Health</MenuItem>
              </Select>
              {validationErrors.specialties && (
                <div
                  style={{ color: "red", fontSize: "0.7rem", marginTop: "8px" }}
                >
                  {validationErrors.specialties}
                </div>
              )}
            </FormControl>

            <br />

            <FormControl sx={{ minWidth: 222, mt: 2 }}>
              <InputLabel id="demo-simple-select-label">Languages</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                multiple
                value={formData.languages}
                onChange={(e) => handleChange("languages", e.target.value)}
                label="languages"
                // input={<Input />}
                error={Boolean(validationErrors.languages)}
              >
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Hindi">Hindi</MenuItem>
                <MenuItem value="Bengali">Bengali</MenuItem>
                <MenuItem value="Punjabi">Punjabi</MenuItem>
                <MenuItem value="Gujarati">Gujarati</MenuItem>
                <MenuItem value="Marathi">Marathi</MenuItem>
                <MenuItem value="Marwadi">Marwadi</MenuItem>
                <MenuItem value="Odia">Odia</MenuItem>
                <MenuItem value="Konkani">Konkani</MenuItem>
                <MenuItem value="Sindi">Sindi</MenuItem>
                <MenuItem value="Tamil">Tamil</MenuItem>
                <MenuItem value="Malayalam">Malayalam</MenuItem>
                <MenuItem value="Kannada">Kannada</MenuItem>
                <MenuItem value="Telugu">Telugu</MenuItem>
              </Select>
              {validationErrors.languages && (
                <div
                  style={{ color: "red", fontSize: "0.7rem", marginTop: "8px" }}
                >
                  {validationErrors.languages}
                </div>
              )}
            </FormControl>

            <br />

            <FormControl sx={{ minWidth: 222, mt: 2 }}>
              <InputLabel id="demo-simple-select-label">Skills</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                multiple
                value={formData.skills}
                onChange={(e) => handleChange("skills", e.target.value)}
                label="Skills"
                // input={<Input />}
                error={Boolean(validationErrors.skills)}
              >
                <MenuItem value="Vedic Astrologer">Vedic Astrologer</MenuItem>
                <MenuItem value="Tarot">Tarot</MenuItem>
                <MenuItem value="Numerology">Numerology</MenuItem>
                <MenuItem value="Vaastu">Vaastu</MenuItem>
                <MenuItem value="Palmistry">Palmistry</MenuItem>
                <MenuItem value="Gemology">Gemology</MenuItem>
                <MenuItem value="Lal Kitab">Lal Kitab</MenuItem>
                <MenuItem value="Pendulam Dowsing">Pendulum Dowsing</MenuItem>
              </Select>
              {validationErrors.skills && (
                <div
                  style={{ color: "red", fontSize: "0.7rem", marginTop: "8px" }}
                >
                  {validationErrors.skills}
                </div>
              )}
            </FormControl>
          </div>
        </div>

        <div className="image-section">
          <TextField
            sx={{ minWidth: 400 }}
            label="introduction"
            value={formData.introduction}
            onChange={(e) => handleChange("introduction", e.target.value)}
            error={Boolean(validationErrors.introduction)}
            helperText={validationErrors.introduction}
          />
          <input
            accept="image/*"
            id="profile-picture-input"
            type="file"
            onChange={handleProfilePictureChange}
            style={{ display: "none" }}
          />

          {validationErrors.profile && (
            <div style={{ color: "red", fontSize: "0.8rem", marginTop: "8px" }}>
              {validationErrors.profile}
            </div>
          )}

          {formData.profile && (
            <div className="profile-picture-container">
              <img
                src={URL.createObjectURL(formData.profile)}
                alt="Profile"
                className="profile-picture-thumbnail"
                style={{
                  width: "100px",
                  height: "100px",
                  margin: "5px",
                  borderRadius: "50px",
                  border: "2px solid gray",
                }}
              />
            </div>
          )}

          <label htmlFor="profile-picture-input">
            <Button component="span">Upload Profile Picture</Button>
          </label>

          <input
            accept="image/*"
            id="gallery-images-input"
            type="file"
            multiple
            onChange={handleGalleryImageChange}
            style={{ display: "none" }}
            maxLength={5}
          />
          {validationErrors.gallery && (
            <div style={{ color: "red", fontSize: "0.8rem", marginTop: "8px" }}>
              {validationErrors.gallery}
            </div>
          )}

          <div className="gallery-images-container">
            {formData.gallery.map((image, index) => (
              <div key={index} className="gallery-image-thumbnail">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Gallery Image ${index + 1}`}
                  style={{
                    width: "60px",
                    height: "auto",
                    objectFit: "fill",
                  }}
                />
              </div>
            ))}
          </div>

          <label htmlFor="gallery-images-input">
            <Button component="span">Upload Gallery Images</Button>
          </label>

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ width: "300px", height: "auto", fontSize: "16px" }}
          >
            REGISTER
          </Button>
        </div>
      </div>
    </>
  );
};

export default OnboardingForm;
