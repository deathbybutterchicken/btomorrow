import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

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

export function TimelineSection({
  getPageScale,
}: {
  getPageScale: (index: number) => number;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = useMemo(() => {
    return Array.from(new Set(timelineData.map((event) => event.category)));
  }, []);
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const filteredEvents = useMemo(() => {
    if (!selectedCategory) return timelineData;
    return timelineData.filter((event) => event.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <motion.div
      className="w-full h-full overflow-y-auto bg-black text-white"
      animate={{ scale: getPageScale(0) }}
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
              variant={selectedCategory === category ? "default" : "outline"}
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
                    expandedEvent === event.eventName ? null : event.eventName
                  )
                }
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </motion.div>
  );
}
