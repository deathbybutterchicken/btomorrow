"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface StrategyEvolutionProps {
  getPageScale: (index: number) => number;
  brandId: string;
}

interface Stage {
  stage: string;
  year: string;
  requirements: string[];
  enablers: string[];
  keyMetrics: string[];
}

interface MarketingStage {
  category: string;
  requirements: string[];
  examples: {
    partnership: string;
    conditions: string[];
  }[];
}

const StrategyEvolution: React.FC<StrategyEvolutionProps> = ({
  getPageScale,
  brandId,
}) => {
  const [strategyData, setStrategyData] = useState<{
    distributionStages: Stage[];
    marketingStages: MarketingStage[];
  }>({
    distributionStages: [],
    marketingStages: [],
  });

  useEffect(() => {
    const loadData = async () => {
      const brandData = await import(`@/data/brands/${brandId}`);
      setStrategyData({
        distributionStages: brandData.distributionStages || [],
        marketingStages: brandData.marketingStages || [],
      });
    };
    loadData();
  }, [brandId]);

  if (
    !strategyData.distributionStages.length &&
    !strategyData.marketingStages.length
  ) {
    return null;
  }

  return (
    <div className="p-4 space-y-4 bg-gray-50 overflow-auto max-h-screen">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Strategy Evolution Requirements</h1>
        <p className="text-gray-600">
          Analysis of prerequisites for each growth stage
        </p>
      </div>

      <Tabs defaultValue="distribution">
        <TabsList>
          <TabsTrigger value="distribution">Distribution Evolution</TabsTrigger>
          <TabsTrigger value="marketing">Partnership Strategy</TabsTrigger>
        </TabsList>

        <TabsContent value="distribution">
          <div className="space-y-4">
            {strategyData.distributionStages.map((stage, index) => (
              <Card
                key={index}
                className="bg-[#FFF7ED] backdrop-blur-sm bg-opacity-5"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{stage.stage}</CardTitle>
                    <Badge variant="outline">{stage.year}</Badge>
                  </div>
                  <CardDescription>
                    Key requirements and enablers for this stage
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2">Prerequisites:</h3>
                      <ul className="list-disc pl-4 space-y-1">
                        {stage.requirements.map((req, i) => (
                          <li key={i} className="text-sm">
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Key Enablers:</h3>
                      <ul className="list-disc pl-4 space-y-1">
                        {stage.enablers.map((enabler, i) => (
                          <li key={i} className="text-sm">
                            {enabler}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Performance Metrics:</h3>
                    <div className="flex flex-wrap gap-2">
                      {stage.keyMetrics.map((metric, i) => (
                        <Badge key={i} variant="secondary">
                          {metric}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="marketing">
          <div className="space-y-4">
            {strategyData.marketingStages.map((stage, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{stage.category}</CardTitle>
                  <CardDescription>
                    Partnership requirements and conditions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">
                        General Requirements:
                      </h3>
                      <ul className="list-disc pl-4 space-y-1">
                        {stage.requirements.map((req, i) => (
                          <li key={i} className="text-sm">
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-4">
                      {stage.examples.map((example, i) => (
                        <div key={i}>
                          <h3 className="font-semibold mb-2">
                            {example.partnership}:
                          </h3>
                          <ul className="list-disc pl-4 space-y-1">
                            {example.conditions.map((condition, j) => (
                              <li key={j} className="text-sm">
                                {condition}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StrategyEvolution;
