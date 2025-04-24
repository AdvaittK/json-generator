"use client"

import { useEffect, useRef } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

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
    <div className="relative">
      <div className="absolute right-4 top-4 z-10 flex gap-2">
        {isValid ? (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
          >
            Valid JSON
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
          >
            Invalid JSON
          </Badge>
        )}
      </div>

      <MonacoEditor
        height="500px"
        language="json"
        theme="vs-dark"
        value={value}
        onChange={(value) => onChange(value || "")}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: "on",
          formatOnPaste: true,
          formatOnType: true,
          automaticLayout: true,
        }}
      />

      {!isValid && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Invalid JSON</AlertTitle>
            <AlertDescription>
              The JSON you entered contains syntax errors. Please check for missing commas, brackets, or quotes.
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
    </div>
  )
}
