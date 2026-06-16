import { Menu, UserCircle2 } from 'lucide-react'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-100 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-5">
        <button
          type="button"
          aria-label="Open menu"
          className="rounded-md p-1 text-foreground transition-colors hover:text-accent-foreground"
        >
          <Menu className="h-6 w-6" strokeWidth={1.75} />
        </button>

        <span className="font-serif text-xl tracking-tight text-foreground">
          VenueDiary
        </span>

        <button
          type="button"
          aria-label="Open profile"
          className="rounded-full p-0.5 text-foreground transition-colors hover:text-accent-foreground"
        >
          <UserCircle2 className="h-7 w-7" strokeWidth={1.5} />
        </button>
      </div>
    </header>
  )
}
