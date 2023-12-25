import Grid from "@mui/material/Grid";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
// import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Link } from "react-router-dom";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import Collapse from "@mui/material/Collapse";

import { Button, Chip } from "@mui/material";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeCard({ recipe }) {
  console.log(recipe);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // export default function RecipeReviewCard() {
  //   const [expanded, setExpanded] = React.useState(false);

  //   const handleExpandClick = () => {
  //     setExpanded(!expanded);
  //   };

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={4}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Card sx={{ maxWidth: 345, background: "#F3F1EF" }}>
        <CardContent>
          <Typography
            variant="body1"
            sx={{
              // fontSize: "0.9rem",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              fontWeight: "600",
            }}
          >
            <Link
              to={`/recipes/${recipe.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {recipe.title}
            </Link>
          </Typography>
        </CardContent>
        {/* <CardContent
          sx={{
            display: "flex",
            
            alignItems: "center",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              width: "100%", // Ensures proper width for ellipsis,
              textOverflow: "ellipsis",
            }}
          >
            {recipe.title}
          </Typography>
          <CardActions disableSpacing>
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          </CardActions>
        </CardContent> */}

        <CardMedia
          component="img"
          image={recipe.image}
          alt={recipe.title}
          sx={{
            width: "100%", // Take up full width
            height: "auto", // Automatically adjust height to maintain aspect ratio
            display: "block", // Center the image within the container
            objectFit: "cover", // Maintain aspect ratio and cover entire area
          }}
        />

        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>

          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <AccessTimeIcon color="action" sx={{ mr: 1 }} />
            <Typography color="gray" sx={{ marginRight: "1rem" }}>
              {recipe.readyInMinutes} mins
            </Typography>

            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              {/* <MoreVertIcon /> */}
              <ExpandMoreIcon />
            </ExpandMore>
          </div>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="h6" paragraph>
              Ingredients:
            </Typography>
            <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
              {recipe?.extendedIngredients?.map((item, index) => (
                <li
                  key={index}
                  style={{
                    fontSize: "0.9rem",
                    textAlign: "left",
                    marginLeft: "0",
                  }}
                >
                  {item.original}
                </li>
              ))}
            </ul>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
}
