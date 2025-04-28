"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Wand2, MessageSquare, Download, PanelLeft, Moon, Check, RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Features() {
  const features = [
    {
      icon: <Code className="h-10 w-10 text-cyan-500" />,
      title: "Live JSON Generator",
      description: "Write, paste, and validate JSON in real-time with our powerful code editor. Get instant feedback on syntax errors and formatting issues.",
      benefits: ["Syntax highlighting", "Error detection", "Auto-formatting", "JSON schema validation"]
    },
    {
      icon: <PanelLeft className="h-10 w-10 text-indigo-500" />,
      title: "Visual JSON Builder",
      description: "Drag-and-drop interface to visually build JSON objects and arrays without code. Perfect for non-technical users or complex data structures.",
      benefits: ["No coding required", "Drag & drop interface", "Nested structures", "Array management"]
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-green-500" />,
      title: "AI Chat Assistant",
      description: "Get help generating or correcting JSON with our integrated AI assistant. Ask questions, get explanations, and generate complex structures with natural language.",
      benefits: ["Natural language generation", "Error fixing", "Structure suggestions", "Code explanations"]
    },
    {
      icon: <Download className="h-10 w-10 text-orange-500" />,
      title: "Download & Copy",
      description: "Easily copy JSON to clipboard or download it as a .json file with one click. Export your data in different formats including minified or beautified JSON.",
      benefits: ["One-click export", "Multiple formats", "Clipboard integration", "Custom file naming"]
    },
    {
      icon: <Moon className="h-10 w-10 text-purple-500" />,
      title: "Dark/Light Mode",
      description: "Toggle between dark and light mode for comfortable editing in any environment. Reduce eye strain during long coding sessions.",
      benefits: ["System preference detection", "Manual override", "High contrast options", "Syntax highlighting themes"]
    },
    {
      icon: <Wand2 className="h-10 w-10 text-pink-500" />,
      title: "Templates",
      description: "Use pre-built templates to quickly generate common JSON structures. Save your own templates for frequently used patterns.",
      benefits: ["Common data structures", "Custom template library", "Quick start workflows", "Version control"]
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
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900/30">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm dark:bg-blue-800/30">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Everything You Need</h2>
            <p className="mx-auto max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Our JSON Generator & Editor comes packed with powerful features to make working with JSON easy and
              efficient.
            </p>
          </div>
        </motion.div>
        <motion.div
          className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-16"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
              <Card className="h-full border-t-4 transition-all duration-200 hover:shadow-lg" 
                style={{ borderTopColor: index % 6 === 0 ? '#06b6d4' : 
                                       index % 6 === 1 ? '#6366f1' : 
                                       index % 6 === 2 ? '#22c55e' : 
                                       index % 6 === 3 ? '#f97316' : 
                                       index % 6 === 4 ? '#a855f7' : 
                                       '#ec4899' }}>
                <CardHeader>
                  <div className="mb-3">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-green-500" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-24 mx-auto max-w-3xl rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-center text-white shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <RotateCw className="mx-auto mb-4 h-12 w-12" />
          <h3 className="mb-2 text-2xl font-bold">Ready to transform your JSON workflow?</h3>
          <p className="mb-6 text-blue-100">
            Try our JSON Generator & Editor now and experience the difference.
          </p>
          <Button size="lg" asChild className="bg-white text-blue-600 hover:bg-blue-50">
            <Link href="/editor">
              Try the JSON Editor Now
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
