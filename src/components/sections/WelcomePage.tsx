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

  // Add gradient animation effect
  useEffect(() => {
    const interBubble = document.querySelector('.welcome-interactive') as HTMLElement;
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move() {
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;
      if (interBubble) {
        interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      }
      requestAnimationFrame(move);
    }

    window.addEventListener('mousemove', (event) => {
      tgX = event.clientX;
      tgY = event.clientY;
    });

    move();

    return () => {
      window.removeEventListener('mousemove', () => {});
    };
  }, []);

  if (!HEADINGS) return null;

  return (
    <div className="relative min-h-screen overflow-hidden overflow-y-auto custom-scrollbar">
      {/* Add SVG filter for goo effect */}
      <svg xmlns="http://www.w3.org/2000/svg" className="hidden">
        <defs>
          <filter id="welcome-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Updated styles */}
      <style jsx>{`
        @keyframes moveInCircle {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(180deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes moveVertical {
          0% { transform: translateY(-50%); }
          50% { transform: translateY(50%); }
          100% { transform: translateY(-50%); }
        }

        @keyframes moveHorizontal {
          0% { transform: translateX(-50%) translateY(-10%); }
          50% { transform: translateX(50%) translateY(10%); }
          100% { transform: translateX(-50%) translateY(-10%); }
        }

        .gradients-container {
          position: absolute;
          inset: 0;
          filter: url(#welcome-goo) blur(40px);
          width: 100%;
          height: 100%;
        }

        .welcome-gradient {
          position: absolute;
          width: 200%;
          height: 200%;
          mix-blend-mode: soft-light;
          opacity: 0.8;
        }

        .g1 {
          background: radial-gradient(circle at center, rgba(255, 204, 153, 0.8) 0, rgba(255, 204, 153, 0) 50%);
          top: -50%;
          left: -50%;
          animation: moveVertical 30s ease infinite;
        }

        .g2 {
          background: radial-gradient(circle at center, rgba(255, 153, 102, 0.8) 0, rgba(255, 153, 102, 0) 50%);
          top: -50%;
          left: -50%;
          animation: moveInCircle 20s reverse infinite;
        }

        .g3 {
          background: radial-gradient(circle at center, rgba(255, 102, 51, 0.8) 0, rgba(255, 102, 51, 0) 50%);
          top: -30%;
          left: -30%;
          animation: moveHorizontal 40s ease infinite;
        }

        .welcome-interactive {
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, rgba(255, 128, 0, 0.8) 0, rgba(255, 128, 0, 0) 50%);
          top: -50%;
          left: -50%;
          opacity: 0.7;
          filter: blur(40px);
        }
      `}</style>

      {/* Font styles */}
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

      {/* Updated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FFF5E6] to-[#FFFFFF]">
        <div className="gradients-container">
          <div className="welcome-gradient g1" />
          <div className="welcome-gradient g2" />
          <div className="welcome-gradient g3" />
          <div className="welcome-interactive" />
        </div>
      </div>

      {/* Glassmorphism circle */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className="w-[500px] h-[500px] rounded-full bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg"
          style={{
            boxShadow:
              "-8px -8px 20px rgba(255, 204, 153, 0.5), 8px 8px 20px rgba(255, 102, 51, 0.4)",
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

      {/* Text content */}
      <div className="absolute top-8 left-8">
        <h1
          className="text-6xl font-bold tracking-wider"
          style={{
            fontFamily: "'Proxima Nova', 'Helvetica', 'Arial', sans-serif",
            color: "#4A2B0F",
          }}
        >
          {HEADINGS.mainHeading}
        </h1>
      </div>

      <div className="absolute bottom-8 right-8 max-w-md text-right">
        <p
          className="text-3xl font-semibold leading-tight"
          style={{
            fontFamily: "'Proxima Nova', 'Helvetica', 'Arial', sans-serif",
            color: "#4A2B0F",
          }}
        >
          {HEADINGS.line1}
        </p>
        <p
          className="text-4xl font-semibold leading-tight mt-2"
          style={{
            fontFamily: "'Proxima Nova', 'Helvetica', 'Arial', sans-serif",
            color: "#4A2B0F",
          }}
        >
          {HEADINGS.line2}
        </p>
      </div>
    </div>
  );
}
