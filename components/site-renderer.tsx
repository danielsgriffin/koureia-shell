import type { ReactNode } from "react"

import type { SiteHours, SiteSocialLink, SiteSpec, SiteStaffMember } from "@/lib/site-spec"
import { cn, dayName, formatTime } from "@/lib/utils"

type Props = { spec: SiteSpec }

type Theme = {
  primaryColor: string
  secondaryColor: string
  backgroundColor: string
  textColor: string
  accentColor: string
  displayFont: string
  bodyFont: string
  logoUrl?: string
  heroImageUrl?: string
}

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Team", href: "#team" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Location", href: "#location" },
]

export function SiteRenderer({ spec }: Props) {
  const { shop, staff, hours, social, testimonials, featuredService } = spec
  const theme = getTheme(spec.branding)
  const bookUrl = spec.bookingUrl || "/book"
  const bookingPageUrl = "/book"
  const categories = [
    ...new Set(staff.flatMap((member) => member.services.map((service) => service.category ?? "Services"))),
  ]

  return (
    <div
      className="min-h-dvh"
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        fontFamily: theme.bodyFont,
      }}
    >
      <Header shopName={shop.name} bookingUrl={bookUrl} theme={theme} />
      <HeroSection spec={spec} bookingUrl={bookUrl} theme={theme} />
      <BrandPhilosophySection philosophy={shop.brandPhilosophy} theme={theme} />
      <MeetTheTeamSection staff={staff} theme={theme} />
      <FeaturedServiceSection featuredService={featuredService} theme={theme} />
      <ServicesSection categories={categories} theme={theme} bookingPageUrl={bookingPageUrl} />
      <TestimonialsSection testimonials={testimonials} theme={theme} />
      <OriginStorySection originStory={shop.originStory} theme={theme} />
      <HoursAndLocationSection spec={spec} hours={hours} social={social} theme={theme} />
      <PoliciesSection shop={shop} theme={theme} />
      <PaymentMethodsSection paymentMethods={shop.paymentMethods} theme={theme} />
      <BottomCta bookingUrl={bookUrl} theme={theme} />
      <Footer shopName={shop.name} theme={theme} />
    </div>
  )
}

function Header({
  shopName,
  bookingUrl,
  theme,
}: {
  shopName: string
  bookingUrl: string
  theme: Theme
}) {
  return (
    <header
      className="sticky top-0 z-20 border-b backdrop-blur-sm"
      style={{
        borderColor: `${theme.primaryColor}24`,
        backgroundColor: "rgba(26, 20, 16, 0.92)",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-6">
        <a href="#" className="flex items-center">
          {theme.logoUrl ? (
            <img src={theme.logoUrl} alt={shopName} className="h-10 w-auto sm:h-12" />
          ) : (
            <span
              className="text-2xl text-balance"
              style={{ color: theme.primaryColor, fontFamily: theme.displayFont }}
            >
              {shopName}
            </span>
          )}
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-pretty transition-opacity hover:opacity-100"
              style={{ color: `${theme.textColor}CC` }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <ButtonLink href={bookingUrl} theme={theme}>
            Book Now
          </ButtonLink>
        </div>

        <details className="group relative md:hidden">
          <summary
            className="flex list-none appearance-none items-center justify-center rounded-full border p-2"
            style={{ borderColor: `${theme.primaryColor}35`, color: theme.primaryColor }}
          >
            <span className="sr-only">Open navigation</span>
            <div className="space-y-1">
              <span className="block h-px w-5 bg-current" />
              <span className="block h-px w-5 bg-current" />
              <span className="block h-px w-5 bg-current" />
            </div>
          </summary>
          <div
            className="absolute inset-x-0 top-full border-b px-5 py-4 shadow-lg"
            style={{
              borderColor: `${theme.primaryColor}24`,
              backgroundColor: theme.backgroundColor,
            }}
          >
            <nav className="flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <a key={item.href} href={item.href} className="text-sm" style={{ color: theme.textColor }}>
                  {item.label}
                </a>
              ))}
              <ButtonLink href={bookingUrl} theme={theme} className="mt-2 justify-center">
                Book Now
              </ButtonLink>
            </nav>
          </div>
        </details>
      </div>
    </header>
  )
}

function HeroSection({
  spec,
  bookingUrl,
  theme,
}: {
  spec: SiteSpec
  bookingUrl: string
  theme: Theme
}) {
  const { shop } = spec

  return (
    <section
      className="relative overflow-hidden border-b"
      style={{
        borderColor: `${theme.primaryColor}18`,
        backgroundColor: `${theme.secondaryColor || theme.backgroundColor}`,
      }}
    >
      {theme.heroImageUrl ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${theme.heroImageUrl})` }}
          />
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(26, 20, 16, 0.68)" }} />
        </>
      ) : null}
      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-24 lg:py-32">
        <div className="max-w-3xl">
          <p className="text-sm uppercase" style={{ color: theme.primaryColor }}>
            {shop.name}
          </p>
          <h1
            className="mt-4 text-5xl leading-tight text-balance sm:text-6xl lg:text-7xl"
            style={{ fontFamily: theme.displayFont, color: theme.textColor }}
          >
            {shop.tagline || shop.name}
          </h1>
          {shop.subTagline ? (
            <p className="mt-5 max-w-2xl text-xl text-pretty sm:text-2xl" style={{ color: theme.primaryColor }}>
              {shop.subTagline}
            </p>
          ) : null}
          {shop.description ? (
            <p className="mt-6 max-w-2xl text-base leading-7 text-pretty sm:text-lg" style={{ color: `${theme.textColor}D8` }}>
              {shop.description}
            </p>
          ) : null}
          <div className="mt-10">
            <ButtonLink href={bookingUrl} theme={theme}>
              Book an Appointment
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}

function BrandPhilosophySection({ philosophy, theme }: { philosophy?: string; theme: Theme }) {
  if (!philosophy) return null

  return (
    <section id="about" className="border-b px-5 py-20 text-center sm:px-6 sm:py-24" style={{ borderColor: `${theme.primaryColor}14` }}>
      <div className="mx-auto max-w-4xl">
        <SectionHeading theme={theme}>Brand Philosophy</SectionHeading>
        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-pretty sm:text-xl" style={{ color: `${theme.textColor}D8` }}>
          {philosophy}
        </p>
      </div>
    </section>
  )
}

function MeetTheTeamSection({ staff, theme }: { staff: SiteStaffMember[]; theme: Theme }) {
  if (staff.length === 0) return null

  return (
    <section id="team" className="border-b px-5 py-20 sm:px-6" style={{ borderColor: `${theme.primaryColor}14` }}>
      <div className="mx-auto max-w-6xl">
        <SectionHeading theme={theme}>Meet the Team</SectionHeading>
        <p className="mt-3 max-w-2xl text-sm text-pretty sm:text-base" style={{ color: `${theme.textColor}B8` }}>
          Skilled artists, thoughtful service, and a point of view that shapes the whole experience.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {staff.map((member) => (
            <TeamCard key={member.name} member={member} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedServiceSection({
  featuredService,
  theme,
}: {
  featuredService?: SiteSpec["featuredService"]
  theme: Theme
}) {
  if (!featuredService) return null

  return (
    <section className="border-b px-5 py-20 sm:px-6" style={{ borderColor: `${theme.primaryColor}14` }}>
      <div
        className="mx-auto max-w-6xl rounded-[2rem] border px-6 py-10 sm:px-10 sm:py-12"
        style={{
          borderColor: `${theme.primaryColor}25`,
          backgroundColor: `${theme.primaryColor}12`,
        }}
      >
        <p className="text-sm uppercase" style={{ color: theme.primaryColor }}>
          Featured Service
        </p>
        <h2 className="mt-4 max-w-3xl text-4xl text-balance sm:text-5xl" style={{ fontFamily: theme.displayFont }}>
          {featuredService.headline}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-pretty sm:text-lg" style={{ color: `${theme.textColor}D8` }}>
          {featuredService.description}
        </p>
        <a
          href="/book"
          className="mt-8 inline-flex items-center rounded-full border px-5 py-3 text-sm font-medium transition-opacity hover:opacity-90"
          style={{ borderColor: `${theme.primaryColor}45`, color: theme.primaryColor }}
        >
          Learn More
        </a>
      </div>
    </section>
  )
}

function ServicesSection({
  categories,
  theme,
  bookingPageUrl,
}: {
  categories: string[]
  theme: Theme
  bookingPageUrl: string
}) {
  if (categories.length === 0) return null

  return (
    <section id="services" className="border-b px-5 py-20 sm:px-6" style={{ borderColor: `${theme.primaryColor}14` }}>
      <div className="mx-auto max-w-6xl">
        <SectionHeading theme={theme}>What We Offer</SectionHeading>
        <div className="mt-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <span
              key={category}
              className="rounded-full border px-4 py-2 text-sm"
              style={{
                borderColor: `${theme.primaryColor}30`,
                color: theme.primaryColor,
                backgroundColor: `${theme.primaryColor}10`,
              }}
            >
              {category}
            </span>
          ))}
        </div>
        <p className="mt-6 text-sm text-pretty" style={{ color: `${theme.textColor}A8` }}>
          View full services and pricing when you book.
        </p>
        <a href={bookingPageUrl} className="mt-3 inline-block text-sm underline underline-offset-4" style={{ color: theme.primaryColor }}>
          Browse the booking flow
        </a>
      </div>
    </section>
  )
}

function TestimonialsSection({
  testimonials,
  theme,
}: {
  testimonials: SiteSpec["testimonials"]
  theme: Theme
}) {
  if (testimonials.length === 0) return null

  return (
    <section id="portfolio" className="border-b px-5 py-20 sm:px-6" style={{ borderColor: `${theme.primaryColor}14` }}>
      <div className="mx-auto max-w-6xl">
        <SectionHeading theme={theme}>Testimonials</SectionHeading>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {testimonials.slice(0, 4).map((testimonial) => (
            <article
              key={`${testimonial.name}-${testimonial.text.slice(0, 24)}`}
              className="flex h-full flex-col rounded-[1.5rem] border px-5 py-6"
              style={{
                borderColor: `${theme.primaryColor}18`,
                backgroundColor: `${theme.textColor}08`,
              }}
            >
              <span className="text-4xl leading-none" style={{ color: `${theme.primaryColor}85`, fontFamily: theme.displayFont }}>
                "
              </span>
              <p className="mt-4 flex-1 text-base italic leading-7 text-pretty" style={{ color: `${theme.textColor}D8` }}>
                {testimonial.text}
              </p>
              <p className="mt-6 text-sm" style={{ color: theme.primaryColor }}>
                {testimonial.name}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function OriginStorySection({ originStory, theme }: { originStory?: string; theme: Theme }) {
  if (!originStory) return null

  const paragraphs = originStory
    .split("\n\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)

  return (
    <section className="border-b px-5 py-20 sm:px-6" style={{ borderColor: `${theme.primaryColor}14` }}>
      <div className="mx-auto max-w-3xl">
        <SectionHeading theme={theme}>Our Story</SectionHeading>
        <div className="mt-8 space-y-6">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-base leading-8 text-pretty sm:text-lg" style={{ color: `${theme.textColor}D8` }}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

function HoursAndLocationSection({
  spec,
  hours,
  social,
  theme,
}: {
  spec: SiteSpec
  hours: SiteHours[]
  social: SiteSocialLink[]
  theme: Theme
}) {
  const { shop } = spec
  const mapsUrl = getMapsUrl(shop)

  return (
    <section id="location" className="border-b px-5 py-20 sm:px-6" style={{ borderColor: `${theme.primaryColor}14` }}>
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div>
          <SectionHeading theme={theme}>Hours</SectionHeading>
          <div className="mt-8 space-y-4">
            {hours.map((entry) => (
              <HoursRow key={entry.dayOfWeek} hours={entry} theme={theme} />
            ))}
          </div>
        </div>

        <div>
          <SectionHeading theme={theme}>Location</SectionHeading>
          <div className="mt-8 rounded-[1.5rem] border p-6" style={{ borderColor: `${theme.primaryColor}18`, backgroundColor: `${theme.textColor}06` }}>
            <div className="space-y-3 text-sm sm:text-base">
              {shop.address ? <p className="text-pretty">{shop.address}</p> : null}
              {shop.phone ? (
                <p>
                  <a href={`tel:${shop.phone}`} className="underline underline-offset-4" style={{ color: theme.primaryColor }}>
                    {shop.phone}
                  </a>
                </p>
              ) : null}
              {shop.email ? (
                <p>
                  <a href={`mailto:${shop.email}`} className="underline underline-offset-4" style={{ color: theme.primaryColor }}>
                    {shop.email}
                  </a>
                </p>
              ) : null}
            </div>

            {mapsUrl ? (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 block rounded-[1.25rem] border p-5 transition-opacity hover:opacity-90"
                style={{
                  borderColor: `${theme.primaryColor}20`,
                  backgroundColor: `${theme.primaryColor}10`,
                }}
              >
                <p className="text-sm uppercase" style={{ color: theme.primaryColor }}>
                  Google Maps
                </p>
                <p className="mt-2 text-base text-pretty" style={{ color: `${theme.textColor}D8` }}>
                  Open directions for this location
                </p>
                {shop.mapCoordinates ? (
                  <p className="mt-3 text-xs tabular-nums" style={{ color: `${theme.textColor}A8` }}>
                    {shop.mapCoordinates.lat.toFixed(5)}, {shop.mapCoordinates.lng.toFixed(5)}
                  </p>
                ) : null}
              </a>
            ) : null}

            {social.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-3">
                {social.map((link) => (
                  <a
                    key={`${link.platform}-${link.url}`}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border px-3 py-1.5 text-sm"
                    style={{ borderColor: `${theme.primaryColor}22`, color: theme.primaryColor }}
                  >
                    {formatLabel(link.platform)}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

function PoliciesSection({
  shop,
  theme,
}: {
  shop: SiteSpec["shop"]
  theme: Theme
}) {
  const hasPolicies =
    Boolean(shop.cancellationPolicy) ||
    Boolean(shop.birthdayPromo) ||
    Boolean(shop.giftCardUrl) ||
    Boolean(shop.googleReviewsUrl)

  if (!hasPolicies) return null

  return (
    <section className="border-b px-5 py-12 sm:px-6" style={{ borderColor: `${theme.primaryColor}14` }}>
      <div className="mx-auto max-w-6xl">
        <p className="text-sm uppercase" style={{ color: theme.primaryColor }}>
          Policies & Info
        </p>
        <div className="mt-4 grid gap-4 text-sm leading-6 lg:grid-cols-2">
          {shop.cancellationPolicy ? (
            <InfoItem label="Cancellation policy" theme={theme}>
              {shop.cancellationPolicy}
            </InfoItem>
          ) : null}
          {shop.birthdayPromo ? (
            <InfoItem label="Birthday promotion" theme={theme}>
              {shop.birthdayPromo}
            </InfoItem>
          ) : null}
          {shop.giftCardUrl ? (
            <InfoItem label="Gift cards" theme={theme}>
              <a href={shop.giftCardUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4" style={{ color: theme.primaryColor }}>
                Purchase a Gift Card
              </a>
            </InfoItem>
          ) : null}
          {shop.googleReviewsUrl ? (
            <InfoItem label="Google reviews" theme={theme}>
              <a href={shop.googleReviewsUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4" style={{ color: theme.primaryColor }}>
                Leave us a Review
              </a>
            </InfoItem>
          ) : null}
        </div>
      </div>
    </section>
  )
}

function PaymentMethodsSection({
  paymentMethods,
  theme,
}: {
  paymentMethods: string[]
  theme: Theme
}) {
  if (paymentMethods.length === 0) return null

  return (
    <section className="border-b px-5 py-10 sm:px-6" style={{ borderColor: `${theme.primaryColor}14` }}>
      <div className="mx-auto max-w-6xl">
        <p className="text-sm uppercase" style={{ color: theme.primaryColor }}>
          Payment Methods
        </p>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {paymentMethods.map((method) => (
            <span
              key={method}
              className="rounded-full border px-3 py-1.5 text-xs uppercase"
              style={{
                borderColor: `${theme.primaryColor}20`,
                color: `${theme.textColor}CC`,
                backgroundColor: `${theme.textColor}06`,
              }}
            >
              {formatPaymentMethod(method)}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function BottomCta({ bookingUrl, theme }: { bookingUrl: string; theme: Theme }) {
  return (
    <section className="px-5 py-20 text-center sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-4xl text-balance sm:text-5xl" style={{ fontFamily: theme.displayFont }}>
          Ready to book?
        </h2>
        <div className="mt-8">
          <ButtonLink href={bookingUrl} theme={theme}>
            Book an Appointment
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}

function Footer({ shopName, theme }: { shopName: string; theme: Theme }) {
  return (
    <footer className="border-t px-5 py-6 sm:px-6" style={{ borderColor: `${theme.primaryColor}14` }}>
      <div className="mx-auto flex max-w-6xl flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between" style={{ color: `${theme.textColor}90` }}>
        <span>{shopName}</span>
        <span>Powered by Koureia</span>
      </div>
    </footer>
  )
}

function SectionHeading({ children, theme }: { children: ReactNode; theme: Theme }) {
  return (
    <h2 className="text-3xl text-balance sm:text-4xl" style={{ color: theme.primaryColor, fontFamily: theme.displayFont }}>
      {children}
    </h2>
  )
}

function TeamCard({ member, theme }: { member: SiteStaffMember; theme: Theme }) {
  const accent = member.colorHex || theme.primaryColor
  const initials = member.name
    .split(" ")
    .map((part) => part[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <article
      className="rounded-[1.75rem] border p-5"
      style={{
        borderColor: `${theme.primaryColor}18`,
        backgroundColor: `${theme.textColor}06`,
      }}
    >
      <div className="flex items-center gap-4">
        {member.imageUrl ? (
          <img src={member.imageUrl} alt={member.name} className="size-16 rounded-full object-cover" />
        ) : (
          <div
            className="flex size-16 items-center justify-center rounded-full text-lg font-semibold"
            style={{ backgroundColor: `${accent}20`, color: accent }}
          >
            {initials}
          </div>
        )}
        <div className="min-w-0">
          <h3 className="text-lg text-balance" style={{ color: theme.textColor }}>
            {member.name}
          </h3>
          <p className="text-sm" style={{ color: `${theme.textColor}A8` }}>
            {member.role}
          </p>
        </div>
      </div>
      {member.specialties.length > 0 ? (
        <p className="mt-5 text-sm leading-6 text-pretty" style={{ color: accent }}>
          {member.specialties.join(" · ")}
        </p>
      ) : null}
    </article>
  )
}

function HoursRow({ hours, theme }: { hours: SiteHours; theme: Theme }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b pb-3 text-sm sm:text-base" style={{ borderColor: `${theme.primaryColor}10` }}>
      <span className="tabular-nums" style={{ color: `${theme.textColor}C8` }}>
        {dayName(hours.dayOfWeek)}
      </span>
      <span className="tabular-nums" style={{ color: hours.isClosed ? `${theme.textColor}78` : theme.primaryColor }}>
        {hours.isClosed ? "Closed" : `${formatTime(hours.startTime)} - ${formatTime(hours.endTime)}`}
      </span>
    </div>
  )
}

function InfoItem({
  label,
  children,
  theme,
}: {
  label: string
  children: ReactNode
  theme: Theme
}) {
  return (
    <div className="rounded-2xl border p-4" style={{ borderColor: `${theme.primaryColor}12`, backgroundColor: `${theme.textColor}04` }}>
      <p className="text-xs uppercase" style={{ color: theme.primaryColor }}>
        {label}
      </p>
      <div className="mt-2 text-pretty" style={{ color: `${theme.textColor}B8` }}>
        {children}
      </div>
    </div>
  )
}

function ButtonLink({
  href,
  theme,
  className,
  children,
}: {
  href: string
  theme: Theme
  className?: string
  children: ReactNode
}) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center rounded-full px-5 py-3 text-sm font-medium transition-opacity hover:opacity-90",
        className,
      )}
      style={{
        backgroundColor: theme.primaryColor,
        color: theme.backgroundColor,
      }}
    >
      {children}
    </a>
  )
}

function getTheme(branding: SiteSpec["branding"]): Theme {
  const displayFont = branding.displayFont || "Playfair Display"
  const bodyFont = branding.bodyFont || "Inter"

  return {
    ...branding,
    primaryColor: branding.primaryColor || "#c9a84c",
    secondaryColor: branding.secondaryColor || "#241b15",
    backgroundColor: branding.backgroundColor || "#1a1410",
    textColor: branding.textColor || "#e8ddd0",
    accentColor: branding.accentColor || "#c9a84c",
    displayFont: `'${displayFont}', Georgia, serif`,
    bodyFont: `'${bodyFont}', sans-serif`,
  }
}

function getMapsUrl(shop: SiteSpec["shop"]) {
  if (shop.mapCoordinates) {
    return `https://www.google.com/maps/search/?api=1&query=${shop.mapCoordinates.lat},${shop.mapCoordinates.lng}`
  }

  if (shop.address) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.address)}`
  }

  return null
}

function formatLabel(value: string) {
  return value
    .split(/[_\s-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function formatPaymentMethod(method: string) {
  const normalized = method.toLowerCase()

  switch (normalized) {
    case "apple_pay":
      return "Apple Pay"
    case "google_pay":
      return "Google Pay"
    case "amex":
      return "AmEx"
    default:
      return formatLabel(normalized)
  }
}
