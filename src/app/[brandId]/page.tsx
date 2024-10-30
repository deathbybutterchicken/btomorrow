import { notFound } from "next/navigation";
import BrandLanding from "@/components/liquid-death-landing";

export async function generateStaticParams() {
  const brands = [
    "liquiddeath",
    "poppi",
    "olipop",
    "delacalle",
    "lemonperfect",
    "hint",
    "athletic",
    "cellucor",
    "biolyte",
  ];

  return brands.map((brand) => ({
    brandId: brand,
  }));
}

export default function BrandPage({ params }: { params: { brandId: string } }) {
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
  ];

  if (!validBrands.includes(params.brandId)) {
    notFound();
  }

  return <BrandLanding brandId={params.brandId} />;
}
