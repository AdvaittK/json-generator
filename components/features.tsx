"use client"

import { motion } from "framer-motion"
import { Code, Wand2, MessageSquare, Download, PanelLeft, Sparkles, Layers } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Real-Time Validation",
      description: "Instant syntax checking with detailed error messages. Auto-formatting keeps your JSON clean and readable.",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "AI-Powered Assistant",
      description: "Transform natural language into JSON instantly. Powered by Gemini 2.5 Flash for intelligent code generation.",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "Visual Builder",
      description: "Build complex nested structures with drag-and-drop simplicity. No coding required for quick prototyping.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: <Wand2 className="h-6 w-6" />,
      title: "Smart Templates",
      description: "Pre-built templates for APIs, configs, and data models. Create custom templates for your team's workflow.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Flexible Export",
      description: "Export as minified or beautified JSON. One-click copy to clipboard or download as file.",
      gradient: "from-pink-500 to-red-500"
    },
    {
      icon: <PanelLeft className="h-6 w-6" />,
      title: "Multiple Views",
      description: "Switch between code editor, visual builder, and tree view. Choose the best tool for each task.",
      gradient: "from-red-500 to-orange-500"
    }
  ]

  return (
    <section className="relative overflow-hidden bg-transparent px-4 pt-40 pb-24 md:pt-48 md:pb-32 lg:pt-56 lg:pb-40">
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
            <span>Core Features</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
            Tools that work
            <br />
            the way you do
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Professional-grade JSON tools built for efficiency. Simple enough for quick tasks, powerful enough for complex projects.
          </p>
        </motion.div>

        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative"
              >
                <div className="relative h-full overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 transition-all hover:border-gray-300 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700">
                  {/* Icon with gradient */}
                  <div className={`mb-5 inline-flex items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} p-3 text-white shadow-lg`}>
                    {feature.icon}
                  </div>

                  {/* Content */}
                  <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
