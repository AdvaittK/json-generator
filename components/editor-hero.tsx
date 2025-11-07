"use client"

import { motion } from "framer-motion"
import { FileJson, Zap } from "lucide-react"

export default function EditorHero() {
  return (
    <section className="relative w-full overflow-hidden px-4 pt-40 pb-16 md:pt-48 md:pb-20 lg:pt-56 lg:pb-24">
      <div className="container relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300"
          >
            <FileJson className="h-3.5 w-3.5" />
            <span>Professional JSON Editor</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 text-5xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-6xl lg:text-7xl"
          >
            Build JSON,
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
              your way
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400 md:text-xl"
          >
            Choose your preferred editing mode and start building. Real-time validation, AI assistance, and export options included.
          </motion.p>
        </div>
      </div>
    </section>
  )
} 