// Styles
import "./onBoardingForm.style.scss";
// Libraries
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  Button,
  Stack,
  Select,
  MenuItem,
  // FormGroup,
  // FormControlLabel,
  // Checkbox,
  Backdrop,
  CircularProgress,
  FormControl,
  InputLabel,
} from "@mui/material";
// Models
import { masterSchema, masterSchemaType } from "../../models/master.model";
// services
// import { CreateMaster, UploadProfile } from "../../services/master.service";
interface Status {
  visible: boolean;
  isError: boolean;
  error: string;
}
type Props = {
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
};

const OnboardingForm = ({ setStatus }: Props) => {
  // const [profile, setprofile] = useState<File>();
  const [isLoading, setIsLoading] = useState<boolean>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<masterSchemaType>({
    resolver: zodResolver(masterSchema),
  });

  console.log("errors", errors);

  const onSubmit: SubmitHandler<masterSchemaType> = async (data) => {
    setIsLoading(true);
    try {
      // const created = Date.now().toString();
      // data.created = created;
      // console.log("data.profile", data.profile[0]);
      // if (data.profile == null) return;
      // const profileurl = await UploadProfile(data.profile[0], data.masterName);
      // console.log("profileurl", profileurl);
      // data.profile = profileurl;

      // await CreateMaster(data);

      // console.log(data);

      console.log("Data:->", data);
      const successObj = {
        visible: true,
        isError: false,
        error: "",
      };
      setStatus(successObj);
      reset();
    } catch (error) {
      const errObj = {
        visible: true,
        isError: true,
        error: String(error),
      };
      setStatus(errObj);
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            direction={"column"}
            spacing={2}
            margin={2}
            width={1200}
            alignItems={"stretch"}
          >
            <Stack direction={"row"} spacing={4}>
              <Stack direction={"column"} spacing={4} margin={2}>
                <Stack direction={"row"} spacing={4}>
                  <Stack direction={"column"}>
                    <Stack direction={"column"} spacing={4}>
                      <TextField
                        label={"Name"}
                        fullWidth
                        {...register("name")}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                      />
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Country
                        </InputLabel>
                        <Select
                          labelId="country"
                          {...register("country")}
                          id="country"
                          label="country"
                          defaultValue={"India"}
                        >
                          <MenuItem value={"India"}>India</MenuItem>
                          <MenuItem value={"International"}>
                            International
                          </MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        label={"Mobile Number"}
                        fullWidth
                        {...register("phoneNumber")}
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber?.message}
                      />
                    </Stack>
                  </Stack>
                  <Stack direction={"column"} spacing={4}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Gender
                      </InputLabel>
                      <Select
                        labelId="gender"
                        {...register("gender")}
                        id="gender"
                        label="gender"
                        defaultValue={""}
                      >
                        <MenuItem value={"male"}>Male</MenuItem>
                        <MenuItem value={"female"}>Female</MenuItem>
                        <MenuItem value={"Other"}>other</MenuItem>
                      </Select>
                    </FormControl>

                    <TextField
                      label={"Experience"}
                      {...register("experience")}
                      error={!!errors.experience}
                      helperText={errors.experience?.message}
                      fullWidth
                    />
                    <TextField
                      label={"Email"}
                      {...register("email")}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      fullWidth
                    />
                  </Stack>
                </Stack>
                <Stack direction={"column"} spacing={4}>
                  <TextField
                    label={"Master Introduction"}
                    {...register("masterIntroduction")}
                    error={!!errors.masterIntroduction}
                    helperText={errors.masterIntroduction?.message}
                    multiline
                    fullWidth
                  />
                </Stack>
              </Stack>
              <Stack direction={"column"} spacing={2}>
                {/* <TextField label={"Date Of Birth"} fullWidth /> */}

                <TextField label={"Dummy"} fullWidth />
              </Stack>
            </Stack>
            <FormControl>
              <InputLabel id="demo-simple-select-label">language</InputLabel>
              <Stack direction="row">
                <Select
                  labelId="gender"
                  // {...register("language")}
                  id="gender"
                  label="gender"
                  defaultValue={"English"}
                  multiple={true}
                  value=""
                >
                  {[
                    "English",
                    "Hindi",
                    "Bengali",
                    "Punjabi",
                    "Gujarati",
                    "Marathi",
                    "Odia",
                    "Konkani",
                    "Sindhi",
                    "Tamil",
                    "Malayalam",
                    "Kannada",
                    "Telugu",
                  ].map((language) => (
                    <MenuItem value={language}>{language}</MenuItem>
                  ))}
                </Select>
              </Stack>
            </FormControl>
            {/* <FormGroup>
              <h2>Language</h2>
              <Stack direction={"row"}>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="English"
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Hindi"
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Bengali"
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Punjabi"
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Gujrati"
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Marathi"
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Label"
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Marwadi"
                />
              </Stack>
              <Stack direction={"row"}>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Odia"
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Konkani"
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Sindhi"
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Tamil"
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Malayalam"
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Kannada"
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Telugu"
                />
              </Stack>
            </FormGroup> */}
            {/* <h2>Master Profile Details</h2>
            <Stack direction={"row"} spacing={2}>
              <TextField label={"Price (In Rupees)"} multiline />
              <FormControl style={{ width: "150px" }}>
                <InputLabel id="demo-simple-select-label">Tags</InputLabel>
                <Select
                  labelId="tags"
                  {...register("tags")}
                  id="tags"
                  label="tags"
                  defaultValue={""}
                >
                  <MenuItem value={"Most Choice"}>Most Choice</MenuItem>
                  <MenuItem value={"Most Trusted"}>Most Trusted</MenuItem>
                </Select>
              </FormControl>
              <FormControl style={{ width: "200px" }}>
                <InputLabel id="demo-simple-select-label">Badge</InputLabel>
                <Select
                  labelId="badge"
                  {...register("badge")}
                  id="badge"
                  label="badge"
                  defaultValue={"Star Astrologer"}
                >
                  <MenuItem value={"Star Astrologer"}>Star Astrologer</MenuItem>
                  <MenuItem value={"verified"}>verified</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <Stack direction={"row"} spacing={2}>
              <FormControl style={{ width: "150px" }}>
                <InputLabel id="demo-simple-select-label">Skills</InputLabel>
                <Select
                  labelId="skills"
                  {...register("skills")}
                  id="skills"
                  label="skills"
                  defaultValue={"Love"}
                >
                  <MenuItem value={"Love"}>Love</MenuItem>
                  <MenuItem value={"Marriage"}>Marriage</MenuItem>
                  <MenuItem value={"Career"}>Career</MenuItem>
                  <MenuItem value={"Life"}>Life</MenuItem>
                  <MenuItem value={"Business"}>Business</MenuItem>
                  <MenuItem value={"Health"}>Health</MenuItem>
                </Select>
              </FormControl>
              <FormControl style={{ width: "150px" }}>
                <InputLabel id="demo-simple-select-label">Ratings</InputLabel>
                <Select
                  labelId="ratings"
                  {...register("ratings")}
                  id="ratings"
                  label="ratings"
                  defaultValue={"5"}
                >
                  <MenuItem value={"1"}>1</MenuItem>
                  <MenuItem value={"2"}>2</MenuItem>
                  <MenuItem value={"3"}>3</MenuItem>
                  <MenuItem value={"3.5"}>3.5</MenuItem>
                  <MenuItem value={"4"}>4</MenuItem>
                  <MenuItem value={"4.5"}>4.5</MenuItem>
                  <MenuItem value={"5"}>5</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="divide"
                type="number"
                placeholder="Enter divide"
                {...register("divide")}
                error={!!errors.divide}
                helperText={errors.divide?.message}
              />
            </Stack>
            <h2>Specialties</h2>
            <FormGroup>
              <Stack direction={"row"}>
                {[
                  "Love",
                  "Marriage",
                  "Career",
                  "Life",
                  "Business",
                  "Health",
                ].map((specialty) => (
                  <FormControlLabel
                    key={specialty}
                    control={
                      <Checkbox
                        {...register("specialties", {
                          shouldUnregister: false,
                        })}
                        value={specialty}
                      />
                    }
                    label={specialty}
                  />
                ))}
              </Stack>
            </FormGroup> */}
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Stack>
        </form>
      )}
    </>
  );
};

export default OnboardingForm;
