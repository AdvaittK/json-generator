"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, X } from "lucide-react"
import Link from "next/link"

export default function Pricing() {
  const tiers = [
    {
      name: "Free",
      description: "Perfect for getting started",
      price: "$0",
      period: "forever",
      features: [
        "Basic JSON generation",
        "Visual editor",
        "Up to 10 saved templates",
        "Standard export options",
        "Community support"
      ],
      notIncluded: [
        "AI assistant",
        "Premium templates",
        "Cloud storage",
        "Priority support"
      ],
      cta: "Get Started",
      ctaLink: "/editor",
      highlight: false,
      color: "bg-gray-100 dark:bg-gray-800",
    },
    {
      name: "Pro",
      description: "For professional developers",
      price: "$9",
      period: "per month",
      features: [
        "Everything in Free",
        "Unlimited saved templates",
        "AI assistant (basic)",
        "Cloud storage (5GB)",
        "Advanced export options",
        "Email support"
      ],
      notIncluded: [
        "Premium templates",
        "Priority support",
        "Custom branding"
      ],
      cta: "Upgrade to Pro",
      ctaLink: "/billing/checkout?plan=pro",
      highlight: true,
      color: "bg-blue-600",
      headerColor: "bg-gradient-to-r from-blue-600 to-cyan-500"
    },
    {
      name: "Enterprise",
      description: "For teams and organizations",
      price: "$29",
      period: "per month",
      features: [
        "Everything in Pro",
        "Premium templates library",
        "AI assistant (advanced)",
        "Cloud storage (50GB)",
        "Priority support",
        "Custom branding",
        "Team collaboration",
        "Advanced security"
      ],
      notIncluded: [],
      cta: "Contact Sales",
      ctaLink: "/billing/contact",
      highlight: false,
      color: "bg-gray-100 dark:bg-gray-800",
    }
  ]

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          className="mx-auto mb-12 max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Simple, transparent pricing</h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Choose the plan that's right for you and start building amazing JSON structures today
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              className="flex"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`relative flex w-full flex-col overflow-hidden ${tier.highlight ? 'shadow-lg border-blue-500' : 'border'}`}>
                {tier.highlight && (
                  <div className={`absolute top-0 w-full h-1 ${tier.headerColor}`}></div>
                )}
                
                <CardHeader className={`flex flex-col space-y-1.5 ${tier.highlight ? 'pb-8' : 'pb-6'}`}>
                  {tier.highlight && (
                    <div className="absolute right-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white">
                      Popular
                    </div>
                  )}
                  <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1">
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    <span className="ml-2 text-gray-500 dark:text-gray-400">{tier.period}</span>
                  </div>
                  
                  <div className="space-y-4">
                    {tier.features.map((feature, i) => (
                      <div key={i} className="flex items-center">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                    
                    {tier.notIncluded.map((feature, i) => (
                      <div key={i} className="flex items-center text-gray-400">
                        <X className="mr-2 h-5 w-5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="pt-4">
                  <Button 
                    asChild 
                    className={`w-full ${tier.highlight ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                    variant={tier.highlight ? "default" : "outline"}
                  >
                    <Link href={tier.ctaLink}>
                      {tier.cta}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="mx-auto mt-16 max-w-3xl rounded-lg border border-gray-200 bg-gray-50 p-6 text-center dark:border-gray-800 dark:bg-gray-900"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="mb-2 text-xl font-semibold">Need a custom plan?</h3>
          <p className="mb-4 text-gray-500 dark:text-gray-400">
            Contact our sales team to discuss custom pricing options for larger teams and specific requirements.
          </p>
          <Button asChild variant="outline">
            <Link href="/billing/contact">
              Contact Sales
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
} 