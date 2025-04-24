"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Wand2, MessageSquare, Download, PanelLeft, Moon } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: <Code className="h-10 w-10 text-cyan-500" />,
      title: "Live JSON Generator",
      description: "Write, paste, and validate JSON in real-time with our powerful code editor.",
    },
    {
      icon: <PanelLeft className="h-10 w-10 text-indigo-500" />,
      title: "Visual JSON Builder",
      description: "Drag-and-drop interface to visually build JSON objects and arrays without code.",
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-green-500" />,
      title: "AI Chat Assistant",
      description: "Get help generating or correcting JSON with our integrated GPT-4 powered chat.",
    },
    {
      icon: <Download className="h-10 w-10 text-orange-500" />,
      title: "Download & Copy",
      description: "Easily copy JSON to clipboard or download it as a .json file with one click.",
    },
    {
      icon: <Moon className="h-10 w-10 text-purple-500" />,
      title: "Dark/Light Mode",
      description: "Toggle between dark and light mode for comfortable editing in any environment.",
    },
    {
      icon: <Wand2 className="h-10 w-10 text-pink-500" />,
      title: "Templates",
      description: "Use pre-built templates to quickly generate common JSON structures.",
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
    <section id="features" className="w-full py-12 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Our JSON Generator & Editor comes packed with powerful features to make working with JSON easy and
              efficient.
            </p>
          </div>
        </div>
        <motion.div
          className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item}>
              <Card className="h-full">
                <CardHeader>
                  <div className="mb-2">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
