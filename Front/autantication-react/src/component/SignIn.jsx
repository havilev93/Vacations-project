import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Services
import connection from "../services/connect.service.js";

// bootstrap
import Form from "react-bootstrap/Form";

// Material UI
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright ©"}
      <Link color="inherit" href="/">
        Vacations
      </Link>{" "}
      by Havi, {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#fb485c",
    },
    secondary: {
      main: "#06bebf",
    },
  },
});

const SignIn = () => {
  // const for svae the usre's answer
  const [email, setEmail] = useState("");
  // email alert display style, email valid correct status
  const [commentValidEmail, setCommentValidEmail] = useState(["none", false]);

  const [password, setPassword] = useState("");
  // password alert display style, password valid correct status
  const [commentValidPassword, setCommentValidPassword] = useState([
    "none",
    false,
  ]);

  // alert display style, alert content
  const [commentUserNotFound, setCommentUserNotFound] = useState(["none", ""]);

  // to enable navigation in the component
  const navigate = useNavigate();

  //function that valid the mail structure
  const validEmailCheck = (email) => {
    setEmail(email);
    if (email) {
      // @ and dot something (more than 2 char)
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      const valid = regex.test(email);
      valid
        ? setCommentValidEmail(["none", true])
        : setCommentValidEmail(["", false]);
    }
  };

  //function that valid the mail structure
  const validPasswordCheck = (password) => {
    setPassword(password);
    if (password) {
      // 1 digit at least, 1 lower case at least, 1 upper case at least, 8 char at least
      const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
      const valid = regex.test(password);
      valid
        ? setCommentValidPassword(["none", true])
        : setCommentValidPassword(["", false]);
    }
  };

  // function that make the sign in action
  const handleSubmit = (e) => {
    e.preventDefault();
    !commentValidEmail[1] || !commentValidPassword[1]
      ? setCommentUserNotFound(["", "Every field must have value"])
      : commentValidEmail[1] &&
        commentValidPassword[1] &&
        connection
          .signIn(email, password)
          .then((res) => {
            // console.log(res.data.message);
            if (res.data.role === "user") {
              localStorage.clear();
              localStorage.setItem("token", res.data.accessToken);
              navigate("/home");
            }
            if (res.data.role == "admin") {
              navigate("/admin");
            }
          })
          .catch((err) => {
            setCommentUserNotFound(["", err.response.data.message]);
          });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img className="signImg" src="/images/logo-04.png" />

            <Typography
              className="signTitle"
              component="h2"
              variant="h2"
              sx={{ m: 2, fontWeight: "bold" }}
            >
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                color="info"
                id="email"
                onChange={(e) => {
                  setCommentUserNotFound(["none", ""]);
                  validEmailCheck(e.target.value);
                }}
              />
              <Alert severity="error" style={{ display: commentValidEmail[0] }}>
                Email isn't valid!
              </Alert>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                color="info"
                id="password"
                onChange={(e) => {
                  setCommentUserNotFound(["none", ""]);
                  validPasswordCheck(e.target.value);
                }}
              />
              <Alert
                severity="error"
                style={{ display: commentValidPassword[0] }}
              >
                Password isn't valid!
              </Alert>
              <FormControlLabel
                control={<Checkbox value="remember" color="info" />}
                label="Remember me"
              />
              <Alert
                severity="error"
                style={{ display: commentUserNotFound[0] }}
              >
                {commentUserNotFound[1]}
              </Alert>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="primary"
                type="submit"
              >
                Sign In
              </Button>

              <Grid container>
                <Link
                  href="/signup"
                  variant="body2"
                  color="secondary"
                  style={{
                    fontSize: "1rem",
                    fontWeight: 800,
                    textAlign: "center",
                  }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://media.giphy.com/media/3o72EZplI5RBdJU17q/giphy.gif)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
    </ThemeProvider>
  );
};

export default SignIn;
// in mui - SignInSide
