"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
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
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const INITIAL_BUBBLE_COUNT = 49;
const MID_BUBBLE_COUNT = 30;
const FINAL_BUBBLE_COUNT = 8;

const pages = [
  {
    id: 0,
    title: "Welcome",
    subtitle: "Insurgent Beverage Brands Retail Growth Analysis",
    color: "bg-orange-50",
    textColor: "text-black",
  },
  {
    id: 1,
    title: "Agenda",
    subtitle: "Today's Schedule",
    color: "bg-orange-50",
    textColor: "text-black",
  },
  {
    id: 2,
    title: "Introduction",
    subtitle: "Insurgent Beverage Brands",
    color: "bg-gray-100",
    textColor: "text-gray-800",
  },
  {
    id: 3,
    title: "Liquid Death",
    subtitle: "Turning Water into a Bold Lifestyle Statement",
    color: "bg-gradient-to-br from-[#FDF5E6] to-white",
    textColor: "text-[#355070]",
  },
  {
    id: 4,
    title: "Founder",
    subtitle: "Mike Cessario",
    color: "bg-[#fcf8ec]",
    textColor: "text-black",
  },
  {
    id: 5,
    title: "Executive Team",
    subtitle: "Leadership",
    color: "bg-gradient-to-br from-purple-400 via-pink-500 to-red-500",
    textColor: "text-white",
  },
  {
    id: 6,
    title: "Company Timeline",
    subtitle: "Our Journey",
    color: "bg-black",
    textColor: "text-white",
  },
  {
    id: 7,
    title: "Analytics Dashboard",
    subtitle: "Key Metrics",
    color: "bg-gradient-to-b from-black via-black to-[#001F3F]",
    textColor: "text-white",
  },
  {
    id: 8,
    title: "Top Investors",
    subtitle: "Our Backers",
    color:
      "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-blue-500 to-white",
    textColor: "text-gray-800",
  },
];

const executives = [
  {
    name: "Mike Fine",
    title: "Chief Retail Officer",
    image:
      "https://media.licdn.com/dms/image/D5603AQHGAcFStYLEkw/profile-displayphoto-shrink_200_200/0/1679403780575?e=2147483647&v=beta&t=HJfWsY2gCdLTSfheNR9EyMh6cr_tzx2i34GNZHc0_Hs",
    experience: [
      "Chief Customer and Marketing Officer at Accelerator Active Energy",
      "Vice President, Marketing at BODYARMOR",
      "Held positions at Nestle Waters, Coca-Cola, and Pepsi",
      "Nearly two decades of non-alcoholic beverage industry experience",
    ],
    entrepreneurial: ["Helped scale BODYARMOR to over $1 billion in revenue"],
    linkedin: "https://www.linkedin.com/in/michael-fine-b171771/",
  },
  {
    name: "Marisa Bertha",
    title: "Chief Strategy Officer",
    image: "https://avatars.sched.co/7/7d/11642316/avatar.jpg?261",
    experience: [
      "Senior Vice President, Strategy at Liquid Death",
      "Vice President, Growth at 7-Eleven",
      "Created and oversaw emerging brands",
      "Led 7-Ventures, the company's corporate venture arm",
    ],
    entrepreneurial: [
      "Leads fundraising, investor relations, and strategy execution at Liquid Death",
    ],
    linkedin: "https://www.linkedin.com/in/marisabertha/",
  },
  {
    name: "Karim Sadik-Khan",
    title: "Chief Financial Officer",
    image:
      "https://s.yimg.com/ny/api/res/1.2/xmi.W2PFAR_JqN3GDPRcxA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTU2MQ--/https://media.zenfs.com/en/fortune_175/f4b02665f0bbd78ad57d25f738bc3dc2",
    experience: [
      "CFO for Beam Suntory (BSI) North America",
      "14-year tenure with the company",
      "Held several financial leadership roles",
      "Worked at PepsiCo, Dr. Pepper-Snapple, and IBM",
      "19 years of management and finance experience",
    ],
    entrepreneurial: [
      "Involved in Jim Beam's IPO in 2011",
      "Involved in the acquisition of Jim Beam by Suntory in 2014",
    ],
    linkedin: "https://www.linkedin.com/in/karim-sadik-khan-01904712/",
  },
  {
    name: "Michael Jones",
    title: "Board Member",
    image:
      "https://media.licdn.com/dms/image/C4E03AQE8m1uVt3cuzQ/profile-displayphoto-shrink_200_200/0/1589828861550?e=2147483647&v=beta&t=02kZAc1EZOvuPAWTTDx6F-nkSGg5zxJ_gT7LheAPOS0",
    education:
      "Bachelor of Arts in International Business and Marketing from the University of Oregon",
    experience: [
      "Founder and CEO of Science Inc.",
      "Founded Userplane in 2001 (acquired by AOL in 2006)",
      "CEO of Myspace (2010-2011)",
      "Launched Tsavo Media in 2008 (sold for $75 million)",
      "Angel investor since 2005",
    ],
    entrepreneurial: [
      "Named Student Entrepreneur of the Year in 1997 at the University of Oregon",
      "Personally invested in more than 30 startups",
      "Involved in successful exits like Dollar Shave Club and HelloSociety",
    ],
    linkedin: "https://www.linkedin.com/in/mjones/",
  },
];

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

const timelineData: TimelineEvent[] = [
  {
    date: "2017",
    eventName: "Conception of Liquid Death",
    category: "Branding & Marketing",
    eventDescription:
      "Mike Cessario conceives the idea for Liquid Death, aiming to make water cool and edgy.",
  },
  {
    date: "2018",
    eventName: "Launch of Liquid Death",
    category: "Branding & Marketing",
    eventDescription:
      'Liquid Death launched with the edgy slogan "Murder Your Thirst." A product-less commercial garnered 3 million views and created consumer intrigue. No product launched yet.',
  },
  {
    date: "2019",
    eventName: "Seed Funding of $1.6 million",
    category: "Funding",
    eventDescription:
      "Raised $1.6 million in seed funding to fuel growth and marketing efforts.",
    additionalInfo: {
      dealInfo: {
        dealTypes: "Seed Round",
        dealDate: "17-Jul-2019",
        dealStatus: "Completed",
        financingSource: "Venture Capital",
        stockSplit: "1:1",
      },
      companyInfo: {
        financingStatus: "Venture Capital-Backed",
        businessStatus: "Generating Revenue",
        ceoLeadMGT: "Michael Cessario",
        site: "Santa Monica, CA",
      },
      totalCapital: {
        dealAmount: "£1.79M",
        preMoneyValuation: "£4.37M",
        postValuation: "£6.16M",
        totalInvestedCapital: "£1.79M",
        raisedToDate: "£1.79M",
      },
      equity: {
        vcRound: "1st Round",
        percentAcquired: "29.13%",
        investorOwnership: "29.13%",
        totalInvestedEquity: "£1.79M",
      },
      dealSynopsis:
        "The company raised $2.26 million of Seed funding in a deal led by Science on July 17, 2019, putting the company's pre-money valuation at $5.5 million. CPG investors, Gary Vaynerchuck, Michael Dubin, Biz Stone, Jen Rubio, and other undisclosed investors also participated in the round.",
      investors: [
        {
          name: "Biz Stone",
          status: "New Investor",
          leadSole: "No",
          comments: "Lead Partner: Biz Stone, Form of Payment: Cash",
        },
        {
          name: "CPG investors",
          status: "New Investor",
          leadSole: "No",
          comments: "Form of Payment: Cash",
        },
        {
          name: "Gary Vaynerchuck",
          status: "New Investor",
          leadSole: "No",
          comments: "Form of Payment: Cash",
        },
        {
          name: "Jennifer Rubio",
          status: "New Investor",
          leadSole: "No",
          comments: "Lead Partner: Jennifer Rubio, Form of Payment: Cash",
        },
        {
          name: "Michael Dubin",
          status: "New Investor",
          leadSole: "No",
          comments: "Form of Payment: Cash",
        },
        {
          name: "Science",
          status: "New Investor",
          leadSole: "Yes",
          comments: "Lead Partner: Michael Jones, Form of Payment: Cash",
        },
      ],
    },
  },
  {
    date: "2019",
    eventName: "Introduction of Subscription Model",
    category: "Pricing",
    eventDescription:
      "Liquid Death embraced direct-to-consumer sales early on with a subscription model for $1.75 per can for 12-pack subscriptions.",
  },
  {
    date: "2019",
    eventName: "Launch of Tallboy Cans",
    category: "Product",
    eventDescription:
      "Still water launched in eco-friendly tallboy cans, focusing on bold branding and differentiating from plastic bottled water.",
  },
  {
    date: "2019",
    eventName: "Sales of $2.8 million",
    category: "Revenue",
    eventDescription:
      "Liquid Death achieved $2.8 million in sales, primarily through its direct-to-consumer model.",
  },
  {
    date: "2020",
    eventName: "Series A Funding of $9 million",
    category: "Funding",
    eventDescription:
      "Secured $9 million in Series A funding to expand operations and distribution.",
    additionalInfo: {
      dealInfo: {
        dealTypes: "Series A",
        dealDate: "20-Feb-2020",
        dealStatus: "Completed",
        financingSource: "Venture Capital",
        stockSplit: "1:1",
      },
      companyInfo: {
        financingStatus: "Venture Capital-Backed",
        businessStatus: "Generating Revenue",
        ceoLeadMGT: "Michael Cessario",
        site: "Santa Monica, CA",
      },
      totalCapital: {
        dealAmount: "£7.68M",
        preMoneyValuation: "£30.70M",
        postValuation: "£38.38M",
        totalInvestedCapital: "£7.68M",
        raisedToDate: "£9.47M",
      },
      equity: {
        vcRound: "2nd Round",
        percentAcquired: "20.00%",
        investorOwnership: "45.73%",
        totalInvestedEquity: "£7.68M",
      },
      dealSynopsis:
        "The company raised $12.11 million through a combination of Series A and Series A-1 venture funding in a deal led by Velvet Sea Ventures on February 20, 2020, putting the company's pre-money valuation at $40 million. Saltwater Capital, Science, and other investors also participated.",
      investors: [
        {
          name: "Blake Mycoskie",
          status: "New Investor",
          leadSole: "No",
          comments: "",
        },
        {
          name: "Jake Strom",
          status: "New Investor",
          leadSole: "No",
          comments: "",
        },
        {
          name: "James Siminoff",
          status: "New Investor",
          leadSole: "No",
          comments: "",
        },
        {
          name: "Sophia Amoruso",
          status: "New Investor",
          leadSole: "No",
          comments: "",
        },
        {
          name: "Velvet Sea Ventures",
          status: "New Investor",
          leadSole: "Yes",
          comments: "",
        },
      ],
    },
  },
  {
    date: "2020",
    eventName: "Series B Funding of $23 million",
    category: "Funding",
    eventDescription:
      "Raised an additional $23 million in Series B to scale up the brand and operations.",
    additionalInfo: {
      dealInfo: {
        dealTypes: "Series B",
        dealDate: "30-Sep-2020",
        dealStatus: "Completed",
        financingSource: "Venture Capital",
        stockSplit: "1:1",
      },
      companyInfo: {
        financingStatus: "Venture Capital-Backed",
        businessStatus: "Generating Revenue",
        ceoLeadMGT: "Michael Cessario",
        site: "Santa Monica, CA",
      },
      totalCapital: {
        dealAmount: "£17.75M",
        preMoneyValuation: "£63.27M",
        postValuation: "£81.02M",
        totalInvestedCapital: "£17.75M",
        raisedToDate: "£27.22M",
      },
      equity: {
        vcRound: "3rd Round",
        percentAcquired: "21.90%",
        investorOwnership: "58.57%",
        totalInvestedEquity: "£17.75M",
      },
      dealSynopsis:
        "The company raised $23 million of Series B venture funding from Convivialité Ventures, Velvet Sea Ventures, and Uncommon Denominator on September 30, 2020, putting the company's pre-money valuation at $82 million.",
      investors: [
        {
          name: "Convivialité Ventures",
          status: "New Investor",
          leadSole: "No",
          comments: "",
        },
        {
          name: "Uncommon Denominator",
          status: "New Investor",
          leadSole: "No",
          comments: "",
        },
        {
          name: "Velvet Sea Ventures",
          status: "Follow-On Investor",
          leadSole: "No",
          comments: "",
        },
      ],
    },
  },

  {
    date: "2020",
    eventName: "Launch of Sparkling Water",
    category: "Product",
    eventDescription:
      "Sparkling water was introduced to appeal to a broader audience as part of product diversification.",
  },
  {
    date: "2020",
    eventName: "Entry into Whole Foods and 7-Eleven",
    category: "Retail & Distribution",
    eventDescription:
      "Liquid Death launched in Whole Foods nationwide and 200 7-Eleven stores. It also became available on Amazon.",
  },
  {
    date: "2020",
    eventName: "Sales of $10 million",
    category: "Revenue",
    eventDescription:
      "Sales jumped to $10 million as Liquid Death expanded its retail presence.",
  },
  {
    date: "2020",
    eventName: "Introduction of Flavored Sparkling Water",
    category: "Product",
    eventDescription:
      "Flavored sparkling water introduced: Severed Lime, Mango Chainsaw, and Berry It Alive to diversify the lineup and cater to flavor trends.",
  },
  {
    date: "2021",
    eventName: "Series C Funding of $75 million",
    category: "Funding",
    eventDescription:
      "Raised $75 million in Series C funding to continue scaling the brand.",
    additionalInfo: {
      dealInfo: {
        dealTypes: "Series C",
        dealDate: "03-Jan-2022",
        dealStatus: "Completed",
        financingSource: "Venture Capital",
        stockSplit: "1:1",
      },
      companyInfo: {
        financingStatus: "Venture Capital-Backed",
        businessStatus: "Generating Revenue",
        ceoLeadMGT: "Michael Cessario",
        site: "Santa Monica, CA",
      },
      totalCapital: {
        dealAmount: "£56.29M",
        preMoneyValuation: "£367.01M",
        postValuation: "£423.30M",
        totalInvestedCapital: "£56.29M",
        raisedToDate: "£95.73M",
      },
      equity: {
        vcRound: "5th Round",
        percentAcquired: "13.30%",
        investorOwnership: "67.34%",
        totalInvestedEquity: "£56.29M",
      },
      dealSynopsis:
        "The company raised $75 million of Series C venture funding in a deal led by Science on January 3, 2022, putting the company's pre-money valuation at $489 million. The funds were used to expand the product line.",
      investors: [
        {
          name: "Access Capital Management",
          status: "New Investor",
          leadSole: "No",
          comments: "",
        },
        {
          name: "Lauder Partners",
          status: "New Investor",
          leadSole: "No",
          comments: "",
        },
        {
          name: "Live Nation Entertainment",
          status: "Follow-On Investor",
          leadSole: "No",
          comments: "",
        },
      ],
    },
  },
  {
    date: "2021",
    eventName: "Partnership with Tony Hawk",
    category: "Branding & Marketing",
    eventDescription:
      "Tony Hawk collaborated with Liquid Death to create 100 limited-edition skateboards infused with his own blood, priced at $500 each. The boards featured a gruesome design with Liquid Death's branding and came with a certificate of authenticity.",
    additionalInfo: {
      image: {
        url: "https://ascentialcdn.filespin.io/api/v1/conversion/2d4b9a017a784eff86054feeb71cd320",
        alt: "Tony Hawk Liquid Death Collaboration",
        caption: "Limited edition skateboard infused with Tony Hawk's blood",
      },
    },
  },
  {
    date: "2021",
    eventName: "Live Nation Partnership",
    category: "Retail & Distribution",
    eventDescription:
      "Liquid Death became the exclusive water vendor at more than 120 music venues and festivals across the U.S. via a partnership with Live Nation Entertainment.",
  },
  {
    date: "2021",
    eventName: "Partnership with Wiz Khalifa",
    category: "Branding & Marketing",
    eventDescription:
      'Wiz Khalifa partnered with Liquid Death to promote their brand as the "finest bong water on earth," inspired by a viral Instagram video of him pouring Liquid Death into his bong. Khalifa expressed excitement about the partnership, highlighting its alignment with his lifestyle and commitment to quality, as he only uses the best products like his own Khalifa Kush cannabis.',
    additionalInfo: {
      image: {
        url: "https://liquiddeath.com/cdn/shop/files/desktop_df7fe86a-27dc-4df7-add1-f55c74610d6c_1_1500x.webp?v=1681157705",
        alt: "Wiz Khalifa Liquid Death Partnership",
        caption: "Wiz Khalifa promoting Liquid Death as premium bong water",
      },
    },
  },
  {
    date: "2021",
    eventName: "Sales of $45 million",
    category: "Revenue",
    eventDescription:
      "Liquid Death's revenue reached $45 million through expanded distribution and product launches.",
  },
  {
    date: "2022",
    eventName: "Series D Funding of $75 million",
    category: "Funding",
    eventDescription:
      "Secured another $75 million in funding to continue its rapid expansion and product diversification.",
    additionalInfo: {
      dealInfo: {
        dealTypes: "Series D",
        dealDate: "03-Oct-2022",
        dealStatus: "Completed",
        financingSource: "Venture Capital",
        stockSplit: "1:1",
      },
      companyInfo: {
        financingStatus: "Venture Capital-Backed",
        businessStatus: "Generating Revenue",
        ceoLeadMGT: "Michael Cessario",
        site: "Los Angeles, CA",
      },
      totalCapital: {
        dealAmount: "£61.96M",
        preMoneyValuation: "£588.60M",
        postValuation: "£650.56M",
        totalInvestedCapital: "£61.96M",
        raisedToDate: "£157.69M",
      },
      equity: {
        vcRound: "6th Round",
        percentAcquired: "9.52%",
        investorOwnership: "66.71%",
        totalInvestedEquity: "£61.96M",
      },
      dealSynopsis:
        "The company raised $70 million of Series D venture funding in a deal led by Science on October 3, 2022. The funds were used to expand into new beverage categories and into the European market.",
      investors: [
        {
          name: "Access Capital (Dallas)",
          status: "New Investor",
          leadSole: "No",
          comments: "",
        },
        {
          name: "Convivialité Ventures",
          status: "Follow-On Investor",
          leadSole: "No",
          comments: "",
        },
        {
          name: "Live Nation Entertainment",
          status: "Follow-On Investor",
          leadSole: "No",
          comments: "",
        },
      ],
    },
  },
  {
    date: "2022",
    eventName:
      "Super Bowl Ad and \"Don't Be Scared, It's Just Water\" Campaign",
    category: "Branding & Marketing",
    eventDescription:
      "Liquid Death launched a Super Bowl ad and humorous \"Don't Be Scared, It's Just Water\" campaign to further establish its irreverent marketing tone.",
  },
  {
    date: "2022",
    eventName: "Availability in Over 60,000 Retail Locations",
    category: "Retail & Distribution",
    eventDescription:
      "Expanded availability to over 60,000 locations across the U.S., including 7-Eleven, Walmart, and Target.",
  },
  {
    date: "2022",
    eventName: "Sales of $130 million",
    category: "Revenue",
    eventDescription:
      "Liquid Death's revenue skyrocketed to $130 million, driven by broader retail distribution and new product offerings.",
  },
  {
    date: "2023",
    eventName: "Series E Funding of $70 million",
    category: "Funding",
    eventDescription:
      "Raised $70 million in Series E to fuel international expansion and product line extensions.",
    additionalInfo: {
      dealInfo: {
        dealTypes: "Series E",
        dealDate: "11-May-2023",
        dealStatus: "Completed",
        financingSource: "Venture Capital",
        stockSplit: "1:1",
      },
      companyInfo: {
        financingStatus: "Venture Capital-Backed",
        businessStatus: "Generating Revenue",
        ceoLeadMGT: "Michael Cessario",
        site: "Los Angeles, CA",
      },
      totalCapital: {
        dealAmount: "£61.23M",
        preMoneyValuation: "£843.56M",
        postValuation: "£904.79M",
        totalInvestedCapital: "£61.23M",
        raisedToDate: "£218.92M",
      },
      equity: {
        vcRound: "7th Round",
        percentAcquired: "6.77%",
        investorOwnership: "68.05%",
        totalInvestedEquity: "£61.23M",
      },
      dealSynopsis:
        "The company raised $76.5 million of Series E venture funding from BOS Capital, Bridge Builder Ventures, and others on May 11, 2023. The funds were used for product development.",
      investors: [
        {
          name: "BOS Capital",
          status: "New Investor",
          leadSole: "No",
          comments: "",
        },
        {
          name: "Bridge Builder Ventures Group",
          status: "New Investor",
          leadSole: "No",
          comments: "",
        },
        {
          name: "Vibora Capital",
          status: "New Investor",
          leadSole: "No",
          comments: "",
        },
      ],
    },
  },
  {
    date: "2023",
    eventName: "Launch of Iced Teas",
    category: "Product",
    eventDescription:
      "Introduced caffeinated iced teas like Armless Palmer, Rest in Peach, and Grim Leafer, entering the energy drink space with healthier options.",
  },
  {
    date: "2023",
    eventName: "Global Expansion",
    category: "Retail & Distribution",
    eventDescription:
      "Expanded into international markets, including the EU, UK, Australia, and New Zealand.",
  },
  {
    date: "2023",
    eventName: "Collaboration with Steve-O",
    category: "Branding & Marketing",
    eventDescription:
      "Launched a voodoo doll campaign where Liquid Death created 300 voodoo dolls stuffed with Steve-O's actual hair, priced at $125 each.",
    additionalInfo: {
      image: {
        url: "https://liquiddeath.com/cdn/shop/files/LiquidDeath_SteveO_VoodooDoll_PDP_StevoOHoldingDollcopy.webp?v=1693342142&width=1200",
        alt: "Steve-O Voodoo Doll Collaboration",
        caption: "Steve-O holding his Liquid Death voodoo doll",
      },
    },
  },
  {
    date: "2024",
    eventName: "Launch of Liquid Death Country Club Membership Program",
    category: "Retail & Distribution",
    eventDescription:
      "Introduced the Liquid Death Country Club membership program to engage fans and reward loyalty.",
  },
  {
    date: "2024",
    eventName: "eBay Advertising Auction",
    category: "Branding & Marketing",
    eventDescription:
      "Liquid Death auctioned off advertising space on eBay, demonstrating a commitment to humor-driven, unconventional marketing.",
  },
  {
    date: "2024",
    eventName: "Sales of $263 million",
    category: "Revenue",
    eventDescription:
      "Revenue reached $263 million as Liquid Death expanded globally and diversified its product line.",
  },
  {
    date: "2024",
    eventName: "Gaming Collaborations - Fortnite",
    category: "Branding & Marketing",
    eventDescription:
      "Introduced Murder Man mascot and Liquid Death-themed territories in the game Fortnite.",
    additionalInfo: {
      image: {
        url: "https://liquiddeath.com/cdn/shop/files/Liquiddeath-Fortnite-Murdermountain-newto3_1500x.webp?v=1702933247",
        alt: "Fortnite x Liquid Death Collaboration",
        caption: "Murder Mountain territory in Fortnite",
      },
    },
  },
  {
    date: "2024",
    eventName: "Series F Funding of $67 million",
    category: "Funding",
    eventDescription:
      "Raised $70 million in Series F for product development, including new flavors.",
    additionalInfo: {
      dealInfo: {
        dealTypes: "Series F",
        dealDate: "11-Mar-2024",
        dealStatus: "Completed",
        financingSource: "Venture Capital",
        stockSplit: "1:1",
      },
      companyInfo: {
        financingStatus: "Venture Capital-Backed",
        businessStatus: "Generating Revenue",
        ceoLeadMGT: "Michael Cessario",
        site: "Los Angeles, CA",
      },
      totalCapital: {
        dealAmount: "£52.88M",
        preMoneyValuation: "£1.05B",
        postValuation: "£1.10B",
        totalInvestedCapital: "£52.88M",
        raisedToDate: "£271.91M",
      },
      equity: {
        vcRound: "8th Round",
        percentAcquired: "4.79%",
        investorOwnership: "68.05%",
        totalInvestedEquity: "£52.88M",
      },
      dealSynopsis:
        "The company raised $67 million of Series F venture funding on March 11, 2024. The funds will be used toward product development, including new flavors.",
      investors: [
        {
          name: "Live Nation Entertainment",
          status: "Follow-On Investor",
          leadSole: "No",
          comments: "",
        },
        {
          name: "Irving Investors",
          status: "New Investor",
          leadSole: "No",
          comments: "",
        },
        {
          name: "Inception Sciences",
          status: "New Investor",
          leadSole: "No",
          comments: "",
        },
      ],
    },
  },
  {
    date: "2024",
    eventName: "Collaboration with Van Leeuwen",
    category: "Branding & Marketing",
    eventDescription:
      "Liquid Death announced an unexpected product: Hot Fudge Sundae-flavored sparkling water, in collaboration with artisan ice cream maker Van Leeuwen.",
    additionalInfo: {
      image: {
        url: "https://uk.themedialeader.com/wp-content/uploads/2024/08/Liquiddeath-VanLeeuwen_HotFudgeSundae_2000x.webp",
        alt: "Van Leeuwen Collaboration",
        caption: "Hot Fudge Sundae-flavored sparkling water",
      },
    },
  },
  {
    date: "2024",
    eventName: "Chaos Partnership with Yeti",
    category: "Branding & Marketing",
    eventDescription:
      'Liquid Death collaborated with Yeti to create a unique "coffin cooler," described as "not just a casket, it\'s a revolutionary beverage cooler," designed to keep drinks cold for an eternity. The starting bid was set at $1,500 with the final selling price at $66,500.',
    additionalInfo: {
      image: {
        url: "https://cached.imagescaler.hbpl.co.uk/resize/scaleHeight/815/cached.offlinehbpl.hbpl.co.uk/news/SUC/liquid-death-coffin-cooler-yeti-UWP-CUS.jpg",
        alt: "Yeti Coffin Cooler Collaboration",
        caption: "Limited edition Liquid Death x Yeti coffin cooler",
      },
    },
  },
  {
    date: "2024",
    eventName: "Chaos Partnership with Plunge",
    category: "Branding & Marketing",
    eventDescription:
      'Liquid Death partnered with Plunge to create a limited-edition "Freeze to Death" vertical cold plunge tub shaped like a giant Liquid Death can, priced at $5,990 with only 300 units available.',
    additionalInfo: {
      image: {
        url: "https://cdn.sanity.io/images/8ng3606v/production/2414481e64e61116b99da74eba711c83a14e85a4-1536x1536.jpg?q=75&auto=format",
        alt: "Plunge Cold Tub Collaboration",
        caption: "Freeze to Death vertical cold plunge tub",
      },
    },
  },
  {
    date: "2024",
    eventName: "Collaboration with Burton",
    category: "Branding & Marketing",
    eventDescription:
      "Liquid Death collaborated with Burton to create the \"Deathtrap\" collection, featuring a limited-edition snowboard with Liquid Death's signature skull imagery trapped in ice, along with matching outerwear. The partnership aimed to expand Liquid Death's reach into the snowboarding community while providing Burton exposure to a younger, edgy demographic.",
    additionalInfo: {
      image: {
        url: "https://media.licdn.com/dms/image/v2/D4E05AQHPp0tGmxXesA/feedshare-thumbnail_720_1280/feedshare-thumbnail_720_1280/0/1700235317850?e=2147483647&v=beta&t=JKfD4ZVDAzafI226UT6NbTotyo_x53a9-g9FVRs0MGs",
        alt: "Burton Deathtrap Collection",
        caption: "Limited edition Deathtrap snowboard and outerwear",
      },
    },
  },
  {
    date: "2024",
    eventName: "Chaos Partnership with MeUndies",
    category: "Branding & Marketing",
    eventDescription:
      'Liquid Death collaborated with MeUndies to launch the "Doom and Bloom" collection, featuring playful and edgy underwear designs that incorporate Liquid Death\'s signature aesthetic.',
    additionalInfo: {
      image: {
        url: "https://images.squarespace-cdn.com/content/v1/65959ad0f8a040762f2c53ca/278871c5-1dff-466a-8263-dde5cd5c1060/071923_Lifestyle1751.jpg",
        alt: "MeUndies Doom and Bloom Collection",
        caption: "Liquid Death x MeUndies collaboration underwear",
      },
    },
  },
];

const capitalRaisedData = [
  { date: "2019-07-17", cumulativeRaised: 1.79 },
  { date: "2020-02-20", cumulativeRaised: 9.47 },
  { date: "2020-09-30", cumulativeRaised: 27.22 },
  { date: "2021-03-29", cumulativeRaised: 32.26 },
  { date: "2021-05-15", cumulativeRaised: 39.44 },
  { date: "2022-01-03", cumulativeRaised: 95.73 },
  { date: "2022-10-03", cumulativeRaised: 157.69 },
  { date: "2023-05-11", cumulativeRaised: 218.92 },
  { date: "2023-07-12", cumulativeRaised: 218.92 },
  { date: "2024-03-11", cumulativeRaised: 271.91 },
];

const valuationData = [
  { date: "2019-07-17", preMoneyValuation: 4.37, postMoneyValuation: 6.16 },
  { date: "2020-02-20", preMoneyValuation: 30.7, postMoneyValuation: 38.38 },
  { date: "2020-09-30", preMoneyValuation: 63.27, postMoneyValuation: 81.02 },
  { date: "2021-05-15", preMoneyValuation: 110.59, postMoneyValuation: 117.77 },
  { date: "2022-01-03", preMoneyValuation: 367.01, postMoneyValuation: 423.3 },
  { date: "2022-10-03", preMoneyValuation: 588.6, postMoneyValuation: 650.56 },
  { date: "2023-05-11", preMoneyValuation: 843.56, postMoneyValuation: 904.79 },
  { date: "2024-03-11", preMoneyValuation: 1050.0, postMoneyValuation: 1100.0 },
];

const revenueData = [
  { year: 2019, revenue: 2.351 },
  { year: 2020, revenue: null },
  { year: 2021, revenue: 32.724 },
  { year: 2022, revenue: 105.479 },
  { year: 2023, revenue: 209.165 },
];

const ownershipData = [
  { date: "2019-07-17", foundersOwnership: 70.87, investorsOwnership: 29.13 },
  { date: "2020-02-20", foundersOwnership: 54.27, investorsOwnership: 45.73 },
  { date: "2020-09-30", foundersOwnership: 41.43, investorsOwnership: 58.57 },
  { date: "2021-05-15", foundersOwnership: 40.03, investorsOwnership: 59.97 },
  { date: "2022-01-03", foundersOwnership: 32.66, investorsOwnership: 67.34 },
  { date: "2022-10-03", foundersOwnership: 33.29, investorsOwnership: 66.71 },
  { date: "2023-05-11", foundersOwnership: 31.95, investorsOwnership: 68.05 },
];

const investorParticipation = [
  {
    investor: "Science",
    "Deal  #1": 1,
    "Deal #2": 1,
    "Deal #3": 0,
    "Deal #6": 0,
    "Deal #7": 1,
    "Deal #8": 1,
    "Deal #9": 0,
    "Deal #12": 0,
  },
  {
    investor: "Velvet Sea Ventures",
    "Deal #1": 0,
    "Deal #2": 1,
    "Deal #3": 1,
    "Deal #6": 0,
    "Deal #7": 0,
    "Deal #8": 0,
    "Deal #9": 0,
    "Deal #12": 0,
  },
  {
    investor: "Convivialité Ventures",
    "Deal #1": 0,
    "Deal #2": 0,
    "Deal #3": 1,
    "Deal #6": 0,
    "Deal #7": 0,
    "Deal #8": 1,
    "Deal #9": 0,
    "Deal #12": 0,
  },
  {
    investor: "Live Nation Entertainment",
    "Deal #1": 0,
    "Deal #2": 0,
    "Deal #3": 0,
    "Deal #6": 1,
    "Deal #7": 1,
    "Deal #8": 1,
    "Deal #9": 0,
    "Deal #12": 1,
  },
  {
    investor: "Michael Dubin",
    "Deal #1": 1,
    "Deal #2": 0,
    "Deal #3": 0,
    "Deal #6": 1,
    "Deal #7": 0,
    "Deal #8": 0,
    "Deal #9": 0,
    "Deal #12": 0,
  },
];

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
        <h1 className="text-9xl font-bold font-['Montserrat'] text-[#0E2B63] mb-8">
          WELCOME
        </h1>
        <h1> </h1>
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
      <div className="flex justify-center items-start w-full max-w-5xl z-10">
        {/* Left side - Project Objective */}
        <div className="flex flex-col items-start w-[400px]">
          <h2 className="text-4xl font-bold mb-8 text-pink-500 font-['Montserrat']">
            Project Objective
          </h2>
          <p className="text-lg leading-relaxed font-['Montserrat'] pr-8">
            The project aims to analyze insurgent beverage brands in the U.S.
            that have experienced rapid growth over the past two to five years.
            Its objective is to identify the key strategies driving their retail
            success, with a particular focus on the U.S. market.
          </p>
        </div>

        {/* Vertical Divider */}
        <div className="mx-12 h-[300px] w-px bg-black/10 self-center" />

        {/* Right side - Agenda */}
        <div className="flex flex-col items-start w-[400px]">
          <h2 className="text-4xl font-bold mb-8 text-pink-500 font-['Montserrat']">
            The Agenda
          </h2>
          <ol className="list-decimal list-inside space-y-4 text-lg font-['Montserrat'] pl-4">
            <li>Introduction</li>
            <li>How we reached here</li>
            <li>Liquid Death Deep Dive</li>
            <li>Poppi Deep Dive</li>
            <li>Key Insights and Success Factors</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
function AnalyticsDashboard() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = chartContainerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      // Force recharts to recalculate dimensions
      window.dispatchEvent(new Event("resize"));
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  console.log(
    "Capital Raised Data:",
    capitalRaisedData.map((item) => ({
      date: item.date,
      cumulativeRaised:
        typeof item.cumulativeRaised === "number"
          ? item.cumulativeRaised
          : null,
    }))
  );

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
        <CardContent className="relative min-h-[300px]">{content}</CardContent>
      </Card>
    );
  };

  return (
    <div ref={chartContainerRef} className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h2 className="text-[12vw] sm:text-[8vw] font-bold text-white">
          ANALYTICS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {renderCard(
            0,
            "Capital Raised Over Time",
            "Cumulative funds raised in millions GBP",
            <div className="relative w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={capitalRaisedData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis
                    dataKey="date"
                    stroke="#888888"
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis stroke="#888888" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="cumulativeRaised"
                    stroke="#2A9D8F"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {renderCard(
            1,
            "Valuation Over Time",
            "Pre-money and post-money valuations in millions GBP",
            <div className="relative w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={valuationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis
                    dataKey="date"
                    stroke="#888888"
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis stroke="#888888" />
                  <Tooltip />
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
            </div>
          )}

          {renderCard(
            2,
            "Revenue Growth",
            "Annual revenue in millions GBP",
            <div className="relative w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="year" stroke="#888888" />
                  <YAxis stroke="#888888" />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#E76F51" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {renderCard(
            3,
            "Ownership Dilution",
            "Founders vs Investors ownership percentage",
            <div className="relative w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ownershipData} stackOffset="expand">
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis
                    dataKey="date"
                    stroke="#888888"
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis stroke="#888888" />
                  <Tooltip />
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
            </div>
          )}

          {renderCard(
            4,
            "Investor Participation Heatmap",
            "Participation of investors across funding rounds",
            <div className="relative w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={investorParticipation}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="investor" stroke="#888888" />
                  <YAxis stroke="#888888" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="Deal #1"
                    stroke="#264653"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="Deal #2"
                    stroke="#2A9D8F"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="Deal #3"
                    stroke="#E9C46A"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="Deal #6"
                    stroke="#F4A261"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="Deal #7"
                    stroke="#E76F51"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="Deal #8"
                    stroke="#264653"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="Deal #9"
                    stroke="#2A9D8F"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="Deal #12"
                    stroke="#E9C46A"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        .recharts-wrapper {
          position: absolute !important;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
        }
      `}</style>
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
    <div className="min-h-screen bg-orange-50 text-black p-8">
      <div className="max-w-7xl mx-auto">
        {/* Title with same font and styling as welcome page */}
        <div className="text-center mb-12">
          <h2 className="text-[12vw] sm:text-[8vw] font-bold text-black tracking-tight whitespace-nowrap overflow-hidden font-['PP_Mori',sans-serif] mb-4">
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
            <h1 className="text-lg font-semibold text-white">
              {event.eventName}
            </h1>
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
  return (
    <Card className="w-full bg-white/10 backdrop-filter backdrop-blur-lg border border-white/20">
      <CardContent className="space-y-6">
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
                    <span className="font-semibold">{key}:</span>{" "}
                    {key === "Status" ? <Badge>{value}</Badge> : value}
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
                    <span className="font-semibold">{key}:</span> {value}
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
                    <span className="font-semibold">{key}:</span> {value}
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
                    <span className="font-semibold">{key}:</span> {value}
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

export function LiquidDeathLanding() {
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
    "MIKE's.png",
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

  const midStageBrands = [
    "Ashoc_Energy.png",
    "Lemon_Perfect.png",
    "Hop_WTR.png",
    "Biolyte.png",
    "Celsius.png",
    "Liquid_Death.png",
    "Ritual_Zero_Proof.png",
    "OLIPOP.png",
    "Rowdy_Energy.png",
    "Spindrift.png",
    "Lyres.png",
    "Health-Ade_Kombucha.png",
    "Ghost.png",
    "Hint.png",
    "Three_Spirit.png",
    "Joyba_Bubble_Tea.png",
    "Prime.png",
    "Waterloo.png",
    "Athletic_Brewing_Co.png",
    "Babe.png",
    "Cellucor.png",
    "Cirkul.png",
    "Guayaki.png",
    "Poppi.png",
    "Essentia.png",
    "Kevita.png",
    "Alani_Nu.png",
    "LaCroix.png",
    "Tesreve.png",
    "Cure.png",
  ];

  const getLogosForStage = (stage: number) => {
    switch (stage) {
      case 0:
        return allBrandLogos;
      case 1:
        return midStageBrands;
      case 2:
        return finalEightLogos;
      default:
        return allBrandLogos;
    }
  };

  const logosToShow = getLogosForStage(bubbleStage);

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
    >
      {pages.map((page, index) => (
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
              <WelcomePage />
            </motion.div>
          ) : index === 1 ? (
            <motion.div
              className="relative w-full h-full overflow-hidden"
              animate={{ scale: 1 / getPageScale(index) }}
            >
              <AgendaPage />
            </motion.div>
          ) : index === 2 ? (
            <motion.div
              className="relative w-full h-full overflow-hidden bg-orange-50"
              animate={{ scale: 1 / getPageScale(index) }}
            >
              <div className="absolute right-0 top-0 w-96 h-96">
                <div className="absolute left-0 top-[37.60px] w-96 h-96 bg-gradient-to-b from-pink-400 to-orange-300 rounded-full blur-3xl" />
                <div className="absolute left-[192.60px] top-0 w-96 h-96 bg-gradient-to-b from-pink-500 via-orange-400 to-slate-500 rounded-full blur-3xl" />
              </div>
              <div className="h-full w-full flex flex-col items-center justify-center relative z-10">
                <h1 className="text-4xl sm:text-6xl font-bold text-black tracking-tight whitespace-nowrap overflow-hidden font-['PP_Mori',sans-serif] mb-4">
                  {bubbleStage === 0
                    ? "ALL INSURGENT BEVERAGE BRANDS"
                    : bubbleStage === 1
                    ? "HIGH GROWTH POTENTIAL"
                    : "THE FINAL EIGHT"}
                </h1>
                <div className="relative w-full h-[80%] flex items-center justify-center">
                  <div
                    className="grid gap-6 transition-all duration-500 ease-in-out transform scale-90"
                    style={{
                      gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
                    }}
                  >
                    {logosToShow.map((logo, index) => (
                      <div
                        key={index}
                        className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-500 ease-in-out overflow-hidden"
                        style={{
                          transform: "scale(1.2)",
                        }}
                      >
                        <div className="w-16 h-16 relative">
                          <Image
                            src={`/brand_logos/${logo}`}
                            alt={`Brand Logo ${logo.split(".")[0]}`}
                            layout="fill"
                            objectFit="contain"
                            className="p-2"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <Button
                  className="absolute left-12 top-1/2 transform -translate-y-1/2 bg-pink-500 hover:bg-pink-600 text-white scale-120 px-6 py-4"
                  onClick={() =>
                    setBubbleStage((prev) => Math.max(0, prev - 1))
                  }
                  disabled={bubbleStage === 0}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  className="absolute right-12 top-1/2 transform -translate-y-1/2 bg-pink-500 hover:bg-pink-600 text-white scale-120 px-6 py-4"
                  onClick={() =>
                    setBubbleStage((prev) => Math.min(2, prev + 1))
                  }
                  disabled={bubbleStage === 2}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>

                {/* Stage description text */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                  <p className="text-lg text-gray-600 font-['Montserrat'] max-w-2xl">
                    {bubbleStage === 0
                      ? ""
                      : bubbleStage === 1
                      ? "Selected brands showing exceptional growth metrics and market potential"
                      : "Leading brands demonstrating outstanding performance and market leadership"}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : index === 3 ? (
            <motion.div
              className="relative w-full h-full overflow-hidden bg-orange-50"
              animate={{ scale: 1 / getPageScale(index) }}
            >
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
                  LIQUID.DEATH
                </h1>
              </div>

              {/* Product Image and Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <div className="flex flex-col items-center justify-between w-full max-w-7xl">
                  <div className="relative w-1/3 max-w-xl aspect-[3/2] mb-8">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file%20(1)-ysMqT25Xisbmc6fahrZVW38EAYsuqf.png"
                      alt="Liquid Death Canned Water Products"
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
                      TURNING WATER INTO A BOLD
                    </h2>
                    <h2
                      className="text-[6vw] sm:text-[4vw] font-bold text-[#355070] tracking-tight whitespace-nowrap overflow-hidden"
                      style={{ lineHeight: "1" }}
                    >
                      LIFESTYLE STATEMENT
                    </h2>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : index === 4 ? (
            <motion.div
              className="w-full h-full overflow-y-auto bg-white text-black font-['PP_Mori',sans-serif]"
              animate={{ scale: 1 / getPageScale(index) }}
            >
              <div className="container mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl w-full">
                  <Card className="col-span-1 lg:col-span-2 bg-[#2B4B5C] text-white">
                    <CardContent className="p-6">
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
                              Mike Cessario
                            </span>
                          </div>
                          <h2 className="text-4xl font-bold mb-6">Founder</h2>
                          <div className="mb-6">
                            <h3 className="text-2xl font-bold mb-4">
                              Education
                            </h3>
                            <p className="text-lg leading-relaxed mb-2">
                              <span className="font-semibold">
                                Bachelor Degree:
                              </span>{" "}
                              Communication and Rhetoric from the University of
                              Pittsburgh.
                            </p>
                          </div>
                          <div className="mb-6">
                            <h3 className="text-2xl font-bold mb-4">
                              Professional Background
                            </h3>
                            <ul className="list-disc list-inside text-lg leading-relaxed mb-2">
                              <li>
                                Served as Creative Director at various
                                advertising agencies, developing campaigns for
                                high-profile brands.
                              </li>
                              <li>
                                Produced the &quot;Save the Bros&quot; campaign
                                for Organic Valley.
                              </li>
                              <li>Former Creative Director at Netflix.</li>
                              <li>
                                Played in punk rock and heavy metal bands.
                              </li>
                            </ul>
                          </div>
                          <div className="mb-6">
                            <h3 className="text-2xl font-bold mb-4">Socials</h3>
                            <div className="flex space-x-4">
                              <Link
                                href="https://x.com/cessario?lang=en"
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
                                href="https://www.linkedin.com/in/mikecessario/"
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
                        <div className="lg:w-1/2 mt-6 lg:mt-0">
                          <div
                            className="relative w-full h-0"
                            style={{ paddingBottom: "100%" }}
                          >
                            <Image
                              src="https://mastersofscale.com/wp-content/uploads/2024/07/MoS_MikeCessario_colorcutout-350x350.webp"
                              alt="Mike Cessario holding Liquid Death cans"
                              layout="fill"
                              objectFit="cover"
                              className="rounded-lg"
                              sizes="200px"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-[#2B4B5C] text-white">
                    <CardContent className="p-6">
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
                        Founder and CEO of Liquid Death
                      </h2>
                      <h3 className="text-lg font-semibold mb-2">
                        Entrepreneurial Ventures
                      </h3>
                      <div className="mb-4">
                        <h4 className="text-lg font-semibold mb-1">
                          Pre-Liquid Death
                        </h4>
                        <p className="text-lg leading-relaxed">
                          Explored creating a brandy brand called Western Grace.
                        </p>
                      </div>
                      <div className="mb-4">
                        <h4 className="text-lg font-semibold mb-1">
                          Liquid Death Launch
                        </h4>
                        <p className="text-lg leading-relaxed">
                          Founded in 2017 with three partners: J.R. Riggins, Pat
                          Cook (a bartender), and Will Carsola (an artist).
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-[#B8D8E3] text-black">
                    <CardContent className="p-6">
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
                            Inspired by punk rock culture and the Vans Warped
                            Tour music festival.
                          </li>
                          <li>Background in graphic design and advertising.</li>
                          <li>
                            Influenced by Mad Magazine and the DIY ethos of punk
                            culture.
                          </li>
                        </ul>
                      </div>
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">
                          Public Presence
                        </h3>
                        <ul className="list-disc list-inside text-lg leading-relaxed">
                          <li>Active on social media platforms.</li>
                          <li>
                            Featured in interviews and articles in various
                            publications.
                          </li>
                          <li>
                            Speaks at events about entrepreneurship and
                            branding.
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          ) : index === 5 ? (
            <motion.div
              className="relative w-full h-full overflow-hidden bg-orange-50"
              animate={{ scale: 1 / getPageScale(index) }}
            >
              <h2 className="text-[12vw] sm:text-[8vw] font-bold text-[#2B4B5C] tracking-tight whitespace-nowrap overflow-hidden font-['PP_Mori',sans-serif] mb-4">
                LEADERSHIP
              </h2>

              {/* Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
                {executives.map((exec, index) => (
                  <Card
                    key={index}
                    className="bg-[#2B4B5C] overflow-hidden shadow-lg"
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
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-white">
                          Professional Background
                        </h3>
                        <ul className="list-disc list-inside text-white">
                          {exec.experience.map((exp, i) => (
                            <li key={i}>{exp}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-white">
                          Entrepreneurial Career
                        </h3>
                        <ul className="list-disc list-inside text-white">
                          {exec.entrepreneurial.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          ) : index === 6 ? (
            <motion.div
              className="w-full h-full overflow-y-auto bg-black text-white"
              animate={{ scale: 1 / getPageScale(index) }}
            >
              <div className="container mx-auto p-4 min-h-screen">
                <h2 className="text-[12vw] sm:text-[8vw] font-bold text-white tracking-tight whitespace-nowrap overflow-hidden font-['PP_Mori',sans-serif] mb-4">
                  TIMELINE
                </h2>

                <div className="mb-6 flex flex-wrap gap-2">
                  <Button
                    variant={selectedCategory === null ? "default" : "outline"}
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
          ) : index === 7 ? (
            <motion.div
              className="w-full h-full overflow-y-auto bg-gradient-to-b from-black via-black to-[#001F3F]"
              animate={{ scale: 1 / getPageScale(index) }}
            >
              <AnalyticsDashboard />
            </motion.div>
          ) : index === 8 ? (
            <motion.div
              className="w-full h-full overflow-y-auto"
              animate={{ scale: 1 / getPageScale(index) }}
            >
              <TopInvestors />
            </motion.div>
          ) : null}
        </motion.div>
      ))}

      {/* Navigation Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Link href="/poppi">
          <Button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 shadow-lg">
            <span className="mr-2">Next: Poppi</span>
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
          text-align: justify;
          text-align-last: justify;
          text-justify: inter-character;
        }
        .recharts-wrapper {
          width: 100% !important;
          height: 100% !important;
        }
        .recharts-surface {
          overflow: visible;
        }
      `}</style>
    </div>
  );
}
