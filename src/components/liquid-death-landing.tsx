"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { NavBar } from "./ui/nav-bar";

// Import sections
import { WelcomePage } from "./sections/WelcomePage";
import { FounderSection } from "./sections/FounderSection";
import { ExecutivesSection } from "./sections/ExecutivesSection";
import { TimelineSection } from "./sections/TimelineSection";
import { AnalyticsSection } from "./sections/AnalyticsSection";
import { InvestorsSection } from "./sections/InvestorsSection";
import { Button } from "./ui/button";
import StrategyEvolution from "./sections/StrategyEvolution";

const pages = [
  {
    id: 0,
    title: "Welcome",
    subtitle: " Landing Page",
    color: "bg-orange-50",
    textColor: "text-black",
  },
  {
    id: 1,
    title: "Founder",
    subtitle: "Brand Fouder",
    color: "bg-[#3C5E66]",
    textColor: "text-black",
  },
  {
    id: 2,
    title: "Executive Team",
    subtitle: "Leadership Team",
    color: "bg-orange-50",
    textColor: "text-white",
  },
  {
    id: 3,
    title: "Company Timeline",
    subtitle: "Our Journey",
    color: "bg-black",
    textColor: "text-white",
  },
  {
    id: 4,
    title: "Analytics Dashboard",
    subtitle: "Key Metrics",
    color: "bg-black",
    textColor: "text-white",
  },
  {
    id: 5,
    title: "Strategy Evolution",
    subtitle: "Growth & Partnerships",
    color: "bg-gray-50",
    textColor: "text-white",
  },
  {
    id: 6,
    title: "Top Investors",
    subtitle: "Our Backers",
    color: "bg-orange-50",
    textColor: "text-gray-800",
  },
];

interface BrandLandingProps {
  brandId: string;
}

export default function BrandLanding({ brandId }: BrandLandingProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Add scroll handler to update current page
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollTop;
      const pageHeight = window.innerHeight;
      const newPage = Math.round(scrollPosition / pageHeight);
      setCurrentPage(newPage);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const getPageScale = (index: number) => {
    const distance = Math.abs(currentPage - index);
    return 1 - distance * 0.05;
  };

  const getBorderRadius = (index: number) => {
    const distance = Math.abs(currentPage - index);
    return distance * 20; // Increase border radius as pages get further
  };

  return (
    <>
      <NavBar />
      <div
        ref={containerRef}
        className="h-screen overflow-y-auto snap-y snap-mandatory"
      >
        {pages.map((page, index) => (
          <motion.div
            key={page.id}
            id={page.id.toString()}
            className={`h-screen w-full snap-start flex items-center justify-center ${page.color}`}
            style={{ minHeight: "100vh" }}
          >
            <motion.div
              className="w-full h-full"
              animate={{ scale: getPageScale(3) }}
            >
              {index === 0 && (
                <WelcomePage getPageScale={getPageScale} brandId={brandId} />
              )}
              {index !== 0 && (
                <>
                  {index === 1 && (
                    <FounderSection
                      getPageScale={getPageScale}
                      brandId={brandId}
                    />
                  )}
                  {index === 2 && (
                    <ExecutivesSection
                      getPageScale={getPageScale}
                      brandId={brandId}
                    />
                  )}
                  {index === 3 && (
                    <TimelineSection
                      getPageScale={getPageScale}
                      brandId={brandId}
                    />
                  )}
                  {index === 4 && (
                    <AnalyticsSection
                      getPageScale={getPageScale}
                      brandId={brandId}
                    />
                  )}
                  {index === 5 && (
                    <StrategyEvolution
                      getPageScale={getPageScale}
                      brandId={brandId}
                    />
                  )}
                  {index === 6 && (
                    <InvestorsSection
                      getPageScale={getPageScale}
                      brandId={brandId}
                    />
                  )}
                </>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
