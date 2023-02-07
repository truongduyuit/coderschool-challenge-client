import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Footer, Header, Loading, Notification } from "../common";
import { useToast } from "../hooks";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { RootState } from "../redux/store";
import jwtDecode from "jwt-decode";
import { setUserInfo, UserSliceState } from "../redux/user";

export const BaseLayout = () => {
  const dispatch = useDispatch();
  const { open, message, alertType, hideToast } = useToast();
  const userInfo = useSelector((state: RootState) => state.user);

  useEffect(() => {
    checkLoggedIn();
  }, [userInfo]);

  const checkLoggedIn = () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!userInfo.userId && accessToken) {
      const data: any = jwtDecode(accessToken);
      dispatch(
        setUserInfo({
          email: data.email,
          userId: data.userId,
        })
      );
    }
  };

  return (
    <Box minHeight={"100vh"}>
      <Loading />
      <Notification
        open={open}
        message={message}
        type={alertType}
        hideToast={hideToast}
      />

      <Box minHeight={"90vh"}>
        <Header />

        <div className="">
          <Outlet />
        </div>
      </Box>

      <Footer />
    </Box>
  );
};
