"use client"

import { useState } from "react"
import type { SiteSpec } from "@/lib/site-spec"
import type { Theme } from "./theme"

export function BookingPage({ spec, theme }: { spec: SiteSpec; theme: Theme }) {
  const [selectedStaff, setSelectedStaff] = useState("")
  const [selectedService, setSelectedService] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [smsConsent, setSmsConsent] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const staffMember = spec.staff.find((s) => s.name === selectedStaff)
  const services = staffMember?.services ?? []

  if (submitted) {
    return (
      <div className="min-h-dvh flex items-center justify-center p-6" style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}>
        <div className="max-w-md text-center space-y-4">
          <div className="text-4xl">✓</div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: theme.displayFont }}>
            Request Received
          </h1>
          <p style={{ opacity: 0.7 }}>
            We&apos;ll confirm your appointment shortly.
            {smsConsent && " You'll receive a text message confirmation."}
          </p>
          <a
            href="/"
            className="inline-block mt-4 px-6 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{ backgroundColor: theme.primaryColor, color: theme.backgroundColor }}
          >
            Back to {spec.shop.name}
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-dvh" style={{ backgroundColor: theme.backgroundColor, color: theme.textColor, fontFamily: theme.bodyFont }}>
      {/* Header */}
      <header
        className="border-b px-4 sm:px-6 py-4 flex items-center justify-between"
        style={{ borderColor: `${theme.textColor}15` }}
      >
        <a href="/" className="text-xl font-bold" style={{ fontFamily: theme.displayFont, color: theme.primaryColor }}>
          {spec.shop.name}
        </a>
        <span className="text-sm" style={{ opacity: 0.5 }}>Book an Appointment</span>
      </header>

      <main className="max-w-lg mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1
          className="text-2xl sm:text-3xl font-bold mb-8"
          style={{ fontFamily: theme.displayFont }}
        >
          Book an Appointment
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            setSubmitted(true)
          }}
          className="space-y-6"
        >
          {/* Staff selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium" style={{ opacity: 0.8 }}>
              Who would you like to see?
            </label>
            <select
              value={selectedStaff}
              onChange={(e) => {
                setSelectedStaff(e.target.value)
                setSelectedService("")
              }}
              required
              className="w-full rounded-lg px-3 py-2.5 text-sm border"
              style={{
                backgroundColor: `${theme.textColor}08`,
                borderColor: `${theme.textColor}20`,
                color: theme.textColor,
              }}
            >
              <option value="">Select a team member</option>
              {spec.staff.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name} — {s.role}
                </option>
              ))}
            </select>
          </div>

          {/* Service selection */}
          {selectedStaff && (
            <div className="space-y-2">
              <label className="block text-sm font-medium" style={{ opacity: 0.8 }}>
                Service
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                required
                className="w-full rounded-lg px-3 py-2.5 text-sm border"
                style={{
                  backgroundColor: `${theme.textColor}08`,
                  borderColor: `${theme.textColor}20`,
                  color: theme.textColor,
                }}
              >
                <option value="">Select a service</option>
                {services.map((svc) => (
                  <option key={svc.name} value={svc.name}>
                    {svc.name} — {svc.durationMinutes}min
                    {svc.priceDisplay ? ` — ${svc.priceDisplay}` : svc.priceCents > 0 ? ` — $${(svc.priceCents / 100).toFixed(0)}` : ""}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Contact info */}
          <div className="space-y-4 pt-2">
            <h2 className="text-lg font-semibold" style={{ fontFamily: theme.displayFont }}>
              Your Information
            </h2>

            <div className="space-y-2">
              <label className="block text-sm font-medium" style={{ opacity: 0.8 }}>
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your full name"
                className="w-full rounded-lg px-3 py-2.5 text-sm border"
                style={{
                  backgroundColor: `${theme.textColor}08`,
                  borderColor: `${theme.textColor}20`,
                  color: theme.textColor,
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium" style={{ opacity: 0.8 }}>
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="(555) 123-4567"
                className="w-full rounded-lg px-3 py-2.5 text-sm border"
                style={{
                  backgroundColor: `${theme.textColor}08`,
                  borderColor: `${theme.textColor}20`,
                  color: theme.textColor,
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium" style={{ opacity: 0.8 }}>
                Email <span style={{ opacity: 0.5 }}>(optional)</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg px-3 py-2.5 text-sm border"
                style={{
                  backgroundColor: `${theme.textColor}08`,
                  borderColor: `${theme.textColor}20`,
                  color: theme.textColor,
                }}
              />
            </div>
          </div>

          {/* SMS Consent checkbox */}
          <div
            className="rounded-lg border p-4 space-y-2"
            style={{ borderColor: `${theme.textColor}20`, backgroundColor: `${theme.textColor}05` }}
          >
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={smsConsent}
                onChange={(e) => setSmsConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded"
                data-testid="sms-consent-checkbox"
              />
              <span className="text-sm leading-relaxed">
                I agree to receive appointment reminders and notifications via
                text message from {spec.shop.name} (powered by Koureia).
                Message and data rates may apply. Reply STOP to opt out at any
                time.
              </span>
            </label>
            <div className="flex gap-3 text-xs ml-7" style={{ opacity: 0.6 }}>
              <a
                href="https://koureia.com/sms-consent"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline"
                style={{ color: theme.primaryColor }}
              >
                SMS Consent Policy
              </a>
              <a
                href="https://koureia.com/privacy#sms-communications"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline"
                style={{ color: theme.primaryColor }}
              >
                Privacy Policy
              </a>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg py-3 text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: theme.primaryColor, color: theme.backgroundColor }}
          >
            Request Appointment
          </button>

          <p className="text-xs text-center" style={{ opacity: 0.4 }}>
            This sends a booking request. {spec.shop.name} will confirm your
            appointment time.
          </p>
        </form>
      </main>
    </div>
  )
}
