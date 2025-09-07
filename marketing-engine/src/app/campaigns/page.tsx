export const metadata = {
  title: "Campaigns | Arc Marketing Engine",
};

export default function CampaignsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <h1 className="text-3xl font-semibold">Campaign ROI & Spend</h1>
      <p className="text-foreground/75 max-w-2xl">
        Track campaign budgets, CAC/LTV, multi-touch attribution, and channel performance. Import from ad platforms or
        upload CSVs to get started.
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-foreground/10 p-6">
          <h2 className="font-medium">Active campaigns</h2>
          <p className="text-sm text-foreground/70">No campaigns yet. Connect a source or create one.</p>
        </div>
        <div className="rounded-xl border border-foreground/10 p-6">
          <h2 className="font-medium">Attribution model</h2>
          <p className="text-sm text-foreground/70">Configure first/last touch or data-driven attribution.</p>
        </div>
      </div>
    </div>
  );
}

