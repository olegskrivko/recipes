import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

function HalfRating({ score }) {
  const [convertedScore, setConvertedScore] = useState(0);

  useEffect(() => {
    const roundedScore = Math.round((score / 100) * 5 * 10) / 10; // Round to one decimal place
    setConvertedScore(roundedScore);
  }, [score]);

  return (
    <div style={{ display: "flex", alignItems: "center", margin: "1rem 0" }}>
      <Stack spacing={1}>
        <Rating
          name="half-rating-read"
          value={convertedScore} // Set the health score as the value
          precision={0.1} // Set precision to one decimal place
          readOnly
        />
      </Stack>
      <div style={{ marginLeft: "0.5rem" }}>{convertedScore} (103)</div>
    </div>
  );
}

export default HalfRating;
