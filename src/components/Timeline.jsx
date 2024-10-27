"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const stages = [
  {
    title: "Seed Stage",
    items: [
      "Product Development & Launch",
      "Initial Funding Secured",
      "Local Market Entry",
      "Launched DTC Platform",
      "Social Media Marketing",
    ],
  },
  {
    title: "Series A",
    items: [
      "Brand Building",
      "Product Line Expansion",
      "Retail Partnerships",
      "Increased Funding",
      "Expanded Social Media Efforts",
    ],
  },
  {
    title: "Series B",
    items: [
      "Marketing Amplification",
      "Celebrity Involvement",
      "National Distribution",
      "Secured Larger Funding Rounds",
    ],
  },
  {
    title: "Series C",
    items: [
      "Product Diversification",
      "International Expansion",
      "High-Profile Collaborations",
      "Large-Scale Marketing Campaigns",
    ],
  },
  {
    title: "Series D and Beyond",
    items: [
      "Market Dominance",
      "Corporate Responsibility Initiatives",
      "Continued Innovation",
      "Global Presence",
    ],
  },
];

const Timeline = () => {
  return (
    <ScrollArea className="h-[calc(100vh-4rem)] w-full max-w-4xl mx-auto">
      <div className="p-8 bg-gradient-to-b from-gray-50 to-white rounded-xl shadow-xl">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Typical Growth Path
        </h1>
        <p className="text-xl text-center mb-12 text-gray-600">
          Track the journey from seed to success
        </p>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-green-500"></div>

          {stages.map((stage, index) => (
            <div
              key={index}
              className={`mb-12 flex items-center ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
            >
              <div className="w-1/2"></div>
              <Badge
                variant="outline"
                className="absolute left-1/2 transform -translate-x-1/2 z-10 bg-white text-blue-500 border-blue-500"
              >
                {`Stage ${index + 1}`}
              </Badge>
              <Card
                className={`w-1/2 ${
                  index % 2 === 0 ? "ml-8" : "mr-8"
                } transition-all duration-300 ease-in-out hover:shadow-lg`}
              >
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-blue-700">
                    {stage.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {stage.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-center text-gray-700"
                      >
                        <ChevronRight className="mr-2 h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}

          <Badge
            variant="default"
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white"
          >
            Start
          </Badge>

          <Badge
            variant="default"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-green-500 text-white"
          >
            Goal
          </Badge>
        </div>
      </div>
    </ScrollArea>
  );
};

export default Timeline;
