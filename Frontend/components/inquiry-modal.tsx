'use client'

import { useState, useEffect, useCallback, useId } from 'react'
import { X, ChevronLeft, ChevronRight, CalendarDays, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

type ModalState = 'form' | 'loading' | 'success' | 'error'

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MAX_DATES = 5

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
}

function formatDate(d: Date) {
  return `${MONTH_NAMES[d.getMonth()].slice(0, 3)} ${d.getDate()}, ${d.getFullYear()}`
}

function Calendar({
  selected,
  onChange,
}: {
  selected: Date[]
  onChange: (dates: Date[]) => void
}) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  const firstDay = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  // pad to full rows
  while (cells.length % 7 !== 0) cells.push(null)

  const toggle = (day: number) => {
    const d = new Date(viewYear, viewMonth, day)
    if (d < new Date(today.getFullYear(), today.getMonth(), today.getDate())) return
    const idx = selected.findIndex(s => isSameDay(s, d))
    if (idx >= 0) {
      onChange(selected.filter((_, i) => i !== idx))
    } else if (selected.length < MAX_DATES) {
      onChange([...selected, d])
    }
  }

  const todayNorm = new Date(today.getFullYear(), today.getMonth(), today.getDate())

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      {/* Month navigation */}
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={prevMonth}
          aria-label="Previous month"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-foreground/60 transition-colors hover:bg-accent/30 hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="font-serif text-base font-semibold text-foreground">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          aria-label="Next month"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-foreground/60 transition-colors hover:bg-accent/30 hover:text-foreground"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Day headers */}
      <div className="mb-1 grid grid-cols-7 gap-0.5">
        {DAY_NAMES.map(d => (
          <div key={d} className="text-center text-[11px] font-semibold uppercase tracking-wide text-foreground/40">
            {d}
          </div>
        ))}
      </div>

      {/* Date cells */}
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((day, i) => {
          if (day === null) return <div key={`empty-${i}`} />
          const cellDate = new Date(viewYear, viewMonth, day)
          const isPast = cellDate < todayNorm
          const isSelected = selected.some(s => isSameDay(s, cellDate))
          const isToday = isSameDay(cellDate, today)
          const isDisabled = isPast || (!isSelected && selected.length >= MAX_DATES)

          return (
            <button
              key={day}
              type="button"
              disabled={isDisabled}
              onClick={() => toggle(day)}
              aria-label={`${MONTH_NAMES[viewMonth]} ${day}, ${viewYear}${isSelected ? ', selected' : ''}`}
              aria-pressed={isSelected}
              className={[
                'relative flex h-9 w-full items-center justify-center rounded-lg text-sm font-medium transition-all',
                isSelected
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : isToday
                    ? 'bg-accent/40 text-accent-foreground font-semibold'
                    : isDisabled
                      ? 'cursor-not-allowed text-foreground/25'
                      : 'text-foreground hover:bg-accent/30 cursor-pointer',
              ].join(' ')}
            >
              {day}
            </button>
          )
        })}
      </div>

      {/* Selected dates chips */}
      {selected.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5 border-t border-border pt-3">
          {selected
            .slice()
            .sort((a, b) => a.getTime() - b.getTime())
            .map(d => (
              <span
                key={d.toISOString()}
                className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
              >
                {formatDate(d)}
                <button
                  type="button"
                  aria-label={`Remove ${formatDate(d)}`}
                  onClick={() => onChange(selected.filter(s => !isSameDay(s, d)))}
                  className="ml-0.5 rounded-full text-primary/70 hover:text-primary"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
        </div>
      )}
      <p className="mt-2 text-[11px] text-foreground/40">
        {selected.length}/{MAX_DATES} dates selected
      </p>
    </div>
  )
}

export function InquiryModal({
  venueName,
  onClose,
}: {
  venueName: string
  onClose: () => void
}) {
  const [state, setState] = useState<ModalState>('form')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [guests, setGuests] = useState('')
  const [dates, setDates] = useState<Date[]>([])
  const [showCalendar, setShowCalendar] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const nameId = useId()
  const phoneId = useId()
  const guestsId = useId()
  const datesId = useId()

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Close on Escape
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && state !== 'loading') onClose()
  }, [onClose, state])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!name.trim()) errs.name = 'Name is required.'
    if (!phone.trim()) errs.phone = 'Phone number is required.'
    else if (!/^\+?[\d\s\-().]{7,}$/.test(phone.trim())) errs.phone = 'Enter a valid phone number.'
    if (!guests.trim()) errs.guests = 'Guest count is required.'
    else if (isNaN(Number(guests)) || Number(guests) < 1) errs.guests = 'Enter a valid guest count.'
    if (dates.length === 0) errs.dates = 'Select at least one date.'
    return errs
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setFieldErrors(errs); return }
    setFieldErrors({})
    setState('loading')

    try {
      const res = await fetch('/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          venueName,
          name: name.trim(),
          phone: phone.trim(),
          guestCount: Number(guests),
          dates: dates.map(d => d.toISOString()),
        }),
      })

      const contentType = res.headers.get('content-type')
      const isJson = contentType && contentType.includes('application/json')

      if (!res.ok || !isJson) {
        const body = isJson ? await res.json().catch(() => ({})) : {}
        throw new Error(body?.message || `Server error (${res.status}). Expected JSON response but received ${contentType || 'none'}`)
      }

      setState('success')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      setErrorMsg(msg)
      setState('error')
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Enquire about ${venueName}`}
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={() => state !== 'loading' && onClose()}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-lg rounded-t-3xl bg-background shadow-2xl ring-1 ring-border/60 sm:rounded-3xl">

        {/* ---- LOADING STATE ---- */}
        {state === 'loading' && (
          <div className="flex flex-col items-center justify-center gap-4 px-6 py-16">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="font-serif text-xl text-foreground">Sending your enquiry…</p>
            <p className="text-sm text-foreground/60">Please wait a moment.</p>
          </div>
        )}

        {/* ---- SUCCESS STATE ---- */}
        {state === 'success' && (
          <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/30">
              <CheckCircle className="h-8 w-8 text-primary" strokeWidth={1.75} />
            </div>
            <h2 className="font-serif text-2xl text-foreground">Enquiry Received!</h2>
            <p className="max-w-xs text-sm leading-relaxed text-foreground/70">
              Thank you for your interest in <span className="font-semibold text-foreground">{venueName}</span>. We will reach back to you in a few hours.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Done
            </button>
          </div>
        )}

        {/* ---- ERROR STATE ---- */}
        {state === 'error' && (
          <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
              <AlertCircle className="h-8 w-8 text-red-500" strokeWidth={1.75} />
            </div>
            <h2 className="font-serif text-2xl text-foreground">Something went wrong</h2>
            <p className="max-w-xs text-sm leading-relaxed text-foreground/70">Please try again with a stable network connection.</p>
            <div className="mt-2 flex gap-3">
              <button
                type="button"
                onClick={() => setState('form')}
                className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Try again
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground/70 transition-colors hover:bg-muted"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* ---- FORM STATE ---- */}
        {state === 'form' && (
          <div className="flex max-h-[90dvh] flex-col overflow-y-auto overscroll-contain">
            {/* Header */}
            <div className="flex shrink-0 items-start justify-between px-6 pb-4 pt-6">
              <div>
                <h2 className="font-serif text-2xl text-foreground">Ask availability</h2>
                <p className="mt-0.5 text-sm text-foreground/60">{venueName}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-foreground/60 transition-colors hover:bg-accent/30 hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Divider */}
            <div className="mx-6 shrink-0 border-t border-border" />

            {/* Form body */}
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5 px-6 py-5">

              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor={nameId} className="text-sm font-semibold text-foreground">
                  Full Name <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  id={nameId}
                  type="text"
                  autoComplete="name"
                  placeholder="Abhishek Kumar"
                  value={name}
                  onChange={e => { setName(e.target.value); setFieldErrors(fe => ({ ...fe, name: '' })) }}
                  aria-describedby={fieldErrors.name ? `${nameId}-error` : undefined}
                  aria-invalid={!!fieldErrors.name}
                  className={[
                    'w-full rounded-xl border bg-card px-4 py-3 text-sm text-foreground outline-none transition-shadow placeholder:text-foreground/30',
                    'focus:ring-2 focus:ring-ring focus:ring-offset-1',
                    fieldErrors.name ? 'border-red-400 focus:ring-red-300' : 'border-border',
                  ].join(' ')}
                />
                {fieldErrors.name && (
                  <p id={`${nameId}-error`} role="alert" className="text-xs text-red-500">{fieldErrors.name}</p>
                )}
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor={phoneId} className="text-sm font-semibold text-foreground">
                  Phone Number <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  id={phoneId}
                  type="tel"
                  autoComplete="tel"
                  placeholder="+91 1234567890"
                  value={phone}
                  onChange={e => { setPhone(e.target.value); setFieldErrors(fe => ({ ...fe, phone: '' })) }}
                  aria-describedby={fieldErrors.phone ? `${phoneId}-error` : undefined}
                  aria-invalid={!!fieldErrors.phone}
                  className={[
                    'w-full rounded-xl border bg-card px-4 py-3 text-sm text-foreground outline-none transition-shadow placeholder:text-foreground/30',
                    'focus:ring-2 focus:ring-ring focus:ring-offset-1',
                    fieldErrors.phone ? 'border-red-400 focus:ring-red-300' : 'border-border',
                  ].join(' ')}
                />
                {fieldErrors.phone && (
                  <p id={`${phoneId}-error`} role="alert" className="text-xs text-red-500">{fieldErrors.phone}</p>
                )}
              </div>

              {/* Guest count */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor={guestsId} className="text-sm font-semibold text-foreground">
                  Guest Count <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  id={guestsId}
                  type="number"
                  min="1"
                  placeholder="e.g. 150"
                  value={guests}
                  onChange={e => { setGuests(e.target.value); setFieldErrors(fe => ({ ...fe, guests: '' })) }}
                  aria-describedby={fieldErrors.guests ? `${guestsId}-error` : undefined}
                  aria-invalid={!!fieldErrors.guests}
                  className={[
                    'w-full rounded-xl border bg-card px-4 py-3 text-sm text-foreground outline-none transition-shadow placeholder:text-foreground/30',
                    'focus:ring-2 focus:ring-ring focus:ring-offset-1',
                    fieldErrors.guests ? 'border-red-400 focus:ring-red-300' : 'border-border',
                  ].join(' ')}
                />
                {fieldErrors.guests && (
                  <p id={`${guestsId}-error`} role="alert" className="text-xs text-red-500">{fieldErrors.guests}</p>
                )}
              </div>

              {/* Date picker */}
              <div className="flex flex-col gap-1.5">
                <span id={datesId} className="text-sm font-semibold text-foreground">
                  Preferred Dates <span className="text-red-500" aria-hidden="true">*</span>
                  <span className="ml-1.5 font-normal text-foreground/50">(up to {MAX_DATES})</span>
                </span>
                <button
                  type="button"
                  aria-expanded={showCalendar}
                  aria-controls="calendar-panel"
                  aria-labelledby={datesId}
                  onClick={() => setShowCalendar(v => !v)}
                  className={[
                    'flex w-full items-center gap-3 rounded-xl border bg-card px-4 py-3 text-sm transition-shadow',
                    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1',
                    fieldErrors.dates ? 'border-red-400' : 'border-border',
                    dates.length > 0 ? 'text-foreground' : 'text-foreground/30',
                  ].join(' ')}
                >
                  <CalendarDays className="h-4 w-4 shrink-0 text-foreground/50" />
                  <span className="flex-1 text-left">
                    {dates.length === 0
                      ? 'Select dates…'
                      : dates.length === 1
                        ? formatDate(dates[0])
                        : `${dates.length} dates selected`}
                  </span>
                  <ChevronRight
                    className={`h-4 w-4 shrink-0 text-foreground/40 transition-transform ${showCalendar ? 'rotate-90' : ''}`}
                  />
                </button>
                {fieldErrors.dates && (
                  <p role="alert" className="text-xs text-red-500">{fieldErrors.dates}</p>
                )}
                {showCalendar && (
                  <div id="calendar-panel">
                    <Calendar
                      selected={dates}
                      onChange={d => { setDates(d); setFieldErrors(fe => ({ ...fe, dates: '' })) }}
                    />
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="mt-1 w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 active:opacity-80"
              >
                Send enquiry
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
