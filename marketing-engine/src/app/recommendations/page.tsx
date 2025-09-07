export const metadata = {
  title: "Recommendations | Arc Marketing Engine",
};

export default function RecommendationsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <h1 className="text-3xl font-semibold">Spend Recommendations</h1>
      <p className="text-foreground/75 max-w-2xl">
        AI-powered budget allocation suggestions by channel, audience, geography, and creative format. Uses historical
        performance and industry benchmarks.
      </p>
      <div className="rounded-xl border border-foreground/10 p-6">
        <h2 className="font-medium mb-2">This week’s suggestions</h2>
        <ul className="list-disc pl-5 text-sm text-foreground/80 space-y-1">
          <li>Shift 15% from low-ROI creatives to high-CTR short-form video.</li>
          <li>Increase Instagram Reels budget by $500; projected +12% conversions.</li>
          <li>Reduce CPC bids on Google Ads for keyword group “brand+generic”.</li>
        </ul>
      </div>
    </div>
  );
}

