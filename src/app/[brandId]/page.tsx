import { notFound } from "next/navigation";
import BrandLanding from "@/components/liquid-death-landing";

interface PageProps {
  params: {
    brandId: string;
  };
}

const validBrands = [
  "liquiddeath",
  "poppi",
  "olipop",
  "delacalle",
  "lemonperfect",
  "hint",
  "athletic",
  "cellucor",
  "biolyte",
] as const;

export async function generateStaticParams() {
  return validBrands.map((brand) => ({
    brandId: brand,
  }));
}

export default function BrandPage({ params }: PageProps) {
  console.log("Received params:", params);
  const { brandId } = params;

  console.log("Checking brand:", brandId);
  console.log("Valid brands:", validBrands);

  if (!validBrands.includes(brandId as (typeof validBrands)[number])) {
    console.log("Brand not found, redirecting to 404");
    notFound();
  }

  return <BrandLanding brandId={brandId} />;
}
