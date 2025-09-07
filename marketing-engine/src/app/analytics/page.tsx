import ChartROI from "@/components/ChartROI";

export const metadata = {
  title: "Analytics | Arc Marketing Engine",
};

export default function AnalyticsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <h1 className="text-3xl font-semibold">Analytics across platforms</h1>
      <p className="text-foreground/75 max-w-2xl">
        Connect your channels (YouTube, Instagram, TikTok, Meta Ads, Google Analytics, X/Twitter, and more) and view
        unified performance. Drill into content, audience, and conversion funnels.
      </p>
      <div className="rounded-xl border border-foreground/10 p-6">
        <h2 className="font-medium mb-4">ROI over time</h2>
        <ChartROI />
      </div>
    </div>
  );
}

