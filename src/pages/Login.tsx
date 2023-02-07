import { Box, Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { callLoginApi } from "../apis";
import { ErrorMessages } from "../configs";
import { useToast } from "../hooks";
import { setLoading } from "../redux/main";
import { RootState } from "../redux/store";
import { setUserInfo } from "../redux/user";

const LoginFormWrapper = styled("div")(({ theme }) => ({
  height: "28.125em",
  width: "100%",
  margin: "3.2em 0",
}));

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),

  password: Yup.string().min(6).max(32).required("Password is required"),
});

export const LoginPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get("redirect");

  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const userInfo = useSelector((state: RootState) => state.user);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async ({ email, password }) => {
      dispatch(setLoading(true));

      try {
        const { accessToken, refreshToken } = await callLoginApi({
          email,
          password,
        });

        // update user information to redux
        dispatch(
          setUserInfo({
            email,
          })
        );

        // save token to local storage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        showToast({
          alertType: "success",
          message: "Logged in successfully",
        });

        if (redirect) {
          navigator(redirect);
        }
      } catch (error: any) {
        showToast({
          alertType: "error",
          message: ErrorMessages[error.response.data.code as string],
        });
      } finally {
        dispatch(setLoading(false));
      }
    },
  });

  useEffect(() => {
    if (userInfo.userId) {
      setTimeout(() => {
        navigator("/");
      }, 200);
    }
  }, [userInfo]);

  return (
    <LoginFormWrapper>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                pb: 1,
                pt: 3,
              }}
            >
              <Typography
                align="center"
                color="primary"
                variant="h3"
                className="text-bold"
              >
                SIGN IN
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={!formik.dirty || !formik.isValid}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign In Now
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Don&apos;t have an account?{" "}
              <Link to="/signup">
                <Box component="span" color="blue">
                  Sign Up
                </Box>
              </Link>
            </Typography>
          </form>
        </Container>
      </Box>
    </LoginFormWrapper>
  );
};
