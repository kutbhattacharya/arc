export const metadata = {
  title: "Editor | Arc Marketing Engine",
};

export default function EditorPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <h1 className="text-3xl font-semibold">Media Editor</h1>
      <p className="text-foreground/75 max-w-2xl">
        In-browser editor for quick video and image tweaks: trim, crop, resize, captions, and color adjustments.
      </p>
      <div className="rounded-xl border border-foreground/10 p-6 bg-foreground/[0.02]">
        <div className="aspect-video w-full rounded-md border border-dashed border-foreground/20 grid place-items-center text-sm text-foreground/60">
          Drag & drop a file (stub)
        </div>
      </div>
    </div>
  );
}

