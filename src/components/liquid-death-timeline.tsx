"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

type TimelineEvent = {
  date: string;
  eventName: string;
  category: string;
  eventDescription: string;
  additionalInfo?: {
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
    category: "Company Founding",
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
  },
  {
    date: "2020",
    eventName: "Series B Funding of $23 million",
    category: "Funding",
    eventDescription:
      "Raised an additional $23 million in Series B to scale up the brand and operations.",
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
  },
  {
    date: "2021",
    eventName: "Partnership with Tony Hawk",
    category: "Branding & Marketing",
    eventDescription:
      "Tony Hawk collaborated with Liquid Death to create 100 limited-edition skateboards infused with his own blood, priced at $500 each. The boards featured a gruesome design with Liquid Death's branding and came with a certificate of authenticity.",
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
  },
  {
    date: "2024",
    eventName: "Collaboration with Van Leeuwen",
    category: "Branding & Marketing",
    eventDescription:
      "Liquid Death announced an unexpected product: Hot Fudge Sundae-flavored sparkling water, in collaboration with artisan ice cream maker Van Leeuwen.",
  },
  {
    date: "2024",
    eventName: "Chaos Partnership with Yeti",
    category: "Branding & Marketing",
    eventDescription:
      'Liquid Death collaborated with Yeti to create a unique "coffin cooler," described as "not just a casket, it\'s a revolutionary beverage cooler," designed to keep drinks cold for an eternity. The starting bid was set at $1,500 with the final selling price at $66,500.',
  },
  {
    date: "2024",
    eventName: "Chaos Partnership with Plunge",
    category: "Branding & Marketing",
    eventDescription:
      'Liquid Death partnered with Plunge to create a limited-edition "Freeze to Death" vertical cold plunge tub shaped like a giant Liquid Death can, priced at $5,990 with only 300 units available.',
  },
  {
    date: "2024",
    eventName: "Collaboration with Burton",
    category: "Branding & Marketing",
    eventDescription:
      "Liquid Death collaborated with Burton to create the \"Deathtrap\" collection, featuring a limited-edition snowboard with Liquid Death's signature skull imagery trapped in ice, along with matching outerwear. The partnership aimed to expand Liquid Death's reach into the snowboarding community while providing Burton exposure to a younger, edgy demographic.",
  },
  {
    date: "2024",
    eventName: "Chaos Partnership with MeUndies",
    category: "Branding & Marketing",
    eventDescription:
      'Liquid Death collaborated with MeUndies to launch the "Doom and Bloom" collection, featuring playful and edgy underwear designs that incorporate Liquid Death\'s signature aesthetic.',
  },
];

export function Timeline() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  const categories = useMemo(() => {
    return Array.from(new Set(timelineData.map((event) => event.category)));
  }, []);

  const filteredEvents = useMemo(() => {
    if (!selectedCategory) return timelineData;
    return timelineData.filter((event) => event.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="container mx-auto p-4 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Liquid Death Timeline</h1>

      <div className="mb-6 flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => setSelectedCategory(null)}
          className={`bg-white/10 backdrop-filter backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 ${
            selectedCategory === null ? "bg-white/30 border-white" : ""
          }`}
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className={`bg-white/10 backdrop-filter backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 ${
              selectedCategory === category ? "bg-white/30 border-white" : ""
            }`}
          >
            {category}
          </Button>
        ))}
      </div>

      <ScrollArea className="h-[600px] w-full rounded-md border border-white/20 p-4 bg-white/10 backdrop-filter backdrop-blur-lg">
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
  return (
    <div className="mt-8 space-y-4 text-white/90">
      {" "}
      {/* Changed from mt-4 to mt-8 */}
      {info.dealInfo && (
        <div>
          <h4 className="font-semibold">Deal Info</h4>
          <ul>
            {Object.entries(info.dealInfo).map(([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>
        </div>
      )}
      {info.companyInfo && (
        <div>
          <h4 className="font-semibold">Company Info</h4>
          <ul>
            {Object.entries(info.companyInfo).map(([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>
        </div>
      )}
      {info.totalCapital && (
        <div>
          <h4 className="font-semibold">Total Capital</h4>
          <ul>
            {Object.entries(info.totalCapital).map(([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>
        </div>
      )}
      {info.equity && (
        <div>
          <h4 className="font-semibold">Equity</h4>
          <ul>
            {Object.entries(info.equity).map(([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>
        </div>
      )}
      {info.dealSynopsis && (
        <div>
          <h4 className="font-semibold">Deal Synopsis</h4>
          <p>{info.dealSynopsis}</p>
        </div>
      )}
      {info.investors && (
        <div>
          <h4 className="font-semibold">Investors</h4>
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th>Name</th>
                <th>Status</th>
                <th>Lead/Sole</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {info.investors.map((investor, index) => (
                <tr key={index}>
                  <td>{investor.name}</td>
                  <td>{investor.status}</td>
                  <td>{investor.leadSole}</td>
                  <td>{investor.comments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
