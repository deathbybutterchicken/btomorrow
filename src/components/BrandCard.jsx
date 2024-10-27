import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const brandsData = [
  {
    brand: "De La Calle",
    stages: [
      {
        stage: "Seed",
        activities: [
          "Product Development & Launch",
          "Initial Funding Secured",
          "Set Up Pilot Plant",
        ],
      },
      {
        stage: "Series A",
        activities: [
          "Secured Significant Funding",
          "Product Line Expansion",
          "Entered Larger Retailers",
          "Social Media Marketing",
          "Awards & Recognitions",
        ],
      },
      {
        stage: "Series B",
        activities: [
          "Secured Significant Funding",
          "Product Line Expansion",
          "Entered Larger Retailers",
          "Partnerships & Collaborations",
          "Pricing Strategies",
          "Sampling at Expos",
        ],
      },
      {
        stage: "Series C",
        activities: [
          "Product Diversification",
          "Achieved Sales Milestones",
          "Entered Larger Retailers",
          "Partnerships & Collaborations",
          "Media Features",
          "Launched on Amazon",
        ],
      },
      {
        stage: "Series D",
        activities: [
          "Secured Significant Funding",
          "Pricing Strategy Changes",
          "Entered Larger Retailers",
          "Partnerships & Collaborations",
          "Large-Scale Marketing Campaigns",
          "Brand Repositioning",
        ],
      },
    ],
  },
  {
    brand: "Lemon Perfect",
    stages: [
      {
        stage: "Seed",
        activities: [
          "Product Development & Launch",
          "Initial Funding Secured",
          "Launched DTC Platform",
          "Social Media Marketing",
          "Entered Local Retailers",
        ],
      },
      {
        stage: "Series A",
        activities: [
          "Secured Significant Funding",
          "Partnerships & Collaborations",
          "Entered Larger Retailers",
          "Online Sales Expansion",
          "Celebrity Interest",
          "Pricing Strategies",
        ],
      },
      {
        stage: "Series B",
        activities: [
          "Secured Significant Funding",
          "Marketing Amplification",
          "Achieved Sales Milestones",
          "Product Line Expansion",
          "Large-Scale Marketing Campaigns",
          "Bottle Size Change",
        ],
      },
    ],
  },
  {
    brand: "Hint",
    stages: [
      {
        stage: "Seed",
        activities: [
          "Product Development & Launch",
          "Initial Funding Secured",
          "Entered Local Retailers",
          "Partnership with Tech Companies",
          "Premium Pricing Strategy",
        ],
      },
      {
        stage: "Series A",
        activities: [
          "Secured Significant Funding",
          "Entered Larger Retailers (Starbucks)",
          "Launched DTC Platform",
          "Expanded Product Lines",
          "Amazon Partnership",
        ],
      },
      {
        stage: "Series B",
        activities: [
          "Secured Significant Funding",
          "Digital Marketing Campaigns",
          "Entered Major Retailers",
          "Product Diversification",
          "Pricing Strategies",
        ],
      },
      {
        stage: "Series C",
        activities: [
          "Secured Significant Funding",
          "DTC Expansion",
          "Corporate Partnerships",
          "Sales Milestones Achieved",
          "Product Line Expansion",
        ],
      },
      {
        stage: "Series D",
        activities: [
          "Secured Significant Funding",
          "Corporate Social Responsibility Initiatives",
          "Entered Additional Retailers",
          "Marketing Campaigns",
          "Sales Milestones Achieved",
        ],
      },
    ],
  },
  {
    brand: "Poppi",
    stages: [
      {
        stage: "Seed",
        activities: [
          "Product Development & Launch",
          "Initial Funding Secured",
          "Rebranding Efforts",
          "Local Market Sales",
          "Social Media Marketing",
        ],
      },
      {
        stage: "Series A",
        activities: [
          "Secured Significant Funding",
          "Product Line Expansion",
          "Entered Larger Retailers",
          "Celebrity Endorsements",
          "TikTok Marketing Campaigns",
          "Sales Milestones Achieved",
        ],
      },
      {
        stage: "Series B",
        activities: [
          "Secured Significant Funding",
          "Marketing Amplification",
          "Partnerships & Collaborations",
          "Expanded Retail Presence",
          "Product Diversification",
          "Achieved Significant Sales Growth",
        ],
      },
      {
        stage: "Series C",
        activities: [
          "Secured Significant Funding",
          "High-Profile Celebrity Collaborations",
          "Large-Scale Marketing Campaigns",
          "Entered International Markets",
          "Sales Milestones Achieved",
          "Brand Collaborations",
        ],
      },
    ],
  },
  {
    brand: "Cellucor",
    stages: [
      {
        stage: "Seed",
        activities: [
          "Product Development & Launch",
          "Initial Funding Secured",
          "Entered Local Retailers",
          "Focused on Quality Ingredients",
        ],
      },
      {
        stage: "Series A",
        activities: [
          "Secured Significant Funding",
          "Launched C4 Product Line",
          "Entered Larger Retailers (GNC)",
          "Marketing through Fitness Influencers",
          "Sales Milestones Achieved",
        ],
      },
      {
        stage: "Series B",
        activities: [
          "Secured Significant Funding",
          "Product Line Expansion",
          "International Expansion",
          "Celebrity Partnerships",
          "Entered Mainstream Retailers",
        ],
      },
      {
        stage: "Series C",
        activities: [
          "Secured Significant Funding",
          "Product Diversification",
          "High-Profile Collaborations (e.g., Mars)",
          "Large-Scale Marketing Campaigns",
          "Sales Milestones Achieved",
        ],
      },
      {
        stage: "Series D",
        activities: [
          "Secured Significant Funding",
          "Partnerships with WWE",
          "Sustainability Initiatives",
          "Corporate Social Responsibility",
          "Continued Product Innovation",
        ],
      },
    ],
  },
  {
    brand: "Biolyte",
    stages: [
      {
        stage: "Seed",
        activities: [
          "Product Development & Launch",
          "Initial Funding Secured",
          "Grassroots Marketing",
          "Launched on Amazon",
          "Entered Local Retailers",
        ],
      },
      {
        stage: "Series A",
        activities: [
          "Secured Significant Funding",
          "Product Line Expansion",
          "Entered Larger Retailers (Kroger, Ingles)",
          "Marketing through Sampling",
          "Partnerships with Healthcare Workers",
          "Social Responsibility Initiatives",
        ],
      },
      {
        stage: "Series B",
        activities: [
          "Secured Significant Funding",
          "Product Diversification",
          "Entered Major Retailers (Target, Publix)",
          "Launched Loyalty Program",
          "Awards & Recognitions",
          "Sales Milestones Achieved",
        ],
      },
      {
        stage: "Series C",
        activities: [
          "Secured Significant Funding",
          "National Retail Expansion (CVS, Rite Aid)",
          "Product Line Expansion (Powder Packs)",
          "Celebrity Partnerships",
          "Marketing Campaigns",
          "Corporate Social Responsibility",
        ],
      },
    ],
  },
  {
    brand: "Liquid Death",
    stages: [
      {
        stage: "Seed",
        activities: [
          "Product Development & Launch",
          "Initial Funding Secured",
          "Launched DTC Platform",
          "Viral Marketing Campaigns",
          "Entered Local Retailers",
        ],
      },
      {
        stage: "Series A",
        activities: [
          "Secured Significant Funding",
          "Product Line Expansion (Sparkling Water)",
          "Entered Larger Retailers (Whole Foods)",
          "Celebrity Endorsements",
          "Unique Merchandise Offerings",
          "Sales Milestones Achieved",
        ],
      },
      {
        stage: "Series B",
        activities: [
          "Secured Significant Funding",
          "Large-Scale Marketing Campaigns",
          "High-Profile Collaborations (Tony Hawk)",
          "Expanded Retail Presence",
          "International Expansion",
          "Product Diversification",
        ],
      },
      {
        stage: "Series C",
        activities: [
          "Secured Significant Funding",
          "Introduced Flavored Sparkling Water",
          "Super Bowl Campaigns",
          "Celebrity Commercials",
          "Sales Milestones Achieved",
          "Global Expansion",
        ],
      },
      {
        stage: "Series D",
        activities: [
          "Secured Significant Funding",
          "Product Line Expansion (Iced Tea)",
          "Corporate Partnerships (Live Nation)",
          "Continued Viral Marketing",
          "Sustainability Initiatives",
          "Market Dominance Efforts",
        ],
      },
    ],
  },
  {
    brand: "Olipop",
    stages: [
      {
        stage: "Seed",
        activities: [
          "Product Development & Launch",
          "Initial Funding Secured",
          "Launched DTC Platform",
          "Social Media Marketing",
          "Entered Local Retailers",
        ],
      },
      {
        stage: "Series A",
        activities: [
          "Secured Significant Funding",
          "Product Line Expansion",
          "Entered Larger Retailers",
          "Influencer Collaborations",
          "Sales Milestones Achieved",
          "Digital Marketing Campaigns",
        ],
      },
      {
        stage: "Series B",
        activities: [
          "Secured Significant Funding",
          "Celebrity Endorsements (Camila Cabello)",
          "Product Diversification",
          "Marketing Amplification",
          "Entered Major Retailers",
          "Sales Milestones Achieved",
        ],
      },
      {
        stage: "Series C",
        activities: [
          "Secured Significant Funding",
          "High-Profile Collaborations (Barbie-themed cans)",
          "Large-Scale Marketing Campaigns",
          "International Expansion",
          "Corporate Partnerships",
          "Market Growth Strategies",
        ],
      },
    ],
  },
  {
    brand: "Athletic Brewing Co.",
    stages: [
      {
        stage: "Seed",
        activities: [
          "Product Development & Launch",
          "Initial Funding Secured",
          "Launched DTC Platform",
          "Opened Brewing Facility",
          "Entered Local Retailers",
        ],
      },
      {
        stage: "Series A",
        activities: [
          "Secured Significant Funding",
          "Product Line Expansion",
          "Entered Larger Retailers",
          "Ambassador Program Launched",
          "Awards & Recognitions",
          "Sales Milestones Achieved",
        ],
      },
      {
        stage: "Series B",
        activities: [
          "Secured Significant Funding",
          "Marketing Amplification",
          "Acquired Additional Facility",
          "Product Diversification",
          "International Expansion",
          "Sales Milestones Achieved",
        ],
      },
      {
        stage: "Series C",
        activities: [
          "Secured Significant Funding",
          "High-Profile Collaborations",
          "Large-Scale Marketing Campaigns",
          "Expanded Retail Presence",
          "Sustainability Initiatives",
          "Corporate Partnerships",
        ],
      },
      {
        stage: "Series D",
        activities: [
          "Secured Significant Funding",
          "Product Line Expansion",
          "Corporate Social Responsibility",
          "Market Dominance Efforts",
          "Sales Milestones Achieved",
          "Global Presence Established",
        ],
      },
    ],
  },
];

const BrandCard = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {brandsData.map((brand, index) => (
        <div
          key={index}
          className="border rounded p-4 cursor-pointer hover:shadow-lg"
          onClick={() => setSelectedBrand(brand)}
        >
          <h2 className="text-xl font-bold">{brand.brand}</h2>
          <p>{brand.stages[0].activities.join(", ")}</p>
        </div>
      ))}

      {selectedBrand && (
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedBrand.brand}</DialogTitle>
            </DialogHeader>
            <ul className="list-disc list-inside">
              {selectedBrand.stages.map((stage, idx) => (
                <li key={idx}>
                  <h3 className="text-lg font-semibold">{stage.stage}</h3>
                  <ul className="list-disc list-inside">
                    {stage.activities.map((activity, i) => (
                      <li key={i}>{activity}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default BrandCard;
