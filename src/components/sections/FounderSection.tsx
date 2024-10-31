import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Linkedin } from "lucide-react";
import { useEffect, useState } from "react";

interface FounderSectionProps {
  getPageScale: (index: number) => number;
  brandId: string;
}

interface FounderData {
  name: string;
  title: string;
  education: string;
  professionalBackground: string[];
  image: string;
  socials: {
    twitter: string;
    linkedin: string;
  };
  entrepreneurialCareer: {
    title: string;
    ventures: {
      preLiquidDeath: string;
      liquidDeathLaunch: string;
    };
  };
  inspiration: string[];
  publicPresence: string[];
}

export function FounderSection({ getPageScale, brandId }: FounderSectionProps) {
  const [founderData, setFounderData] = useState<FounderData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const brandData = await import(`@/data/brands/${brandId}`);
        setFounderData(brandData.founderData || null);
      } catch (error) {
        console.error("Error loading founder data:", error);
        setFounderData(null);
      }
    };
    loadData();
  }, [brandId]);

  if (!founderData) return null;

  const socialLinks = {
    twitter: founderData.socials?.twitter || "#",
    linkedin: founderData.socials?.linkedin || "#",
  };

  return (
    <motion.div
      className="relative w-full h-screen overflow-y-auto bg-[#0f0f0f] custom-scrollbar-dark"
      animate={{ scale: getPageScale(0) }}
    >
      <div className="container mx-auto px-4 py-12 min-h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto w-full">
          <Card className="col-span-1 lg:col-span-2 relative overflow-hidden backdrop-blur-md bg-white/60 text-white before:absolute before:inset-0 before:bg-gradient-to-br before:from-[#8CACA9] before:to-transparent before:pointer-events-none">
            <CardContent className="p-6 relative z-10">
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2 lg:pr-6">
                  <div className="flex items-center mb-4">
                    <svg
                      className="w-6 h-6 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2L2 7L12 12L22 7L12 2Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 17L12 22L22 17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 12L12 17L22 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-2xl font-bold">
                      {founderData.title}
                    </span>
                  </div>
                  <h2 className="text-4xl font-bold mb-6">
                    {founderData.name}
                  </h2>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-4">Education</h3>
                    <p className="text-lg leading-relaxed mb-2">
                      <span className="font-semibold">
                        {founderData.education}
                      </span>
                    </p>
                  </div>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-4">
                      Professional Background
                    </h3>
                    <ul className="list-disc list-inside text-lg leading-relaxed mb-2">
                      {founderData.professionalBackground?.map(
                        (item, index) => <li key={index}>{item}</li>
                      ) || <li>No professional background available</li>}
                    </ul>
                  </div>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-4">Socials</h3>
                    <div className="flex space-x-4">
                      {socialLinks.twitter && (
                        <Link
                          href={socialLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-white/50"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                          <span className="sr-only">Twitter</span>
                        </Link>
                      )}
                      {socialLinks.linkedin && (
                        <Link
                          href={socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-white/50"
                        >
                          <Linkedin className="w-6 h-6" />
                          <span className="sr-only">LinkedIn</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2 mt-6 lg:mt-0">
                  <div className="relative aspect-square">
                    <Image
                      src={founderData.image || ""}
                      alt={`${founderData.name} portrait`}
                      fill
                      priority
                      className="rounded-lg object-cover"
                      style={{ opacity: 0.9 }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="relative overflow-hidden backdrop-blur-md bg-white/30 text-white before:absolute before:inset-0 before:bg-gradient-to-br before:from-[#20464F] before:to-transparent before:pointer-events-none">
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center mb-4">
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 6V12L16 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-2xl font-bold">
                  Entrepreneurial Career
                </span>
              </div>
              <h2 className="text-xl font-bold mb-4">
                {founderData.entrepreneurialCareer.title}
              </h2>
              <h3 className="text-lg font-semibold mb-2">
                Entrepreneurial Ventures
              </h3>
              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-1">Pre-Liquid Death</h4>
                <p className="text-lg leading-relaxed">
                  {founderData.entrepreneurialCareer.ventures.preLiquidDeath}
                </p>
              </div>
              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-1">
                  Liquid Death Launch
                </h4>
                <p className="text-lg leading-relaxed">
                  {founderData.entrepreneurialCareer.ventures.liquidDeathLaunch}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="relative overflow-hidden backdrop-blur-md bg-white/30 text-white before:absolute before:inset-0 before:bg-gradient-to-br before:from-[#94B4AF] before:to-transparent before:pointer-events-none">
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center mb-4">
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 12H18L15 21L9 3L6 12H2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-2xl font-bold">
                  Inspiration and Presence
                </span>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Inspiration</h3>
                <ul className="list-disc list-inside text-lg leading-relaxed">
                  {founderData.inspiration?.map((item, index) => (
                    <li key={index}>{item}</li>
                  )) || <li>No inspiration available</li>}
                </ul>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Public Presence</h3>
                <ul className="list-disc list-inside text-lg leading-relaxed">
                  {founderData.publicPresence?.map((item, index) => (
                    <li key={index}>{item}</li>
                  )) || <li>No public presence available</li>}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
