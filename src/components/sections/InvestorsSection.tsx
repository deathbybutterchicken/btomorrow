import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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

const topInvestors = [
  {
    name: "SuRo Capital",
    logoUrl: "https://s3-symbol-logo.tradingview.com/suro-capital--600.png",
    totalRoundsParticipated: 2,
    roundsParticipated: ["Deal #8", "Deal #9"],
    leadInvestments: [],
    otherInvestments: ["Coursera", "Palantir", "Course Hero"],
    website: "https://surocap.com",
    description:
      "SuRo Capital is a publicly traded fund investing in high-growth, venture-backed private companies.",
  },
  {
    name: "Live Nation Entertainment",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw_vwBk4mOrfEeIsqLjHHxso9NelJp7SLTcg&s",
    totalRoundsParticipated: 4,
    roundsParticipated: ["Deal #6", "Deal #7", "Deal #8", "Deal #12"],
    leadInvestments: [],
    otherInvestments: ["Ticketmaster", "House of Blues"],
    website: "https://www.livenationentertainment.com",
    description:
      "Live Nation Entertainment is the worlds leading live entertainment company, comprised of global market leaders.",
  },
  {
    name: "Science Inc.",
    logoUrl:
      "https://media.licdn.com/dms/image/v2/D560BAQGnlO29lFscuQ/company-logo_200_200/company-logo_200_200/0/1719256270542/scienceinc_logo?e=2147483647&v=beta&t=lkRl9gf-vnyizlUXJEHa9H6gJGUIm9rxvfSIafu-Vu0",
    totalRoundsParticipated: 4,
    roundsParticipated: ["Deal #1", "Deal #2", "Deal #7", "Deal #8"],
    leadInvestments: ["Deal #1", "Deal #8"],
    otherInvestments: ["Dollar Shave Club", "MeUndies", "PlayVS"],
    website: "https://www.science-inc.com",
    description:
      "Science Inc. is a startup studio and venture fund that creates, invests, acquires, and scales successful digital businesses.",
  },
  {
    name: "Gray's Creek Capital Partners",
    logoUrl:
      "https://grayscreekcapital.com/wp-content/uploads/2021/03/cropped-Site-Icon.png",
    totalRoundsParticipated: 1,
    roundsParticipated: ["Deal #12"],
    leadInvestments: [],
    otherInvestments: ["Data not publicly available"],
    website: null,
    description:
      "Gray's Creek Capital Partners is an investment firm focusing on private equity and venture capital investments.",
  },
  {
    name: "Josh Brolin",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_v8k2arE-Pu7z0Vpp2JX8aOsAIsNM5DahEg&s",
    totalRoundsParticipated: 1,
    roundsParticipated: ["Deal #12"],
    leadInvestments: [],
    otherInvestments: ["Data not publicly available"],
    website: null,
    description:
      "Josh Brolin is an actor and producer who has started investing in entertainment and technology startups.",
  },
  {
    name: "DeAndre Hopkins",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/05/DeAndre_Hopkins_2020.jpg",
    totalRoundsParticipated: 1,
    roundsParticipated: ["Deal #12"],
    leadInvestments: [],
    otherInvestments: ["Rockets of Awesome", "BioSteel Sports Nutrition"],
    website: null,
    description:
      "DeAndre Hopkins is a professional NFL player who invests in various startups, particularly in consumer goods.",
  },
  {
    name: "Neal Brennan",
    logoUrl:
      "https://bigthink.com/wp-content/uploads/2023/08/Neal-Brennan-profile-02.jpg?w=512&h=512&crop=1",
    totalRoundsParticipated: 1,
    roundsParticipated: ["Deal #12"],
    leadInvestments: [],
    otherInvestments: ["Data not publicly available"],
    website: "https://www.nealbrennan.com",
    description:
      "Neal Brennan is a comedian, writer, and producer with interests in investing in entertainment-related startups.",
  },
];

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
      animate={{ scale: 1 / getPageScale(8) }}
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
      className="relative w-full h-screen overflow-y-auto bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-blue-500 to-white p-6"
      animate={{ scale: getPageScale(0) }}
    >
      <div className="container mx-auto px-4 py-12">
        <TopInvestors getPageScale={getPageScale} />
      </div>
    </motion.div>
  );
}
