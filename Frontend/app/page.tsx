import { SiteHeader } from '@/components/site-header'
import { BottomNav } from '@/components/bottom-nav'
import { VenueCard } from '@/components/venue-card'
import { venues } from '@/lib/venues'

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'VenueDiary Featured Venues',
    itemListElement: venues.map((venue, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'EventVenue',
        name: venue.name,
        image: venue.image,
      },
    })),
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />

      <main className="mx-auto max-w-2xl px-5 pb-28 pt-10">
        <section className="text-center">
          <h1 className="font-serif text-4xl text-foreground">VenueDiary</h1>
          <p className="mx-auto mt-3 max-w-md text-pretty text-lg leading-relaxed text-foreground/70">
            Best Marriage Palaces & Venues in Chandigarh, Mohali, Zirakpur
          </p>
        </section>

        <section aria-label="Featured venues" className="mt-9 space-y-8">
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </section>
      </main>

      <BottomNav />
    </div>
  )
}
