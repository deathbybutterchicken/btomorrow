import { notFound } from "next/navigation";
import BrandLanding from "@/components/liquid-death-landing";

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

type ValidBrand = (typeof validBrands)[number];

export default async function Page({
  params,
}: {
  params: Promise<{ brandId: string }> | { brandId: string }
}) {
  const resolvedParams = await Promise.resolve(params);
  const { brandId } = resolvedParams;

  if (!validBrands.includes(brandId as ValidBrand)) {
    notFound();
  }

  return <BrandLanding brandId={brandId} />;
}

export function generateStaticParams() {
  return validBrands.map((brand) => ({
    brandId: brand,
  }));
}
