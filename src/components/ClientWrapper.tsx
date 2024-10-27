"use client";

import dynamic from "next/dynamic";

const LiquidDeathLanding = dynamic(
  () => import("./liquid-death-landing").then((mod) => mod.LiquidDeathLanding),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);

export default function ClientWrapper() {
  return <LiquidDeathLanding />;
}
