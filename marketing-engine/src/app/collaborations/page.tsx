export const metadata = {
  title: "Brand Collaborations | Arc Marketing Engine",
};

export default function CollaborationsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <h1 className="text-3xl font-semibold">Brand Collaborations</h1>
      <p className="text-foreground/75 max-w-2xl">
        Discover partner brands and creators, track pitches, negotiate terms, and manage deliverables.
      </p>
      <div className="rounded-xl border border-foreground/10 p-6">
        <h2 className="font-medium">Pipeline</h2>
        <p className="text-sm text-foreground/70">No opportunities yet. Add prospects to get started.</p>
      </div>
    </div>
  );
}

