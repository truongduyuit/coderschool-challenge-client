import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Stack } from "@mui/system";
import banner from "../assets/images/banner.webp";
import { SearchBox } from "../components";

const BannerWrapper = styled("div")(({ theme }) => ({
  backgroundImage: `url(${banner})`,
  backgroundSize: "auto",
  height: "28.125em",
  width: "100%",
  margin: "3.2em 0",
}));

const SearchFormWrapper = styled("div")(({ theme }) => ({
  width: "600px",
  borderRadius: "1rem",
  padding: "1em",

  backgroundColor: theme.palette.primary.main,
}));

const topKeywords = ["chung", "nguyễn", "trường", "duy"];

export const HomePage = () => {
  return (
    <div className="container mx-auto">
      <BannerWrapper className="flex items-center">
        <SearchFormWrapper className="search-form">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box>Tìm kiếm bài viết</Box>
            </Grid>
            <Grid item xs={12}>
              <SearchBox />
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2}>
                <Box>Từ khóa tìm kiếm nhiều: </Box>
                {topKeywords.map((key) => {
                  return <Box key={key}>{key}</Box>;
                })}
              </Stack>
            </Grid>
          </Grid>
        </SearchFormWrapper>
      </BannerWrapper>
    </div>
  );
};
