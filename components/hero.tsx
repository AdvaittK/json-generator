"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Sparkles, Zap, Code2 } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden py-12 md:py-24 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 opacity-50">
        <div className="absolute -left-[10%] -top-[10%] h-[500px] w-[500px] rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 blur-3xl" />
        <div className="absolute -bottom-[10%] right-[5%] h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-pink-500/20 to-yellow-500/20 blur-3xl" />
        <div className="absolute left-[40%] top-[60%] h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-green-500/20 to-blue-500/20 blur-3xl" />
      </div>

      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Sparkles className="h-4 w-4" />
              <span>Powerful JSON tooling for developers</span>
            </motion.div>
            <div className="space-y-2">
              <h1 className="relative text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">JSON Generator</span> & Editor
                <motion.div 
                  className="absolute -right-12 -top-6 text-blue-500"
                  initial={{ rotate: -20, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <Zap className="h-10 w-10" />
                </motion.div>
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Generate, customize, validate, and download JSON files easily with our powerful editor and AI assistant.
              </p>
            </div>
            <motion.div 
              className="flex flex-col gap-2 min-[400px]:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600">
                <Link href="/editor">
                  Try Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/features">Learn More</Link>
              </Button>
            </motion.div>
            <motion.div 
              className="mt-4 flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <Code2 className="h-4 w-4 text-blue-500" />
                <span>Real-time validation</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <Sparkles className="h-4 w-4 text-blue-500" />
                <span>AI-powered assistance</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <Zap className="h-4 w-4 text-blue-500" />
                <span>Visual builder</span>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            className="mx-auto flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative h-[400px] w-full overflow-hidden rounded-xl border bg-background p-4 shadow-xl">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs font-medium">JSON Generator</div>
                </div>
                <div className="flex-1 overflow-hidden font-mono text-sm">
                  <motion.pre 
                    className="h-full overflow-auto p-4 text-left"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <code className="language-json">
                      {`{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "preferences": {
      "theme": "dark",
      "notifications": true
    },
    "roles": ["admin", "editor"],
    "metadata": {
      "lastLogin": "2023-06-15T10:30:00Z",
      "accountCreated": "2022-01-10T08:15:30Z"
    }
  }
}`}
                    </code>
                  </motion.pre>
                </div>
              </div>
              <motion.div 
                className="absolute -right-6 -bottom-6 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 p-3 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <Code2 className="h-6 w-6 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
