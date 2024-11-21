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

export async function generateStaticParams() {
  return validBrands.map((brand) => ({
    brandId: brand,
  }));
}

export default function Page(props: any) {
  const { brandId } = props.params;

  if (!validBrands.includes(brandId)) {
    notFound();
  }

  return <BrandLanding brandId={brandId} />;
}
