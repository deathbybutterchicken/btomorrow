"use client";

import dynamic from "next/dynamic";

const LiquidDeathLanding = dynamic(() => import("./liquid-death-landing"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export default function ClientWrapper() {
  return <LiquidDeathLanding brandId="liquid-death" />;
}
