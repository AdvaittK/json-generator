"use client"

import { useEffect, useRef, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

// We'll use dynamic import for Monaco Editor to avoid SSR issues
import dynamic from "next/dynamic"
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <div className="h-[500px] w-full flex items-center justify-center bg-muted">Loading editor...</div>,
})

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  isValid: boolean
}

export default function CodeEditor({ value, onChange, isValid }: CodeEditorProps) {
  const { toast } = useToast()
  const editorRef = useRef<any>(null)

  // Function to handle editor mount
  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor
  }

  // Function to format JSON
  const formatJson = () => {
    if (!isValid) return

    try {
      const formatted = JSON.stringify(JSON.parse(value), null, 2)
      onChange(formatted)
    } catch (e) {
      // If there's an error, don't format
    }
  }

  // Format JSON when editor is mounted and JSON is valid
  useEffect(() => {
    if (editorRef.current && isValid) {
      formatJson()
    }
  }, [isValid])

  return (
    <div className="relative bg-gradient-to-br from-gray-50/30 to-white/30 dark:from-gray-950/30 dark:to-gray-900/30">
      {/* Premium Status Badge */}
      <div className="absolute right-6 top-6 z-10 flex gap-2">
        {isValid ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Badge
              variant="outline"
              className="rounded-lg border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 px-3 py-1.5 text-sm font-semibold text-green-700 shadow-sm dark:border-green-800 dark:from-green-900/30 dark:to-emerald-900/30 dark:text-green-400"
            >
              <div className="mr-1.5 h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Valid JSON
            </Badge>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Badge
              variant="outline"
              className="rounded-lg border-red-200 bg-gradient-to-br from-red-50 to-pink-50 px-3 py-1.5 text-sm font-semibold text-red-700 shadow-sm dark:border-red-800 dark:from-red-900/30 dark:to-pink-900/30 dark:text-red-400"
            >
              <div className="mr-1.5 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              Invalid JSON
            </Badge>
          </motion.div>
        )}
      </div>

      {/* Monaco Editor with premium styling */}
      <div className="overflow-hidden">
        <MonacoEditor
          height="600px"
          language="json"
          theme="vs-dark"
          value={value}
          onChange={(value) => onChange(value || "")}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: true },
            fontSize: 15,
            lineHeight: 24,
            wordWrap: "on",
            formatOnPaste: true,
            formatOnType: true,
            automaticLayout: true,
            padding: { top: 16, bottom: 16 },
            smoothScrolling: true,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            fontFamily: "'DM Sans', 'Fira Code', 'Menlo', 'Monaco', monospace",
            fontLigatures: true,
            renderLineHighlight: "all",
            scrollBeyondLastLine: false,
          }}
        />
      </div>

      {/* Premium Error Alert */}
      {!isValid && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="border-t border-red-200 bg-gradient-to-br from-red-50/50 to-pink-50/50 p-4 dark:border-red-800 dark:from-red-900/20 dark:to-pink-900/20"
        >
          <div className="flex gap-3">
            <div className="mt-0.5 rounded-lg bg-gradient-to-br from-red-500 to-pink-500 p-2">
              <AlertCircle className="h-4 w-4 text-white" />
            </div>
            <div>
              <h4 className="mb-1 font-semibold text-red-900 dark:text-red-300">Invalid JSON Syntax</h4>
              <p className="text-sm text-red-700 dark:text-red-400">
                The JSON you entered contains syntax errors. Please check for missing commas, brackets, or quotes.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
