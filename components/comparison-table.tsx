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
 
    </section>
  )
} 