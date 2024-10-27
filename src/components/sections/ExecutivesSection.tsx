import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Linkedin, GraduationCap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

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

interface ExecutivesSectionProps {
  getPageScale: (index: number) => number;
}

export function ExecutivesSection({ getPageScale }: ExecutivesSectionProps) {
  return (
    <motion.div
      className="relative w-full h-screen overflow-y-auto bg-orange-50 p-6"
      animate={{ scale: getPageScale(0) }}
    >
      <h2 className="text-[12vw] sm:text-[8vw] font-bold text-[#2B4B5C] tracking-tight whitespace-nowrap font-['PP_Mori',sans-serif] mb-4">
        LEADERSHIP
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10 pb-6">
        {executives.map((exec, index) => (
          <Card key={index} className="bg-[#2B4B5C] overflow-hidden shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-3xl font-bold text-white">
                    {exec.name}
                  </CardTitle>
                  <p className="text-lg text-white opacity-90">{exec.title}</p>
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
  );
}
