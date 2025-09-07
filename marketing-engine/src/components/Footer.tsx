export default function Footer() {
  return (
    <footer className="border-t border-black/10 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 text-sm text-foreground/70 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Arc Marketing Engine</p>
        <div className="flex items-center gap-6">
          <a href="/privacy" className="hover:text-foreground">Privacy</a>
          <a href="/terms" className="hover:text-foreground">Terms</a>
          <a href="/contact" className="hover:text-foreground">Contact</a>
        </div>
      </div>
    </footer>
  );
}

