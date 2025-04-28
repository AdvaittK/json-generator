"use client"

import { motion } from "framer-motion"
import { Layers, Sparkles, Lightbulb } from "lucide-react"

export default function FeaturesHero() {
  return (
    <section className="relative w-full overflow-hidden py-20 md:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 opacity-40">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-gradient-to-l from-indigo-500/20 to-purple-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-3xl" />
      </div>

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-900 dark:border-blue-900/50 dark:bg-blue-900/20 dark:text-blue-300"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="mr-1 h-3.5 w-3.5" />
            <span>Packed with powerful features</span>
          </motion.div>
          
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Features that <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">empower</span> you
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Discover how our JSON Generator & Editor can streamline your workflow with these powerful capabilities
            </p>
          </motion.div>

          <motion.div 
            className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex flex-col items-center">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                <Layers className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-base font-medium">Intuitive Design</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                <Sparkles className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-base font-medium">AI Powered</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                <Lightbulb className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-base font-medium">Developer Focused</h3>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 