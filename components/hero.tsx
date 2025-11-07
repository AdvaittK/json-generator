"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden px-4 pt-40 pb-24 md:pt-48 md:pb-32 lg:pt-56 lg:pb-40">

      <div className="container relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Powered by Gemini 2.5 Flash AI</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 text-5xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-6xl lg:text-7xl"
          >
            Build JSON structures
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
              in seconds
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400 md:text-xl"
          >
            The most powerful JSON editor with AI assistance, visual builder, and real-time validation. Perfect for developers who value speed and precision.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12"
          >
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-blue-600 px-8 text-base font-medium shadow-lg shadow-blue-600/30 transition-all hover:scale-105 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/40"
            >
              <Link href="/editor">
                Start Building Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Product preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mx-auto mt-20 max-w-6xl"
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 opacity-20 blur-3xl"></div>
            
            {/* Main preview */}
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-950">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-4 flex-1 rounded-md bg-white px-3 py-1 text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                  json-generator.app/editor
                </div>
              </div>

              {/* Editor content */}
              <div className="p-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Code editor preview */}
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Code Editor</span>
                      <div className="flex gap-1">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                    <pre className="overflow-x-auto text-xs font-mono leading-relaxed">
                      <code className="text-gray-700 dark:text-gray-300">
{`{
  "user": {
    "id": 12345,
    "name": "Alex Johnson",
    "email": "alex@company.com",
    "role": "developer",
    "active": true
  }
}`}
                      </code>
                    </pre>
                  </div>

                  {/* AI Assistant preview */}
                  <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-4 dark:border-gray-800 dark:from-blue-950 dark:to-cyan-950">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600">
                        <Sparkles className="h-3.5 w-3.5 text-white" />
                      </div>
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">AI Assistant</span>
                    </div>
                    <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                      <p className="rounded-md bg-white/60 p-2 dark:bg-gray-900/60">
                        I&apos;ve generated a user object with common fields.
                      </p>
                      <p className="rounded-md bg-white/60 p-2 dark:bg-gray-900/60">
                        Would you like me to add more properties?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
