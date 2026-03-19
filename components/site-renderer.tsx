import type { SiteSpec, SiteService, SiteStaffMember, SiteHours } from "@/lib/site-spec"
import { dayName, formatTime, formatPrice } from "@/lib/utils"

type Props = { spec: SiteSpec }

export function SiteRenderer({ spec }: Props) {
  const { shop, branding, staff, hours, social, bookingUrl } = spec

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{
        backgroundColor: branding.backgroundColor,
        color: branding.textColor,
        fontFamily: `'${branding.bodyFont}', sans-serif`,
      }}
    >
      {/* Header */}
      <header
        className="border-b px-6 py-4"
        style={{ borderColor: `${branding.primaryColor}30` }}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          {branding.logoUrl ? (
            <img
              src={branding.logoUrl}
              alt={shop.name}
              className="h-10 w-auto"
            />
          ) : (
            <span
              className="text-xl font-semibold"
              style={{ color: branding.primaryColor, fontFamily: `'${branding.displayFont}', serif` }}
            >
              {shop.name}
            </span>
          )}
          <a
            href={bookingUrl}
            className="rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
            style={{ backgroundColor: branding.primaryColor, color: branding.backgroundColor }}
          >
            Book Now
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1
            className="text-4xl font-bold md:text-5xl"
            style={{ color: branding.primaryColor, fontFamily: `'${branding.displayFont}', serif` }}
          >
            {shop.name}
          </h1>
          {shop.tagline && (
            <p className="mt-3 text-lg opacity-70">{shop.tagline}</p>
          )}
          {shop.description && (
            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed opacity-60">
              {shop.description}
            </p>
          )}
          <div className="mt-8">
            <a
              href={bookingUrl}
              className="inline-block rounded-md px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90"
              style={{ backgroundColor: branding.primaryColor, color: branding.backgroundColor }}
            >
              Book an Appointment
            </a>
          </div>
        </div>
      </section>

      {/* Staff sections — each staff member with their services */}
      {staff.map((member) => (
        <StaffSection key={member.name} member={member} branding={branding} bookingUrl={bookingUrl} />
      ))}

      {/* Hours + Contact */}
      <section
        className="border-t px-6 py-16"
        style={{ borderColor: `${branding.primaryColor}15` }}
      >
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
          {hours.length > 0 && (
            <div>
              <SectionHeading branding={branding}>Hours</SectionHeading>
              <div className="mt-6 space-y-2">
                {hours.map((h) => (
                  <HoursRow key={h.dayOfWeek} hours={h} branding={branding} />
                ))}
              </div>
            </div>
          )}

          <div>
            <SectionHeading branding={branding}>Contact</SectionHeading>
            <div className="mt-6 space-y-3 text-sm">
              {shop.address && (
                <p className="opacity-70">{shop.address}</p>
              )}
              {shop.phone && (
                <p>
                  <a href={`tel:${shop.phone}`} className="opacity-70 hover:opacity-100">
                    {shop.phone}
                  </a>
                </p>
              )}
              {shop.email && (
                <p>
                  <a href={`mailto:${shop.email}`} className="opacity-70 hover:opacity-100">
                    {shop.email}
                  </a>
                </p>
              )}
              {social.length > 0 && (
                <div className="flex gap-4 pt-2">
                  {social.map((link) => (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm capitalize opacity-50 hover:opacity-100"
                      style={{ color: branding.primaryColor }}
                    >
                      {link.platform}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="border-t px-6 py-6"
        style={{ borderColor: `${branding.primaryColor}10` }}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between text-xs opacity-40">
          <span>{shop.name}</span>
          <span>Powered by Koureia</span>
        </div>
      </footer>
    </div>
  )
}

// ── Sub-components ──────────────────────────────────────────────

type BrandingProp = { branding: SiteSpec["branding"] }

function SectionHeading({ children, branding }: { children: React.ReactNode } & BrandingProp) {
  return (
    <h2
      className="text-2xl font-bold"
      style={{ color: branding.primaryColor, fontFamily: `'${branding.displayFont}', serif` }}
    >
      {children}
    </h2>
  )
}

function StaffSection({
  member,
  branding,
  bookingUrl,
}: { member: SiteStaffMember; bookingUrl: string } & BrandingProp) {
  const accentColor = member.colorHex ?? branding.primaryColor

  // Group this staff member's services by category
  const servicesByCategory = member.services.reduce<Record<string, SiteService[]>>((acc, s) => {
    const cat = s.category ?? "Services"
    ;(acc[cat] ??= []).push(s)
    return acc
  }, {})

  const workingDays = member.hours.filter((h) => !h.isClosed)

  return (
    <section
      className="border-t px-6 py-16"
      style={{ borderColor: `${branding.primaryColor}15` }}
    >
      <div className="mx-auto max-w-5xl">
        {/* Staff header */}
        <div className="mb-10 flex items-start gap-5">
          {member.imageUrl ? (
            <img
              src={member.imageUrl}
              alt={member.name}
              className="h-20 w-20 rounded-full object-cover"
            />
          ) : (
            <div
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full text-xl font-bold"
              style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
            >
              {member.name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)}
            </div>
          )}
          <div>
            <h2
              className="text-2xl font-bold"
              style={{ color: accentColor, fontFamily: `'${branding.displayFont}', serif` }}
            >
              {member.name}
            </h2>
            <p className="text-sm opacity-50">{member.role}</p>
            {member.bio && (
              <p className="mt-2 max-w-lg text-sm leading-relaxed opacity-60">{member.bio}</p>
            )}
            {member.specialties.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {member.specialties.map((s) => (
                  <span
                    key={s}
                    className="rounded-full px-2.5 py-0.5 text-xs"
                    style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
            {workingDays.length > 0 && (
              <p className="mt-3 text-xs opacity-40">
                {workingDays.map((h) => dayName(h.dayOfWeek).slice(0, 3)).join(" · ")}
                {" · "}
                {formatTime(workingDays[0].startTime)}–{formatTime(workingDays[0].endTime)}
              </p>
            )}
          </div>
        </div>

        {/* Services for this staff member */}
        {member.services.length > 0 && (
          <div className="space-y-8">
            {Object.entries(servicesByCategory).map(([category, items]) => (
              <div key={category}>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider opacity-50">
                  {category}
                </h3>
                <div className="space-y-1">
                  {items.map((service) => (
                    <ServiceRow key={service.name} service={service} accentColor={accentColor} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Book with this person */}
        <div className="mt-8">
          <a
            href={bookingUrl}
            className="inline-block rounded-md px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
            style={{ backgroundColor: accentColor, color: branding.backgroundColor }}
          >
            Book with {member.name}
          </a>
        </div>
      </div>
    </section>
  )
}

function ServiceRow({ service, accentColor }: { service: SiteService; accentColor: string }) {
  return (
    <div
      className="flex items-baseline justify-between rounded-lg px-4 py-3 transition-colors"
      style={{ backgroundColor: `${accentColor}08` }}
    >
      <div className="min-w-0 flex-1">
        <span className="text-sm font-medium">{service.name}</span>
        {service.description && (
          <p className="mt-0.5 text-xs opacity-50">{service.description}</p>
        )}
      </div>
      <div className="ml-4 flex shrink-0 items-baseline gap-3 text-sm">
        <span className="opacity-40">{service.durationMinutes} min</span>
        <span className="font-medium" style={{ color: accentColor }}>
          {formatPrice(service.priceCents, service.priceDisplay)}
        </span>
      </div>
    </div>
  )
}

function HoursRow({ hours, branding }: { hours: SiteHours } & BrandingProp) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="w-28 opacity-70">{dayName(hours.dayOfWeek)}</span>
      {hours.isClosed ? (
        <span className="opacity-30">Closed</span>
      ) : (
        <span style={{ color: branding.primaryColor }}>
          {formatTime(hours.startTime)} – {formatTime(hours.endTime)}
        </span>
      )}
    </div>
  )
}
