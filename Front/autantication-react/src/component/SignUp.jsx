import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Services
import connection from "../services/connect.service";

// bootstrap
import Form from "react-bootstrap/Form";

// design imports - by mui
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// additional mui - to side layout
import Paper from "@mui/material/Paper";

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
      main: "#06bebf",
    },
    secondary: {
      main: "#fb485c",
    },
  },
});

const SignUp = () => {
  // const for svae the usre's answer
  const [name, setName] = useState("");
  // Name alert display style, Name valid correct status
  const [commentValidName, setCommentValidName] = useState(["none", false]);

  const [email, setEmail] = useState("");
  // Email alert display style, Email valid correct status
  const [commentValidEmail, setCommentValidEmail] = useState(["none", false]);

  const [phone, setPhone] = useState("");
  // Phone alert display style, Phone valid correct status
  const [commentValidPhone, setCommentValidPhone] = useState(["none", false]);

  const [password, setPassword] = useState("");
  // Password alert display style, Password valid correct status
  const [commentValidPassword, setCommentValidPassword] = useState([
    "none",
    false,
  ]);

  const [commentServerErorr, setCommentServerErorr] = useState(["none", ""]);

  // to enable navigation in the component
  const navigate = useNavigate();

  //function that valid the name structure
  const validNameCheck = (name) => {
    setName(name);
    !name
      ? setCommentValidName(["", false])
      : setCommentValidName(["none", true]);
  };

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

  //function that valid the phone structure
  const validPhoneCheck = (phone) => {
    setPhone(phone);
    if (phone) {
      // isreali number - start with 05, until 10 char
      const regex =
        /^(?:(?:(\+?972|\(\+?972\)|\+?\(972\))(?:\s|\.|-)?([1-9]\d?))|(0[23489]{1})|(0[57]{1}[0-9]))(?:\s|\.|-)?([^0\D]{1}\d{2}(?:\s|\.|-)?\d{4})$/gm;
      const valid = regex.test(phone);
      valid
        ? setCommentValidPhone(["none", true])
        : setCommentValidPhone(["", false]);
    }
  };

  //function that valid the password structure
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

  // function that make the sign up action
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(`name: ${name}`,`email: ${email}`,`phone: ${phone}`,`password: ${password}`);
    // console.log(`commentValidEmail[1]: ${commentValidEmail[1]}`,`commentValidEmail[1]: ${commentValidEmail[1]}`,`commentValidPhone[1]: ${commentValidPhone[1]}`,`commentValidPassword[1]: ${commentValidPassword[1]}`);
    (!commentValidEmail[1] ||
      !commentValidEmail[1] ||
      !commentValidPhone[1] ||
      !commentValidPassword[1]) &&
      setCommentServerErorr(["", "Every field must have value"]);

    commentValidEmail[1] &&
      commentValidEmail[1] &&
      commentValidPhone[1] &&
      commentValidPassword[1] &&
      connection
        .signUp(name, email, phone, password)
        .then((res) => {
          // alert("Registration Succeeded");
          navigate("/signin");
        })
        .catch((err) => {
          setCommentServerErorr(["", err.response.data.message]);
        });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Container component="main">
            <Box
              sx={{
                my: 8,
                mx: 5.5,
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
                Sign Up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      fullWidth
                      id="Full Name"
                      label="Full Name"
                      name="fullName"
                      autoComplete="name"
                      color="info"
                      onChange={(e) => validNameCheck(e.target.value)}
                    />
                    <Alert
                      severity="error"
                      style={{ display: commentValidName[0] }}
                    >
                      Name is empty!{" "}
                    </Alert>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      color="info"
                      onChange={(e) => validEmailCheck(e.target.value)}
                    />
                    <Alert
                      severity="error"
                      style={{ display: commentValidEmail[0] }}
                    >
                      Mail isn't valid!
                    </Alert>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="phone"
                      label="Phone Number"
                      name="phone"
                      autoComplete="phone"
                      color="info"
                      onChange={(e) => validPhoneCheck(e.target.value)}
                    />
                    <Alert
                      severity="error"
                      style={{ display: commentValidPhone[0] }}
                    >
                      Phone isn't valid!
                    </Alert>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      color="info"
                      onChange={(e) => validPasswordCheck(e.target.value)}
                    />
                    <Alert
                      severity="error"
                      style={{ display: commentValidPassword[0] }}
                    >
                      Password isn't valid - Should contain at least 8 char:
                      digits and at least one lower&upper case char!
                    </Alert>
                  </Grid>
                  <Grid item xs={12}>
                    <Alert
                      severity="error"
                      style={{ display: commentServerErorr[0] }}
                    >
                      {commentServerErorr[1]}{" "}
                    </Alert>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  color="secondary"
                  type="submit"
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex">
                  <Grid item>
                    <Link
                      href="/signin"
                      variant="body2"
                      style={{
                        fontSize: "1rem",
                        fontWeight: 800,
                        textAlign: "center",
                      }}
                    >
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://media.giphy.com/media/l0IyoqulCpw5YqTGE/giphy.gif)",
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
export default SignUp;
