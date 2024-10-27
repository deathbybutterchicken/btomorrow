// src/components/BrandLanding.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BrandData } from "@/types/brand";

// Import sections
import { WelcomePage } from "./sections/WelcomePage";
import { FounderSection } from "./sections/FounderSection";
import { ExecutivesSection } from "./sections/ExecutivesSection";
import { TimelineSection } from "./sections/TimelineSection";
import { AnalyticsSection } from "./sections/AnalyticsSection";
import { InvestorsSection } from "./sections/InvestorsSection";

interface BrandLandingProps {
  brandData: BrandData;
}

export function BrandLanding({ brandData }: BrandLandingProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentPage(Number(entry.target.id));
          }
        });
      },
      { threshold: 0.5 }
    );

    container
      .querySelectorAll(".page")
      .forEach((page) => observer.observe(page));

    const handleScroll = () => {
      if (container) {
        const newScrollPosition =
          container.scrollTop / (container.scrollHeight - window.innerHeight);
        setScrollPosition(newScrollPosition);
      }
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container
        .querySelectorAll(".page")
        .forEach((page) => observer.unobserve(page));
      container.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage]);

  const getPageScale = (index: number) => {
    const pageProgress = scrollPosition * (brandData.pages.length - 1);
    const distanceFromCurrentPage = Math.abs(pageProgress - index);
    const scale = 1 - Math.min(distanceFromCurrentPage, 1) * 0.1;
    return scale;
  };

  const getBorderRadius = (index: number) => {
    const pageProgress = scrollPosition * (brandData.pages.length - 1);
    const distanceFromCurrentPage = Math.abs(pageProgress - index);
    const radius = Math.min(distanceFromCurrentPage, 1) * 40;
    return `${radius}px`;
  };

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-auto snap-y snap-mandatory custom-scrollbar"
    >
      {brandData.pages.map((page, index) => (
        <motion.div
          key={page.id}
          id={page.id.toString()}
          className={`page h-screen w-full flex flex-col items-center justify-center snap-start ${page.color} overflow-hidden`}
          initial={{ scale: 1, borderRadius: 0 }}
          animate={{
            scale: getPageScale(index),
            borderRadius: getBorderRadius(index),
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {index === 0 ? (
            <WelcomePage brandData={brandData} scale={getPageScale(index)} />
          ) : index === 1 ? (
            <FounderSection brandData={brandData} scale={getPageScale(index)} />
          ) : index === 2 ? (
            <ExecutivesSection
              brandData={brandData}
              scale={getPageScale(index)}
            />
          ) : index === 3 ? (
            <TimelineSection
              brandData={brandData}
              scale={getPageScale(index)}
            />
          ) : index === 4 ? (
            <AnalyticsSection
              brandData={brandData}
              scale={getPageScale(index)}
            />
          ) : index === 5 ? (
            <InvestorsSection
              brandData={brandData}
              scale={getPageScale(index)}
            />
          ) : null}
        </motion.div>
      ))}

      {/* Navigation Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Link href="/summary">
          <Button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 shadow-lg">
            <span className="mr-2">Next: Summary</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.3);
          border-radius: 1.5px;
        }
        h1 {
          text-align: left;
          text-align-last: left;
          text-justify: inter-character;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0% {
            transform: translatey(0px);
          }
          50% {
            transform: translatey(-20px);
          }
          100% {
            transform: translatey(0px);
          }
        }
      `}</style>
    </div>
  );
}

export default BrandLanding;
