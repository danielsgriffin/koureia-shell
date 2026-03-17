import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Koureia",
  description: "Booking and scheduling for salons, spas, and barbers.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
