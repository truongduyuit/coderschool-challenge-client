import SearchIcon from "@mui/icons-material/Search";
import { InputBase } from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

type Props = {};

export const SearchBox = (props: Props) => {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Nhập từ khóa..."
        inputProps={{ "aria-label": "search" }}
      />
      <ButtonSearchWrapper className="right-0 w-32" variant="outlined">
        Tìm kiếm
      </ButtonSearchWrapper>
    </Search>
  );
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "0.5rem",
  height: "3rem",
  // "&:hover": {
  //   backgroundColor: alpha(theme.palette.secondary.main, 0.25),
  // },
  color: "gray",
  backgroundColor: "#fff",
  display: "flex",
  justifyContent: "space-between",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",

  "& .MuiInputBase-input": {
    padding: theme.spacing(1),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));

const ButtonSearchWrapper = styled(Button)(({ theme }) => ({
  width: "165px",
  backgroundColor: theme.palette.primary.main,
  color: "#fff",

  "&:hover": {
    color: theme.palette.primary.main,
  },
  marginRight: "0.75rem",
  marginTop: "0.25rem",
  marginBottom: "0.25rem",
  borderRadius: "0.35rem",
}));
