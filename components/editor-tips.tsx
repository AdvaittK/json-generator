"use client"

import { motion } from "framer-motion"
import { Lightbulb, Keyboard, CheckCircle, Copy, Download, Save, Zap } from "lucide-react"

export default function EditorTips() {
  const tips = [
    {
      title: "Keyboard Shortcuts",
      description: "Ctrl+Space for suggestions, Ctrl+S to format. Work faster with keyboard commands.",
      icon: <Keyboard className="h-6 w-6" />,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Real-Time Validation",
      description: "Instant feedback on syntax errors as you type. Never debug malformed JSON again.",
      icon: <CheckCircle className="h-6 w-6" />,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Custom Templates",
      description: "Save frequently used structures as templates. Reuse them across projects.",
      icon: <Save className="h-6 w-6" />,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Flexible Export",
      description: "Download minified or beautified. Copy to clipboard with one click.",
      icon: <Download className="h-6 w-6" />,
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      title: "AI Assistance",
      description: "Describe what you need in plain language. Let AI generate the JSON.",
      icon: <Lightbulb className="h-6 w-6" />,
      gradient: "from-amber-500 to-orange-500"
    },
    {
      title: "Quick Copy",
      description: "Select any part of your JSON. Copy just that section instantly.",
      icon: <Copy className="h-6 w-6" />,
      gradient: "from-cyan-500 to-blue-500"
    },
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
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-sm font-medium text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300">
            <Zap className="h-3.5 w-3.5" />
            <span>Pro Tips</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
            Work smarter,
            <br />
            not harder
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Master these features to boost your productivity and streamline your workflow.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 transition-all hover:border-gray-300 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
            >
              {/* Gradient glow on hover */}
              <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${tip.gradient} opacity-0 blur-3xl transition-opacity group-hover:opacity-20`} />
              
              <div className={`relative mb-5 inline-flex items-center justify-center rounded-xl bg-gradient-to-br ${tip.gradient} p-3 text-white shadow-lg`}>
                {tip.icon}
              </div>
              
              <h3 className="relative mb-3 text-xl font-bold text-gray-900 dark:text-white">
                {tip.title}
              </h3>
              <p className="relative text-gray-600 dark:text-gray-400">
                {tip.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 