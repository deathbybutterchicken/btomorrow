import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Linkedin, GraduationCap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ExecutivesSectionProps {
  getPageScale: (index: number) => number;
  brandId: string;
}

interface Executive {
  name: string;
  title: string;
  image?: string;
  education?: string;
  experience: string[];
  entrepreneurial: string[];
  linkedin: string;
}

export function ExecutivesSection({
  getPageScale,
  brandId,
}: ExecutivesSectionProps) {
  const [executives, setExecutives] = useState<Executive[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const brandData = await import(`@/data/brands/${brandId}`);
        setExecutives(brandData.executives || []);
      } catch (error) {
        console.error("Error loading executives data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [brandId]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-orange-50">
        <p>Loading executives...</p>
      </div>
    );
  }

  if (!executives?.length) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-orange-50">
        <p>No executives data available.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="relative w-full h-screen overflow-y-auto bg-orange-50 p-6"
      animate={{ scale: getPageScale(0) }}
    >
      <h2 className="text-[12vw] sm:text-[8vw] font-bold text-[#2B4B5C] tracking-tight whitespace-nowrap font-['PP_Mori',sans-serif] mb-4">
        LEADERSHIP
      </h2>

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
                  {exec.linkedin && (
                    <Link
                      href={exec.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-2 text-white hover:text-blue-200"
                    >
                      <Linkedin className="w-5 h-5 mr-1" />
                      LinkedIn Profile
                    </Link>
                  )}
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
              {exec.experience?.length > 0 && (
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
              )}
              {exec.entrepreneurial?.length > 0 && (
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
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
