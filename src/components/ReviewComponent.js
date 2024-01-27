import React from "react";
import ChatCard from "./ChatCard";

const ReviewComponent = () => {
  // Example review data with ratings
  const reviewData = [
    {
      avatarUrl: "url_to_avatar_1",
      senderName: "John Doe",
      message: "This recipe was absolutely delicious! The combination of flavors was perfect, and the presentation was top-notch. I loved how easy it was to follow the instructions, and the end result exceeded my expectations. It quickly became a family favorite, and I'll be sharing it with friends. I highly recommend trying this recipe. Can't wait to explore more recipes from this chef!",
      timestamp: "3 days ago",
      rating: 5, // Rating value for the review
    },
    {
      avatarUrl: "url_to_avatar_2",
      senderName: "Jane Smith",
      message: "I thoroughly enjoyed preparing and savoring this dish. The taste and texture were superb, and the visual appeal was impressive. The step-by-step instructions made the cooking process a breeze, even for someone like me who is not an expert chef. I appreciate the creativity and effort put into creating this recipe. Looking forward to trying more recipes from this talented chef!",
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
