import { motion } from "framer-motion";
import Image from "next/image";
import { HEADINGS } from "@/data/brands/liquiddeath";

interface WelcomePageProps {
  getPageScale: (index: number) => number;
}

export function WelcomePage({ getPageScale }: WelcomePageProps) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-orange-50">
      {/* XYZ Background */}
      <div className="absolute inset-0 flex items-center justify-center text-[40vw] font-bold text-white/10 select-none">
        <span className="absolute top-0 left-0 transform -translate-x-1/4 -translate-y-1/4">
          X
        </span>
        <span className="absolute bottom-0 left-0 transform -translate-x-1/4 translate-y-1/4">
          Y
        </span>
        <span className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
          Z
        </span>
      </div>

      {/* Main Heading */}
      <div className="absolute inset-x-0 top-0 p-4 sm:p-8 flex justify-center">
        <h1 className="text-[12vw] sm:text-[10vw] font-bold text-black tracking-tight whitespace-nowrap overflow-hidden text-center">
          {HEADINGS.mainHeading}
        </h1>
      </div>

      {/* Product Image and Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
        <div className="flex flex-col items-center justify-between w-full max-w-7xl">
          <div className="relative w-1/3 max-w-xl aspect-[3/2] mb-8">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file%20(1)-ysMqT25Xisbmc6fahrZVW38EAYsuqf.png"
              alt={HEADINGS.imageAlt}
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
          <div className="w-full text-center">
            <h2
              className="text-[6vw] sm:text-[4vw] font-bold text-[#355070] tracking-tight whitespace-nowrap overflow-hidden"
              style={{ lineHeight: "1" }}
            >
              {HEADINGS.line1}
            </h2>
            <h2
              className="text-[6vw] sm:text-[4vw] font-bold text-[#355070] tracking-tight whitespace-nowrap overflow-hidden"
              style={{ lineHeight: "1" }}
            >
              {HEADINGS.line2}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
