import type { Metadata } from "next"
import FeaturesHero from "@/components/features-hero"
import Features from "@/components/features"
import ComparisonTable from "@/components/comparison-table"

export const metadata: Metadata = {
  title: "Features - JSON Generator",
  description: "Explore the powerful features of our JSON Generator & Editor",
}

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <FeaturesHero />
      <Features />
      <ComparisonTable />
    </div>
  )
} 