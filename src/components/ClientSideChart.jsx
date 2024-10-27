"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

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
