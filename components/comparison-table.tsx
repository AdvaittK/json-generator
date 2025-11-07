"use client"

import { motion } from "framer-motion"
import { Target, Zap, Shield, Users, TrendingUp, Clock } from "lucide-react"

export default function ComparisonTable() {
  const benefits = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Boost Productivity",
      description: "Save hours of manual work with AI-powered generation and smart automation. Build complex JSON structures in seconds.",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Reduce Errors",
      description: "Real-time validation catches mistakes instantly. No more debugging malformed JSON or syntax errors.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Enterprise Ready",
      description: "Built with security and reliability in mind. Trusted by developers worldwide for mission-critical projects.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Team Collaboration",
      description: "Share templates and workflows across your team. Maintain consistency in JSON structures organization-wide.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Scale Effortlessly",
      description: "From simple objects to complex nested structures. Handle any JSON requirement with ease and confidence.",
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Save Time Daily",
      description: "Streamlined workflows and keyboard shortcuts let you work faster. Focus on what matters, not formatting.",
      gradient: "from-red-500 to-pink-500"
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
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-1.5 text-sm font-medium text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300">
            <Target className="h-3.5 w-3.5" />
            <span>Why Choose Us</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
            Built to solve real problems
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Discover how our JSON Generator transforms the way you work with structured data.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 transition-all hover:border-gray-300 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
            >
              {/* Gradient glow on hover */}
              <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${benefit.gradient} opacity-0 blur-3xl transition-opacity group-hover:opacity-20`} />
              
              <div className={`relative mb-5 inline-flex items-center justify-center rounded-xl bg-gradient-to-br ${benefit.gradient} p-3 text-white shadow-lg`}>
                {benefit.icon}
              </div>
              
              <h3 className="relative mb-3 text-xl font-bold text-gray-900 dark:text-white">
                {benefit.title}
              </h3>
              <p className="relative text-gray-600 dark:text-gray-400">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 