"use client"

import { motion } from "framer-motion"

export default function Companies() {
  // These are just placeholder company names
  const companies = [
    "TechCorp", "DevSolutions", "CodeLabs", "ByteWorks", 
    "AppMakers", "DataFlow", "CloudScale", "WebFusion"
  ]

  return (
    <section className="border-t border-gray-200 bg-white py-12 dark:border-gray-800 dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-8 text-sm font-medium text-gray-500 dark:text-gray-400">
            TRUSTED BY COMPANIES WORLDWIDE
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {companies.map((company, index) => (
              <motion.div
                key={index}
                className="flex h-8 items-center font-bold tracking-tight text-gray-400 dark:text-gray-500"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className="mr-2 h-6 w-6 rounded bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600"></div>
                {company}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 