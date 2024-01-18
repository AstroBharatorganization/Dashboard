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
import { setAdmin } from "../../features/authslice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultTheme = createTheme();

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [credentials, setCredentials] = useState<LoginRequest>({
    username: "",
    password: "",
  });

  const [adminLogin, { data: loginData, isSuccess }] = useAdminLoginMutation();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    await adminLogin(credentials);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login successfull");
      navigate("/");
      dispatch(setAdmin({ token: loginData.token }));
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
              Sign in
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
                onChange={(e) =>
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
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />

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
