import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_400px_at_0%_0%,rgba(168,85,247,0.15),transparent_60%),radial-gradient(600px_400px_at_100%_100%,rgba(59,130,246,0.15),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <p className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-3 py-1 text-xs text-foreground/70">
                New • Cross-platform analytics and AI spend guidance
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                A marketing engine for small businesses, creators, and influencers
              </h1>
              <p className="text-lg text-foreground/80">
                Aggregate analytics from every channel, analyze ROI and spend, and get actionable recommendations on
                where to put your next dollar. Research audiences, find brand collabs, and edit video/images without
                leaving your workspace.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="#trial" className="h-11 px-5 rounded-full bg-purple-600 text-white hover:bg-purple-500 flex items-center justify-center">
                  Start free trial
                </Link>
                <Link href="#demo" className="h-11 px-5 rounded-full border border-foreground/20 hover:bg-foreground/5 flex items-center justify-center">
                  Book a demo
                </Link>
              </div>
            </div>
            <div className="lg:justify-self-end">
              <div className="aspect-[16/11] w-full max-w-xl rounded-xl border border-foreground/10 bg-gradient-to-br from-purple-100 to-blue-100 p-2">
                <div className="w-full h-full rounded-md bg-white shadow-sm flex items-center justify-center text-sm text-foreground/60">
                  Dashboard preview (placeholder)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Analytics across platforms",
              desc: "Connect YouTube, Instagram, TikTok, Google Analytics, Meta Ads, X, and more in minutes.",
            },
            { title: "ROI & spend analysis", desc: "Unified dashboards, cohort views, and CAC/LTV modeling." },
            {
              title: "Spend recommendations",
              desc: "AI suggestions on budget allocation by channel, audience, and creative.",
            },
            { title: "Research", desc: "Industry and creator-specific insights to plan campaigns." },
            { title: "Brand collaborations", desc: "Discover partners and manage collab workflows end-to-end." },
            { title: "Built-in editor", desc: "Quickly trim, caption, resize, and enhance media assets." },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border border-foreground/10 p-6 hover:shadow-sm transition-shadow">
              <h3 className="font-semibold mb-1">{f.title}</h3>
              <p className="text-sm text-foreground/70">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

