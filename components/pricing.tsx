"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Pricing() {
  const tiers = [
    {
      name: "Free",
      description: "Perfect for getting started",
      price: "$0",
      period: "/forever",
      features: [
        "Basic JSON generation",
        "Visual editor access",
        "Up to 10 saved templates",
        "Standard export options",
        "Community support"
      ],
      cta: "Get Started Free",
      ctaLink: "/editor",
      highlight: false,
    },
    {
      name: "Pro",
      description: "For professional developers",
      price: "$9",
      period: "/month",
      features: [
        "Everything in Free",
        "Unlimited saved templates",
        "AI assistant (unlimited)",
        "Cloud storage (5GB)",
        "Advanced export options",
        "Priority email support",
        "Custom templates"
      ],
      cta: "Start Pro Trial",
      ctaLink: "/billing/checkout?plan=pro",
      highlight: true,
    },
    {
      name: "Enterprise",
      description: "For teams & organizations",
      price: "$29",
      period: "/month",
      features: [
        "Everything in Pro",
        "Premium template library",
        "AI assistant (advanced)",
        "Cloud storage (50GB)",
        "24/7 Priority support",
        "Custom branding",
        "Team collaboration",
        "Advanced security & SSO"
      ],
      cta: "Contact Sales",
      ctaLink: "/billing/contact",
      highlight: false,
    }
  ]

  return (
    <section className="relative overflow-hidden bg-transparent py-24 md:py-32">
      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Simple Pricing</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
            Choose your plan
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Start free and upgrade as you grow. All plans include our core features.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {tier.highlight && (
                <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-blue-600 to-cyan-600"></div>
              )}
              <div className={`relative flex h-full flex-col rounded-3xl border p-8 ${
                tier.highlight
                  ? 'border-transparent bg-white shadow-2xl dark:bg-gray-900'
                  : 'border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900'
              }`}>
                {tier.highlight && (
                  <div className="absolute right-8 top-0 -translate-y-1/2">
                    <div className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-1 text-xs font-semibold text-white shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                    {tier.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {tier.description}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-gray-900 dark:text-white">
                      {tier.price}
                    </span>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">
                      {tier.period}
                    </span>
                  </div>
                </div>

                <ul className="mb-8 flex-1 space-y-4">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950">
                        <Check className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={`w-full rounded-xl ${
                    tier.highlight
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40'
                      : 'border-2'
                  }`}
                  variant={tier.highlight ? 'default' : 'outline'}
                  size="lg"
                >
                  <Link href={tier.ctaLink}>
                    {tier.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enterprise CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mx-auto mt-16 max-w-4xl rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-8 text-center dark:border-gray-800 dark:from-gray-900 dark:to-gray-950"
        >
          <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
            Need a custom solution?
          </h3>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            Contact our sales team for custom pricing, dedicated support, and enterprise features.
          </p>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link href="/billing/contact">
              Talk to Sales
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
} 