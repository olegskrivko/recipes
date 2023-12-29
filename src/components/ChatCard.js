import React from "react";
import { Avatar, Card, CardContent, Typography, Rating } from "@mui/material";

const ChatCard = ({ avatarUrl, senderName, message, timestamp, rating }) => {
  const cardStyle = {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "16px", // You can adjust the spacing as needed
  };

  const avatarStyle = {
    marginRight: "12px", // You can adjust the spacing as needed
    marginLeft: "8px",
    marginTop: "8px", // Push avatar slightly down for better alignment
  };

  const contentStyle = {
    width: "100%", // Fill the remaining space
  };

  return (
    <Card style={cardStyle}>
      <Avatar alt={senderName} src={avatarUrl} style={avatarStyle} />
      <CardContent style={contentStyle}>
        <Typography variant="subtitle1">{senderName}</Typography>
        {rating && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <Rating value={rating} readOnly />
            <Typography
              variant="body2"
              color="textSecondary"
              style={{ marginLeft: "8px" }}
            >
              {rating}
            </Typography>
          </div>
        )}
        <Typography variant="body1" color="textSecondary">
          {message}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {timestamp}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ChatCard;
