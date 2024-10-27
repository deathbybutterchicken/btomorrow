import { notFound } from "next/navigation";
import { PoppiLanding } from "@/components/poppi-landing";
import { getBrandData } from "@/lib/brands";

export default async function PoppiPage({
  params,
}: {
  params: { brandId: string };
}) {
  const brandData = await getBrandData(params.brandId);

  if (!brandData) {
    notFound();
  }

  return <PoppiLanding brandData={brandData} />;
}
