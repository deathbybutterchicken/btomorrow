"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

// ... other imports ...

// Import sections
import { WelcomePage } from "./sections/WelcomePage";
import { FounderSection } from "./sections/FounderSection";
import { ExecutivesSection } from "./sections/ExecutivesSection";
import { TimelineSection } from "./sections/TimelineSection";
import { AnalyticsSection } from "./sections/AnalyticsSection";
import { InvestorsSection } from "./sections/InvestorsSection";
import { Button } from "./ui/button";

const pages = [
  {
    id: 0,
    title: "Welcome",
    subtitle: "Liquid Death Landing Page",
    color: "bg-orange-50",
    textColor: "text-black",
  },
  {
    id: 1,
    title: "Founder",
    subtitle: "Mike Cessario",
    color: "bg-[#fcf8ec]",
    textColor: "text-black",
  },
  {
    id: 2,
    title: "Executive Team",
    subtitle: "Leadership",
    color: "bg-[#FCF4EA]",
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
    color: "bg-gradient-to-b from-black via-black to-[#001F3F]",
    textColor: "text-white",
  },
  {
    id: 5,
    title: "Top Investors",
    subtitle: "Our Backers",
    color:
      "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-blue-500 to-white",
    textColor: "text-gray-800",
  },
];

export default function LiquidDeathLanding() {
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
            {index === 0 && <WelcomePage getPageScale={getPageScale} />}
            {index !== 0 && (
              <>
                {index === 1 && <FounderSection getPageScale={getPageScale} />}
                {index === 2 && (
                  <ExecutivesSection getPageScale={getPageScale} />
                )}
                {index === 3 && <TimelineSection getPageScale={getPageScale} />}
                {index === 4 && (
                  <AnalyticsSection getPageScale={getPageScale} />
                )}
                {index === 5 && (
                  <InvestorsSection getPageScale={getPageScale} />
                )}
              </>
            )}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
