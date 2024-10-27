"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const INITIAL_BUBBLE_COUNT = 49;
const MID_BUBBLE_COUNT = 20;
const FINAL_BUBBLE_COUNT = 8;

export function BubbleFunnelComponent() {
  const [bubbleCount, setBubbleCount] = useState(INITIAL_BUBBLE_COUNT);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight =
        document.documentElement.scrollHeight - windowHeight;
      const progress = Math.min(scrollPosition / documentHeight, 1);
      setScrollProgress(progress);

      if (progress < 0.5) {
        setBubbleCount(
          Math.round(
            INITIAL_BUBBLE_COUNT -
              (INITIAL_BUBBLE_COUNT - MID_BUBBLE_COUNT) * (progress * 2)
          )
        );
      } else {
        setBubbleCount(
          Math.round(
            MID_BUBBLE_COUNT -
              (MID_BUBBLE_COUNT - FINAL_BUBBLE_COUNT) * ((progress - 0.5) * 2)
          )
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const gridColumns = Math.max(2, Math.ceil(Math.sqrt(bubbleCount)));

  return (
    <div className="min-h-[300vh] bg-gray-100 pt-20">
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="grid gap-4 transition-all duration-500 ease-in-out"
          style={{
            gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
            opacity: 1 - scrollProgress * 0.5,
          }}
        >
          {Array.from({ length: INITIAL_BUBBLE_COUNT }).map((_, index) => (
            <div
              key={index}
              className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-500 ease-in-out"
              style={{
                transform: `scale(${1 - scrollProgress * 0.3})`,
                opacity: index < bubbleCount ? 1 : 0,
                visibility: index < bubbleCount ? "visible" : "hidden",
              }}
            >
              <Image
                src={`/brand_logos/logo_${index + 1}.png`}
                alt={`Brand Logo ${index + 1}`}
                width={100}
                height={100}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Scroll to see the final brands
        </h1>
      </div>
      <div className="h-screen flex items-center justify-center">
        <p className="text-2xl text-gray-600">First filter</p>
      </div>
      <div className="h-screen flex items-center justify-center">
        <p className="text-2xl text-gray-600">The Final 8</p>
      </div>
    </div>
  );
}
