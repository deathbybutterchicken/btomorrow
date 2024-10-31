"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { BarChart } from "recharts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

const ClientSideChart = ({ data }) => {
  return (
    <BarChart
      width={1000}
      height={500}
      data={data}
      margin={{ top: 20, right: 30 }}
    >
      {/* Your existing chart components */}
    </BarChart>
  );
};

export default ClientSideChart;
