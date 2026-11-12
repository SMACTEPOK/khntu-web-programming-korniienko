export default function BreakpointBadge() {
  return (
    <div className="fixed bottom-2 left-2 z-50 bg-black/80 px-2 py-1 font-mono text-xs text-white border border-border">
      <span className="sm:hidden">base · до 640</span>
      <span className="hidden sm:inline md:hidden">sm · від 640</span>
      <span className="hidden md:inline lg:hidden">md · від 768</span>
      <span className="hidden lg:inline xl:hidden">lg · від 1024</span>
      <span className="hidden xl:inline">xl · від 1280</span>
    </div>
  )
}
