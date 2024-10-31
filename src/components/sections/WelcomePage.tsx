import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface WelcomePageProps {
  getPageScale: (index: number) => number;
  brandId: string;
}

interface BrandData {
  name: string;
  description: string;
  imageAlt: string;
  mainHeading: string;
  line1: string;
  line2: string;
  // Add other properties as needed
}

export function WelcomePage({ getPageScale, brandId }: WelcomePageProps) {
  const [HEADINGS, setHEADINGS] = useState<BrandData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const brandData = await import(`@/data/brands/${brandId}`);
      setHEADINGS(brandData.HEADINGS);
    };
    loadData();
  }, [brandId]);

  if (!HEADINGS) return null;

  return (
    <div className="relative min-h-screen bg-[#E2A688] overflow-hidden overflow-y-auto custom-scrollbar">
      {/* Font-face declaration */}
      <style jsx global>{`
        @font-face {
          font-family: "Proxima Nova";
          src: url("/fonts/ProximaNova-Regular.woff2") format("woff2"),
            url("/fonts/ProximaNova-Regular.woff") format("woff");
          font-weight: normal;
          font-style: normal;
        }
        @font-face {
          font-family: "Proxima Nova";
          src: url("/fonts/ProximaNova-Bold.woff2") format("woff2"),
            url("/fonts/ProximaNova-Bold.woff") format("woff");
          font-weight: bold;
          font-style: normal;
        }
      `}</style>

      {/* Hero section */}
      <div className="relative w-full h-screen">
        {/* Gradient circle background */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ opacity: 0.4 }}
        >
          <div
            className="w-[800px] h-[800px] rounded-full"
            style={{
              background:
                "radial-gradient(circle at center, #) 0%, rgba(255, 193, 192,0.8) 100%)",
              filter: "blur(80px)",
            }}
          />
        </div>

        {/* Glassmorphism circle */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className="w-[500px] h-[500px] rounded-full bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg"
            style={{
              boxShadow:
                "-8px -8px 20px rgba(255, 186, 154, 0.5), 8px 8px 20px rgba(255, 240, 240, 0.4)",
            }}
          />
        </div>

        {/* Centered image */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible">
          <Image
            src={`/can/${brandId}.png`}
            alt={HEADINGS.imageAlt}
            width={960}
            height={560}
            className="object-contain"
            priority
            style={{
              width: "600px",
              height: "auto",
              maxWidth: "none",
              opacity: 0.9,
            }}
          />
        </div>

        {/* Top left text */}
        <div className="absolute top-8 left-8">
          <h1
            className="text-6xl font-bold tracking-wider"
            style={{
              fontFamily: "'Proxima Nova', 'Helvetica', 'Arial', sans-serif",
              color: "#FFF0F0",
            }}
          >
            {HEADINGS.mainHeading}
          </h1>
        </div>

        {/* Bottom left text */}
        <div className="absolute bottom-8 right-8 max-w-md text-right">
          <p
            className="text-3xl font-semibold leading-tight"
            style={{
              fontFamily: "'Proxima Nova', 'Helvetica', 'Arial', sans-serif",
              color: "#FFF0F0",
            }}
          >
            {HEADINGS.line1}
          </p>
          <p
            className="text-4xl font-semibold leading-tight mt-2"
            style={{
              fontFamily: "'Proxima Nova', 'Helvetica', 'Arial', sans-serif",
              color: "#FFF0F0",
            }}
          >
            {HEADINGS.line2}
          </p>
        </div>
      </div>
    </div>
  );
}
