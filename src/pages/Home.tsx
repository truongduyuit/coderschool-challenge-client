import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { callFetchTags } from "../apis";
import banner from "../assets/images/banner.webp";
import { ListPost, SearchBox } from "../components";
import { setTags } from "../redux/main";

const BannerWrapper = styled("div")(({ theme }) => ({
  backgroundImage: `url(${banner})`,
  backgroundSize: "auto",
  height: "30vh",
  width: "100%",
  marginTop: "3.2em",
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
  const [keywords, setKeywords] = useState<string[]>([]);

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
              <Box>Article Search</Box>
            </Grid>
            <Grid item xs={12}>
              <SearchBox />
            </Grid>
          </Grid>
        </SearchFormWrapper>
      </BannerWrapper>

      <Box>
        <ListPost />
      </Box>
    </div>
  );
};
