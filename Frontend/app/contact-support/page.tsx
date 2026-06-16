import { SiteHeader } from '@/components/site-header'
import { BottomNav } from '@/components/bottom-nav'
import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Contact Support | VenueDiary',
  description: 'Get help with your venue inquiries or partner with us.',
}

export default function ContactSupportPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-2xl px-5 pb-28 pt-10">
        <section className="mb-10 text-center">
          <h1 className="font-serif text-4xl font-bold text-foreground">Contact Support</h1>
          <p className="mx-auto mt-3 max-w-md text-pretty text-lg leading-relaxed text-foreground/70">
            We're here to help you with your inquiries and venue management.
          </p>
        </section>

        <section className="space-y-8">
          {/* FAQ Card */}
          <div className="overflow-hidden rounded-3xl border border-border/50 bg-card p-6 shadow-sm md:p-8">
            <h2 className="mb-6 text-2xl font-semibold text-card-foreground">Frequently Asked Questions (FAQ)</h2>

            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-lg font-medium text-card-foreground">How long does it take to get venue links and quotes?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our team manually coordinates with the marriage palaces to verify real-time calendar availability. Please wait up to 1 hour after submitting your form to receive your update via WhatsApp.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-medium text-card-foreground">What if I haven't received a reply after 1 hour?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  If it has been over an hour, please check your network connection, ensure your WhatsApp is active, and try submitting the form again.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-medium text-card-foreground">Should I submit multiple inquiries for the same event?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Please do not submit multiple inquiries for the same date or venue if you have already sent one. Duplicate submissions slow down our verification team and delay your response.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-medium text-card-foreground">Can I get the direct contact details of the venue owner?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Yes! To save you the hassle of cold-calling, we handle the initial slot verification first. As soon as the venue confirms your date is available, we will provide you with the venue owner’s direct contact details so you can proceed with final negotiations and bookings.
                </p>
              </div>
            </div>
          </div>

          {/* Partner Card */}
          <div className="overflow-hidden rounded-3xl border border-border/50 bg-card p-6 shadow-sm md:p-8">
            <h2 className="mb-4 text-2xl font-semibold text-card-foreground">Partner with us or manage your listing</h2>

            <p className="mb-8 text-muted-foreground leading-relaxed">
              If your marriage palace is currently listed on our platform and you want to claim your listing, update your gallery, or if you want to add a new venue to our directory, click the link below to submit your details. Our partnership team will reach back out to you shortly.
            </p>

            <Button size="lg" className="w-full sm:w-auto rounded-full font-semibold">
              <Link href={`${process.env.BACKEND_URL}/venue`}>
                👉 Submit Venue Details & Partner With Us
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}
