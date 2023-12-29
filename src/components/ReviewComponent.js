import React from "react";
import ChatCard from "./ChatCard";

const ReviewComponent = () => {
  // Example review data with ratings
  const reviewData = [
    {
      avatarUrl: "url_to_avatar_1",
      senderName: "John Doe",
      message: "This recipe was amazing!",
      timestamp: "3 days ago",
      rating: 5, // Rating value for the review
    },
    {
      avatarUrl: "url_to_avatar_2",
      senderName: "Jane Smith",
      message: "I loved the taste. Highly recommended!",
      timestamp: "1 week ago",
      rating: 4, // Rating value for the review
    },
    // Add more review messages with ratings here
  ];

  return (
    <div>
      {reviewData.map((review, index) => (
        <ChatCard key={index} {...review} />
      ))}
    </div>
  );
};

export default ReviewComponent;
