'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import type { Venue } from '@/lib/venues'
import { InquiryModal } from '@/components/inquiry-modal'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function VenueCard({ venue }: { venue: Venue }) {
  const [open, setOpen] = useState(false)
  const [images, setImages] = useState<string[]>([venue.image || '/placeholder.svg'])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isTouching, setIsTouching] = useState(false)

  const touchStartRef = useRef<{ x: number; y: number } | null>(null)

  const hasSlideshow = venue.tags?.includes('slideshow') ?? false;

  useEffect(() => {
    if (!hasSlideshow) return;
    async function loadImages() {
      try {
        const res = await fetch(`/api/venue-images?venueId=${venue.id}`)
        if (res.ok) {
          const data = await res.json()
          if (data.images && data.images.length > 0) {
            setImages(data.images)
          }
        }
      } catch (err) {
        console.error('Failed to load venue images:', err)
      }
    }
    loadImages()
  }, [venue.id, hasSlideshow])

  useEffect(() => {
    if (!hasSlideshow || images.length <= 1 || isHovered || isTouching) return

    const interval = setInterval(() => {
      showNext()
    }, 3500)

    return () => clearInterval(interval)
  }, [images.length, isHovered, isTouching])

  const showPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const showNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    showPrev()
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    showNext()
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    touchStartRef.current = { x: touch.clientX, y: touch.clientY }
    setIsTouching(true)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsTouching(false)
    if (!touchStartRef.current) return

    const touch = e.changedTouches[0]
    const diffX = touchStartRef.current.x - touch.clientX
    const diffY = touchStartRef.current.y - touch.clientY

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0) {
        showNext()
      } else {
        showPrev()
      }
    }

    touchStartRef.current = null
  }

  const handleTouchCancel = () => {
    setIsTouching(false)
    touchStartRef.current = null
  }

  return (
    <>
      <article className="overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border/60 relative">
        {/* Hot Pick Keychain */}
        {venue.tags?.includes('hot-pick') && (
          <div className="absolute top-0 left-4 z-30 flex flex-col items-center pointer-events-none drop-shadow-md">
            {/* Keychain string/chain */}
            <div className="w-1.5 h-3 bg-gradient-to-b from-zinc-300 to-zinc-400 rounded-b-full border-x border-b border-zinc-500/50 shadow-inner -mt-1"></div>
            <div className="w-2.5 h-2.5 rounded-full border-2 border-zinc-300 shadow-sm -mt-1 z-10"></div>
            {/* Tag body */}
            <div className="bg-gradient-to-br from-red-500 to-orange-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-lg flex items-center gap-1 border border-red-400/30 -mt-0.5 transform -rotate-3 origin-top hover:rotate-0 transition-transform">
              <span className="text-xs">🔥</span> Hot pick
            </div>
          </div>
        )}

        {hasSlideshow ? (
          <div
            className="relative aspect-[16/11] w-full group overflow-hidden touch-pan-y"
            onPointerEnter={(e) => {
              if (e.pointerType === 'mouse') setIsHovered(true)
            }}
            onPointerLeave={(e) => {
              if (e.pointerType === 'mouse') setIsHovered(false)
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchCancel}
          >
            {images.map((src, idx) => (
              <div
                key={src}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
              >
                <Image
                  src={src}
                  alt={`${venue.imageAlt} - Image ${idx + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 640px"
                  className="object-cover"
                  priority={idx === 0}
                />
              </div>
            ))}

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 z-20 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 opacity-100 hover:bg-black/50 hover:scale-105"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 z-20 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 opacity-100 hover:bg-black/50 hover:scale-105"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            {/* Dots Indicator */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/20 px-2.5 py-1 backdrop-blur-sm">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentIndex(idx)
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
                      }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="relative aspect-[16/11] w-full overflow-hidden">
            <Image
              src={venue.image}
              alt={venue.imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, 640px"
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="px-6 py-5">
          <h2 className="font-serif text-2xl text-card-foreground">{venue.name}</h2>

          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Ask availability
            </button>
          </div>
        </div>
      </article>

      {open && (
        <InquiryModal
          venueName={venue.name}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}
