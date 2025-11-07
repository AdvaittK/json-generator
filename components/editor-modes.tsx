"use client"

import { motion } from "framer-motion"
import { Code2, PanelLeft, MessageSquareText, Sparkles } from "lucide-react"

export default function EditorModes() {
  const modes = [
    {
      icon: <Code2 className="h-6 w-6" />,
      name: "Code Editor",
      description: "Write and edit JSON directly with syntax highlighting, auto-formatting, and real-time error detection.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <PanelLeft className="h-6 w-6" />,
      name: "Visual Builder",
      description: "Build JSON structures visually with drag-and-drop. No coding required for quick prototyping.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: <MessageSquareText className="h-6 w-6" />,
      name: "AI Assistant",
      description: "Generate JSON with natural language. Ask questions and get instant help from our AI.",
      gradient: "from-green-500 to-emerald-500"
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
            <Sparkles className="h-3.5 w-3.5" />
            <span>Choose Your Mode</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
            Three ways to work
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Switch between editing modes seamlessly. Use what works best for each task.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {modes.map((mode, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 transition-all hover:border-gray-300 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
            >
              {/* Gradient glow on hover */}
              <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${mode.gradient} opacity-0 blur-3xl transition-opacity group-hover:opacity-20`} />
              
              <div className={`relative mb-5 inline-flex items-center justify-center rounded-xl bg-gradient-to-br ${mode.gradient} p-3 text-white shadow-lg`}>
                {mode.icon}
              </div>
              
              <h3 className="relative mb-3 text-xl font-bold text-gray-900 dark:text-white">
                {mode.name}
              </h3>
              <p className="relative text-gray-600 dark:text-gray-400">
                {mode.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 