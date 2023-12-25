// import React from "react";
// import { Chart } from "react-google-charts";

// const NutritionDonutChart = ({ nutritionData }) => {
//   // Prepare data in the required format for the donut chart
//   const chartData = nutritionData.map((item) => [item.name, item.amount]);

//   // Set options for the donut chart
//   const options = {
//     title: "Nutrition Facts",
//     pieHole: 0.4,
//     legend: "none",
//     pieSliceText: "label",
//   };

//   return (
//     <div style={{ textAlign: "center" }}>
//       <Chart
//         width={"100%"}
//         height={"300px"}
//         chartType="PieChart"
//         loader={<div>Loading Chart</div>}
//         data={[["Nutrient", "Amount"], ...chartData]}
//         options={options}
//       />
//     </div>
//   );
// };

// export default NutritionDonutChart;
import React from "react";
import Chart from "react-google-charts";

const NutritionDonutChart = ({ nutritionData }) => {
  if (!nutritionData || nutritionData.length === 0) {
    return <div>No data available</div>;
  }

  const chartData = nutritionData.map((item) => [item.name, item.amount]);

  return (
    <div style={{ textAlign: "center" }}>
      <Chart
        width={"100%"}
        height={"300px"}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[["Nutrient", "Amount"], ...chartData]}
        options={donutChartOptions} // Using exported options
      />
    </div>
  );
};

// Define the options separately
// export const donutChartOptions = {
//   title: "Nutrition Facts",
//   pieHole: 0.4,
//   legend: "none",
//   pieSliceText: "label",
// };

// Define the options separately
export const donutChartOptions = {
  //   title: "Nutrition Facts",
  pieHole: 0.3,
  legend: { position: "right" }, // Positioning the legend on the right side
  pieSliceText: "none", // Show only the value in the pie slice
  slices: [
    // Customize slices if needed
    { color: "#AF9881" },
    { color: "#DCC9B0" },
    { color: "#DE9445" },
    { color: "#8C5E2F" },
    { color: "#2E7494" },
    { color: "#AF9881" },
    { color: "#D3BEA4" },
    { color: "#C48848" },
    { color: "#366374" },
    { color: "#BA9569" },
  ],
  tooltip: {
    text: "value", // Show the value of each slice in the tooltip
    textStyle: {
      fontName: "Arial",
      fontSize: 12,
    },
  },
  pieStartAngle: 100, // Set the starting angle of the pie slices
  pieSliceTextStyle: {
    color: "black",
    fontName: "Arial",
    fontSize: 14,
  },
  //   annotations: {
  //     alwaysOutside: true,
  //     textStyle: {
  //       fontName: "Arial",
  //       fontSize: 12,
  //       auraColor: "none",
  //     },
  //   },
};

export default NutritionDonutChart;
