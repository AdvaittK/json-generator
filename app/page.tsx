import type { Metadata } from "next"
import Hero from "@/components/hero"
import StatsSection from "@/components/stats-section"
import Features from "@/components/features"

export const metadata: Metadata = {
  title: "JSON Generator & Editor - Build JSON Structures in Seconds",
  description: "The most powerful JSON editor with AI assistance, visual builder, and real-time validation. Perfect for developers who value speed and precision.",
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <StatsSection />
      <Features />
    </div>
  )
}
