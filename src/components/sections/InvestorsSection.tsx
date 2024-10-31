import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { ChevronUp, ChevronDown } from "lucide-react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface InvestorsSectionProps {
  getPageScale: (index: number) => number;
  brandId: string;
}

interface Investor {
  name: string;
  logo?: string;
  description?: string;
  investmentRound?: string;
  amount?: string;
  date?: string;
}

interface TopInvestorsProps {
  getPageScale: (index: number) => number;
  investors: Investor[];
}

function TopInvestors({ getPageScale, investors }: TopInvestorsProps) {
  const InvestorCard = ({ investor }: { investor: Investor }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <Card className="bg-white/20 backdrop-blur-lg border-gray-300 cursor-pointer hover:bg-white/90 transition-all overflow-hidden relative custom-scrollbar-dark">
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
            {investor.investmentRound && <div>{investor.investmentRound}</div>}
            {investor.amount && (
              <div className="mt-1 font-medium">{investor.amount}</div>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="w-32 h-32 absolute -top-16 -left-16 rounded-full bg-pink-100 opacity-50"></div>
            <div className="w-32 h-32 absolute -bottom-16 -right-16 rounded-full bg-blue-100 opacity-50"></div>
          </div>
          <div className="relative z-10">
            {investor.logo && (
              <div className="w-24 h-24 mx-auto mb-4 relative overflow-hidden rounded-full border-2 border-gray-200">
                <Image
                  src={investor.logo}
                  alt={`${investor.name} Logo`}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-full"
                />
              </div>
            )}

            {isExpanded && (
              <div className="mt-4 space-y-2">
                {investor.description && (
                  <p className="text-sm text-gray-600">
                    {investor.description}
                  </p>
                )}
                {investor.amount && (
                  <p className="text-sm text-gray-600">
                    Investment Amount: {investor.amount}
                  </p>
                )}
                {investor.date && (
                  <p className="text-sm text-gray-600">Date: {investor.date}</p>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <motion.div className="min-h-screen bg-orange-50 text-black p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-left mb-12">
          <h2 className="text-[10vw] sm:text-[6vw] font-bold text-black tracking-tight whitespace-nowrap overflow-hidden font-['PP_Mori',sans-serif] mb-4">
            NOTED INVESTORS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {investors.map((investor, index) => (
            <InvestorCard key={index} investor={investor} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function InvestorsSection({
  getPageScale,
  brandId,
}: InvestorsSectionProps) {
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        console.log("Loading data for brandId:", brandId);
        const brandData = await import(`@/data/brands/${brandId}`);
        console.log("Loaded brand data:", brandData);
        setInvestors(brandData.topInvestors || []);
      } catch (error) {
        console.error("Error loading investors:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [brandId]);

  if (isLoading) {
    return (
      <motion.div
        className="relative w-full h-screen overflow-y-auto p-6"
        animate={{ scale: getPageScale(1) }}
      >
        <div className="container mx-auto px-4 py-12">
          <p>Loading investors...</p>
        </div>
      </motion.div>
    );
  }

  if (!investors?.length) {
    return (
      <motion.div
        className="relative w-full h-screen overflow-y-auto p-6"
        animate={{ scale: getPageScale(0) }}
      >
        <div className="container mx-auto px-4 py-12">
          <p>No investor data available.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="relative w-full h-screen overflow-y-auto p-6"
      animate={{ scale: getPageScale(3) }}
    >
      <div className="container mx-auto px-4 py-12">
        <TopInvestors getPageScale={getPageScale} investors={investors} />
      </div>
    </motion.div>
  );
}

export default InvestorsSection;
