"use client";

import dynamic from "next/dynamic";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  BarController,
  BarElement,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";
import { Chart as ChartJSReact } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NavBar } from "./ui/nav-bar";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  BarController,
  BarElement,
  Tooltip,
  Legend
);

// Dynamically import components with SSR disabled
const Timeline = dynamic(() => import("./Timeline"), { ssr: false });
const Heatmap = dynamic(() => import("./Heatmap").then((mod) => mod.default), {
  ssr: false,
});

// Data structures
interface ActivityData {
  activity: string;
  [key: string]: string | number;
}

interface TimelineStage {
  stage: string;
  activities: string[];
}

const timelineData: Record<string, string[]> = {
  "Seed Stage": [
    "Product Development & Launch",
    "Initial Funding Secured",
    "Local Market Entry",
    "Launched DTC Platform",
    "Social Media Marketing",
  ],
  "Series A": [
    "Brand Building",
    "Product Line Expansion",
    "Retail Partnerships",
    "Increased Funding",
    "Expanded Social Media Efforts",
  ],
  "Series B": [
    "Marketing Amplification",
    "Celebrity Involvement",
    "National Distribution",
    "Secured Larger Funding Rounds",
  ],
  "Series C": [
    "Product Diversification",
    "International Expansion",
    "High-Profile Collaborations",
    "Large-Scale Marketing Campaigns",
  ],
  "Series D and Beyond": [
    "Market Dominance",
    "Corporate Responsibility Initiatives",
    "Continued Innovation",
    "Global Presence",
  ],
};

const revenueData = [
  {
    year: "Y0",
    "Liquid Death": 2.8,
    "Poppi": 0.852,
    "De La Calle": 0,
    "Athletic Brewing": 0.5,
    "Biolyte": 0.157
  },
  {
    year: "Y1",
    "Liquid Death": 5,
    "Poppi": 2.8,
    "De La Calle": 0,
    "Athletic Brewing": 2.5,
    "Biolyte": 1
  },
  {
    year: "Y2",
    "Liquid Death": 10,
    "Poppi": 8.6,
    "De La Calle": 15,
    "Athletic Brewing": 15,
    "Biolyte": 5
  },
  {
    year: "Y3",
    "Liquid Death": 130,
    "Poppi": 31,
    "De La Calle": 61,
    "Athletic Brewing": 37,
    "Biolyte": 25
  },
  {
    year: "Y4",
    "Liquid Death": 263,
    "Poppi": 100,
    "Athletic Brewing": 74,
    "Biolyte": 100
  },
  {
    year: "Y5",
    "Poppi": 500,
    "Biolyte": 250
  }
];

const retailData = [
  {
    year: "Y0",
    "Liquid Death": 0,
    "Poppi": 0,
    "De La Calle": 2000
  },
  {
    year: "Y1",
    "Liquid Death": 1000,
    "Poppi": 1800,
    "De La Calle": 2000
  },
  {
    year: "Y2",
    "Liquid Death": 15000,
    "Poppi": 6000,
    "De La Calle": 12000
  },
  {
    year: "Y3",
    "Liquid Death": 60000,
    "Poppi": 23000,
    "De La Calle": 27000
  },
  {
    year: "Y4",
    "Liquid Death": 65000,
    "Poppi": 35000
  },
  {
    year: "Y5",
    "Poppi": 58000
  }
];

const growthData = [
  {
    stage: "Y0-Y1",
    "Liquid Death": 78.6,
    "Poppi": 228.6,
    "Athletic Brewing": 400,
    "Biolyte": 536.9
  },
  {
    stage: "Y1-Y2",
    "Liquid Death": 100,
    "Poppi": 207.1,
    "Athletic Brewing": 500,
    "Biolyte": 400
  },
  {
    stage: "Y2-Y3",
    "Liquid Death": 1200,
    "Poppi": 260.5,
    "De La Calle": 306.7,
    "Athletic Brewing": 146.7,
    "Biolyte": 400
  },
  {
    stage: "Y3-Y4",
    "Liquid Death": 102.3,
    "Poppi": 222.6,
    "Athletic Brewing": 100,
    "Biolyte": 300
  },
  {
    stage: "Y4-Y5",
    "Poppi": 400,
    "Biolyte": 150
  }
];

// Add this type definition at the top of the file with other interfaces
interface TooltipContext {
  raw: number;
}

function Summary() {
  // Update the selectedCell state interface to include brands
  const [selectedCell, setSelectedCell] = useState<{
    activity: string;
    stage: string;
    value: number;
    brands: { name: string; description: string }[];
  } | null>(null);

  // Update the handleCellClick function to accept brands parameter
  const handleCellClick = (
    activity: string,
    stage: string,
    value: number,
    brands: { name: string; description: string }[]
  ): void => {
    setSelectedCell({ activity, stage, value, brands });
  };

  // Replace the FundingComparison component with this new version
  const FundingComparison = () => {
    const fundingData = [
      {
        company: "De La Calle",
        totalFunding: 120000000, // Based on Series D funding from BrandCard data
      },
      {
        company: "Liquid Death",
        totalFunding: 700000000, // Based on Series D valuation from Heatmap data
      },
      {
        company: "Olipop",
        totalFunding: 100000000, // Based on Series C funding data
      },
      {
        company: "Athletic Brewing Co.",
        totalFunding: 200000000, // Based on Series C milestone data
      },
      {
        company: "Hint",
        totalFunding: 150000000, // Based on Series B funding data
      },
      {
        company: "Poppi",
        totalFunding: 50000000, // Based on Series B funding data
      }
    ];

    const chartData = {
      labels: fundingData.map(entry => entry.company),
      datasets: [{
        label: 'Total Funding',
        data: fundingData.map(entry => entry.totalFunding / 1000000), // Convert to millions
        backgroundColor: fundingData.map((_, index) => `hsl(${index * 45}, 70%, 50%)`),
        borderRadius: 4,
      }]
    };

    const options = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(this: unknown, value: number | string) {
              return `$${value}M`;
            }
          }
        },
        x: {
          ticks: {
            maxRotation: 45,
            minRotation: 45
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(tooltipItem: TooltipItem<"bar">) {
              return `${tooltipItem.formattedValue}`;
            }
          }
        }
      }
    } as const;

    return (
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Total Funding Comparison</h2>
          <p className="text-muted-foreground">
            Cumulative funding raised across beverage brands
          </p>
        </div>
        <div className="relative w-full h-[500px] px-4">
          <ChartJSReact 
            type="bar" 
            data={chartData} 
            options={options}
          />
        </div>
      </section>
    );
  };

  // Add these new data structures after existing ones
  const marketMetrics = [
    { metric: "Total Market Size", value: "$1.2B", subtext: "+45% YoY Growth" },
    { metric: "Total Brands", value: "9", subtext: "In Dataset" },
    { metric: "Success Rate", value: "72%", subtext: "Series B+ Achievement" },
    { metric: "Retail Penetration", value: "85%", subtext: "Major Retail Presence" }
  ];

  const stageMetrics = [
    { metric: "Series C Achievement", value: "77.8%", subtext: "Reached Series C" },
    { metric: "Series D Achievement", value: "55.6%", subtext: "Reached Series D" },
    { metric: "Early Retail Success", value: "88.9%", subtext: "Local Market Entry" },
    { metric: "Avg Time to Series C", value: "3.2", subtext: "Years from Seed" }
  ];

  // Add the analysis data
  const fundingData = [
    {
      stage: "Seed",
      "Liquid Death": 1.6,
      "Poppi": 0.4,
      "Athletic Brewing": 0.5,
      "Hint": 0.25,
      "Biolyte": 1.0
    },
    {
      stage: "Series A",
      "Liquid Death": 9,
      "Poppi": 13.5,
      "De La Calle": 2.6,
      "Athletic Brewing": 3.1,
      "Hint": 5.9
    },
    {
      stage: "Series B",
      "Liquid Death": 38,
      "Poppi": 25,
      "De La Calle": 7,
      "Athletic Brewing": 17.5,
      "Hint": 10
    },
    {
      stage: "Series C",
      "Liquid Death": 75,
      "Poppi": 41.9,
      "De La Calle": 22,
      "Athletic Brewing": 50,
      "Hint": 17.5
    },
    {
      stage: "Series D",
      "Liquid Death": 70,
      "Athletic Brewing": 75.5,
      "Hint": 25
    }
  ];

  const timeToHundred = [
    { brand: "Liquid Death", years: 3.5 },
    { brand: "Poppi", years: 4 },
    { brand: "Athletic Brewing", years: 4.5 },
    { brand: "Hint", years: 9 },
    { brand: "Biolyte", years: 7 }
  ];

  // Update the TabsContent components to use ChartJS
  const FundingAnalysisChart = () => {
    const chartData = {
      labels: fundingData.map(item => item.stage),
      datasets: [
        {
          label: "Liquid Death",
          data: fundingData.map(item => item["Liquid Death"]),
          backgroundColor: "#8884d8",
        },
        {
          label: "Poppi",
          data: fundingData.map(item => item["Poppi"]),
          backgroundColor: "#82ca9d",
        },
        {
          label: "De La Calle",
          data: fundingData.map(item => item["De La Calle"]),
          backgroundColor: "#ffc658",
        },
        {
          label: "Athletic Brewing",
          data: fundingData.map(item => item["Athletic Brewing"]),
          backgroundColor: "#ff8042",
        },
        {
          label: "Hint",
          data: fundingData.map(item => item["Hint"]),
          backgroundColor: "#a4de6c",
        }
      ]
    };

    return (
      <ChartJSReact 
        type="bar" 
        data={chartData}
        options={{ responsive: true }}
      />
    );
  };

  const TimeToScaleChart = () => {
    const chartData = {
      labels: timeToHundred.map(item => item.brand),
      datasets: [{
        label: "Years to $100M",
        data: timeToHundred.map(item => item.years),
        backgroundColor: "#8884d8",
        borderRadius: 4,
      }]
    };

    return (
      <ChartJSReact 
        type="bar" 
        data={chartData}
        options={{ responsive: true }}
      />
    );
  };

  return (
    <>
      <NavBar textColor="text-[#231E24]" />
      <div className="flex flex-col items-center min-h-screen bg-[#F0DDE5]">
        <div className="w-full max-w-7xl space-y-20 px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-[#231E24] sm:text-6xl">
              Beverage Brand Growth Analysis
            </h1>
            <p className="text-xl text-[#524751] max-w-2xl mx-auto">
              Comprehensive analysis of growth patterns across funding stages for
              successful beverage brands
            </p>
          </div>
          {/* Timeline Section */}
          <section className="space-y-6">
            <div className="text-center space-y-2"></div>
            <Timeline />
          </section>
          {/* Visualization Grid */}
          <section className="grid gap-12">
            {/* Heatmap */}
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-[#231E24]">
                  Activities Frequency Heatmap
                </h2>
                <p className="text-[#524751]">
                  Activity intensity and brand participation across funding stages
                </p>
              </div>
              <Heatmap onCellClick={handleCellClick} />
            </div>
          </section>
          {/* Dialog for cell details */}
          <Dialog
            open={!!selectedCell}
            onOpenChange={() => setSelectedCell(null)}
          >
            <DialogContent className="bg-[#E4C9D2]">
              <DialogHeader>
                <DialogTitle className="text-[#231E24]">
                  {selectedCell?.activity} - {selectedCell?.stage}
                </DialogTitle>
              </DialogHeader>
              {selectedCell && (
                <div className="space-y-4 text-[#524751]">
                  <p>
                    <strong className="text-[#231E24]">Activity:</strong> {selectedCell.activity}
                  </p>
                  <p>
                    <strong className="text-[#231E24]">Stage:</strong> {selectedCell.stage}
                  </p>
                  <p>
                    <strong className="text-[#231E24]">Number of Brands:</strong> {selectedCell.value}
                  </p>
                  <div>
                    <h3 className="text-lg font-semibold text-[#231E24] mb-2">Brands:</h3>
                    <ul className="list-disc list-inside space-y-2">
                      {selectedCell.brands.map((brand, idx) => (
                        <li key={idx}>
                          <strong className="text-[#231E24]">{brand.name}:</strong> {brand.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
          {/* Add the Funding Comparison component */}
          <FundingComparison />
          {/* Market Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {marketMetrics.map((metric, index) => (
              <Card key={index} className="bg-[#DDC0C8] border-[#231E24]/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-[#231E24]">{metric.metric}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#231E24]">{metric.value}</div>
                  <p className="text-xs text-[#816F7B]">{metric.subtext}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stage Achievement Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {stageMetrics.map((metric, index) => (
              <Card key={index} className="bg-[#DDC0C8] border-[#231E24]/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-[#231E24]">{metric.metric}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#231E24]">{metric.value}</div>
                  <p className="text-xs text-[#816F7B]">{metric.subtext}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Analysis Tabs */}
          <Tabs defaultValue="funding" className="w-full">
            <TabsList className="bg-[#DDC0C8]">
              <TabsTrigger 
                value="funding"
                className="data-[state=active]:bg-[#E4C9D2] data-[state=active]:text-[#231E24] text-[#524751]"
              >
                Funding Analysis
              </TabsTrigger>
              <TabsTrigger 
                value="time"
                className="data-[state=active]:bg-[#E4C9D2] data-[state=active]:text-[#231E24] text-[#524751]"
              >
                Time to Scale
              </TabsTrigger>
            </TabsList>

            <TabsContent value="funding">
              <Card className="bg-[#E4C9D2] border-[#231E24]/10">
                <CardHeader>
                  <CardTitle className="text-[#231E24]">Funding Rounds Comparison</CardTitle>
                  <CardDescription className="text-[#816F7B]">
                    Investment raised by round (millions USD)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <FundingAnalysisChart />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="time">
              <Card className="bg-[#E4C9D2] border-[#231E24]/10">
                <CardHeader>
                  <CardTitle className="text-[#231E24]">Time to $100M Revenue</CardTitle>
                  <CardDescription className="text-[#816F7B]">
                    Years from founding to $100M revenue
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <TimeToScaleChart />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Add after the existing Tabs component */}
          <section className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-[#231E24]">Normalized Growth Analysis</h2>
              <p className="text-[#524751]">Growth trajectories from company inception</p>
            </div>
            <Tabs defaultValue="revenue" className="w-full">
              <TabsList className="bg-[#DDC0C8]">
                <TabsTrigger 
                  value="revenue"
                  className="data-[state=active]:bg-[#E4C9D2] data-[state=active]:text-[#231E24] text-[#524751]"
                >
                  Revenue Growth
                </TabsTrigger>
                <TabsTrigger 
                  value="retail"
                  className="data-[state=active]:bg-[#E4C9D2] data-[state=active]:text-[#231E24] text-[#524751]"
                >
                  Retail Expansion
                </TabsTrigger>
                <TabsTrigger 
                  value="growth"
                  className="data-[state=active]:bg-[#E4C9D2] data-[state=active]:text-[#231E24] text-[#524751]"
                >
                  Growth Rates
                </TabsTrigger>
              </TabsList>

              <TabsContent value="revenue">
                <Card className="bg-[#E4C9D2] border-[#231E24]/10">
                  <CardHeader>
                    <CardTitle className="text-[#231E24]">Revenue Growth from Year 0</CardTitle>
                    <CardDescription className="text-[#816F7B]">
                      Annual revenue by years since founding (in millions USD)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-96">
                      <ChartJSReact
                        type="line"
                        data={{
                          labels: revenueData.map(d => d.year),
                          datasets: [
                            {
                              label: "Liquid Death",
                              data: revenueData.map(d => d["Liquid Death"]),
                              borderColor: "#8884d8",
                              tension: 0.1
                            },
                            {
                              label: "Poppi",
                              data: revenueData.map(d => d["Poppi"]),
                              borderColor: "#82ca9d",
                              tension: 0.1
                            },
                            {
                              label: "De La Calle",
                              data: revenueData.map(d => d["De La Calle"]),
                              borderColor: "#ffc658",
                              tension: 0.1
                            }
                          ]
                        }}
                        options={{
                          responsive: true,
                          scales: {
                            y: {
                              beginAtZero: true
                            }
                          }
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="retail">
                <Card className="bg-[#E4C9D2] border-[#231E24]/10">
                  <CardHeader>
                    <CardTitle className="text-[#231E24]">Retail Location Growth</CardTitle>
                    <CardDescription className="text-[#816F7B]">
                      Store count by years since founding
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-96">
                      <ChartJSReact
                        type="line"
                        data={{
                          labels: retailData.map(d => d.year),
                          datasets: [
                            {
                              label: "Liquid Death",
                              data: retailData.map(d => d["Liquid Death"]),
                              borderColor: "#8884d8",
                              tension: 0.1
                            },
                            {
                              label: "Poppi",
                              data: retailData.map(d => d["Poppi"]),
                              borderColor: "#82ca9d",
                              tension: 0.1
                            },
                            {
                              label: "De La Calle",
                              data: retailData.map(d => d["De La Calle"]),
                              borderColor: "#ffc658",
                              tension: 0.1
                            }
                          ]
                        }}
                        options={{
                          responsive: true,
                          scales: {
                            y: {
                              beginAtZero: true
                            }
                          }
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="growth">
                <Card className="bg-[#E4C9D2] border-[#231E24]/10">
                  <CardHeader>
                    <CardTitle className="text-[#231E24]">Year-over-Year Growth Rates</CardTitle>
                    <CardDescription className="text-[#816F7B]">
                      Growth rate comparison by stage (%)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-96">
                      <ChartJSReact
                        type="bar"
                        data={{
                          labels: growthData.map(d => d.stage),
                          datasets: [
                            {
                              label: "Liquid Death",
                              data: growthData.map(d => d["Liquid Death"]),
                              backgroundColor: "#8884d8"
                            },
                            {
                              label: "Poppi",
                              data: growthData.map(d => d["Poppi"]),
                              backgroundColor: "#82ca9d"
                            },
                            {
                              label: "De La Calle",
                              data: growthData.map(d => d["De La Calle"]),
                              backgroundColor: "#ffc658"
                            }
                          ]
                        }}
                        options={{
                          responsive: true,
                          scales: {
                            y: {
                              beginAtZero: true
                            }
                          }
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </div>
    </>
  );
}

export default Summary;
