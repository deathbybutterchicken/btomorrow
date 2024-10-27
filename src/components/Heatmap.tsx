import React from "react";

interface HeatmapProps {
  onCellClick: (
    activity: string,
    stage: string,
    value: number,
    brands: { name: string; description: string }[]
  ) => void;
}

const Heatmap: React.FC<HeatmapProps> = ({ onCellClick }) => {
  const stages = [
    "Seed to A",
    "A to B",
    "B to C",
    "C to D",
    "D to E",
    "E to F",
  ];

  const activitiesData = [
    // 1. Product Development & Launch
    {
      activity: "Product Development & Launch",
      stages: {
        "Seed to A": {
          count: 9,
          brands: [
            {
              name: "De La Calle",
              description:
                "Launched probiotic tepache beverages inspired by traditional Mexican recipes.",
            },
            {
              name: "Lemon Perfect",
              description:
                "Developed and introduced hydrating lemon water made from organic lemons.",
            },
            {
              name: "Hint",
              description:
                "Introduced fruit-infused water with no sweeteners or calories.",
            },
            {
              name: "Poppi",
              description:
                "Launched apple cider vinegar-infused sodas promoting gut health.",
            },
            {
              name: "Cellucor",
              description:
                "Developed sports nutrition products and pre-workout supplements.",
            },
            {
              name: "Biolyte",
              description:
                "Created a hydration drink with medical-grade electrolyte content.",
            },
            {
              name: "Liquid Death",
              description:
                "Introduced canned mountain water with edgy branding to appeal to younger consumers.",
            },
            {
              name: "Olipop",
              description:
                "Launched functional sodas containing prebiotics and botanicals for digestive health.",
            },
            {
              name: "Athletic Brewing Co.",
              description:
                "Developed craft non-alcoholic beers offering full flavor without alcohol.",
            },
          ],
        },
        "A to B": { count: 0, brands: [] },
        "B to C": { count: 0, brands: [] },
        "C to D": { count: 0, brands: [] },
        "D to E": { count: 0, brands: [] },
        "E to F": { count: 0, brands: [] },
      },
    },
    // 2. Initial Funding Secured
    {
      activity: "Initial Funding Secured",
      stages: {
        "Seed to A": {
          count: 9,
          brands: [
            {
              name: "De La Calle",
              description:
                "Secured seed funding to begin operations and product development.",
            },
            {
              name: "Lemon Perfect",
              description:
                "Raised initial capital to launch lemon water beverages.",
            },
            {
              name: "Hint",
              description:
                "Obtained funding to develop and market fruit-infused waters.",
            },
            {
              name: "Poppi",
              description:
                "Received seed investment after appearing on Shark Tank.",
            },
            {
              name: "Cellucor",
              description:
                "Secured funds to start producing sports nutrition supplements.",
            },
            {
              name: "Biolyte",
              description:
                "Raised initial funding to develop a medical-grade hydration drink.",
            },
            {
              name: "Liquid Death",
              description:
                "Raised capital to launch canned water with unique branding.",
            },
            {
              name: "Olipop",
              description:
                "Secured funding to develop functional sodas with health benefits.",
            },
            {
              name: "Athletic Brewing Co.",
              description:
                "Raised seed funding to create non-alcoholic craft beers.",
            },
          ],
        },
        "A to B": { count: 0, brands: [] },
        "B to C": { count: 0, brands: [] },
        "C to D": { count: 0, brands: [] },
        "D to E": { count: 0, brands: [] },
        "E to F": { count: 0, brands: [] },
      },
    },
    // 3. Local Market Sales
    {
      activity: "Local Market Sales",
      stages: {
        "Seed to A": {
          count: 8,
          brands: [
            {
              name: "Lemon Perfect",
              description:
                "Sold products in local stores and farmers' markets to build a customer base.",
            },
            {
              name: "Hint",
              description:
                "Distributed waters in local retailers to gain initial traction.",
            },
            {
              name: "Poppi",
              description: "Promoted sodas at local events and health stores.",
            },
            {
              name: "Cellucor",
              description:
                "Sold supplements in local gyms and nutrition shops.",
            },
            {
              name: "Biolyte",
              description:
                "Introduced hydration drinks in local pharmacies and clinics.",
            },
            {
              name: "Liquid Death",
              description:
                "Started local sales in convenience stores and skate shops.",
            },
            {
              name: "Olipop",
              description:
                "Distributed functional sodas in local health food stores.",
            },
            {
              name: "Athletic Brewing Co.",
              description:
                "Sold non-alcoholic beers in local bars and restaurants.",
            },
          ],
        },
        "A to B": { count: 0, brands: [] },
        "B to C": { count: 0, brands: [] },
        "C to D": { count: 0, brands: [] },
        "D to E": { count: 0, brands: [] },
        "E to F": { count: 0, brands: [] },
      },
    },
    // 4. Launched DTC Platform
    {
      activity: "Launched DTC Platform",
      stages: {
        "Seed to A": {
          count: 4,
          brands: [
            {
              name: "Lemon Perfect",
              description:
                "Opened an online store to reach customers directly.",
            },
            {
              name: "Liquid Death",
              description:
                "Launched a DTC platform offering subscription services.",
            },
            {
              name: "Olipop",
              description:
                "Enabled direct sales through their website with customizable packs.",
            },
            {
              name: "Athletic Brewing Co.",
              description:
                "Started selling beers directly online to expand reach.",
            },
          ],
        },
        "A to B": {
          count: 1,
          brands: [
            {
              name: "Hint",
              description: "Expanded to DTC sales via their e-commerce site.",
            },
          ],
        },
        "B to C": { count: 0, brands: [] },
        "C to D": { count: 0, brands: [] },
        "D to E": { count: 0, brands: [] },
        "E to F": { count: 0, brands: [] },
      },
    },
    // 5. Social Media Marketing
    {
      activity: "Social Media Marketing",
      stages: {
        "Seed to A": {
          count: 5,
          brands: [
            {
              name: "Lemon Perfect",
              description:
                "Utilized Instagram to showcase products and engage with followers.",
            },
            {
              name: "Poppi",
              description: "Went viral on TikTok, boosting brand awareness.",
            },
            {
              name: "Liquid Death",
              description:
                "Created humorous and edgy content to attract a young audience.",
            },
            {
              name: "Olipop",
              description:
                "Shared wellness tips and product info on social platforms.",
            },
            {
              name: "Athletic Brewing Co.",
              description:
                "Promoted a healthy lifestyle and events on social media.",
            },
          ],
        },
        "A to B": {
          count: 1,
          brands: [
            {
              name: "De La Calle",
              description:
                "Increased social media presence to reach a broader audience.",
            },
          ],
        },
        "B to C": {
          count: 1,
          brands: [
            {
              name: "Poppi",
              description:
                "Continued leveraging TikTok for marketing campaigns.",
            },
          ],
        },
        "C to D": { count: 0, brands: [] },
        "D to E": { count: 0, brands: [] },
        "E to F": { count: 0, brands: [] },
      },
    },
    // 6. Expanded Product Lines
    {
      activity: "Expanded Product Lines",
      stages: {
        "Seed to A": { count: 0, brands: [] },
        "A to B": {
          count: 8,
          brands: [
            {
              name: "De La Calle",
              description:
                "Introduced new tepache flavors to appeal to diverse tastes.",
            },
            {
              name: "Hint",
              description:
                "Expanded offerings with new fruit-infused water flavors.",
            },
            {
              name: "Poppi",
              description:
                "Added more soda flavors featuring apple cider vinegar.",
            },
            {
              name: "Cellucor",
              description: "Launched additional supplements and flavors.",
            },
            {
              name: "Biolyte",
              description:
                "Introduced new flavors to their hydration drink line.",
            },
            {
              name: "Liquid Death",
              description:
                "Added sparkling water options to their product lineup.",
            },
            {
              name: "Olipop",
              description: "Released new functional soda flavors.",
            },
            {
              name: "Athletic Brewing Co.",
              description: "Expanded beer offerings with various styles.",
            },
          ],
        },
        "B to C": {
          count: 5,
          brands: [
            {
              name: "De La Calle",
              description: "Continued to innovate with seasonal flavors.",
            },
            {
              name: "Lemon Perfect",
              description: "Introduced new citrus-based flavors.",
            },
            {
              name: "Cellucor",
              description: "Expanded into ready-to-drink products.",
            },
            {
              name: "Biolyte",
              description:
                "Added powdered versions of their hydration formula.",
            },
            {
              name: "Athletic Brewing Co.",
              description: "Launched limited-edition brews.",
            },
          ],
        },
        "C to D": {
          count: 5,
          brands: [
            {
              name: "De La Calle",
              description: "Expanded into non-alcoholic cocktail mixers.",
            },
            {
              name: "Cellucor",
              description:
                "Introduced new product lines targeting different fitness goals.",
            },
            {
              name: "Biolyte",
              description: "Released kids' hydration drinks.",
            },
            {
              name: "Liquid Death",
              description: "Launched flavored sparkling waters.",
            },
            {
              name: "Athletic Brewing Co.",
              description: "Expanded into non-alcoholic seltzers.",
            },
          ],
        },
        "D to E": { count: 0, brands: [] },
        "E to F": { count: 0, brands: [] },
      },
    },
    // 7. Entered Larger Retailers
    {
      activity: "Entered Larger Retailers",
      stages: {
        "Seed to A": { count: 0, brands: [] },
        "A to B": {
          count: 9,
          brands: [
            {
              name: "De La Calle",
              description: "Secured placement in Whole Foods Market.",
            },
            {
              name: "Lemon Perfect",
              description: "Entered regional chains like Publix and Kroger.",
            },
            {
              name: "Hint",
              description: "Began selling in Starbucks locations nationwide.",
            },
            {
              name: "Poppi",
              description: "Got products into Target and Walmart stores.",
            },
            {
              name: "Cellucor",
              description: "Expanded distribution to GNC and Vitamin Shoppe.",
            },
            {
              name: "Biolyte",
              description: "Entered larger retailers like Kroger and Ingles.",
            },
            {
              name: "Liquid Death",
              description: "Started selling in Whole Foods and 7-Eleven.",
            },
            {
              name: "Olipop",
              description:
                "Secured shelf space in major retailers like Kroger.",
            },
            {
              name: "Athletic Brewing Co.",
              description: "Entered Whole Foods and Total Wine & More.",
            },
          ],
        },
        "B to C": {
          count: 7,
          brands: [
            {
              name: "De La Calle",
              description: "Expanded to national retail chains.",
            },
            {
              name: "Hint",
              description: "Increased retail presence in major supermarkets.",
            },
            {
              name: "Poppi",
              description: "Broadened distribution to nationwide retailers.",
            },
            {
              name: "Cellucor",
              description: "Extended products to big-box stores like Walmart.",
            },
            {
              name: "Biolyte",
              description: "Entered major retailers such as Target.",
            },
            {
              name: "Liquid Death",
              description:
                "Expanded to more convenience stores and supermarkets.",
            },
            {
              name: "Olipop",
              description: "Increased availability in national chains.",
            },
          ],
        },
        "C to D": {
          count: 5,
          brands: [
            {
              name: "De La Calle",
              description: "Solidified presence in major retailers.",
            },
            {
              name: "Biolyte",
              description: "Expanded to national pharmacy chains.",
            },
            {
              name: "Liquid Death",
              description: "Gained shelf space in international retailers.",
            },
            {
              name: "Olipop",
              description: "Enhanced distribution to more retail partners.",
            },
            {
              name: "Athletic Brewing Co.",
              description: "Extended reach to global retailers.",
            },
          ],
        },
        "D to E": {
          count: 1,
          brands: [
            {
              name: "De La Calle",
              description: "Continued expansion into new retail markets.",
            },
          ],
        },
        "E to F": { count: 0, brands: [] },
      },
    },
    // 8. Secured Significant Funding
    {
      activity: "Secured Significant Funding",
      stages: {
        "Seed to A": { count: 0, brands: [] },
        "A to B": {
          count: 9,
          brands: [
            {
              name: "De La Calle",
              description:
                "Raised Series A funding to expand production and distribution.",
            },
            {
              name: "Lemon Perfect",
              description:
                "Secured Series A funding to accelerate growth and market expansion.",
            },
            {
              name: "Hint",
              description:
                "Received Series A investment to scale operations and marketing.",
            },
            {
              name: "Poppi",
              description:
                "Raised Series A funding after 'Shark Tank' appearance to boost growth.",
            },
            {
              name: "Cellucor",
              description:
                "Secured significant funding to broaden product lines and reach.",
            },
            {
              name: "Biolyte",
              description:
                "Received Series A funding to increase production and retail presence.",
            },
            {
              name: "Liquid Death",
              description:
                "Raised Series A funding to enhance marketing and distribution channels.",
            },
            {
              name: "Olipop",
              description:
                "Secured investment to expand product offerings and market reach.",
            },
            {
              name: "Athletic Brewing Co.",
              description:
                "Received Series A funding to scale production and distribution.",
            },
          ],
        },
        "B to C": {
          count: 9,
          brands: [
            {
              name: "De La Calle",
              description:
                "Raised Series B funding to enter new markets and develop products.",
            },
            {
              name: "Lemon Perfect",
              description:
                "Secured Series B funding for nationwide expansion and marketing.",
            },
            {
              name: "Hint",
              description:
                "Received Series B investment to increase production capacity.",
            },
            {
              name: "Poppi",
              description:
                "Raised Series B funding to grow retail partnerships and marketing.",
            },
            {
              name: "Cellucor",
              description:
                "Secured additional funding to develop new product lines.",
            },
            {
              name: "Biolyte",
              description:
                "Received Series B funding to expand into larger retailers.",
            },
            {
              name: "Liquid Death",
              description:
                "Raised Series B funding to expand international presence.",
            },
            {
              name: "Olipop",
              description:
                "Secured Series B investment to increase production and marketing.",
            },
            {
              name: "Athletic Brewing Co.",
              description:
                "Received Series B funding to enhance distribution and product development.",
            },
          ],
        },
        "C to D": {
          count: 7,
          brands: [
            {
              name: "De La Calle",
              description:
                "Secured Series C funding for product innovation and marketing.",
            },
            {
              name: "Poppi",
              description:
                "Received Series C investment to expand marketing and distribution.",
            },
            {
              name: "Cellucor",
              description:
                "Raised Series C funding to enter international markets.",
            },
            {
              name: "Biolyte",
              description:
                "Secured Series C funding to diversify product lines.",
            },
            {
              name: "Liquid Death",
              description:
                "Received Series C investment to introduce new products globally.",
            },
            {
              name: "Olipop",
              description:
                "Raised Series C funding for high-profile collaborations and expansion.",
            },
            {
              name: "Athletic Brewing Co.",
              description:
                "Secured Series C funding to scale operations and enter new markets.",
            },
          ],
        },
        "D to E": {
          count: 5,
          brands: [
            {
              name: "De La Calle",
              description:
                "Received Series D funding for market dominance and sustainability initiatives.",
            },
            {
              name: "Hint",
              description:
                "Secured Series D investment to enhance product lines and market reach.",
            },
            {
              name: "Cellucor",
              description:
                "Raised Series D funding to expand globally and innovate products.",
            },
            {
              name: "Liquid Death",
              description:
                "Secured Series D funding for product expansion and partnerships.",
            },
            {
              name: "Athletic Brewing Co.",
              description:
                "Received Series D investment to establish a global presence.",
            },
          ],
        },
        "E to F": { count: 0, brands: [] },
      },
    },

    // 9. Celebrity Endorsements
    {
      activity: "Celebrity Endorsements",
      stages: {
        "Seed to A": { count: 0, brands: [] },
        "A to B": {
          count: 3,
          brands: [
            {
              name: "Lemon Perfect",
              description:
                "Received endorsement from Beyoncé, boosting brand visibility.",
            },
            {
              name: "Poppi",
              description:
                "Secured investment and promotion from celebrities like Jennifer Lopez.",
            },
            {
              name: "Liquid Death",
              description:
                "Gained attention through collaborations with comedians and musicians.",
            },
          ],
        },
        "B to C": {
          count: 2,
          brands: [
            {
              name: "Cellucor",
              description:
                "Partnered with fitness influencers and athletes for endorsements.",
            },
            {
              name: "Olipop",
              description:
                "Received endorsement from Camila Cabello, increasing brand exposure.",
            },
          ],
        },
        "C to D": {
          count: 2,
          brands: [
            {
              name: "Poppi",
              description:
                "Collaborated with celebrity influencers to promote new flavors.",
            },
            {
              name: "Liquid Death",
              description:
                "Featured Tony Hawk in high-profile marketing campaigns.",
            },
          ],
        },
        "D to E": {
          count: 1,
          brands: [
            {
              name: "Cellucor",
              description:
                "Secured endorsements from WWE athletes to reach broader audiences.",
            },
          ],
        },
        "E to F": { count: 0, brands: [] },
      },
    },

    // 10. Large-Scale Marketing Campaigns
    {
      activity: "Large-Scale Marketing Campaigns",
      stages: {
        "Seed to A": { count: 0, brands: [] },
        "A to B": {
          count: 1,
          brands: [
            {
              name: "Hint",
              description:
                "Launched nationwide advertising to increase brand awareness.",
            },
          ],
        },
        "B to C": {
          count: 3,
          brands: [
            {
              name: "Poppi",
              description:
                "Initiated large-scale campaigns to promote gut health benefits.",
            },
            {
              name: "Cellucor",
              description:
                "Ran national ads focusing on performance and energy.",
            },
            {
              name: "Athletic Brewing Co.",
              description:
                "Launched campaigns highlighting non-alcoholic lifestyle.",
            },
          ],
        },
        "C to D": {
          count: 4,
          brands: [
            {
              name: "Poppi",
              description:
                "Increased marketing efforts with TV and digital ads.",
            },
            {
              name: "Cellucor",
              description: "Expanded campaigns to international audiences.",
            },
            {
              name: "Liquid Death",
              description:
                "Ran Super Bowl commercials and viral video campaigns.",
            },
            {
              name: "Athletic Brewing Co.",
              description:
                "Executed large-scale campaigns during major sports events.",
            },
          ],
        },
        "D to E": {
          count: 2,
          brands: [
            {
              name: "Cellucor",
              description:
                "Launched global campaigns focusing on new products.",
            },
            {
              name: "Liquid Death",
              description: "Continued viral marketing with high-profile ads.",
            },
          ],
        },
        "E to F": { count: 0, brands: [] },
      },
    },

    // 11. Partnerships & Collaborations
    {
      activity: "Partnerships & Collaborations",
      stages: {
        "Seed to A": { count: 0, brands: [] },
        "A to B": {
          count: 2,
          brands: [
            {
              name: "De La Calle",
              description: "Collaborated with local brands for co-promotions.",
            },
            {
              name: "Lemon Perfect",
              description: "Partnered with fitness studios for joint events.",
            },
          ],
        },
        "B to C": {
          count: 3,
          brands: [
            {
              name: "Poppi",
              description:
                "Collaborated with health influencers for product promotions.",
            },
            {
              name: "Cellucor",
              description: "Partnered with gyms for product placements.",
            },
            {
              name: "Biolyte",
              description:
                "Collaborated with healthcare professionals for endorsements.",
            },
          ],
        },
        "C to D": {
          count: 4,
          brands: [
            {
              name: "De La Calle",
              description:
                "Partnered with Nopalera for cross-promotional campaigns.",
            },
            {
              name: "Poppi",
              description:
                "Collaborated with major retailers for exclusive flavors.",
            },
            {
              name: "Athletic Brewing Co.",
              description:
                "Partnered with sports organizations for event sponsorships.",
            },
            {
              name: "Olipop",
              description:
                "Released Barbie-themed cans in collaboration with the movie.",
            },
          ],
        },
        "D to E": {
          count: 1,
          brands: [
            {
              name: "Athletic Brewing Co.",
              description:
                "Collaborated with airlines to offer products onboard.",
            },
          ],
        },
        "E to F": { count: 0, brands: [] },
      },
    },

    // 12. Achieved Sales Milestones
    {
      activity: "Achieved Sales Milestones",
      stages: {
        "Seed to A": { count: 0, brands: [] },
        "A to B": {
          count: 1,
          brands: [
            {
              name: "Hint",
              description:
                "Reached $10 million in annual sales, marking significant growth.",
            },
          ],
        },
        "B to C": {
          count: 5,
          brands: [
            {
              name: "Poppi",
              description:
                "Surpassed $50 million in sales due to increased demand.",
            },
            {
              name: "Cellucor",
              description: "Achieved record sales with new product launches.",
            },
            {
              name: "Biolyte",
              description:
                "Hit major sales milestones expanding into new markets.",
            },
            {
              name: "Olipop",
              description:
                "Reached $100 million in sales, indicating rapid growth.",
            },
            {
              name: "Athletic Brewing Co.",
              description:
                "Exceeded sales projections with national distribution.",
            },
          ],
        },
        "C to D": {
          count: 5,
          brands: [
            {
              name: "Poppi",
              description: "Doubled sales figures from the previous year.",
            },
            {
              name: "Cellucor",
              description:
                "Continued sales growth through international markets.",
            },
            {
              name: "Liquid Death",
              description:
                "Reached $130 million valuation due to soaring sales.",
            },
            {
              name: "Olipop",
              description:
                "Maintained strong sales growth with new product releases.",
            },
            {
              name: "Athletic Brewing Co.",
              description:
                "Surpassed $200 million in sales, reflecting market demand.",
            },
          ],
        },
        "D to E": {
          count: 2,
          brands: [
            {
              name: "Liquid Death",
              description:
                "Achieved over $700 million valuation with record sales.",
            },
            {
              name: "Athletic Brewing Co.",
              description:
                "Continued upward sales trajectory, establishing market leadership.",
            },
          ],
        },
        "E to F": { count: 0, brands: [] },
      },
    },

    // 13. International Expansion
    {
      activity: "International Expansion",
      stages: {
        "Seed to A": { count: 0, brands: [] },
        "A to B": { count: 0, brands: [] },
        "B to C": {
          count: 3,
          brands: [
            {
              name: "Cellucor",
              description:
                "Expanded distribution to European and Asian markets.",
            },
            {
              name: "Liquid Death",
              description:
                "Launched products in international markets starting with Canada.",
            },
            {
              name: "Athletic Brewing Co.",
              description:
                "Began exporting non-alcoholic beers to the UK and Europe.",
            },
          ],
        },
        "C to D": {
          count: 3,
          brands: [
            {
              name: "Cellucor",
              description: "Established manufacturing facilities overseas.",
            },
            {
              name: "Liquid Death",
              description: "Expanded into Australia and European countries.",
            },
            {
              name: "Olipop",
              description:
                "Started international shipping to select countries.",
            },
          ],
        },
        "D to E": {
          count: 1,
          brands: [
            {
              name: "Athletic Brewing Co.",
              description:
                "Opened brewing facilities in Europe to serve international markets.",
            },
          ],
        },
        "E to F": { count: 0, brands: [] },
      },
    },

    // 14. Awards & Recognitions
    {
      activity: "Awards & Recognitions",
      stages: {
        "Seed to A": { count: 0, brands: [] },
        "A to B": {
          count: 2,
          brands: [
            {
              name: "De La Calle",
              description: "Won local awards for innovative beverage products.",
            },
            {
              name: "Athletic Brewing Co.",
              description: "Received accolades for non-alcoholic beer quality.",
            },
          ],
        },
        "B to C": {
          count: 2,
          brands: [
            {
              name: "Biolyte",
              description: "Awarded for excellence in hydration products.",
            },
            {
              name: "Athletic Brewing Co.",
              description:
                "Named among top craft breweries by industry groups.",
            },
          ],
        },
        "C to D": {
          count: 1,
          brands: [
            {
              name: "Athletic Brewing Co.",
              description:
                "Received international awards for brewing innovation.",
            },
          ],
        },
        "D to E": { count: 0, brands: [] },
        "E to F": { count: 0, brands: [] },
      },
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse w-full text-sm md:text-base">
        <thead>
          <tr>
            <th className="px-4 py-2 border bg-background"></th>
            {stages.map((stage, index) => (
              <th
                key={index}
                className="px-4 py-2 border bg-background text-xs whitespace-nowrap"
              >
                {stage}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {activitiesData.map((activityData, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 text-xs whitespace-nowrap bg-background">
                {activityData.activity}
              </td>
              {stages.map((stage, idx) => {
                const cellData =
                  activityData.stages[
                    stage as keyof typeof activityData.stages
                  ];
                const value = cellData.count;
                const intensity = Math.min(0.9, value * 0.2 + 0.1);

                return (
                  <td
                    key={idx}
                    className="border px-4 py-2 text-center cursor-pointer"
                    style={{
                      backgroundColor:
                        value > 0
                          ? `rgba(59, 130, 246, ${intensity})`
                          : "transparent",
                    }}
                    onClick={() => {
                      if (value > 0) {
                        onCellClick(
                          activityData.activity,
                          stage,
                          value,
                          cellData.brands as {
                            name: string;
                            description: string;
                          }[]
                        );
                      }
                    }}
                  >
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Heatmap;
