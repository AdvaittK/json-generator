import type { Metadata } from "next"
import Hero from "@/components/hero"
import StatsSection from "@/components/stats-section"
import Companies from "@/components/companies"

export const metadata: Metadata = {
  title: "JSON Generator & Editor",
  description: "Generate, customize, validate, and download JSON files easily",
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <Hero />
      <Companies />
      <StatsSection />
    </div>
  )
}
