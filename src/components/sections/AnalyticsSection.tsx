import React from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip, // Rename Tooltip from recharts
  Legend as RechartsLegend, // Rename Legend from recharts
  TooltipProps,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  BarController, // Import BarController
  BarElement, // Import BarElement
  Tooltip, // Import Tooltip for Chart.js
  Legend, // Import Legend for Chart.js
} from "chart.js";
import {
  valuationData,
  revenueWithMilestones,
  businessEvents,
  ownershipData,
  capitalRaisedData,
} from "@/data/brands/liquiddeath";
import { Chart as ChartJSReact } from "react-chartjs-2"; // Keep Tooltip and Legend from chart.js

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  BarController, // Register BarController
  BarElement, // Register BarElement
  Tooltip, // Register Tooltip
  Legend // Register Legend
);

// Define color palette
const colors = {
  primary: "#264653",
  secondary: "#2A9D8F",
  tertiary: "#E9C46A",
  quaternary: "#F4A261",
  quinary: "#E76F51",
};

// Custom Tooltip Component
interface CustomTooltipProps {
  active?: boolean;
  payload?:
    | { name: string; value: number | string; color: string }[]
    | undefined; // Allow undefined
  label?: string;
}

// Update the CustomTooltipProps to extend TooltipProps correctly
interface CustomTooltipProps extends TooltipProps<number | string, string> {
  active?: boolean;
  payload?:
    | { name: string; value: number | string; color: string }[]
    | undefined; // Allow undefined
}

// Update the CustomTooltip component to match the expected props
const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[rgba(17,25,40,0.95)] border border-blue-500/20 rounded-lg p-3 text-gray-100">
        <p className="font-space-mono text-sm">{label}</p>
        {payload.map((pld, index) => (
          <p key={index} className="text-sm" style={{ color: pld.color }}>
            {`${pld.name}: ${
              typeof pld.value === "number" ? pld.value.toFixed(2) : pld.value
            }`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Valuation Chart Component
interface ValuationChartProps {
  data: Array<{
    date: string;
    preMoneyValuation: number;
    postMoneyValuation: number;
  }>;
}

const ValuationChart: React.FC<ValuationChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "Post-Money Valuation",
        data: data.map((item) => item.postMoneyValuation),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderWidth: 2,
      },
      {
        label: "Pre-Money Valuation",
        data: data.map((item) => item.preMoneyValuation),
        borderColor: "#60a5fa",
        backgroundColor: "rgba(96, 165, 250, 0.2)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <ChartJSReact type="line" data={chartData} options={{ responsive: true }} />
  );
};

// Revenue Chart Component
interface RevenueChartProps {
  data: Array<{
    year: number;
    revenue: number | null;
    milestone?: string;
  }>;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.year),
    datasets: [
      {
        label: "Revenue",
        data: data.map((item) => item.revenue),
        backgroundColor: "#3b82f6",
      },
    ],
  };

  return (
    <ChartJSReact type="bar" data={chartData} options={{ responsive: true }} />
  );
};

// Ownership Chart Component
interface OwnershipChartProps {
  data: Array<{
    date: string;
    foundersOwnership: number;
    investorsOwnership: number;
  }>;
}

const OwnershipChart: React.FC<OwnershipChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "Founders Ownership",
        data: data.map((item) => item.foundersOwnership),
        borderColor: "#60a5fa",
        backgroundColor: "rgba(96, 165, 250, 0.2)",
      },
      {
        label: "Investors Ownership",
        data: data.map((item) => item.investorsOwnership),
        borderColor: "#93c5fd",
        backgroundColor: "rgba(147, 197, 253, 0.2)",
      },
    ],
  };

  return (
    <ChartJSReact type="line" data={chartData} options={{ responsive: true }} />
  );
};

// Capital Raised Chart Component
interface CapitalRaisedChartProps {
  data: Array<{
    date: string;
    cumulativeRaised: number;
  }>;
}
const CapitalRaisedChart: React.FC<CapitalRaisedChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "Cumulative Capital Raised",
        data: data.map((item) => item.cumulativeRaised),
        borderColor: "#059669",
        backgroundColor: "rgba(5, 150, 105, 0.2)",
      },
    ],
  };

  return (
    <ChartJSReact type="line" data={chartData} options={{ responsive: true }} />
  );
};

// Define the types for the props
interface AnalyticsDashboardProps {
  valuationData: Array<{
    date: string;
    preMoneyValuation: number;
    postMoneyValuation: number;
  }>;
  revenueWithMilestones: Array<{
    year: number;
    revenue: number | null;
    milestone?: string;
  }>;
  businessEvents: Array<{ year: number; category: string; event: string }>;
  ownershipData: Array<{
    date: string;
    foundersOwnership: number;
    investorsOwnership: number;
  }>;
  capitalRaisedData: Array<{ date: string; cumulativeRaised: number }>;
}

// Main Dashboard Component
function AnalyticsDashboard({
  valuationData,
  revenueWithMilestones,
  businessEvents,
  ownershipData,
  capitalRaisedData,
}: AnalyticsDashboardProps) {
  // Validate data on mount
  useEffect(() => {
    if (!valuationData.length) console.warn("Valuation data is empty.");
    if (!revenueWithMilestones.length) console.warn("Revenue data is empty.");
    if (!ownershipData.length) console.warn("Ownership data is empty.");
    if (!capitalRaisedData.length)
      console.warn("Capital raised data is empty.");
  }, [valuationData, revenueWithMilestones, ownershipData, capitalRaisedData]);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h2 className="text-[12vw] sm:text-[8vw] font-bold text-white">
          ANALYTICS
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Valuation Journey */}
          <div
            className="bg-[rgba(17,25,40,0.75)] backdrop-blur-xl border border-white/10 rounded-xl p-6 col-span-2"
            style={{ height: "400px" }}
          >
            <h2 className="font-montserrat text-xl font-bold text-white mb-1">
              Valuation Journey & Milestones
            </h2>
            <p className="font-space-mono text-sm text-blue-300/80 mb-4">
              Strategic growth trajectory
            </p>
            {valuationData.length > 0 ? (
              <ValuationChart data={valuationData} />
            ) : (
              <p>No data available for Valuation Chart.</p>
            )}
          </div>

          {/* Revenue Growth */}
          <div
            className="bg-[rgba(17,25,40,0.75)] backdrop-blur-xl border border-white/10 rounded-xl p-6"
            style={{ height: "550px" }}
          >
            <h2 className="font-montserrat text-xl font-bold text-white mb-1">
              Revenue Growth & Business Evolution
            </h2>
            <p className="font-space-mono text-sm text-blue-300/80 mb-4">
              Revenue with strategic milestones
            </p>
            {revenueWithMilestones.length > 0 ? (
              <RevenueChart data={revenueWithMilestones} />
            ) : (
              <p>No data available for Revenue Chart.</p>
            )}
            <div className="mt-4 space-y-2">
              {revenueWithMilestones.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-blue-300">
                    {item.year}
                  </Badge>
                  <span className="text-sm text-blue-200">
                    {item.milestone}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Milestones */}
          <div className="bg-[rgba(17,25,40,0.75)] backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <h2 className="font-montserrat text-xl font-bold text-white mb-1">
              Strategic Milestones
            </h2>
            <p className="font-space-mono text-sm text-blue-300/80 mb-4">
              Key business events and initiatives
            </p>
            <div className="space-y-4">
              {businessEvents.map((event, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <Badge variant="outline" className="mt-1 text-blue-300">
                    {event.year}
                  </Badge>
                  <div>
                    <p className="font-medium text-white">{event.category}</p>
                    <p className="text-sm text-blue-200">{event.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ownership Evolution */}
          <div className="bg-[rgba(17,25,40,0.75)] backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <h2 className="font-montserrat text-xl font-bold text-white mb-1">
              Ownership Evolution
            </h2>
            <p className="font-space-mono text-sm text-blue-300/80 mb-4">
              Equity distribution over time
            </p>
            {ownershipData.length > 0 ? (
              <OwnershipChart data={ownershipData} />
            ) : (
              <p>No data available for Ownership Chart.</p>
            )}
          </div>

          {/* Capital Raised */}
          <div className="bg-[rgba(17,25,40,0.75)] backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <h2 className="font-montserrat text-xl font-bold text-white mb-1">
              Cumulative Capital Raised
            </h2>
            <p className="font-space-mono text-sm text-blue-300/80 mb-4">
              Total funding over time
            </p>
            {capitalRaisedData.length > 0 ? (
              <CapitalRaisedChart data={capitalRaisedData} />
            ) : (
              <p>No data available for Capital Raised Chart.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Analytics Section Wrapper
interface AnalyticsSectionProps {
  getPageScale: (index: number) => number; // Define the type for getPageScale
}

export function AnalyticsSection({ getPageScale }: AnalyticsSectionProps) {
  return (
    <motion.div
      className="relative w-full h-screen overflow-y-auto bg-gradient-to-b from-black via-black to-[#001F3F]"
      animate={{ scale: getPageScale(0) }}
    >
      <div className="container mx-auto px-4 py-12">
        <AnalyticsDashboard
          valuationData={valuationData}
          revenueWithMilestones={revenueWithMilestones}
          businessEvents={businessEvents}
          ownershipData={ownershipData}
          capitalRaisedData={capitalRaisedData}
        />
      </div>
    </motion.div>
  );
}

export default AnalyticsSection;
