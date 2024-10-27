"use client";

import dynamic from "next/dynamic";

const Summary = dynamic(() => import("./summary"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export default function SummaryWrapper() {
  return <Summary />;
}
