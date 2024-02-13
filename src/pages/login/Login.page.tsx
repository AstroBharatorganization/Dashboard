// style
import "./login.style.scss";

import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LoginRequest } from "../../models/admin.model";
import { useAdminLoginMutation } from "../../services/master.service";
import { useAppDispatch } from "../../store/hooks";
import { setAdmin } from "../../features/authSlice.ts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { selectAuth } from "../../features/authSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const defaultTheme = createTheme();

const Login = () => {
  const token: string | null = useSelector(selectAuth);

  if (token) {
    return <Navigate to="/" />;
  }

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [credentials, setCredentials] = useState<LoginRequest>({
    username: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState<any>("");

  const [adminLogin, { data: loginData, isSuccess, isError, error }] =
    useAdminLoginMutation();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    await adminLogin(credentials);
  };

  useEffect(() => {
    if (error) {
      setErrorMsg(error);
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login successfull");
      navigate("/");
      dispatch(setAdmin({ token: loginData.data }));
    }
  }, [isSuccess]);

  return (
    <div className="containerLogin">
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Login to Continue..
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={credentials.username}
                onChange={(e: any) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={credentials.password}
                onChange={(e: any) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />

              {errorMsg && errorMsg.data && errorMsg.data.message && (
                <Typography color="error" variant="subtitle1">
                  {errorMsg.data.message}
                </Typography>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Login;
