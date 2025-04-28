"use client"

import { motion } from "framer-motion"
import { Lightbulb, Keyboard, CheckCircle, Copy, Download, Save } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function EditorTips() {
  const tips = [
    {
      title: "Use keyboard shortcuts",
      description: "Press Ctrl+Space for code suggestions, Ctrl+S to format, and Ctrl+F to search.",
      icon: <Keyboard className="h-5 w-5 text-amber-500" />
    },
    {
      title: "Save custom templates",
      description: "Create reusable templates for your frequently used JSON structures.",
      icon: <Save className="h-5 w-5 text-blue-500" />
    },
    {
      title: "Validate as you type",
      description: "Get instant feedback on JSON syntax errors while you edit.",
      icon: <CheckCircle className="h-5 w-5 text-green-500" />
    },
    {
      title: "Export options",
      description: "Download as minified JSON, beautified JSON, or copy directly to clipboard.",
      icon: <Download className="h-5 w-5 text-purple-500" />
    },
    {
      title: "Use the AI assistant",
      description: "Ask the AI to generate JSON for specific data structures or fix errors.",
      icon: <Lightbulb className="h-5 w-5 text-amber-500" />
    },
    {
      title: "Copy snippets",
      description: "Select parts of your JSON and copy just that section with Ctrl+Shift+C.",
      icon: <Copy className="h-5 w-5 text-indigo-500" />
    },
  ]

  return (
    <section className="w-full py-12 md:py-20 bg-white dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <motion.div
          className="mx-auto mb-10 max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-2 inline-flex items-center justify-center rounded-full bg-amber-100 px-3 py-1 text-sm text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
            <Lightbulb className="mr-1 h-4 w-4" />
            <span>Tips & Tricks</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Get the most out of the JSON Editor</h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Use these tips to improve your productivity when working with JSON
          </p>
        </motion.div>

        <motion.div
          className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="h-full">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                    {tip.icon}
                  </div>
                  <CardTitle className="text-base">{tip.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">{tip.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 