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
import { timelineData } from "@/data/brands/liquiddeath";

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
