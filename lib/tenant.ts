/**
 * Tenant resolution — maps a domain to a shop spec.
 *
 * Phase 1 (current): mock resolver, hardcoded tenants.
 * Phase 2: live lookup against the Koureia API.
 */

export type TenantSpec = {
  slug: string
  name: string
  domain: string
  status: "live" | "provisioning" | "deprovisioned"
  /** branding_json — @json-render ComponentSpec[] (null until phase 2) */
  spec: unknown | null
  branding: {
    primaryColor: string
    backgroundColor: string
    textColor: string
    displayFont: string
  }
}

// ── Mock tenants (phase 1) ────────────────────────────────────

const MOCK_TENANTS: Record<string, TenantSpec> = {
  "beautyandthebarber.koureia.com": {
    slug: "beauty-and-the-barber",
    name: "Beauty and the Barber",
    domain: "beautyandthebarber.koureia.com",
    status: "live",
    spec: null,
    branding: {
      primaryColor: "#c9a84c",
      backgroundColor: "#1a1410",
      textColor: "#e8ddd0",
      displayFont: "Playfair Display",
    },
  },
  "olliemay.koureia.com": {
    slug: "olliemay",
    name: "Ollie May Hair",
    domain: "olliemay.koureia.com",
    status: "live",
    spec: null,
    branding: {
      primaryColor: "#c9a84c",
      backgroundColor: "#1a1410",
      textColor: "#e8ddd0",
      displayFont: "Playfair Display",
    },
  },
}

// ── Resolver ──────────────────────────────────────────────────

export async function resolveTenant(domain: string): Promise<TenantSpec | null> {
  // Phase 1: mock
  return MOCK_TENANTS[domain] ?? null

  // Phase 2: live API (swap in when Koureia API route exists)
  // const apiBase = process.env.KOUREIA_API_URL
  // const res = await fetch(`${apiBase}/api/shops/by-domain?domain=${domain}`, {
  //   next: { revalidate: 60 },
  // })
  // if (!res.ok) return null
  // return res.json()
}
