"use client"

import { motion } from "framer-motion"
import { Code, FileJson, Keyboard } from "lucide-react"

export default function EditorHero() {
  return (
    <section className="relative w-full overflow-hidden py-12 md:py-16">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute left-1/4 top-0 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-3xl" />
        <div className="absolute right-1/4 top-1/3 h-[250px] w-[250px] rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl" />
      </div>

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
              <FileJson className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </motion.div>
          
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              JSON <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Editor</span>
            </h1>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-lg dark:text-gray-400">
              Create, edit, validate, and export JSON data with our powerful editor suite
            </p>
          </motion.div>

          <motion.div
            className="mt-4 flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4 text-blue-500" />
              <span>Real-time validation</span>
            </div>
            <div className="flex items-center gap-2">
              <Keyboard className="h-4 w-4 text-blue-500" />
              <span>Intelligent code completion</span>
            </div>
            <div className="flex items-center gap-2">
              <FileJson className="h-4 w-4 text-blue-500" />
              <span>Multiple export options</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 