import { Box, Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/system";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { callRegisterApi, ILoginRegisterRequest } from "../apis";
import { ErrorMessages } from "../configs";
import { useToast } from "../hooks";
import { setLoading } from "../redux/main";
import { RootState } from "../redux/store";

const SignUpWrapper = styled("div")(() => ({
  backgroundSize: "auto",
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
  confirmPassword: Yup.string().min(6).max(32).required("Password is required"),
});

export const SignUpPage = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const userInfo = useSelector((state: RootState) => state.user);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: (values) => {
      const errors: any = {};
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Password and Confirm Password must match";
      }
      return errors;
    },
    validationSchema,
    onSubmit: async (values) => {
      dispatch(setLoading(true));

      try {
        await callRegisterApi(values as ILoginRegisterRequest);

        showToast({
          alertType: "success",
          message: "Account registration was successful",
        });

        setTimeout(() => {
          navigator("/signin");
        }, 500);
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
    <SignUpWrapper>
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
              SIGN UP
            </Typography>
          </Box>

          <Stack direction="column" spacing={3}>
            <form onSubmit={formik.handleSubmit}>
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
                error={Boolean(
                  formik.touched.password && formik.errors.password
                )}
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
              <TextField
                error={Boolean(
                  formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                )}
                fullWidth
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                label="Confirm Password"
                margin="normal"
                name="confirmPassword"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.confirmPassword}
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
                  Sign up Now
                </Button>
              </Box>
            </form>
          </Stack>

          <Typography color="textSecondary" variant="body2">
            Have an account?{" "}
            <Link to="/login">
              <Box component="span" color="blue">
                Sign In
              </Box>
            </Link>
          </Typography>
        </Container>
      </Box>
    </SignUpWrapper>
  );
};
