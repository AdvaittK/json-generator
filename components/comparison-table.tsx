"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react"

export default function ComparisonTable() {
  const features = [
    { name: "Visual JSON Builder", tooltip: "Drag-and-drop interface for creating JSON" },
    { name: "Real-time Validation", tooltip: "Instant feedback on JSON syntax and structure" },
    { name: "AI Assistance", tooltip: "AI-powered help for generating and fixing JSON" },
    { name: "Dark/Light Mode", tooltip: "Support for both dark and light themes" },
    { name: "Custom Templates", tooltip: "Save and reuse your own JSON templates" },
    { name: "Cloud Storage", tooltip: "Save your JSON files in the cloud" },
    { name: "Export Options", tooltip: "Export to various formats including minified and beautified" },
    { name: "Free to Use", tooltip: "Available at no cost" },
  ]

  return (
    <section className="w-full py-16 md:py-24 bg-white dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <motion.div
          className="mx-auto mb-12 max-w-4xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight">Why Choose Our JSON Generator?</h2>
          <p className="mx-auto max-w-[800px] text-gray-500 dark:text-gray-400">
            See how our JSON Generator compares to alternatives on the market
          </p>
        </motion.div>

        <motion.div
          className="mx-auto max-w-5xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="pb-0">
              <CardTitle className="text-center text-xl">Feature Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Feature</TableHead>
                    <TableHead className="text-center">JSON Generator</TableHead>
                    <TableHead className="text-center">Alternative A</TableHead>
                    <TableHead className="text-center">Alternative B</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {features.map((feature, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          {feature.name}
                          <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <CheckCircle2 className="mx-auto h-5 w-5 text-green-500" />
                      </TableCell>
                      <TableCell className="text-center">
                        {index % 3 === 0 ? (
                          <XCircle className="mx-auto h-5 w-5 text-red-500" />
                        ) : (
                          <CheckCircle2 className="mx-auto h-5 w-5 text-green-500" />
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {index % 2 === 0 ? (
                          <CheckCircle2 className="mx-auto h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="mx-auto h-5 w-5 text-red-500" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
            * This comparison is based on features available as of 2024
          </p>
        </motion.div>
      </div>
    </section>
  )
} 