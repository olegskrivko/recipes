import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

function HalfRating({ score }) {
  const [convertedScore, setConvertedScore] = useState(0);

  useEffect(() => {
    // Convert the score to fit within a 5-star rating system (assuming the score is out of 100)
    // const converted = Math.round((score / 100) * 5 * 2) / 2; // Convert 100 to 5, keeping precision
    // setConvertedScore(converted);

    const convertedScore = (score / 100) * 5;
    setConvertedScore(convertedScore);
  }, [score]);

  return (
    <Stack spacing={1} sx={{ marginTop: "20px" }}>
      <Rating
        name="half-rating-read"
        value={convertedScore} // Set the health score as the value
        precision={0.5}
        readOnly
      />
    </Stack>
  );
}

export default HalfRating;
