import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import InstagramIcon from "@mui/icons-material/Instagram";

const ShareButtons = () => {
  const shareFacebook = () => {
    window.open("https://www.facebook.com/sharer/sharer.php?u=#", "_blank");
  };

  const shareTwitter = () => {
    window.open("https://twitter.com/intent/tweet?url=#", "_blank");
  };

  const sharePinterest = () => {
    window.open("https://www.pinterest.com/pin/create/button/?url=#", "_blank");
  };

  const shareInstagram = () => {
    // Your Instagram share logic here
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={12} lg={12} sx={{ margin: "20px 0" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "600",
            paddingBottom: "0",
            marginBottom: "0",
          }}
        >
          Making this recipe? Let me know!
        </Typography>
        <Grid
          container
          spacing={2}
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={shareFacebook}
              size="small"
              startIcon={<FacebookIcon />}
            >
              Share on Facebook
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="info"
              onClick={shareTwitter}
              size="small"
              startIcon={<TwitterIcon />}
            >
              Share on Twitter
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="warning"
              onClick={sharePinterest}
              size="small"
              startIcon={<PinterestIcon />}
            >
              Share on Pinterest
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={shareInstagram}
              size="small"
              startIcon={<InstagramIcon />}
            >
              Share on Instagram
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ShareButtons;
