import { Metadata } from "next"
import EditorHero from "@/components/editor-hero"
import MainEditor from "@/components/main-editor"
import EditorModes from "@/components/editor-modes"
import EditorTips from "@/components/editor-tips"

export const metadata: Metadata = {
  title: "JSON Editor - JSON Generator",
  description: "Create, edit, and validate your JSON with our powerful editor",
}

export default function EditorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <EditorHero />
      <MainEditor />
      <EditorModes />
      <EditorTips />
    </div>
  )
} 