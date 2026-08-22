import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })

const _geistMono = Geist_Mono({
  subsets: ["latin"],
})

const _playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  title: "Jurisence | The Algorithm for Next-Gen Legal Minds",
  description:
    "Jurisence is building the future of legal technology at the intersection of law, AI, and digital intelligence.",
  generator: "Jurisence",
  icons: {
    icon: "/images/favicon.jpeg",
    apple: "/images/favicon.jpeg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}