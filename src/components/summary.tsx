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

// Dynamically import components with SSR disabled
const Timeline = dynamic(() => import("./Timeline"), { ssr: false });
const Heatmap = dynamic(() => import("./Heatmap").then((mod) => mod.default), {
  ssr: false,
});
const BarChartComponent = dynamic(() => import("./BarChartComponent"), {
  ssr: false,
});
const SankeyDiagram = dynamic(() => import("./SankeyDiagram"), { ssr: false });
const BrandCard = dynamic(() => import("./BrandCard"), { ssr: false });

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

function Summary() {
  const router = useRouter();

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

  return (
    <div className="flex flex-col items-center min-h-screen bg-background">
      <div className="w-full max-w-7xl space-y-20 px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Beverage Brand Growth Analysis
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
              <h2 className="text-3xl font-bold">
                Activities Frequency Heatmap
              </h2>
              <p className="text-muted-foreground">
                Activity intensity and brand participation across funding stages
              </p>
            </div>
            <Heatmap onCellClick={handleCellClick} />
          </div>
        </section>{" "}
        {/* Add this closing tag */}
        {/* Dialog for cell details */}
        <Dialog
          open={!!selectedCell}
          onOpenChange={() => setSelectedCell(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedCell?.activity} - {selectedCell?.stage}
              </DialogTitle>
            </DialogHeader>
            {selectedCell && (
              <div className="space-y-4">
                <p>
                  <strong>Activity:</strong> {selectedCell.activity}
                </p>
                <p>
                  <strong>Stage:</strong> {selectedCell.stage}
                </p>
                <p>
                  <strong>Number of Brands:</strong> {selectedCell.value}
                </p>
                {/* Brands list with descriptions */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Brands:</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {selectedCell.brands.map((brand, idx) => (
                      <li key={idx}>
                        <strong>{brand.name}:</strong> {brand.description}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
        {/* Add the Liquid Death button */}
        <div className="flex justify-center pt-8">
          <button
            onClick={() => router.push("/")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Summary;
