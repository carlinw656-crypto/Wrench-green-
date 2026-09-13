import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Wrench Green | Offer desk",
  description: "A clear, calm workspace for managing offers, held funds, and payouts.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
