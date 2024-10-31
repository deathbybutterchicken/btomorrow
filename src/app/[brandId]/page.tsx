import { notFound } from "next/navigation";
import BrandLanding from "@/components/liquid-death-landing";

interface PageProps {
  params: Promise<{
    brandId: string;
  }>;
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

export default async function BrandPage({ params }: PageProps) {
  // Await the params
  const { brandId } = await params;

  // Validate the brandId
  if (!validBrands.includes(brandId as (typeof validBrands)[number])) {
    notFound();
  }

  return (
    <div>
      <BrandLanding brandId={brandId} />
    </div>
  );
}
