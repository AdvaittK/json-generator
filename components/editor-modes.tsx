"use client"

import { motion } from "framer-motion"
import { Code2, PanelLeft, MessageSquareText } from "lucide-react"
import { cn } from "@/lib/utils"

export default function EditorModes() {
  const modes = [
    {
      icon: <Code2 className="h-6 w-6" />,
      name: "Code Editor",
      description: "Write and edit JSON directly with syntax highlighting, auto-formatting, and error detection. Perfect for developers who prefer working with code.",
      color: "bg-blue-500",
      textColor: "text-blue-500"
    },
    {
      icon: <PanelLeft className="h-6 w-6" />,
      name: "Visual Builder",
      description: "Create and modify JSON using an intuitive visual interface. Drag-and-drop elements, add properties, and build arrays without writing code.",
      color: "bg-indigo-500",
      textColor: "text-indigo-500"
    },
    {
      icon: <MessageSquareText className="h-6 w-6" />,
      name: "AI Assistant",
      description: "Get help from our AI to generate JSON, fix errors, and answer questions. Just describe what you need in plain language.",
      color: "bg-green-500",
      textColor: "text-green-500"
    }
  ]

  return (
    <section className="w-full py-12 bg-gray-50 dark:bg-gray-900/30">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-4xl">
          <motion.div
            className="mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight">Three powerful ways to edit</h2>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Choose the editing mode that works best for your workflow
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {modes.map((mode, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-xl border bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:bg-gray-800 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={cn("absolute top-0 right-0 h-20 w-20 -translate-y-1/2 translate-x-1/2 rounded-full opacity-10 transition-opacity duration-300 group-hover:opacity-20", mode.color)} />
                
                <div className={cn("mb-4 flex h-12 w-12 items-center justify-center rounded-lg", mode.color, "bg-opacity-10 dark:bg-opacity-20")}>
                  <div className={cn(mode.textColor)}>
                    {mode.icon}
                  </div>
                </div>
                
                <h3 className="mb-2 text-xl font-semibold">{mode.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{mode.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 