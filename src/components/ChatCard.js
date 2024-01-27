import React from "react";
import { Avatar, Card, CardContent, Typography, Chip, Rating } from "@mui/material";
import { green } from "@mui/material/colors";
const ChatCard = ({ avatarUrl, senderName, message, timestamp, rating, ratings }) => {
  const cardStyle = {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "16px", // You can adjust the spacing as needed
    textAlign: "justify",
  };
  const chipStyleRating = {
    margin: "8px 8px 0 0",
    backgroundColor: "#424242", // Dark color
    color: "#ffffff", // White text
  };
  const chipStyle = {
    marginLeft: "8px",
    //backgroundColor: "#424242", // Dark color
    color: "#ffffff", // White text
    backgroundColor: green[500],
  };

  const avatarStyle = {
    marginRight: "12px", // You can adjust the spacing as needed
    marginLeft: "8px",
    marginTop: "8px", // Push avatar slightly down for better alignment
  };

  const contentStyle = {
    width: "100%", // Fill the remaining space
  };
  const ratingsContainerStyle = {
    display: "flex",
    flexDirection: "row", // Display chips in a row
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start",
    // marginLeft: "auto",
    width: "100%", // Take the full width
    //paddingRight: "1rem",
    //backgroundColor: "#212121", // Dark background color
    //padding: "1rem",
    paddingTop: "1rem",
    borderRadius: "8px",
    color: "#ffffff", // White text
    marginTop: "8px", // Adjust the spacing from the message
  };

  const fakeRatings = {
    overall: 4.5,
    taste: 4,
    accuracy: 4.5,
    originality: 3.8,
    visualAppeal: 4,
    ingredients: 4.2,
  };

  return (
    <Card style={cardStyle}>
      <Avatar alt={senderName} src={avatarUrl} style={avatarStyle} />

      <CardContent style={contentStyle}>
        {/* <Typography
          variant="subtitle1"
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          {senderName} <Chip size="small" secondary label="Recipe Wizard" style={chipStyle} color="primary" />
        </Typography> */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <Typography variant="subtitle1" style={{ display: "flex" }}>
            {senderName}
          </Typography>
          <Chip secondary label="Recipe Wizard" style={chipStyle} color="primary" />
        </div>

        <Typography variant="body1" color="textSecondary">
          {message}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {timestamp}
        </Typography>
        {fakeRatings && (
          <div style={ratingsContainerStyle}>
            <Chip size="small" label={`Taste: ${fakeRatings.taste}`} style={chipStyleRating} />
            <Chip size="small" label={`Accuracy: ${fakeRatings.accuracy}`} style={chipStyleRating} />
            <Chip size="small" label={`Originality: ${fakeRatings.originality}`} style={chipStyleRating} />
            <Chip size="small" label={`Visual Appeal: ${fakeRatings.visualAppeal}`} style={chipStyleRating} />
            <Chip size="small" label={`Ingredients: ${fakeRatings.ingredients}`} style={chipStyleRating} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChatCard;

// Culinary Connoisseur
// Master of the Meal
// Epicurean Explorer
// Flavor Alchemist
// Gourmet Guru
// Pan Pioneer
// Sauté Sorcerer
// Knife Ninja
// Recipe Wizard
// Grill Grandmaster
// Simmering Superstar
// Wok Warrior
// Kitchen Maestro
// Culinary Picasso
// Spice Sage
// Taste Trailblazer
// Cooking Virtuoso
// Flavorful Fantastico
// Dish Dynamo
// Sizzling Sensation
