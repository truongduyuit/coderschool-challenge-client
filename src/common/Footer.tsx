// @mui material components
import { Typography, Grid, Box, Stack } from "@mui/material";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export function Footer() {
  return (
    <Box component="footer" width="100%" height="100px">
      <Grid container justifyContent="center">
        <Grid item xs={12} lg={8}>
          <Stack direction="row" justifyContent="center" mt={1} mb={1}>
            <Box>
              <FacebookIcon fontSize="medium" color="info" />
            </Box>
            <Box>
              <LinkedInIcon fontSize="medium" color="info" />
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} lg={8} sx={{ textAlign: "center" }}>
          <Typography className="text-black">
            Copyright &copy; 2023 CoderSchool Challenge
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
