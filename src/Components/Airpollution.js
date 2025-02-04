import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import './Airpollution.css'
// Register chart elements
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AirPollutionChart = ({LAT,LON,API_KEY}) => {
  const [pollutionData, setPollutionData] = useState(null);

  useEffect(() => {
    fetch(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${LAT}&lon=${LON}&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setPollutionData(data.list[0].components);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [LAT,LON]);

  if (!pollutionData) return <p>Loading air pollution data...</p>;

  // Extract pollutants
  const labels = ["CO", "NO", "NO2", "O3", "SO2", "PM2.5", "PM10", "NH3"];
  const values = [
    pollutionData.co,
    pollutionData.no,
    pollutionData.no2,
    pollutionData.o3,
    pollutionData.so2,
    pollutionData.pm2_5,
    pollutionData.pm10,
    pollutionData.nh3,
  ];

  // Chart Data
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Pollutant Concentration (µg/m³)",
        data: values,
        backgroundColor: [
          "#FF5733", "#33FF57", "#3357FF", "#F39C12", "#9B59B6", "#E74C3C", "#1ABC9C", "#34495E"
        ],
        borderColor: "#000",
        borderWidth: 1,
      },
    ],
  };

  // Chart Options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#fff", // Change legend text color
          font: {
            size: 18,
            family: "Ubuntu Condensed",
          },
        },
      },
      title: {
        display: true,
        text: "Air Pollution Levels (µg/m³)",
        color: "azure",
        font: {
          size: 30,
          family: "Ubuntu Condensed",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff", // X-axis labels color
          font: { size: 15, family: "Ubuntu Condensed", },
          
        },
        grid: {
          color: 'transparent', // X-axis grid lines
        },
      },
      y: {
        ticks: {
          color: "#ffffff", // Y-axis labels color
          font: { size: 15, family: "Ubuntu Condensed", },
        },
        grid: {
            color: 'transparent', // Y-axis grid lines
        },
      },
    },
    elements: {
      bar: {
        borderWidth: 2,
        borderRadius: 8, // Rounded corners for bars
      },
    },
  };
  

  return (
    <div className="air_pollution">
      <Bar className="air_pollution_bar" data={chartData} options={chartOptions} />
    </div>
  );
};

export default AirPollutionChart;
