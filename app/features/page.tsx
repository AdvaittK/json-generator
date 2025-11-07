import type { Metadata } from "next"
import Features from "@/components/features"
import ComparisonTable from "@/components/comparison-table"

export const metadata: Metadata = {
  title: "Features - JSON Generator",
  description: "Explore the powerful features of our JSON Generator & Editor",
}

export default function FeaturesPage() {
  return (
    <div className="min-h-screen">
      <Features />
      <ComparisonTable />
    </div>
  )
} 