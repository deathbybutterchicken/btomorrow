"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Linkedin,
  ChevronDown,
  ChevronUp,
  Briefcase,
  GraduationCap,
  Zap,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

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
type TimelineEvent = {
  date: string;
  eventName: string;
  category: string;
  eventDescription: string;
  additionalInfo?: {
    image?: {
      url: string;
      alt: string;
      caption?: string;
    };
    video?: {
      url: string;
      title: string;
    };
    dealInfo?: {
      dealTypes?: string;
      dealDate?: string;
      dealStatus?: string;
      financingSource?: string;
      stockSplit?: string;
    };
    companyInfo?: {
      financingStatus?: string;
      businessStatus?: string;
      ceoLeadMGT?: string;
      site?: string;
    };
    totalCapital?: {
      dealAmount?: string;
      preMoneyValuation?: string;
      postValuation?: string;
      totalInvestedCapital?: string;
      raisedToDate?: string;
    };
    equity?: {
      vcRound?: string;
      percentAcquired?: string;
      investorOwnership?: string;
      totalInvestedEquity?: string;
    };
    dealSynopsis?: string;
    investors?: Array<{
      name: string;
      status: string;
      leadSole: string;
      comments: string;
    }>;
  };
};

const INITIAL_BUBBLE_COUNT = 49;
const MID_BUBBLE_COUNT = 20;
const FINAL_BUBBLE_COUNT = 8;

const pages = [
  {
    id: 0,
    title: "POPPI",
    subtitle: "THE GUT-FRIENDLY SODA",
    color: "black",
    textColor: "text-[#355070]",
  },
  {
    id: 1,
    title: "Founder",
    subtitle: "Mike Cessario",
    color: "bg-gradient-to-b from-black via-[#001F3F] to-[#355070]",
    textColor: "text-black",
  },
  {
    id: 2,
    title: "Executive Team",
    subtitle: "Leadership",
    color: "bg-gradient-to-b from-black via-[#001F3F] to-[#355070]",
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

const executives = [
  {
    name: "Allison Ellsworth",
    title: "Co-Founder & Chief Brand Officer",
    image:
      "https://media.licdn.com/dms/image/C5603AQF_nL_mZ52H3A/profile-displayphoto-shrink_200_200/0/1516937333623?e=1699488000&v=beta&t=5jM2kM_PJPFxheV0u3NQi3b-GwG3j2ZUIXf0IEEAuCo",
    experience: [
      "Co-Founder of Poppi",
      "Led brand development and marketing strategies",
      "Featured on Shark Tank and secured investment from Rohan Oza",
    ],
    entrepreneurial: [
      "Created Poppi from a home recipe to a national brand",
      "Pioneered the prebiotic soda category",
    ],
    linkedin: "https://www.linkedin.com/in/allison-ellsworth-352b54147/",
  },
  {
    name: "Stephen Ellsworth",
    title: "Co-Founder & CEO",
    image:
      "https://media.licdn.com/dms/image/C5603AQH-CIfNfi4Wjg/profile-displayphoto-shrink_200_200/0/1607468010408?e=1699488000&v=beta&t=R7ZB0Al_ZZ_Lg1BJ7aXhjxj0xhj6ChyRKZbI6G8zX8E",
    experience: [
      "Co-Founder of Poppi",
      "Oversees company operations and strategic partnerships",
      "Background in sales and entrepreneurship",
    ],
    entrepreneurial: [
      "Scaled Poppi from a kitchen experiment to a multi-million dollar company",
      "Secured partnerships with major retailers nationwide",
    ],
    linkedin: "https://www.linkedin.com/in/stephen-ellsworth-95994a43/",
  },
];

const timelineData: TimelineEvent[] = [
  {
    date: "2015",
    eventName: "Initial Phase",
    category: "Branding & Marketing",
    eventDescription:
      "Stephen and Allison Ellsworth founded the brand in Austin, TX, creating a soda from fruit juice, apple cider vinegar, and inulin prebiotics, sold at Dallas farmer's markets under the name 'Mother Beverages.'",
  },
  {
    date: "2018",
    eventName: "Founder Investment of $100,000",
    category: "Funding",
    eventDescription:
      "Raised $125,000 from friends and family and invested $100,000 into launching the brand, seeking further help from Shark Tank investors.",
    additionalInfo: {
      dealInfo: {
        dealTypes: "Capitalization",
        dealDate: "2018",
        dealStatus: "Completed",
        financingSource: "Individual",
      },
      companyInfo: {
        financingStatus: "Corporation",
        businessStatus: "Startup",
        ceoLeadMGT: "Allison Ellsworth",
        site: "Dallas, TX",
      },
      totalCapital: {
        dealAmount: "£0.10M",
        preMoneyValuation: "£0.38M",
        postValuation: "£0.48M",
        totalInvestedCapital: "£0.10M",
        raisedToDate: "£0.10M",
      },
      equity: {
        percentAcquired: "20.83%",
        totalInvestedEquity: "£0.10M",
      },
      dealSynopsis:
        "The company was capitalized with $125,000 in funding from friends and family on an undisclosed date.",
    },
  },
  {
    date: "2018-12-16",
    eventName: "Shark Tank Appearance",
    category: "Funding",
    eventDescription:
      "Secured $400,000 in exchange for a 25% stake from Rohan Oza, leading to a surge in online traffic and product sell-out.",
    additionalInfo: {
      dealInfo: {
        dealTypes: "Angel (individual)",
        dealDate: "16-Dec-2018",
        dealStatus: "Completed",
        financingSource: "Individual",
      },
      companyInfo: {
        financingStatus: "Venture Capital-Backed",
        businessStatus: "Generating Revenue",
        ceoLeadMGT: "Allison Ellsworth",
        site: "Dallas, TX",
      },
      totalCapital: {
        dealAmount: "£0.31M",
        preMoneyValuation: "£0.94M",
        postValuation: "£1.26M",
        totalInvestedCapital: "£0.31M",
        raisedToDate: "£0.41M",
      },
      equity: {
        vcRound: "Angel",
        percentAcquired: "25.00%",
        totalInvestedEquity: "£0.31M",
      },
      dealSynopsis:
        "The company raised $400,000 of angel funding from Rohan Oza on December 16, 2018, putting the company's pre-money valuation at $1.2 million.",
      investors: [
        {
          name: "Rohan Oza",
          status: "New Investor",
          leadSole: "No",
          comments: "Lead Partner: Rohan Oza, Form of Payment: Cash",
        },
      ],
    },
  },
  {
    date: "2018",
    eventName: "Rebranding to Poppi",
    category: "Branding & Marketing",
    eventDescription:
      "Rebranded from 'Mother Beverages' to 'Poppi' with guidance from Rohan Oza and CAVU Consumer Partners, shifting to vibrant cans with bold fruit imagery.",
  },
  {
    date: "2018",
    eventName: "Launch of Poppi",
    category: "Branding & Marketing",
    eventDescription:
      "Launched with three flavors—Ginger Lemon, Strawberry Vanilla, and Cinnamon Cola—using vibrant branding to appeal to health-conscious consumers.",
  },
  {
    date: "2018",
    eventName: "Sales of $852,000",
    category: "Revenue",
    eventDescription:
      "Generated $852,000 in sales by focusing on regional retail partnerships.",
  },
  {
    date: "2019-06-01",
    eventName: "Seed Funding of $2.5 million",
    category: "Funding",
    eventDescription:
      "Raised $2.5 million to expand product lines and enter new retail markets.",
    additionalInfo: {
      dealInfo: {
        dealTypes: "Early Stage VC",
        dealDate: "01-Jun-2019",
        dealStatus: "Completed",
        financingSource: "Venture Capital",
      },
      companyInfo: {
        financingStatus: "Venture Capital-Backed",
        businessStatus: "Generating Revenue",
        ceoLeadMGT: "Stephen Ellsworth",
        site: "Dallas, TX",
      },
      equity: {
        vcRound: "1st Round",
      },
      dealSynopsis:
        "The company raised an undisclosed amount of venture funding from CAVU Consumer Partners, Plus Capital, and Rocana Ventures in June 2019.",
      investors: [
        {
          name: "CAVU Consumer Partners",
          status: "New Investor",
          leadSole: "No",
          comments: "Lead Partner: Rohan Oza, Form of Payment: Cash",
        },
        {
          name: "Plus Capital",
          status: "New Investor",
          leadSole: "No",
          comments: "Form of Payment: Cash",
        },
        {
          name: "Rocana Ventures Partners",
          status: "New Investor",
          leadSole: "No",
          comments: "Form of Payment: Cash",
        },
      ],
    },
  },
  {
    date: "2019",
    eventName: "Sales of $2.8 million",
    category: "Revenue",
    eventDescription:
      "Increased sales due to broader distribution and strategic pop-up events.",
  },
  {
    date: "2020-01",
    eventName: "Series A Funding of $10 million",
    category: "Funding",
    eventDescription:
      "Secured $10 million to grow direct-to-consumer efforts and expand retail partnerships.",
    additionalInfo: {
      dealInfo: {
        dealTypes: "Series A",
        dealDate: "2020-01",
        dealStatus: "Completed",
        financingSource: "Venture Capital",
      },
      companyInfo: {
        financingStatus: "Venture Capital-Backed",
        businessStatus: "Generating Revenue",
        ceoLeadMGT: "Stephen Ellsworth",
        site: "Dallas, TX",
      },
      totalCapital: {
        dealAmount: "$10 million",
        raisedToDate: "$13.025 million",
      },
      equity: {
        vcRound: "2nd Round",
      },
      dealSynopsis:
        "The company raised $10 million in Series A funding to expand direct-to-consumer efforts and retail partnerships.",
      investors: [
        {
          name: "CAVU Consumer Partners",
          status: "Follow-On Investor",
          leadSole: "Yes",
          comments: "Lead Partner: Rohan Oza, Form of Payment: Cash",
        },
      ],
    },
  },
  {
    date: "2020",
    eventName: "Sales of $8.6 million",
    category: "Revenue",
    eventDescription:
      "Revenue grew as the brand expanded to major retailers and online platforms like Amazon.",
  },
  {
    date: "2020",
    eventName: "Retail Expansion",
    category: "Retail & Distribution",
    eventDescription:
      "Entered over 1,800 retail locations, including Whole Foods, Wegmans, and Sprouts.",
  },
  {
    date: "2021-06",
    eventName: "Series A2 Funding of $13.5 million",
    category: "Funding",
    eventDescription:
      "Raised $13.5 million with investors like Russell Westbrook and The Chainsmokers.",
    additionalInfo: {
      dealInfo: {
        dealTypes: "Series A2",
        dealDate: "17-Oct-2022",
        dealStatus: "Completed",
        financingSource: "Venture Capital",
      },
      companyInfo: {
        financingStatus: "Venture Capital-Backed",
        businessStatus: "Generating Revenue",
        ceoLeadMGT: "Stephen Ellsworth",
        site: "Dallas, TX",
      },
      totalCapital: {
        dealAmount: "£12.38M",
        raisedToDate: "£12.79M",
      },
      equity: {
        vcRound: "2nd Round",
      },
      dealSynopsis:
        "The company raised $13.79 million of Series A venture funding in a deal led by CAVU Consumer Partners. The funds were used to expand distribution, scale the team, and invest in marketing.",
      investors: [
        {
          name: "CAVU Consumer Partners",
          status: "Follow-On Investor",
          leadSole: "Yes",
          comments: "Lead Partner: Rohan Oza, Form of Payment: Cash",
        },
        {
          name: "Russell Westbrook",
          status: "New Investor",
          leadSole: "No",
          comments: "Form of Payment: Cash",
        },
        {
          name: "The Chainsmokers",
          status: "New Investor",
          leadSole: "No",
          comments: "Form of Payment: Cash",
        },
      ],
    },
  },
  {
    date: "2021",
    eventName: "Sales of $31 million",
    category: "Revenue",
    eventDescription:
      "Sales surged due to successful marketing campaigns and retail expansion.",
  },
  {
    date: "2021",
    eventName: "Viral Marketing on TikTok",
    category: "Branding & Marketing",
    eventDescription:
      "Gained over 2 billion views, significantly increasing online searches and purchases.",
  },
  {
    date: "2021",
    eventName: "Expansion to 6,000 Retail Locations",
    category: "Retail & Distribution",
    eventDescription:
      "Expanded to over 6,000 locations, including Sprouts, Safeway, and Kroger.",
  },
  {
    date: "2022-12-13",
    eventName: "Series B Funding of $30 million",
    category: "Funding",
    eventDescription:
      "Raised $30 million, supported by celebrity investors like Priyanka Chopra and Joe Jonas.",
    additionalInfo: {
      dealInfo: {
        dealTypes: "Later Stage VC, Series B",
        dealDate: "13-Dec-2022",
        dealStatus: "Completed",
        financingSource: "Venture Capital",
      },
      companyInfo: {
        financingStatus: "Venture Capital-Backed",
        businessStatus: "Generating Revenue",
        ceoLeadMGT: "Stephen Ellsworth",
        site: "Dallas, TX",
      },
      totalCapital: {
        dealAmount: "£20.76M",
        totalInvestedCapital: "£20.76M",
        raisedToDate: "£33.55M",
      },
      equity: {
        vcRound: "3rd Round",
        totalInvestedEquity: "£20.76M",
      },
      dealSynopsis:
        "The company raised $25 million of Series B venture funding led by CAVU Consumer Partners. Access Capital, Terpsi Capital, Constellation Capital, and Passive Impact also participated.",
      investors: [
        {
          name: "CAVU Consumer Partners",
          status: "Follow-On Investor",
          leadSole: "Yes",
          comments: "Lead Partner: Rohan Oza, Form of Payment: Cash",
        },
        {
          name: "Access Capital",
          status: "New Investor",
          leadSole: "No",
          comments: "Form of Payment: Cash",
        },
      ],
    },
  },
  {
    date: "2022",
    eventName: "Sales of $100 million",
    category: "Revenue",
    eventDescription:
      "Reached $100 million in revenue, driven by health-focused offerings and influencer marketing.",
  },
  {
    date: "2022",
    eventName: "Expansion into 23,000 Retail Stores",
    category: "Retail & Distribution",
    eventDescription:
      "Expanded availability to 23,000 stores, including Amazon, Target, and Whole Foods.",
  },
  {
    date: "2023",
    eventName: "Grassroots Marketing Strategy",
    category: "Branding & Marketing",
    eventDescription:
      "Used organic social and influencer marketing, resulting in 204 million impressions.",
  },
  {
    date: "2023",
    eventName: "Series C Funding of $41.9 million",
    category: "Funding",
    eventDescription:
      "Raised $41.9 million to scale operations and expand product lines.",
    additionalInfo: {
      dealInfo: {
        dealTypes: "Series C",
        dealDate: "2023",
        dealStatus: "Completed",
        financingSource: "Venture Capital",
      },
      companyInfo: {
        financingStatus: "Venture Capital-Backed",
        businessStatus: "Generating Revenue",
        ceoLeadMGT: "Stephen Ellsworth",
        site: "Dallas, TX",
      },
      totalCapital: {
        dealAmount: "$41.9 million",
        raisedToDate: "$98.425 million",
      },
      equity: {
        vcRound: "4th Round",
      },
      dealSynopsis:
        "The company raised $41.9 million in Series C funding to continue scaling operations and further product expansion.",
      investors: [],
    },
  },
  {
    date: "2023",
    eventName: "Sales of $500 million",
    category: "Revenue",
    eventDescription:
      "Achieved $500 million in sales, fueled by retail presence and consumer demand.",
  },
  {
    date: "2023",
    eventName: "Collaboration with Mattel",
    category: "Branding & Marketing",
    eventDescription:
      "Launched a Barbie-themed flavor to target younger consumers.",
    additionalInfo: {
      image: {
        url: "https://www.helloscholar.com//images/pics/600_mkXDPw_final_correct.jpg",
        alt: "Barbie Poppi Collaboration",
        caption:
          "Mattel and Poppi collaborated to launch a Barbie-themed flavor.",
      },
    },
  },
  {
    date: "2023",
    eventName: "Expansion to 35,000 Retail Locations",
    category: "Retail & Distribution",
    eventDescription:
      "Expanded to stores like Walmart, Target, Publix, and Costco.",
  },
  {
    date: "2023",
    eventName: "Celebrity Collaborations",
    category: "Branding & Marketing",
    eventDescription:
      "Partnered with celebrities like Post Malone and Jennifer Lopez to boost appeal.",
    additionalInfo: {
      image: {
        url: "https://www.fb101.com/wp-content/uploads/2024/09/Untitled-23.png",
        alt: "Post Malone Poppi Collaboration",
        caption: "Post Malone and Poppi collaborated to launch a flavor.",
      },
    },
  },
  {
    date: "2023",
    eventName: "Introduction of New Iced Tea Flavors",
    category: "Product",
    eventDescription:
      "Launched flavors like Tropical Punch and Strawberry Vanilla to diversify the product line.",
    additionalInfo: {
      image: {
        url: "https://img.thingtesting.com/brands/i6-poppi/1593086172103.jpg?tr=q-85%2Cdi-missing.png%2Cw-1080%2Ch-1080",
        alt: "Tropical Punch Poppi Collaboration",
        caption: "Poppi launched Tropical Punch flavor.",
      },
    },
  },
  {
    date: "2023",
    eventName: "Miami Pickleball Club Sponsorship",
    category: "Branding & Marketing",
    eventDescription:
      "Became the official beverage sponsor, aligning with the sports community.",
    additionalInfo: {
      image: {
        url: "https://pickleballunion.com/wp-content/uploads/2023/06/Tournament-Preview-14-1536x922.jpg",
        alt: "Miami Pickleball Club Sponsorship",
        caption:
          "Poppi became the official beverage sponsor of the Miami Pickleball Club.",
      },
    },
  },
  {
    date: "2024",
    eventName: "Super Bowl Commercial",
    category: "Branding & Marketing",
    eventDescription:
      "Released the most-watched Super Bowl commercial, reaching 29.1 million viewers.",
    additionalInfo: {
      video: {
        url: "https://www.youtube.com/embed/kwUJq0DA0xo",
        title: "Poppi Super Bowl Commercial",
      },
    },
  },
  {
    date: "2024",
    eventName: "Poppi Mart Event",
    category: "Branding & Marketing",
    eventDescription:
      "Hosted a pop-up experience in Los Angeles featuring a hologram of Allison Ellsworth.",
    additionalInfo: {
      image: {
        url: "https://img-cdn.inc.com/image/upload/f_webp,q_auto,c_fit,w_1024,h_1024/images/panoramic/poppi-paris-hilton-inc_537052_xot1cl.jpg",
        alt: "Poppi Mart Event",
        caption: "Poppi hosted a pop-up event in Los Angeles.",
      },
    },
  },
  {
    date: "Ongoing",
    eventName: "Number One on Amazon",
    category: "Retail & Distribution",
    eventDescription:
      "Became the top-selling soft drink on Amazon with a 19% market share.",
  },
  {
    date: "Ongoing",
    eventName: "Exclusive Merch and Collaborations",
    category: "Branding & Marketing",
    eventDescription:
      "Launched exclusive merchandise and brand collaborations to create buzz.",
  },
  {
    date: "Ongoing",
    eventName: "Rumors of Coca-Cola Acquisition",
    category: "Product",
    eventDescription:
      "Speculations arose about Coca-Cola aiming to acquire Poppi due to its rapid growth.",
  },
  {
    date: "Ongoing",
    eventName: "Expansion to 58,000 Locations",
    category: "Retail & Distribution",
    eventDescription:
      "Projected to be in 58,000 locations with significant market valuation before 2025.",
  },
];

const capitalRaisedData = [
  { date: "2018-12", cumulativeRaised: 0.525 },
  { date: "2019-06", cumulativeRaised: 3.025 },
  { date: "2020-01", cumulativeRaised: 13.025 },
  { date: "2021-06", cumulativeRaised: 26.525 },
  { date: "2022-12-13", cumulativeRaised: 56.525 },
  { date: "2023-06", cumulativeRaised: 98.425 },
];

const valuationData = [
  {
    date: "2018-12-16",
    preMoneyValuation: 1.2,
    postMoneyValuation: 1.6,
  },
  {
    date: "2019-06-01",
    preMoneyValuation: 10,
    postMoneyValuation: 12.5,
  },
  {
    date: "2020-01-01",
    preMoneyValuation: 90,
    postMoneyValuation: 100,
  },
  {
    date: "2021-06-01",
    preMoneyValuation: 200,
    postMoneyValuation: 213.5,
  },
  {
    date: "2022-12-13",
    preMoneyValuation: 300,
    postMoneyValuation: 330,
  },
  {
    date: "2023-06-01",
    preMoneyValuation: 400,
    postMoneyValuation: 441.9,
  },
];

const revenueData = [
  { year: 2018, revenue: 0.852 },
  { year: 2019, revenue: 2.8 },
  { year: 2020, revenue: 8.6 },
  { year: 2021, revenue: 31 },
  { year: 2022, revenue: 100 },
  { year: 2023, revenue: 500 },
];

const ownershipData = [
  {
    date: "2018-12-16",
    foundersOwnership: 75,
    investorsOwnership: 25,
  },
  {
    date: "2019-06-01",
    foundersOwnership: 60,
    investorsOwnership: 40,
  },
  {
    date: "2020-01-01",
    foundersOwnership: 50,
    investorsOwnership: 50,
  },
  {
    date: "2021-06-01",
    foundersOwnership: 45,
    investorsOwnership: 55,
  },
  {
    date: "2022-12-13",
    foundersOwnership: 40,
    investorsOwnership: 60,
  },
  {
    date: "2023-06-01",
    foundersOwnership: 35,
    investorsOwnership: 65,
  },
];

const topInvestors = [
  {
    name: "CAVU Consumer Partners",
    logoUrl:
      "https://media.licdn.com/dms/image/v2/C4E0BAQFMd0Vu4QPdfg/company-logo_200_200/company-logo_200_200/0/1661386855794/cavu_consumer_partners_logo?e=2147483647&v=beta&t=fGcgfOMsC28xg9UQ2xyps566qA_09iX0AQpfX4lYt1g",
    totalRoundsParticipated: 4,
    roundsParticipated: ["Seed Funding", "Series A", "Series A2", "Series B"],
    leadInvestments: ["Series B"],
    otherInvestments: ["Once Upon a Farm", "Vital Proteins", "Hippeas"],
    website: "https://cavuconsumerpartners.com",
    description:
      "CAVU Consumer Partners is a venture capital firm focused on investing in and building brands in the consumer products space.",
  },
  {
    name: "Rohan Oza",
    logoUrl:
      "https://media.licdn.com/dms/image/D4E03AQEotLCqwtw1iQ/profile-displayphoto-shrink_200_200/0/1663713516288?e=2147483647&v=beta&t=Yx4ELmrADaI-5kNqiwqIZ3OGyt-boed7f87lAL6oCkc",
    totalRoundsParticipated: 3,
    roundsParticipated: ["Shark Tank Investment", "Seed Funding", "Series A"],
    leadInvestments: ["Shark Tank Investment"],
    otherInvestments: ["Vitamin Water", "Bai Brands", "Smartwater"],
    website: "https://www.cavuconsumerpartners.com/team/rohan-oza/",
    description:
      "Rohan Oza is a consumer products veteran known for his expertise in branding and marketing iconic brands.",
  },
  {
    name: "Russell Westbrook",
    logoUrl:
      "https://hips.hearstapps.com/hmg-prod/images/gettyimages-1233178477.jpg",
    totalRoundsParticipated: 1,
    roundsParticipated: ["Series A2"],
    leadInvestments: [],
    otherInvestments: ["Health House", "Varo Bank"],
    website: null,
    description:
      "Russell Westbrook is a professional NBA player and investor in various startups.",
  },
  {
    name: "The Chainsmokers",
    logoUrl:
      "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72ce348615b7c6d0230922c7deb",
    totalRoundsParticipated: 1,
    roundsParticipated: ["Series A2"],
    leadInvestments: [],
    otherInvestments: ["FitOn", "LoanSnap"],
    website: null,
    description:
      "The Chainsmokers are an electronic DJ and production duo investing through their venture fund Mantis VC.",
  },
  {
    name: "Priyanka Chopra",
    logoUrl:
      "https://cdn.britannica.com/82/220482-050-17843B41/Priyanka-Chopra-2020.jpg",
    totalRoundsParticipated: 1,
    roundsParticipated: ["Series B"],
    leadInvestments: [],
    otherInvestments: ["Bumble", "Holberton School"],
    website: null,
    description:
      "Priyanka Chopra is an actress and producer investing in technology and consumer brands.",
  },
];

function WelcomePage() {
  return (
    <div className="flex items-center justify-center h-full w-full p-8 bg-orange-50 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute right-0 top-0 w-96 h-96">
        <div className="absolute left-0 top-[37.60px] w-96 h-96 bg-gradient-to-b from-pink-400 to-orange-300 rounded-full blur-3xl" />
        <div className="absolute left-[192.60px] top-0 w-96 h-96 bg-gradient-to-b from-pink-500 via-orange-400 to-slate-500 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center z-10">
        <h1 className="text-9xl font-extrabold font-['Montserrat'] text-black mb-8">
          WELCOME
        </h1>
        <div className="space-y-2 mb-12 text-center">
          <p className="text-3xl text-pink-500 font-medium font-['Montserrat'] leading-10">
            Insurgent Beverage Brands
          </p>
          <p className="text-3xl text-pink-500 font-medium font-['Montserrat'] leading-10">
            Retail Growth Analysis
          </p>
        </div>
        <div className="flex items-center space-x-8 mt-16">
          <Image
            src="/btomoow-logo.png"
            alt="Btomoow Ventures"
            width={247}
            height={55}
            style={{ objectFit: "contain" }}
          />
          <Image
            src="/escp-logo.png"
            alt="ESCP Business School"
            width={139}
            height={64}
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
}

function AgendaPage() {
  return (
    <div className="flex items-center justify-center h-full w-full p-8 bg-orange-50 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute right-0 top-0 w-96 h-96">
        <div className="absolute left-0 top-[37.60px] w-96 h-96 bg-gradient-to-b from-pink-400 to-orange-300 rounded-full blur-3xl" />
        <div className="absolute left-[192.60px] top-0 w-96 h-96 bg-gradient-to-b from-pink-500 via-orange-400 to-slate-500 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center z-10">
        <h2 className="text-6xl font-bold mb-12 text-pink-500 font-['Montserrat']">
          The Agenda
        </h2>
        <ol className="list-decimal list-inside space-y-6 text-2xl font-['Montserrat']">
          <li>Introduction</li>
          <li>How we reached here</li>
          <li>Liquid Death Deep Dive</li>
          <li>Poppi Deep Dive</li>
          <li>Key Insights and Success Factors</li>
        </ol>
      </div>
    </div>
  );
}
function AnalyticsDashboard() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const renderCard = (
    index: number,
    title: string,
    description: string,
    content: React.ReactNode
  ) => {
    const isExpanded = expandedCard === index;
    return (
      <Card
        className={`bg-white/10 backdrop-blur-lg border-gray-700 cursor-pointer transition-all duration-300 ease-in-out ${
          isExpanded ? "md:col-span-2 md:row-span-2" : ""
        }`}
        onClick={() => toggleExpand(index)}
      >
        <CardHeader>
          <CardTitle className="text-white">{title}</CardTitle>
          <CardDescription className="text-gray-400">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent
          className={`transition-all duration-300 ease-in-out ${
            isExpanded ? "h-[600px]" : "h-[300px]"
          }`}
        >
          {content}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-[#001F3F] bg-[length:100%_200%] animate-gradient">
      <div className="max-w-7xl mx-auto space-y-8 p-8">
        <h1 className="text-4xl font-bold text-white mb-8">
          Liquid Death Analytics Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-auto">
          {renderCard(
            0,
            "Capital Raised Over Time",
            "Cumulative funds raised in millions GBP",
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={capitalRaisedData}>
                <XAxis dataKey="date" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#333", border: "none" }}
                  labelStyle={{ color: "#fff" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Line
                  type="monotone"
                  dataKey="cumulativeRaised"
                  stroke="#2A9D8F"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          )}

          {renderCard(
            1,
            "Valuation Over Time",
            "Pre-money and post-money valuations in millions GBP",
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={valuationData}>
                <XAxis dataKey="date" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#333", border: "none" }}
                  labelStyle={{ color: "#fff" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Line
                  type="monotone"
                  dataKey="preMoneyValuation"
                  stroke="#E9C46A"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="postMoneyValuation"
                  stroke="#F4A261"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          )}

          {renderCard(
            2,
            "Revenue Growth",
            "Annual revenue in millions GBP",
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <XAxis dataKey="year" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#333", border: "none" }}
                  labelStyle={{ color: "#fff" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Bar dataKey="revenue" fill="#E76F51" />
              </BarChart>
            </ResponsiveContainer>
          )}

          {renderCard(
            3,
            "Ownership Dilution",
            "Founders vs Investors ownership percentage",
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ownershipData}>
                <XAxis dataKey="date" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#333", border: "none" }}
                  labelStyle={{ color: "#fff" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Area
                  type="monotone"
                  dataKey="foundersOwnership"
                  stackId="1"
                  stroke="#264653"
                  fill="#264653"
                />
                <Area
                  type="monotone"
                  dataKey="investorsOwnership"
                  stackId="1"
                  stroke="#2A9D8F"
                  fill="#2A9D8F"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}

function TopInvestors() {
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
              <div className="mt-8 space-y-4">
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
    <div className="min-h-screen bg-orange-50 text-black p-8">
      <div className="max-w-7xl mx-auto">
        {/* Title with same font and styling as welcome page */}
        <div className="text-left mb-12">
          <h2 className="text-[10vw] sm:text-[6vw] font-bold text-black tracking-tight whitespace-nowrap overflow-hidden font-['PP_Mori',sans-serif] mb-4">
            NOTED INVESTORS
          </h2>
        </div>

        {/* Investor cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topInvestors.map((investor, index) => (
            <InvestorCard key={index} investor={investor} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TimelineItem({
  event,
  isExpanded,
  onToggle,
}: {
  event: TimelineEvent;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex">
      <div className="flex flex-col items-center mr-4">
        <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full">
          <span className="text-white text-sm font-medium text-center">
            {event.date}
          </span>
        </div>
        <div className="w-px h-full bg-white/20"></div>
      </div>
      <div className="pb-8 w-full">
        <motion.div
          className="flex flex-col bg-white/10 backdrop-filter backdrop-blur-lg border border-white/20 p-4 rounded-lg shadow"
          initial={false}
          animate={{ height: isExpanded ? "auto" : "auto" }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">
              {event.eventName}
            </h3>
            {event.additionalInfo && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="text-white hover:bg-white/20"
              >
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
          <span className="text-sm text-white/70 mb-2">{event.category}</span>
          <p className="text-white/90">{event.eventDescription}</p>
          <AnimatePresence>
            {isExpanded && event.additionalInfo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AdditionalInfo info={event.additionalInfo} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

function AdditionalInfo({
  info,
}: {
  info: NonNullable<TimelineEvent["additionalInfo"]>;
}) {
  // Helper function to format property names
  const formatPropertyName = (key: string): string => {
    // Split by capital letters or underscores
    const words = key.split(/(?=[A-Z])|_/);
    // Capitalize first letter of each word and join with spaces
    return words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <Card className="w-full bg-white/10 backdrop-filter backdrop-blur-lg border border-white/20">
      <CardContent className="space-y-6">
        {/* Video Card - Only renders if info.video exists */}
        {info.video && (
          <Card className="bg-white/10 border-white/20 overflow-hidden">
            <CardContent>
              <div
                className="relative w-full"
                style={{ paddingBottom: "56.25%" }}
              >
                <iframe
                  src={info.video.url}
                  title={info.video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full rounded-md"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Image Card - Only renders if info.image exists */}
        {info.image && (
          <Card className="bg-white/10 border-white/20 overflow-hidden">
            <CardContent>
              <div className="relative w-fit mx-auto">
                <Image
                  src={info.image.url}
                  alt={info.image.alt}
                  width={500} // You can adjust these values
                  height={300} // based on your needs
                  className="object-contain rounded-md"
                />
              </div>
              {info.image.caption && (
                <p className="mt-2 text-sm text-white/70 text-center">
                  {info.image.caption}
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Deal Details and Company Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {info.dealInfo && (
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-lg text-white">
                  Deal Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-white/90">
                {Object.entries(info.dealInfo).map(([key, value]) => (
                  <p key={key}>
                    <span className="font-semibold">
                      {formatPropertyName(key)}:
                    </span>{" "}
                    {key === "status" ? <Badge>{value}</Badge> : value}
                  </p>
                ))}
              </CardContent>
            </Card>
          )}
          {info.companyInfo && (
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-lg text-white">
                  Company Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-white/90">
                {Object.entries(info.companyInfo).map(([key, value]) => (
                  <p key={key}>
                    <span className="font-semibold">
                      {formatPropertyName(key)}:
                    </span>{" "}
                    {value}
                  </p>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        <Separator className="bg-white/20" />

        {/* Capital and Equity Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {info.totalCapital && (
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-lg text-white">
                  Capital Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-white/90">
                {Object.entries(info.totalCapital).map(([key, value]) => (
                  <p key={key}>
                    <span className="font-semibold">
                      {formatPropertyName(key)}:
                    </span>{" "}
                    {value}
                  </p>
                ))}
              </CardContent>
            </Card>
          )}
          {info.equity && (
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-lg text-white">
                  Equity Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-white/90">
                {Object.entries(info.equity).map(([key, value]) => (
                  <p key={key}>
                    <span className="font-semibold">
                      {formatPropertyName(key)}:
                    </span>{" "}
                    {value}
                  </p>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        <Separator className="bg-white/20" />

        {/* Deal Synopsis */}
        {info.dealSynopsis && (
          <Card className="bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-lg text-white">
                Deal Synopsis
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white/90">
              <p>{info.dealSynopsis}</p>
            </CardContent>
          </Card>
        )}

        <Separator className="bg-white/20" />

        {/* Investors */}
        {info.investors && (
          <Card className="bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-lg text-white">Investors</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {info.investors.map((investor, index) => (
                  <AccordionItem
                    value={`item-${index}`}
                    key={index}
                    className="border-white/20"
                  >
                    <AccordionTrigger className="text-white hover:text-white/80">
                      {investor.name}
                    </AccordionTrigger>
                    <AccordionContent className="text-white/90">
                      <div className="space-y-2">
                        <p>
                          <span className="font-semibold">Status:</span>{" "}
                          <Badge variant="secondary">{investor.status}</Badge>
                        </p>
                        <p>
                          <span className="font-semibold">Lead/Sole:</span>{" "}
                          {investor.leadSole}
                        </p>
                        <p>
                          <span className="font-semibold">Comments:</span>{" "}
                          {investor.comments}
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}

export function PoppiLanding() {
  const [currentPage, setCurrentPage] = useState(1);
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [bubbleStage, setBubbleStage] = useState(0);

  useEffect(() => {
    console.log("Current page:", currentPage);
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
    const pageProgress = scrollPosition * (pages.length - 1);
    const distanceFromCurrentPage = Math.abs(pageProgress - index);
    const scale = 1 - Math.min(distanceFromCurrentPage, 1) * 0.1;
    return scale;
  };

  const getBorderRadius = (index: number) => {
    const pageProgress = scrollPosition * (pages.length - 1);
    const distanceFromCurrentPage = Math.abs(pageProgress - index);
    const radius = Math.min(distanceFromCurrentPage, 1) * 40;
    return `${radius}px`;
  };

  const categories = useMemo(() => {
    return Array.from(new Set(timelineData.map((event) => event.category)));
  }, []);

  const filteredEvents = useMemo(() => {
    if (!selectedCategory) return timelineData;
    return timelineData.filter((event) => event.category === selectedCategory);
  }, [selectedCategory]);

  const getBubbleCount = () => {
    switch (bubbleStage) {
      case 0:
        return INITIAL_BUBBLE_COUNT;
      case 1:
        return MID_BUBBLE_COUNT;
      case 2:
        return FINAL_BUBBLE_COUNT;
      default:
        return INITIAL_BUBBLE_COUNT;
    }
  };

  const gridColumns = Math.max(2, Math.ceil(Math.sqrt(getBubbleCount())));

  const allBrandLogos = [
    "ALANI_NU.png",
    "ATHLETIC_BREWING_CO.png",
    "A_SHOC.png",
    "BEATBOX_BEVERAGES.png",
    "BIOLYTE.png",
    "BUzzBallz.png",
    "Black_Rifle_Coffee_Company.png",
    "Boba_Protein.png",
    "Bobby.png",
    "Bota_Box.png",
    "Bread_and_Butter_wines.png",
    "Bubly.png",
    "Califia_Farms.png",
    "Canopy_Brands.png",
    "Celestial_Seasonings.png",
    "Cellucor.png",
    "Celsius.png",
    "Cirkul.png",
    "Cutwater_Spirits.png",
    "De_La_Calle_Tepache.png",
    "Drift_West_Water_Kefir.png",
    "GHOST_Energy.png",
    "GT's.png",
    "Guayaki.png",
    "HOP_WTR.png",
    "Happy_Dad_Hard_Seltzer.png",
    "Health-Ade_Kombucha.png",
    "High_Brew_Coffee.png",
    "Honest_Tea.png",
    "Hydrant.png",
    "Lemon_Perfect.png",
    "Liquid_Death.png",
    "Lyre's_Non-Alcoholic_Spirits.png",
    "MIKE'S.png",
    "Malk_Organics.png",
    "OLIPOP.png",
    "Oatly.png",
    "Odwalla.png",
    "Poppi.png",
    "REMEDY_ORGANICS.png",
    "Rebel_Energy_Drink.png",
    "Recess.png",
    "Ripple.png",
    "Ritual_Zero_Proof.png",
    "Rowdy_Energy.png",
    "SCHILLING_CIDER.png",
    "Teremana_Tequila.png",
    "The_Finnish_Long_Drink.png",
    "Three_Spirit.png",
  ];

  const finalEightLogos = [
    "Poppi.png",
    "ATHLETIC_BREWING_CO.png",
    "De_La_Calle_Tepache.png",
    "Liquid_Death.png",
    "Cellucor.png",
    "Biolyte.png",
    "Lemon_Perfect.png",
    "OLIPOP.png",
    "Hint_Water.png",
  ];

  const getLogosForStage = (stage: number) => {
    switch (stage) {
      case 0:
        return allBrandLogos;
      case 1:
        return allBrandLogos.slice(0, MID_BUBBLE_COUNT);
      case 2:
        return finalEightLogos;
      default:
        return allBrandLogos;
    }
  };

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-auto snap-y snap-mandatory custom-scrollbar"
    >
      {pages.map((page, index) => {
        return (
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
              <motion.div
                className="relative w-full h-full overflow-hidden"
                animate={{ scale: 1 / getPageScale(index) }}
              >
                {/* Main Heading */}
                <div className="absolute inset-x-0 top-0 p-4 sm:p-8 flex justify-center">
                  <h1 className="text-[12vw] sm:text-[10vw] font-bold text-black tracking-tight whitespace-nowrap overflow-hidden text-center">
                    POPPI
                  </h1>
                </div>

                {/* Product Image and Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  <div className="flex flex-col items-center justify-between w-full max-w-7xl">
                    <div className="relative w-1/2 max-w-xl aspect-[3/2] mb-8">
                      <Image
                        src="/poppilanding.png"
                        alt="Poppi Landing Image"
                        layout="fill"
                        objectFit="contain"
                        priority
                      />
                    </div>
                    <div className="w-full text-center">
                      <h2 className="font-poppins text-[6vw] sm:text-[4vw] font-bold tracking-tight whitespace-nowrap overflow-hidden">
                        THE GUT-FRIENDLY SODA
                      </h2>
                      <h2
                        className="text-[6vw] sm:text-[4vw] font-bold text-[#355070] tracking-tight whitespace-nowrap overflow-hidden"
                        style={{ lineHeight: "1" }}
                      >
                        {" "}
                      </h2>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : index === 1 ? (
              <motion.div
                className="w-full h-full overflow-y-auto bg-white text-black font-['PP_Mori',sans-serif]"
                animate={{ scale: 1 / getPageScale(index) }}
              >
                <div className="container mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl w-full">
                    <Card className="bg-[rgb(38,70,83)] text-white">
                      <CardContent className="p-6">
                        <div className="flex flex-col">
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
                              Co-Founder & Chief Brand Officer
                            </span>
                          </div>
                          <h2 className="text-4xl font-bold mb-6">
                            Allison Ellsworth
                          </h2>
                          <div className="mb-6">
                            <h3 className="text-2xl font-bold mb-4">
                              Education
                            </h3>
                            <p className="text-lg leading-relaxed mb-2">
                              <span className="font-semibold">
                                Bachelor's Degree:
                              </span>{" "}
                              Bachelor of Arts (BA) in Sociology from the
                              University of North Texas.
                            </p>
                          </div>
                          <div className="mb-6">
                            <h3 className="text-2xl font-bold mb-4">
                              Professional Background
                            </h3>
                            <ul className="list-disc list-inside text-lg leading-relaxed mb-2">
                              <li>
                                Spent nearly seven years in oil and gas
                                research, traveling across the U.S.
                              </li>
                              <li>
                                Developed negotiation skills working with
                                landowners, government officials, and various
                                community groups.
                              </li>
                            </ul>
                          </div>
                          <div className="mb-6">
                            <h3 className="text-2xl font-bold mb-4">Socials</h3>
                            <div className="flex space-x-4">
                              <Link
                                href="https://x.com/drinkpoppi"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-gray-300"
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
                              <Link
                                href="https://www.linkedin.com/in/allison-ellsworth-50528a27/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-gray-300"
                              >
                                <Linkedin className="w-6 h-6" />
                                <span className="sr-only">LinkedIn</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-[rgb(33,48,55)] text-white">
                      <CardContent className="p-6">
                        <div className="flex flex-col">
                          <div className="flex items-center mb-4">
                            <svg
                              className="w-6 h-6 mr-2"
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
                              Co-Founder & Chief Product Officer
                            </span>
                          </div>
                          <h2 className="text-4xl font-bold mb-6">
                            Stephen Ellsworth
                          </h2>
                          <div className="mb-6">
                            <h3 className="text-2xl font-bold mb-4">
                              Education
                            </h3>
                            <p className="text-lg leading-relaxed mb-2">
                              <span className="font-semibold">
                                Bachelor's Degree:
                              </span>{" "}
                              Bachelor of Science (BS) in Business/Corporate
                              Communications from the University of Utah.
                            </p>
                          </div>
                          <div className="mb-6">
                            <h3 className="text-2xl font-bold mb-4">
                              Professional Background
                            </h3>
                            <ul className="list-disc list-inside text-lg leading-relaxed mb-2">
                              <li>
                                Worked in the oil and gas sector, focusing on
                                project management and GIS mapping.
                              </li>
                              <li>
                                His interest in health sparked the development
                                of Poppi, inspired by the benefits of apple
                                cider vinegar.
                              </li>
                            </ul>
                          </div>
                          <div className="mb-6">
                            <h3 className="text-2xl font-bold mb-4">Socials</h3>
                            <div className="flex space-x-4">
                              <Link
                                href="https://x.com/drinkpoppi"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-gray-300"
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
                              <Link
                                href="https://www.linkedin.com/in/stephenellsworth/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-gray-300"
                              >
                                <Linkedin className="w-6 h-6" />
                                <span className="sr-only">LinkedIn</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-[rgb(172,208,223)] text-black">
                      <CardContent className="p-6">
                        <div className="flex flex-col">
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
                            <h3 className="text-lg font-semibold mb-2">
                              Inspiration
                            </h3>
                            <ul className="list-disc list-inside text-lg leading-relaxed">
                              <li>
                                Inspired by Allison's health journey and the
                                benefits of apple cider vinegar.
                              </li>
                              <li>
                                The couple's vision for Poppi combines
                                health-conscious living with innovative product
                                development.
                              </li>
                            </ul>
                          </div>
                          <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">
                              Public Presence
                            </h3>
                            <ul className="list-disc list-inside text-lg leading-relaxed">
                              <li>
                                Active on social media, especially TikTok, where
                                Poppi's content often goes viral.
                              </li>
                              <li>
                                Featured on podcasts like "Win the Day" and "The
                                Kara Goldin Show."
                              </li>
                              <li>
                                Their entrepreneurial journey has garnered
                                awards for Poppi's innovative branding.
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-[#264653] text-white">
                      <CardContent className="p-6">
                        <div
                          className="relative w-full h-0"
                          style={{ paddingBottom: "80%" }}
                        >
                          <Image
                            src="https://imageio.forbes.com/specials-images/imageserve/6396c40d856e870c3a3405cb/5J6A0198/960x0.jpg?format=jpg&width=960"
                            alt="Ellsworth"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            ) : index === 2 ? (
              <motion.div
                className="relative min-h-screen p-6 pb-24 overflow-y-auto hide-scrollbar"
                animate={{ scale: 0.95 / getPageScale(index) }}
              >
                {/* Title Section */}
                <div className="text-left mb-12 pt-8">
                  <h2 className="text-[12vw] sm:text-[8vw] font-bold text-white tracking-tight whitespace-nowrap overflow-hidden font-['PP_Mori',sans-serif] mb-4">
                    LEADERSHIP
                  </h2>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto pb-24 relative z-0">
                  {[
                    {
                      name: "Graham Goeppert",
                      title: "SVP of eCommerce",
                      education:
                        "Bachelor of Arts (BA), Communication, UC Santa Barbara",
                      professionalBackground: [
                        "Senior Director of eCommerce at ONE Brands: Managed eCommerce strategies to boost sales and brand visibility.",
                        "Director of eCommerce at ONE Brands: Developed and executed eCommerce plans to drive growth.",
                        "Senior Manager - eCommerce at CytoSport, Inc.: Led eCommerce initiatives to enhance online sales.",
                        "Sports Marketing at CytoSport, Inc.: Focused on marketing strategies within the sports nutrition sector.",
                      ],
                      entrepreneurialCareer: [
                        "SVP of Digital Commerce & Media at Poppi: Leading digital commerce and media strategies to drive brand growth.",
                        "VP of Digital Commerce & Media at Poppi: Oversaw digital marketing and eCommerce initiatives, significantly enhancing online presence.",
                      ],
                      linkedin: "https://www.linkedin.com/in/grahamgoeppert/",
                      image:
                        "https://media.licdn.com/dms/image/v2/C4E03AQFu4Sd6LvKFLw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1601817103173?e=2147483647&v=beta&t=t86Pu1CedRhvGhJTCaJQBHU3T-f7kLFz2pmF3r2Yk8g",
                    },
                    {
                      name: "Matthew Nystrom",
                      title: "VP Field Sales",
                      education:
                        "BBA, Marketing, University of Oklahoma - Price College of Business\nMBA, Marketing, University of Oklahoma - Price College of Business",
                      professionalBackground: [
                        "National Account Manager at Keurig Dr Pepper Inc.: Managed key accounts and developed strategic partnerships.",
                        "RTM Commercial Senior Manager at Keurig Dr Pepper Inc.: Focused on enhancing market penetration and distribution strategies.",
                        "Allied Brands Portfolio Manager at Dr Pepper Snapple Group: Oversaw brand management for various allied brands.",
                        "Sales Management Roles at Red Bull, Function Drinks, Coast Brands Group, and Pepsi Bottling Group: Developed expertise in national account management and regional sales leadership.",
                      ],
                      entrepreneurialCareer: [
                        "Vice President of Field Sales at Poppi: Currently leading field sales initiatives and strategies.",
                      ],
                      linkedin:
                        "https://www.linkedin.com/in/matthew-nystrom-a5997313/",
                      image:
                        "https://media.licdn.com/dms/image/v2/D5603AQHENzWVInvEyA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1691892854145?e=2147483647&v=beta&t=ZuYzHqd9siXrD4U68iiDqTXzv13fNuMjkZ291cOn03c",
                    },
                    {
                      name: "Andy Judd",
                      title: "Chief Marketing Officer",
                      education:
                        "BS Business, Marketing and HR, Central Washington University",
                      professionalBackground: [
                        "Chief Commercial Officer at Laird Superfood: Led commercial strategy and operations for a health-focused food and beverage company, driving growth and market expansion.",
                        "Chief Marketing Officer at Yasso, Inc.: Oversaw marketing strategies for a leading frozen yogurt brand, focusing on brand positioning and consumer engagement.",
                        "Chief Marketing Officer at ONE Brands: Developed and executed marketing initiatives for a protein bar brand, enhancing brand visibility and sales.",
                        "Vice President of Marketing at Pinnacle Foods: Managed marketing efforts for Boulder Brands, concentrating on product innovation and market strategies.",
                        "Director of Marketing at Saputo Inc.: Managed product development and marketing for ice cream and value-added milk products, with previous experience in marketing roles at Dean Foods and Campbell Soup Company.",
                      ],
                      entrepreneurialCareer: [
                        "Community Engagement and Brand Building: Actively involved in building community relationships through initiatives with Naturally Boulder, serving as a board member from January 2019 to December 2022.",
                        "Influencer Marketing Strategy: Recognized the importance of influencer partnerships in enhancing brand awareness and consumer connection, integrating this approach into Poppi's overall marketing strategy.",
                      ],
                      linkedin: "https://www.linkedin.com/in/andy-judd/",
                      image:
                        "https://brand-innovators.com/wp-content/uploads/2024/04/IMG_3185-e1713794079697.jpg",
                    },
                    {
                      name: "Chris Hall",
                      title: "Chief Executive Officer",
                      education:
                        "BS Business, Marketing and HR, Central Washington University",
                      professionalBackground: [
                        "Chief Executive Officer at Talking Rain Beverage Company: Oversaw all aspects of the company, driving sustainable growth and expanding the beverage portfolio. Under his leadership, Sparkling Ice became the #1 selling sparkling water brand in the U.S.",
                        "Chief Operating Officer at Talking Rain Beverage Company: Managed day-to-day operations and strategic initiatives to enhance efficiency and product innovation.",
                        "Vice President of Sales at Talking Rain Beverage Company: Developed and executed sales strategies that contributed to significant revenue growth and market penetration.",
                        "Sonar Technician Submarines - 2nd Class Petty Officer at U.S. Navy: Served on nuclear submarines, demonstrating leadership and technical skills in a high-pressure environment.",
                      ],
                      entrepreneurialCareer: [
                        "Innovation Leadership: Instrumental in launching new beverage brands under the Talking Rain portfolio, including Talking Rain AQA and Sparkling Ice Spiked, focusing on market trends and consumer preferences.",
                        "Community Engagement: Committed to corporate social responsibility, leading initiatives that support local communities and nonprofits through partnerships and charitable contributions.",
                      ],
                      linkedin:
                        "https://www.linkedin.com/in/chris-swenson-hall/",
                      image:
                        "https://media.licdn.com/dms/image/v2/D5603AQH_n23h6KMKjA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1727459826839?e=2147483647&v=beta&t=1JSolBtPRB1OPANcBD5mZhv9eNOAzm-L8gBuekRMpWc",
                    },
                    {
                      name: "Joshua Gittler",
                      title: "Chief Financial Officer",
                      education:
                        "BS, Finance and International Business, Penn State University\nMBA, Investment Banking Immersion, Cornell Johnson Graduate School of Management",
                      professionalBackground: [
                        "Chief Financial Officer at Poppi Beverages: Currently overseeing financial operations and strategic planning to promote growth in the health beverage market.",
                        "CFO at Nutrabolt: Managed financial strategy and operations for a leading sports nutrition company, enhancing profitability and efficiency.",
                        "Senior Vice President of Finance & Corporate Development at NBG Home: Led financial planning, treasury functions, and corporate development for a global home décor company.",
                        "Head of Corporate Finance at Amplify Snack Brands: Directed corporate finance functions, playing a key role in the company's $1.6 billion sale to Hershey.",
                        "Investment Banking Experience: Held senior roles in investment banking at Jefferies & Company, TD Securities, and J.P. Morgan, focusing on mergers, acquisitions, and capital raising.",
                      ],
                      entrepreneurialCareer: [
                        "Financial Leadership in Beverage Industry: Actively involved in shaping financial strategies that support growth initiatives within the beverage sector, leveraging extensive experience to drive operational success.",
                        "M&A Expertise: Demonstrated success in leading significant mergers and acquisitions, enhancing company value through strategic financial planning and execution.",
                      ],
                      linkedin:
                        "https://www.linkedin.com/in/joshua-gittler-65638b10/",
                      image:
                        "https://images.crunchbase.com/image/upload/c_thumb,h_256,w_256,f_auto,g_face,z_0.7,q_auto:eco,dpr_1/a5vayxn2mar1alsemg4m",
                    },
                    {
                      name: "Bridget McCarthy Lasda",
                      title: "Chief Sales Officer",
                      education:
                        "BS, Special Education, Penn State University\nMBA, Emory University - Goizueta Business School",
                      professionalBackground: [
                        "Chief Sales Officer at Poppi Beverages: Leads sales strategies and initiatives to drive revenue growth and enhance market presence, focusing on building relationships with retailers and distributors.",
                        "Chief Customer Officer at King Juice Co./Calypso Lemonade: Oversaw customer relations and sales strategies, improving brand visibility and driving sales growth for Calypso Lemonade.",
                        "Vice President of National Sales at The HEINEKEN Company: Led a national sales force, developed customer segmentation strategies, and enhanced joint business planning capabilities, significantly improving market rankings.",
                        "Vice President of Sales at The Coca-Cola Company: Managed Coca-Cola's business with Target, overseeing substantial annual retail sales and motivating a cross-functional team for growth strategy development.",
                        "Vice President of Category Commercialization at The Coca-Cola Company: Directed the development and implementation of commercial business plans, negotiating distribution agreements and guiding strategy for multiple brands.",
                      ],
                      entrepreneurialCareer: [
                        "Sales Leadership in Beverage Innovation: Bridget has consistently focused on building strong relationships with retailers and enhancing brand visibility in competitive markets. His leadership has been instrumental in driving significant revenue growth across various beverage brands.",
                        "Community Engagement and Diversity Initiatives: At HEINEKEN, she led the re-launch of the Women's Leadership Forum, promoting gender diversity within the organization and enhancing business performance through inclusive practices.",
                      ],
                      linkedin: "https://www.linkedin.com/in/bridgetmlasda/",
                      image:
                        "https://media.licdn.com/dms/image/v2/D4E03AQGjPcY0qNVxlA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1728096377731?e=2147483647&v=beta&t=pMHdRrFTA4pVshSslxHStuQyc-vPir7V8AAdVtl3ubE",
                    },
                  ].map((exec, index) => (
                    <Card
                      key={index}
                      className="overflow-hidden bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-lg border border-white border-opacity-20 h-full"
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-3xl font-bold text-white">
                              {exec.name}
                            </CardTitle>
                            <p className="text-lg text-white opacity-90">
                              {exec.title}
                            </p>
                            <Link
                              href={exec.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center mt-2 text-white hover:text-blue-200"
                            >
                              <Linkedin className="w-5 h-5 mr-1" />
                              LinkedIn Profile
                            </Link>
                          </div>
                          <Avatar className="w-24 h-24 border-2 border-white">
                            <AvatarImage src={exec.image} alt={exec.name} />
                            <AvatarFallback>
                              <User className="w-12 h-12 text-white" />
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {exec.education && (
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <GraduationCap className="w-5 h-5 text-white" />
                              <p className="text-white">{exec.education}</p>
                            </div>
                          </div>
                        )}
                        {exec.professionalBackground && (
                          <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-white">
                              Professional Background
                            </h3>
                            <ul className="list-disc list-inside text-white">
                              {exec.professionalBackground.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {exec.entrepreneurialCareer && (
                          <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-white">
                              Entrepreneurial Career
                            </h3>
                            <ul className="list-disc list-inside text-white">
                              {exec.entrepreneurialCareer.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            ) : index === 3 ? (
              <motion.div
                className="w-full h-full overflow-y-auto bg-black text-white"
                animate={{ scale: 1 / getPageScale(index) }}
              >
                <div className="container mx-auto p-4 min-h-screen">
                  <h2 className="text-[12vw] sm:text-[8vw] font-bold text-white tracking-tight whitespace-nowrap overflow-hidden font-['PP_Mori',sans-serif] mb-4">
                    THE JOURNEY
                  </h2>

                  <div className="mb-6 flex flex-wrap gap-2">
                    <Button
                      variant={
                        selectedCategory === null ? "default" : "outline"
                      }
                      onClick={() => setSelectedCategory(null)}
                      className="bg-white/10 backdrop-filter backdrop-blur-lg border border-white/20 text-white hover:bg-white/20"
                    >
                      All
                    </Button>
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={
                          selectedCategory === category ? "default" : "outline"
                        }
                        onClick={() => setSelectedCategory(category)}
                        className="bg-white/10 backdrop-filter backdrop-blur-lg border border-white/20 text-white hover:bg-white/20"
                      >
                        {category}
                      </Button>
                    ))}
                  </div>

                  <ScrollArea className="h-[600px] w-full rounded-md border border-white/20 p-4 bg-white/02 backdrop-filter backdrop-blur-lg">
                    <div className="space-y-8">
                      {filteredEvents.map((event, index) => (
                        <TimelineItem
                          key={index}
                          event={event}
                          isExpanded={expandedEvent === event.eventName}
                          onToggle={() =>
                            setExpandedEvent(
                              expandedEvent === event.eventName
                                ? null
                                : event.eventName
                            )
                          }
                        />
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </motion.div>
            ) : index === 4 ? (
              <motion.div
                className="w-full h-full overflow-y-auto bg-gradient-to-b from-black via-black to-[#001F3F]"
                animate={{ scale: 1 / getPageScale(index) }}
              >
                <AnalyticsDashboard />
              </motion.div>
            ) : index === 5 ? (
              <motion.div
                className="w-full h-full overflow-y-auto"
                animate={{ scale: 1 / getPageScale(index) }}
              >
                <TopInvestors />
              </motion.div>
            ) : null}
          </motion.div>
        );
      })}
      {/* Navigation Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Link href="/summary">
          <Button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 shadow-lg">
            <span className="mr-2">Next: Summary</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Your other content components would go here */}

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
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .recharts-wrapper {
          width: 100% !important;
          height: 100% !important;
        }
        .to-red-500 {
          --tw-gradient-to: #ff6f96;
        }
        .via-pink-500 {
          --tw-gradient-via: rgb(236 72 153 / 0);
          --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-via),
            var(--tw-gradient-to);
        }
        .from-purple-400 {
          --tw-gradient-from: rgb(192 132 252 / 0);
          --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
        }

        *::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }

        *::-webkit-scrollbar-track {
          background: transparent;
        }

        *::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }

        *::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
