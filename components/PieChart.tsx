"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ["TASK", "AR", "COMM", "OTHERS"],
    datasets: [
      {
        label: "Module Usage Distribution",
        data: [300, 50, 50, 100],
        backgroundColor: [
          "#8979FF",
          "#FF928A",
          "#3CC3DF",
          "#FFAE4C"
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
