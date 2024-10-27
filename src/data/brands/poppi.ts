// src/data/brands/poppi.ts
import { BrandData } from "@/types/brand";

export const poppiData: BrandData = {
  id: "poppi",
  name: "POPPI",
  tagline: "THE GUT-FRIENDLY SODA",
  mainImage: "/poppilanding.png",
  description: "A prebiotic soda brand revolutionizing the beverage industry",
  founders: [
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
  ],
  executives: [
    {
      name: "Graham Goeppert",
      title: "SVP of eCommerce",
      image:
        "https://media.licdn.com/dms/image/v2/C4E03AQFu4Sd6LvKFLw/profile-displayphoto-shrink_400_400/0/1601817103173?e=2147483647&v=beta&t=t86Pu1CedRhvGhJTCaJQBHU3T-f7kLFz2pmF3r2Yk8g",
      education: "Bachelor of Arts (BA), Communication, UC Santa Barbara",
      experience: [
        "Senior Director of eCommerce at ONE Brands",
        "Director of eCommerce at ONE Brands",
        "Senior Manager - eCommerce at CytoSport, Inc.",
        "Sports Marketing at CytoSport, Inc.",
      ],
    },
    // ... other executives data
  ],
  timeline: [
    {
      date: "2015",
      eventName: "Initial Phase",
      category: "Branding & Marketing",
      eventDescription:
        "Stephen and Allison Ellsworth founded the brand in Austin, TX, creating a soda from fruit juice, apple cider vinegar, and inulin prebiotics.",
    },
    // ... rest of timeline data
  ],
  analytics: {
    capitalRaisedData: [
      { date: "2018-12", cumulativeRaised: 0.525 },
      { date: "2019-06", cumulativeRaised: 3.025 },
      { date: "2020-01", cumulativeRaised: 13.025 },
      { date: "2021-06", cumulativeRaised: 26.525 },
      { date: "2022-12-13", cumulativeRaised: 56.525 },
      { date: "2023-06", cumulativeRaised: 98.425 },
    ],
    valuationData: [
      {
        date: "2018-12-16",
        preMoneyValuation: 1.2,
        postMoneyValuation: 1.6,
      },
      // ... rest of valuation data
    ],
    revenueData: [
      { year: 2018, revenue: 0.852 },
      { year: 2019, revenue: 2.8 },
      { year: 2020, revenue: 8.6 },
      { year: 2021, revenue: 31 },
      { year: 2022, revenue: 100 },
      { year: 2023, revenue: 500 },
    ],
    ownershipData: [
      {
        date: "2018-12-16",
        foundersOwnership: 75,
        investorsOwnership: 25,
      },
      // ... rest of ownership data
    ],
  },
  investors: [
    {
      name: "CAVU Consumer Partners",
      logoUrl:
        "https://media.licdn.com/dms/image/v2/C4E0BAQFMd0Vu4QPdfg/company-logo_200_200/0/1661386855794/cavu_consumer_partners_logo?e=2147483647&v=beta&t=fGcgfOMsC28xg9UQ2xyps566qA_09iX0AQpfX4lYt1g",
      totalRoundsParticipated: 4,
      roundsParticipated: ["Seed Funding", "Series A", "Series A2", "Series B"],
      leadInvestments: ["Series B"],
      otherInvestments: ["Once Upon a Farm", "Vital Proteins", "Hippeas"],
      website: "https://cavuconsumerpartners.com",
      description:
        "CAVU Consumer Partners is a venture capital firm focused on investing in and building brands in the consumer products space.",
    },
    // ... other investors
  ],
  brandColors: {
    primary: "black",
    secondary: "#355070",
    accent: "#FF6B6B",
    background: "bg-orange-50",
    text: "text-black",
  },
  pages: [
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
    // ... other pages
  ],
};

// src/data/brands/index.ts
export const brands = {
  poppi: poppiData,
  // Add other brands here
};
