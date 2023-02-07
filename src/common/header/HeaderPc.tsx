import { Box, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../redux/user";

const HeaderWrapper = styled("div")(({ theme }) => ({
  borderTop: `4px solid ${theme.palette.primary.main}`,
  width: "100%",
  height: "5rem",
  boxShadow: "0 8px 20px rgb(0 0 0 / 10%)",
}));

const SignInButtonWrapper = styled("div")(({ theme }) => ({
  color: theme.palette.primary.main,
  border: `1px solid ${theme.palette.primary.main}`,
  fontWeight: 700,
  cursor: "pointer",
  fontSize: "1em",
  borderRadius: "0.5em",

  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
  },

  transition: "color 0.3s",
}));

const CreatePostButtonWrapper = styled("div")(({ theme }) => ({
  color: theme.palette.primary.main,
  border: `1px solid ${theme.palette.primary.main}`,
  fontWeight: 700,
  cursor: "pointer",
  fontSize: "1em",

  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
  },

  transition: "color 0.3s",
}));

export const HeaderPc = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.user);

  const logout = () => {
    dispatch(setUserInfo({}));
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return (
    <HeaderWrapper>
      <Box className="h-full flex justify-between items-center px-3">
        <Box>
          <Link to="/">
            <img src={Logo} alt="CoderSchool Challenge" />
          </Link>
        </Box>
        <Box>
          {userInfo.email ? (
            <Stack spacing={3} direction="row">
              <Box className="flex flex-row items-center justify-center">
                Hello, {userInfo.email} (
                <Box
                  className="text-blue-500 cursor-pointer underline"
                  onClick={logout}
                >
                  Logout
                </Box>
                )
              </Box>
              <NavLink to="/post/create">
                <CreatePostButtonWrapper className="py-2 px-5">
                  Create Post
                </CreatePostButtonWrapper>
              </NavLink>
            </Stack>
          ) : (
            <NavLink to="/signin">
              <SignInButtonWrapper className="py-2 px-5">
                Sign in
              </SignInButtonWrapper>
            </NavLink>
          )}
        </Box>
      </Box>
    </HeaderWrapper>
  );
};
