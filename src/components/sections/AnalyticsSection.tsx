import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import ReactApexChart from "react-apexcharts";
import { ResponsiveHeatMap } from "@nivo/heatmap";
import { AreaChart } from "@visx/shape";
import { Group } from "@visx/group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Define color palette
const colors = {
  primary: "#264653",
  secondary: "#2A9D8F",
  tertiary: "#E9C46A",
  quaternary: "#F4A261",
  quinary: "#E76F51",
};

const ownershipData = [
  { date: "2019-07-17", foundersOwnership: 70.87, investorsOwnership: 29.13 },
  { date: "2020-02-20", foundersOwnership: 54.27, investorsOwnership: 45.73 },
  { date: "2020-09-30", foundersOwnership: 41.43, investorsOwnership: 58.57 },
  { date: "2021-05-15", foundersOwnership: 40.03, investorsOwnership: 59.97 },
  { date: "2022-01-03", foundersOwnership: 32.66, investorsOwnership: 67.34 },
  { date: "2022-10-03", foundersOwnership: 33.29, investorsOwnership: 66.71 },
  { date: "2023-05-11", foundersOwnership: 31.95, investorsOwnership: 68.05 },
];

const investorParticipation = [
  {
    investor: "Science",
    "Deal  #1": 1,
    "Deal #2": 1,
    "Deal #3": 0,
    "Deal #6": 0,
    "Deal #7": 1,
    "Deal #8": 1,
    "Deal #9": 0,
    "Deal #12": 0,
  },
  {
    investor: "Velvet Sea Ventures",
    "Deal #1": 0,
    "Deal #2": 1,
    "Deal #3": 1,
    "Deal #6": 0,
    "Deal #7": 0,
    "Deal #8": 0,
    "Deal #9": 0,
    "Deal #12": 0,
  },
  {
    investor: "Convivialité Ventures",
    "Deal #1": 0,
    "Deal #2": 0,
    "Deal #3": 1,
    "Deal #6": 0,
    "Deal #7": 0,
    "Deal #8": 1,
    "Deal #9": 0,
    "Deal #12": 0,
  },
  {
    investor: "Live Nation Entertainment",
    "Deal #1": 0,
    "Deal #2": 0,
    "Deal #3": 0,
    "Deal #6": 1,
    "Deal #7": 1,
    "Deal #8": 1,
    "Deal #9": 0,
    "Deal #12": 1,
  },
  {
    investor: "Michael Dubin",
    "Deal #1": 1,
    "Deal #2": 0,
    "Deal #3": 0,
    "Deal #6": 1,
    "Deal #7": 0,
    "Deal #8": 0,
    "Deal #9": 0,
    "Deal #12": 0,
  },
];

const valuationData = [
  { date: "2019-07-17", preMoneyValuation: 4.37, postMoneyValuation: 6.16 },
  { date: "2020-02-20", preMoneyValuation: 30.7, postMoneyValuation: 38.38 },
  { date: "2020-09-30", preMoneyValuation: 63.27, postMoneyValuation: 81.02 },
  { date: "2021-05-15", preMoneyValuation: 110.59, postMoneyValuation: 117.77 },
  { date: "2022-01-03", preMoneyValuation: 367.01, postMoneyValuation: 423.3 },
  { date: "2022-10-03", preMoneyValuation: 588.6, postMoneyValuation: 650.56 },
  { date: "2023-05-11", preMoneyValuation: 843.56, postMoneyValuation: 904.79 },
  { date: "2024-03-11", preMoneyValuation: 1050.0, postMoneyValuation: 1100.0 },
];

const revenueData = [
  { year: 2019, revenue: 2.351 },
  { year: 2020, revenue: null },
  { year: 2021, revenue: 32.724 },
  { year: 2022, revenue: 105.479 },
  { year: 2023, revenue: 209.165 },
];

const capitalRaisedData = [
  { date: "2019-07-17", cumulativeRaised: 1.79 },
  { date: "2020-02-20", cumulativeRaised: 9.47 },
  { date: "2020-09-30", cumulativeRaised: 27.22 },
  { date: "2021-03-29", cumulativeRaised: 32.26 },
  { date: "2021-05-15", cumulativeRaised: 39.44 },
  { date: "2022-01-03", cumulativeRaised: 95.73 },
  { date: "2022-10-03", cumulativeRaised: 157.69 },
  { date: "2023-05-11", cumulativeRaised: 218.92 },
  { date: "2023-07-12", cumulativeRaised: 218.92 },
  { date: "2024-03-11", cumulativeRaised: 271.91 },
];

function AnalyticsDashboard() {
  console.log("[AnalyticsDashboard] Component rendering");
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  // Define toggleExpand before renderCard
  const toggleExpand = useCallback(
    (index: number) => {
      console.log("[toggleExpand] Card clicked:", {
        index,
        previousExpandedCard: expandedCard,
        newExpandedCard: expandedCard === index ? null : index,
      });
      setExpandedCard(expandedCard === index ? null : index);
    },
    [expandedCard]
  );

  // Capital Raised Chart (Chart.js)
  const capitalRaisedConfig = {
    data: {
      labels: capitalRaisedData.map((d) => d.date),
      datasets: [
        {
          label: "Cumulative Raised",
          data: capitalRaisedData.map((d) => d.cumulativeRaised),
          borderColor: colors.secondary,
          backgroundColor: colors.secondary + "20",
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: "#888888" },
        },
      },
      scales: {
        x: {
          type: "category",
          grid: {
            color: "#444",
          },
          ticks: { color: "#888888" },
        },
        y: {
          type: "linear",
          grid: {
            color: "#444",
          },
          ticks: { color: "#888888" },
        },
      },
    },
  };

  // Valuation Chart (Chart.js)
  const valuationConfig = {
    data: {
      labels: valuationData.map((d) => d.date),
      datasets: [
        {
          label: "Pre-Money Valuation",
          data: valuationData.map((d) => d.preMoneyValuation),
          borderColor: colors.tertiary,
          backgroundColor: colors.tertiary + "20",
          fill: true,
          tension: 0.4,
        },
        {
          label: "Post-Money Valuation",
          data: valuationData.map((d) => d.postMoneyValuation),
          borderColor: colors.quaternary,
          backgroundColor: colors.quaternary + "20",
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: "#888888" },
        },
      },
      scales: {
        x: {
          type: "category",
          grid: {
            color: "#444",
          },
          ticks: { color: "#888888" },
        },
        y: {
          type: "linear",
          grid: {
            color: "#444",
          },
          ticks: { color: "#888888" },
        },
      },
    },
  };

  // Revenue Chart (ApexCharts)
  const revenueConfig = {
    series: [
      {
        name: "Revenue",
        data: revenueData.map((d) => d.revenue),
      },
    ],
    options: {
      chart: {
        type: "bar",
        background: "transparent",
        toolbar: {
          show: false,
        },
      },
      colors: [colors.quinary],
      grid: {
        borderColor: "#444",
        xaxis: {
          lines: { show: true },
        },
      },
      xaxis: {
        categories: revenueData.map((d) => d.year.toString()),
        labels: {
          style: {
            colors: "#888888",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#888888",
          },
        },
      },
      tooltip: {
        theme: "dark",
      },
    },
  };

  // Ownership Chart (Area Chart)
  const ownershipConfig = {
    data: {
      labels: ownershipData.map((d) => d.date),
      datasets: [
        {
          label: "Founders Ownership",
          data: ownershipData.map((d) => d.foundersOwnership),
          backgroundColor: colors.primary,
          borderColor: colors.primary,
          fill: true,
          tension: 0.4,
        },
        {
          label: "Investors Ownership",
          data: ownershipData.map((d) => d.investorsOwnership),
          backgroundColor: colors.secondary,
          borderColor: colors.secondary,
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: "#888888" },
        },
      },
      scales: {
        x: {
          grid: {
            color: "#444",
          },
          ticks: { color: "#888888" },
        },
        y: {
          grid: {
            color: "#444",
          },
          ticks: { color: "#888888" },
        },
      },
    },
  };

  // Transform investor data for heatmap
  const heatmapData = investorParticipation.map((inv) => ({
    id: inv.investor,
    data: Object.entries(inv)
      .filter(([key]) => key.includes("Deal"))
      .map(([key, value]) => ({
        x: key,
        y: value,
      })),
  }));

  // Memoize the chart container
  const ChartContainer = useMemo(
    () =>
      ({ children }: { children: React.ReactNode }) =>
        (
          <div
            className="w-full h-full relative"
            style={{ minHeight: "300px", height: "300px" }}
          >
            {dimensions.width > 0 && dimensions.height > 0 ? (
              <div className="absolute inset-0">{children}</div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="text-gray-400">Loading chart...</span>
              </div>
            )}
          </div>
        ),
    [dimensions]
  );

  // Now define renderCard after its dependencies
  const renderCard = useCallback(
    (
      index: number,
      title: string,
      description: string,
      content: React.ReactNode
    ) => {
      const isExpanded = expandedCard === index;
      console.log("[renderCard]", {
        index,
        title,
        isExpanded,
        dimensions,
      });

      return (
        <Card
          className={`bg-white/10 backdrop-blur-lg border-gray-700 cursor-pointer transition-all duration-300 ease-in-out ${
            isExpanded ? "md:col-span-2 md:row-span-2" : ""
          }`}
          onClick={() => toggleExpand(index)}
        >
          <CardHeader>
            <CardTitle className="text-white">{title}</CardTitle>
            <CardDescription className="text-gray-400">
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] w-full">
            <ChartContainer>{content}</ChartContainer>
          </CardContent>
        </Card>
      );
    },
    [expandedCard, dimensions, ChartContainer, toggleExpand]
  );

  useEffect(() => {
    console.log("[useEffect] Setting up ResizeObserver");
    const container = chartContainerRef.current;
    if (!container) {
      console.warn("[useEffect] Container ref is null");
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
        console.log("[ResizeObserver] Container resized:", {
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    resizeObserver.observe(container);
    console.log("[useEffect] ResizeObserver started observing");

    return () => {
      console.log("[useEffect] Cleanup - disconnecting ResizeObserver");
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={chartContainerRef}
      className="min-h-screen p-8"
      onResize={() => {
        console.log("[MainContainer] Resize detected", {
          width: chartContainerRef.current?.clientWidth,
          height: chartContainerRef.current?.clientHeight,
        });
      }}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        <h2 className="text-[12vw] sm:text-[8vw] font-bold text-white">
          ANALYTICS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {renderCard(
            0,
            "Capital Raised Over Time",
            "Cumulative funds raised in millions GBP",
            <Line {...capitalRaisedConfig} />
          )}

          {renderCard(
            1,
            "Revenue Growth",
            "Annual revenue in millions GBP",
            <ReactApexChart
              options={revenueConfig.options}
              series={revenueConfig.series}
              type="bar"
              height={300}
            />
          )}

          {renderCard(
            2,
            "Ownership Dilution",
            "Founders vs Investors ownership percentage",
            <ResponsiveHeatMap
              data={heatmapData}
              margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
              colors={{
                type: "sequential",
                scheme: "blues",
              }}
              axisTop={null}
              axisRight={null}
            />
          )}
        </div>
      </div>

      <style jsx global>{`
        .recharts-wrapper {
          position: relative !important;
          width: 100% !important;
          height: 100% !important;
        }
      `}</style>
    </div>
  );
}

interface AnalyticsSectionProps {
  getPageScale: (index: number) => number;
}

export function AnalyticsSection({ getPageScale }: AnalyticsSectionProps) {
  console.log("[AnalyticsSection] Rendering with scale:", getPageScale(0));
  return (
    <motion.div
      className="relative w-full h-screen overflow-y-auto bg-gradient-to-b from-black via-black to-[#001F3F] p-6"
      animate={{ scale: getPageScale(0) }}
      onAnimationStart={() =>
        console.log("[AnalyticsSection] Animation started")
      }
      onAnimationComplete={() =>
        console.log("[AnalyticsSection] Animation completed")
      }
    >
      <div className="container mx-auto px-4 py-12">
        <AnalyticsDashboard />
      </div>
    </motion.div>
  );
}
