// src/types/brand.ts

export interface TimelineEvent {
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
}

export interface Executive {
  name: string;
  title: string;
  image: string;
  education?: string;
  experience?: string[];
  entrepreneurial?: string[];
  linkedin?: string;
}

export interface Investor {
  name: string;
  logoUrl: string;
  totalRoundsParticipated: number;
  roundsParticipated: string[];
  leadInvestments: string[];
  otherInvestments: string[];
  website: string | null;
  description: string;
}

export interface AnalyticsData {
  capitalRaisedData: Array<{
    date: string;
    cumulativeRaised: number;
  }>;
  valuationData: Array<{
    date: string;
    preMoneyValuation: number;
    postMoneyValuation: number;
  }>;
  revenueData: Array<{
    year: number;
    revenue: number;
  }>;
  ownershipData: Array<{
    date: string;
    foundersOwnership: number;
    investorsOwnership: number;
  }>;
}

export interface BrandData {
  id: string;
  name: string;
  tagline: string;
  mainImage: string;
  description: string;
  founders: Executive[];
  executives: Executive[];
  timeline: TimelineEvent[];
  analytics: AnalyticsData;
  investors: Investor[];
  brandColors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  pages: Array<{
    id: number;
    title: string;
    subtitle: string;
    color: string;
    textColor: string;
  }>;
}
