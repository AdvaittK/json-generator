"use client"

import { motion } from "framer-motion"
import { CreditCard, Sparkles } from "lucide-react"

export default function BillingHero() {
  return (
    <section className="relative w-full overflow-hidden py-16 md:py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute -right-20 top-20 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-3xl" />
        <div className="absolute -left-20 top-40 h-[300px] w-[300px] rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl" />
      </div>

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            className="flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm text-blue-800 dark:border-blue-800/50 dark:bg-blue-900/20 dark:text-blue-300"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Choose the right plan for you</span>
          </motion.div>
          
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Pricing</span> Plans
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Unlock advanced features with our premium plans and take your JSON editing to the next level
            </p>
          </motion.div>

          <motion.div 
            className="mt-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <CreditCard className="h-4 w-4 text-blue-500" />
            <span>Secure payments - Cancel anytime</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 