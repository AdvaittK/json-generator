import { Metadata } from "next"
import BillingHero from "@/components/billing-hero"
import Pricing from "@/components/pricing"

export const metadata = {
  title: "Pricing - JSON Generator",
  description: "Choose the right plan for your JSON editing needs",
}

export default function BillingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <BillingHero />
      <Pricing />
    </div>
  )
} 