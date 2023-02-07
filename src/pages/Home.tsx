import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Stack } from "@mui/system";
import banner from "../assets/images/banner.webp";
import { SearchBox } from "../components";
import { useEffect } from "react";
import { callFetchTags } from "../apis";
import { useDispatch } from "react-redux";
import { setTags } from "../redux/main";

const BannerWrapper = styled("div")(({ theme }) => ({
  backgroundImage: `url(${banner})`,
  backgroundSize: "auto",
  height: "80vh",
  width: "100%",
  margin: "3.2em 0",
}));

const SearchFormWrapper = styled("div")(({ theme }) => ({
  width: "600px",
  borderRadius: "1rem",
  padding: "1em",

  color: theme.palette.primary.main,
  border: `5px solid ${theme.palette.secondary.main}`,
  backgroundColor: "#fff",
}));

export const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const tags = await callFetchTags();
      if (Array.isArray(tags)) {
        dispatch(setTags(tags));
      }
    } catch (error) {
      // don't need alert this error
    }
  };

  return (
    <div className="container mx-auto">
      <BannerWrapper className="flex items-center justify-center">
        <SearchFormWrapper className="search-form flex flex-row items-center justify-center">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box>Tìm kiếm bài viết</Box>
            </Grid>
            <Grid item xs={12}>
              <SearchBox />
            </Grid>
          </Grid>
        </SearchFormWrapper>
      </BannerWrapper>
    </div>
  );
};
