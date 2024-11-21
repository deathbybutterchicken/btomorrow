"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { NavBar } from "./ui/nav-bar";

// Import sections
import { WelcomePage } from "./sections/WelcomePage";
import { FounderSection } from "./sections/FounderSection";
import { ExecutivesSection } from "./sections/ExecutivesSection";
import { TimelineSection } from "./sections/TimelineSection";
import { AnalyticsSection } from "./sections/AnalyticsSection";
import { InvestorsSection } from "./sections/InvestorsSection";
import StrategyEvolution from "./sections/StrategyEvolution";

const pages = [
  {
    id: 0,
    title: "Welcome",
    subtitle: " Landing Page",
    color: "bg-transparent",
    textColor: "text-black",
  },
  {
    id: 1,
    title: "Founder",
    subtitle: "Brand Fouder",
    color: "bg-[#0f0f0f]",
    textColor: "text-white",
  },
  {
    id: 2,
    title: "Executive Team",
    subtitle: "Leadership Team",
    color: "bg-[#0f0f0f]",
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

  return (
    <>
      <NavBar />
      <div
        ref={containerRef}
        className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth
          scrollbar scrollbar-thin
          scrollbar-track-transparent 
          scrollbar-thumb-gray-400/5
          hover:scrollbar-thumb-gray-400/10
          scrollbar-thumb-rounded-full
          scrollbar-track-rounded-full"
      >
        {pages.map((page, index) => (
          <motion.div
            key={page.id}
            id={page.id.toString()}
            className={`h-screen w-full snap-start flex items-center justify-center ${
              index === 0 ? 'bg-transparent overflow-hidden rounded-3xl pt-6' : page.color
            }`}
            style={{ minHeight: "100vh", position: "relative" }}
          >
            <motion.div
              className={`${index === 0 ? 'w-screen h-screen rounded-3xl mt-4' : 'w-full h-full'}`}
              animate={{ scale: getPageScale(3) }}
              style={{ position: "relative" }}
            >
              {index === 0 ? (
                <div className="absolute inset-0 scale-[1.1] rounded-3xl">
                  <WelcomePage getPageScale={getPageScale} brandId={brandId} />
                </div>
              ) : (
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
