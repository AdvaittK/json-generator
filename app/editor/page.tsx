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
    <div className="min-h-screen">
      <EditorHero />
      <MainEditor />
      <EditorModes />
      <EditorTips />
    </div>
  )
} 