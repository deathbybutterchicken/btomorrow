import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { topInvestors } from "@/data/brands/liquiddeath";

type Investor = {
  name: string;
  logoUrl: string;
  totalRoundsParticipated: number;
  roundsParticipated: string[];
  leadInvestments: string[];
  otherInvestments: string[];
  website: string | null;
  description: string;
};

interface InvestorsSectionProps {
  getPageScale: (index: number) => number;
}

interface TopInvestorsProps {
  getPageScale: (index: number) => number;
}

function TopInvestors({ getPageScale }: TopInvestorsProps) {
  const InvestorCard = ({ investor }: { investor: Investor }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <Card className="bg-white/20 backdrop-blur-lg border-gray-300 cursor-pointer hover:bg-white/90 transition-all overflow-hidden relative">
        <CardHeader
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative z-10"
        >
          <CardTitle className="text-gray-800 flex justify-between items-center">
            {investor.name}
            {isExpanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </CardTitle>
          <CardDescription className="text-gray-600">
            Rounds Participated: {investor.totalRoundsParticipated}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="w-32 h-32 absolute -top-16 -left-16 rounded-full bg-pink-100 opacity-50"></div>
            <div className="w-32 h-32 absolute -bottom-16 -right-16 rounded-full bg-blue-100 opacity-50"></div>
          </div>
          <div className="relative z-10">
            <div className="w-24 h-24 mx-auto mb-4 relative overflow-hidden rounded-full border-2 border-gray-200">
              <Image
                src={investor.logoUrl}
                alt={`${investor.name} Logo`}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-full"
              />
            </div>

            {isExpanded && (
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600">{investor.description}</p>
                <h4 className="font-semibold text-gray-800">
                  Other Investments:
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {investor.otherInvestments.map((investment, index) => (
                    <li key={index}>{investment}</li>
                  ))}
                </ul>
                {investor.website && (
                  <a
                    href={investor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm block"
                  >
                    Visit Website
                  </a>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <motion.div
      className="min-h-screen bg-orange-50 text-black p-8"
      // animate={{ scale: getPageScale(2) }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-[12vw] sm:text-[8vw] font-bold text-black tracking-tight whitespace-nowrap overflow-hidden font-['PP_Mori',sans-serif] mb-4">
            NOTED INVESTORS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topInvestors.map((investor, index) => (
            <InvestorCard key={index} investor={investor} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function InvestorsSection({ getPageScale }: InvestorsSectionProps) {
  return (
    <motion.div
      className="relative w-full h-screen overflow-y-auto p-6"
      // animate={{ scale: getPageScale(0) }}
    >
      <div className="container mx-auto px-4 py-12">
        <TopInvestors getPageScale={getPageScale} />
      </div>
    </motion.div>
  );
}

// Ensure default export for compatibility
export default InvestorsSection;
