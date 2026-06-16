"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Compass, Mail } from 'lucide-react'

const items = [
  { label: 'Discover', icon: Compass, href: '/' },
  { label: 'Contact Support', icon: Mail, href: '/contact-support' },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-100 border-t border-border/70 bg-background/90 backdrop-blur-md"
    >
      <ul className="mx-auto flex max-w-2xl items-center justify-around px-4 py-3">
        {items.map(({ label, icon: Icon, href }) => {
          const active = pathname === href
          return (
            <li key={label}>
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className="flex flex-col items-center gap-1.5"
              >
                <span
                  className={
                    active
                      ? 'flex h-9 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground'
                      : 'flex h-9 w-16 items-center justify-center text-muted-foreground'
                  }
                >
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <span
                  className={
                    active
                      ? 'text-xs font-semibold text-foreground'
                      : 'text-xs text-muted-foreground'
                  }
                >
                  {label}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
