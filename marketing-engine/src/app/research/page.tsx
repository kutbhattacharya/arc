export const metadata = {
  title: "Research | Arc Marketing Engine",
};

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <h1 className="text-3xl font-semibold">Research</h1>
      <p className="text-foreground/75 max-w-2xl">
        Industry and creator-specific insights. Audience trends, content ideas, and benchmark reports for your niche.
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-foreground/10 p-6">
          <h2 className="font-medium">Industry benchmarks</h2>
          <p className="text-sm text-foreground/70">CTR, CPM, CPC, CVR by industry and platform.</p>
        </div>
        <div className="rounded-xl border border-foreground/10 p-6">
          <h2 className="font-medium">Creator insights</h2>
          <p className="text-sm text-foreground/70">Top creators, collab rates, and content trends.</p>
        </div>
      </div>
    </div>
  );
}

