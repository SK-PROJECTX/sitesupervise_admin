"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function LineChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Revenue",
        data: [0, 2, 8, 15, 22, 27, 25, 20, 14, 8, 3, 6],
        borderColor: "rgba(99, 102, 241, 1)", // purple
        backgroundColor: "transparent",
        tension: 0.4, // smooth curve
        pointRadius: 0, // hide dots
        borderWidth: 3,
      },
      {
        label: "Expenses",
        data: [4, 5, 9, 13, 18, 21, 20, 17, 13, 9, 6, 5],
        borderColor: "rgba(248, 113, 113, 1)", // red
        backgroundColor: "transparent",
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // matches your image
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "rgba(0,0,0,0.05)",
        },
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return (
    <div className="relative h-[235px] w-full">
      <Line data={data} options={options} />
    </div>
  );
}
