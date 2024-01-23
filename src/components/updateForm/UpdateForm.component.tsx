import React, { useState } from "react";
import { AstrologerFormData } from "@/models/master.model";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./updateForm.style.scss";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormControlLabel,
  Checkbox,
  Avatar,
  CircularProgress,
} from "@mui/material";

interface AstrologerEditFormProps {
  astrologer: AstrologerFormData;
  onSubmit: (values: any) => void;
  isUpdating: boolean;
}

const UpdateForm: React.FC<AstrologerEditFormProps> = ({
  astrologer,
  onSubmit,
  isUpdating,
}) => {
  const [isNewImageAdded, setNewImageAdded] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    gender: Yup.string().required("Gender is required"),
    country: Yup.string().required("Country is required"),

    specialties: Yup.array().min(1, "Select at least one specialty."),
    skills: Yup.array().min(1, "Select at least one skill."),
    languages: Yup.array().min(1, "Select at least one language."),

    // fullCallfee:Yup.number()
    // .required("Full Call Fee is required")
    // .min(0, "Full Fee cannot be negative"),

    // cutCallfee:Yup.number()
    // .required("Call Cut Fee is required")
    // .min(0, "Call Cut Fee cannot be negative"),

    rating: Yup.number()
      .typeError("Please enter a valid number for rating.")
      .min(0, "Rating cannot be negative.")
      .max(5, "Rating cannot exceed 5.")
      .required("Rating is Required"),

    consultationMobileNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone number should be exactly 10 digits")
      .required("Phone number is required"),

    experience: Yup.number()
      .required("Please enter a valid experience")
      .typeError("Please enter a valid number for experience.")
      .positive("Experience must be a positive number.")
      .integer("Experience must be an integer.")
      .min(0, "Experience cannot be negative.")
      .max(50, "Experience cannot exceed 50 years."),

    dateOfBirth: Yup.string()
      .matches(
        /^\d{2}-\d{2}-\d{4}$/,
        "Date of Birth should be in dd-mm-yyyy format"
      )
      .required("Date of Birth is required"),
  });

  const formik = useFormik({
    initialValues: {
      // Initialize form values based on the provided astrologer data
      name: astrologer.name,
      gender: astrologer.gender,
      consultationMobileNumber: astrologer.consultationMobileNumber,
      dateOfBirth: astrologer.dateOfBirth,
      experience: astrologer.experience,
      country: astrologer.country,
      incomeRatio: astrologer.incomeRatio,
      callStatus: astrologer.callStatus,
      languages: astrologer.languages,
      skills: astrologer.skills,
      specialties: astrologer.specialties,
      introduction: astrologer.introduction,
      rating: astrologer.rating || 0,
      mostTrusted: astrologer.mostTrusted || false,
      hideInDashboard: astrologer.hideInDashboard || false,
      hideInApp: astrologer.hideInApp || false,
      cutCallFee: astrologer.fees.call.cut,
      fullCallFee: astrologer.fees.call.full,
      profile: astrologer.profile,
      new: null,
    },

    validationSchema: validationSchema,

    onSubmit: async (values) => {
      onSubmit(values);
    },
  });

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    formik.setFieldValue("new", file);
    setNewImageAdded(true);
  };

  if (isUpdating) {
    return (
      <div style={{ textAlign: "center" }}>
        <CircularProgress size={100} />
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="form-container"
        encType="multipart/form-data"
      >
        <div className="form-column">
          <TextField
            label="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.name)}
            helperText={formik.errors.name}
          />

          <TextField
            sx={{ minWidth: 222, mt: 2 }}
            label="Consultation Mobile Number"
            name="consultationMobileNumber"
            value={formik.values.consultationMobileNumber}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.consultationMobileNumber)}
            helperText={formik.errors.consultationMobileNumber}
          />

          <FormControl sx={{ minWidth: 222, mt: 2 }}>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="gender"
              value={formik.values.gender}
              label="Gender"
              onChange={formik.handleChange}
              error={Boolean(formik.errors.gender)}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>

          <TextField
            sx={{ mt: 2 }}
            label="Date of Birth"
            onChange={formik.handleChange}
            name="dateOfBirth"
            value={formik.values.dateOfBirth}
            placeholder="dd-mm-yyyy"
            error={Boolean(formik.errors.dateOfBirth)}
            helperText={formik.errors.dateOfBirth}
          />

          <TextField
            sx={{ mt: 2 }}
            label="Experience"
            value={formik.values.experience}
            onChange={formik.handleChange}
            name="experience"
            error={Boolean(formik.errors.experience)}
            helperText={formik.errors.experience}
            type="number"
          />

          <FormControl sx={{ minWidth: 222, mt: 2 }}>
            <InputLabel id="demo-simple-select-label">Call Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="callStatus"
              value={formik.values.callStatus}
              onChange={formik.handleChange}
              label="Call Status"
            >
              <MenuItem value="offline">Offline</MenuItem>
              <MenuItem value="live">Live</MenuItem>
              <MenuItem value="busy">Busy</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="form-column">
          <TextField
            label="Country"
            name="country"
            value={formik.values.country}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.country)}
            helperText={formik.errors.country}
          />

          <FormControl sx={{ minWidth: 222, mt: 2 }}>
            <InputLabel id="demo-simple-select-label">Income Ratio</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formik.values.incomeRatio}
              name="incomeRatio"
              onChange={formik.handleChange}
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

          <FormControl sx={{ minWidth: 222, mt: 2 }}>
            <InputLabel id="demo-simple-select-label">Specialties</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              multiple
              value={formik.values.specialties}
              onChange={formik.handleChange}
              label="Specialties"
              name="specialties"
              error={Boolean(formik.errors.specialties)}
            >
              <MenuItem value="Love">Love</MenuItem>
              <MenuItem value="Marriage">Marriage</MenuItem>
              <MenuItem value="Career">Career</MenuItem>
              <MenuItem value="Life">Life</MenuItem>
              <MenuItem value="Business">Business</MenuItem>
              <MenuItem value="Health">Health</MenuItem>
            </Select>
            {formik.errors.specialties && (
              <div
                style={{ color: "red", fontSize: "0.7rem", marginTop: "8px" }}
              >
                {formik.errors.specialties}
              </div>
            )}
          </FormControl>

          <FormControl sx={{ minWidth: 222, mt: 2 }}>
            <InputLabel id="demo-simple-select-label">Languages</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              multiple
              value={formik.values.languages}
              onChange={formik.handleChange}
              label="languages"
              name="languages"
              error={Boolean(formik.errors.languages)}
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
            {formik.errors.languages && (
              <div
                style={{ color: "red", fontSize: "0.7rem", marginTop: "8px" }}
              >
                {formik.errors.languages}
              </div>
            )}
          </FormControl>

          <FormControl sx={{ minWidth: 222, mt: 2 }}>
            <InputLabel id="demo-simple-select-label">Skills</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              multiple
              value={formik.values.skills}
              onChange={formik.handleChange}
              label="Skills"
              name="skills"
              error={Boolean(formik.errors.skills)}
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
            {formik.errors.skills && (
              <div
                style={{ color: "red", fontSize: "0.7rem", marginTop: "8px" }}
              >
                {formik.errors.skills}
              </div>
            )}
          </FormControl>

          <TextField
            sx={{ mt: 2 }}
            label="introduction"
            value={formik.values.introduction}
            name="introduction"
            onChange={formik.handleChange}
            error={Boolean(formik.errors.introduction)}
            helperText={formik.errors.introduction}
          />
        </div>

        <div className="form-column">
          <TextField
            label="Rating"
            value={formik.values.rating}
            onChange={formik.handleChange}
            name="rating"
            error={Boolean(formik.errors.rating)}
            helperText={formik.errors.rating}
            type="number"
            inputProps={{ min: 0, max: 5 }}
          />

          <TextField
            sx={{ mt: 2 }}
            label="Full Call Fee"
            value={formik.values.fullCallFee}
            onChange={formik.handleChange}
            name="fullCallFee"
            error={Boolean(formik.errors.fullCallFee)}
            helperText={formik.errors.fullCallFee}
            type="number"
          />

          <TextField
            sx={{ mt: 2 }}
            label="Call Cut Fee"
            value={formik.values.cutCallFee}
            onChange={formik.handleChange}
            name="cutCallFee"
            error={Boolean(formik.errors.cutCallFee)}
            helperText={formik.errors.cutCallFee}
            type="number"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.mostTrusted}
                onChange={formik.handleChange}
                name="mostTrusted"
              />
            }
            label="Most Trusted"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.hideInApp}
                onChange={formik.handleChange}
                name="hideInApp"
              />
            }
            label="Hide In App"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.hideInDashboard}
                onChange={formik.handleChange}
                name="hideInDashboard"
              />
            }
            label="Hide In Dashboard"
          />

          <Button
            className="button"
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </div>

        <div className="form-column">
          <div>
            {!isNewImageAdded &&
              astrologer.profile &&
              "url" in astrologer.profile && (
                <Avatar
                  alt={astrologer.name}
                  src={astrologer.profile.url as string}
                  sx={{ width: 100, height: 100, border: "2px solid gray" }}
                />
              )}

            <input
              accept="image/*"
              id="profile-picture-input"
              type="file"
              onChange={handleProfilePictureChange}
              style={{ display: "none" }}
            />

            {formik.values.new && (
              <div className="profile-picture-container">
                <img
                  src={URL.createObjectURL(formik.values.new)}
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

            {formik.errors.profile && (
              <div
                style={{ color: "red", fontSize: "0.8rem", marginTop: "8px" }}
              >
                {formik.errors.profile}
              </div>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default UpdateForm;
