import Backdrop from "@mui/material/Backdrop";
import { Bars } from "react-loader-spinner";
import { useSelector } from "react-redux/es/exports";
import { RootState } from "../redux/store";

type Props = {};

export const Loading = (props: Props) => {
  const loading = useSelector((state: RootState) => state.app.loading);

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <Bars
        height="80"
        width="80"
        color="primary"
        ariaLabel="bars-loading"
        visible={true}
      />
    </Backdrop>
  );
};
