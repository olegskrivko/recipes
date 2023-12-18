import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const NutritionChart = ({ nutritionData }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current && nutritionData) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");

      const labels = nutritionData.map((item) => item.name);
      const values = nutritionData.map((item) => item.amount);
      const backgroundColors = [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(153, 102, 255, 0.5)",
        "rgba(255, 159, 64, 0.5)",
      ]; // You can extend this array for more colors

      chartInstance.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Nutrition Facts",
              data: values,
              backgroundColor: backgroundColors,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }, [nutritionData]);

  return <canvas ref={chartRef} />;
};

export default NutritionChart;
