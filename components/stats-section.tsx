"use client"

import { motion } from "framer-motion"
import { CheckCircle, Users, Code, Zap } from "lucide-react"

export default function StatsSection() {
  const stats = [
    {
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      title: "5,000+",
      label: "JSON files generated",
    },
    {
      icon: <Users className="h-6 w-6 text-blue-500" />,
      title: "3,200+",
      label: "Happy developers",
    },
    {
      icon: <Code className="h-6 w-6 text-purple-500" />,
      title: "99.9%",
      label: "Validation accuracy",
    },
    {
      icon: <Zap className="h-6 w-6 text-amber-500" />,
      title: "4.9/5",
      label: "User satisfaction",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="bg-gray-50 py-16 dark:bg-gray-900/50">
      <div className="container px-4 md:px-6">
        <motion.div
          className="mx-auto max-w-5xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-2 text-3xl font-bold tracking-tight">Trusted by developers worldwide</h2>
          <p className="mb-12 text-lg text-gray-500 dark:text-gray-400">
            Our JSON Generator is the tool of choice for developers who value efficiency and quality
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center justify-center"
              variants={item}
            >
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-md dark:bg-gray-800">
                {stat.icon}
              </div>
              <h3 className="text-2xl font-bold">{stat.title}</h3>
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mx-auto mt-16 max-w-xl rounded-lg border bg-white/50 p-6 text-center shadow-lg backdrop-blur-sm dark:bg-gray-800/50 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="mb-4 italic text-gray-600 dark:text-gray-300">
            "This JSON generator has saved me countless hours of work. The AI assistant is remarkably accurate and the visual builder makes complex JSON structures so much easier to create."
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 text-white">S</div>
            </div>
            <div className="text-left">
              <p className="font-semibold">Amey Dabhade</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Software Developer</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 