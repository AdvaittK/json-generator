"use client"

import { motion } from "framer-motion"
import { CheckCircle, Users, Code, Zap, Star } from "lucide-react"

export default function StatsSection() {
  const stats = [
    {
      icon: <Users className="h-5 w-5" />,
      title: "5,000+",
      label: "Active Users",
    },
    {
      icon: <Code className="h-5 w-5" />,
      title: "50K+",
      label: "JSON Files Generated",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "99.9%",
      label: "Uptime",
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: "4.9/5",
      label: "User Rating",
    },
  ]

  const features = [
    "Real-time validation & formatting",
    "AI-powered generation",
    "Visual drag & drop builder",
    "Export in multiple formats",
    "Dark mode support",
    "Template library"
  ]

  return (
    <section className="relative overflow-hidden bg-transparent py-24 md:py-32">
      <div className="container relative mx-auto px-4">
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-24 grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-4 md:gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center transition-all hover:border-blue-200 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-800">
                <div className="mb-3 inline-flex items-center justify-center rounded-full bg-blue-50 p-3 text-blue-600 transition-colors group-hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-400 dark:group-hover:bg-blue-900">
                  {stat.icon}
                </div>
                <div className="mb-1 text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.title}
                </div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Bento Grid */}
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Everything you need to work with JSON
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              Professional tools designed for modern development workflows
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-blue-200 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-800"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {feature}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-24 max-w-4xl"
        >
          <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-8 dark:border-gray-800 dark:from-gray-900 dark:to-gray-950 md:p-12">
            <div className="mb-6 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <blockquote className="mb-8 text-xl font-medium leading-relaxed text-gray-900 dark:text-white md:text-2xl">
              "This JSON generator has completely transformed my workflow. The AI assistant is incredibly accurate, and the visual builder makes complex structures a breeze."
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-lg font-bold text-white">
                S
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">Sarah Chen</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Senior Developer at TechCorp</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 