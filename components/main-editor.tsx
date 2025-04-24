"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import CodeEditor from "@/components/code-editor"
import VisualEditor from "@/components/visual-editor"
import AiAssistant from "@/components/ai-assistant"
import { Button } from "@/components/ui/button"
import { Download, Copy, Save, FileUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { templates } from "@/lib/templates"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MainEditor() {
  const { toast } = useToast()
  const [jsonValue, setJsonValue] = useState<string>(templates.user)
  const [isValid, setIsValid] = useState<boolean>(true)
  const [savedTemplates, setSavedTemplates] = useLocalStorage<Record<string, string>>("json-templates", {})

  // Function to validate JSON
  const validateJson = (json: string): boolean => {
    try {
      JSON.parse(json)
      return true
    } catch (e) {
      return false
    }
  }

  // Update validation status when JSON changes
  useEffect(() => {
    setIsValid(validateJson(jsonValue))
  }, [jsonValue])

  // Handle JSON changes from code editor
  const handleJsonChange = (value: string) => {
    setJsonValue(value)
  }

  // Handle JSON changes from visual editor
  const handleVisualEditorChange = (value: any) => {
    try {
      const formatted = JSON.stringify(value, null, 2)
      setJsonValue(formatted)
    } catch (e) {
      // If there's an error, don't update
    }
  }

  // Copy JSON to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(jsonValue)
    toast({
      title: "Copied to clipboard",
      description: "JSON has been copied to your clipboard",
    })
  }

  // Download JSON file
  const handleDownload = () => {
    if (!isValid) {
      toast({
        title: "Invalid JSON",
        description: "Please fix the JSON errors before downloading",
        variant: "destructive",
      })
      return
    }

    const blob = new Blob([jsonValue], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "data.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Downloaded",
      description: "JSON file has been downloaded",
    })
  }

  // Save current JSON as template
  const handleSaveTemplate = () => {
    if (!isValid) {
      toast({
        title: "Invalid JSON",
        description: "Please fix the JSON errors before saving as template",
        variant: "destructive",
      })
      return
    }

    const templateName = prompt("Enter a name for this template:")
    if (templateName) {
      const newTemplates = {
        ...savedTemplates,
        [templateName]: jsonValue,
      }
      setSavedTemplates(newTemplates)
      toast({
        title: "Template saved",
        description: `Template "${templateName}" has been saved`,
      })
    }
  }

  // Load template
  const handleLoadTemplate = (value: string) => {
    if (value === "default") return

    if (value.startsWith("builtin:")) {
      const templateKey = value.replace("builtin:", "")
      setJsonValue(templates[templateKey as keyof typeof templates])
    } else {
      setJsonValue(savedTemplates[value])
    }

    toast({
      title: "Template loaded",
      description: `Template has been loaded into the editor`,
    })
  }

  // Import JSON file
  const handleImport = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".json"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const content = event.target?.result as string
          try {
            // Validate and format the JSON
            const parsed = JSON.parse(content)
            const formatted = JSON.stringify(parsed, null, 2)
            setJsonValue(formatted)
            toast({
              title: "File imported",
              description: "JSON file has been imported successfully",
            })
          } catch (error) {
            toast({
              title: "Invalid JSON file",
              description: "The selected file does not contain valid JSON",
              variant: "destructive",
            })
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  return (
    <section id="editor" className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">JSON Generator & Editor</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Create, edit, and validate your JSON with our powerful tools
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <div className="flex-1 min-w-[300px]">
            <div className="flex flex-wrap gap-2 mb-4">
              <Select onValueChange={handleLoadTemplate}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Load template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Select a template</SelectItem>
                  <SelectItem value="builtin:user">User Profile</SelectItem>
                  <SelectItem value="builtin:product">Product</SelectItem>
                  <SelectItem value="builtin:apiResponse">API Response</SelectItem>
                  {Object.keys(savedTemplates).map((key) => (
                    <SelectItem key={key} value={key}>
                      {key}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={handleImport}>
                <FileUp className="mr-2 h-4 w-4" />
                Import
              </Button>

              <Button variant="outline" onClick={handleSaveTemplate}>
                <Save className="mr-2 h-4 w-4" />
                Save Template
              </Button>

              <Button variant="outline" onClick={handleCopy}>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>

              <Button variant="default" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        </div>

        <Card className="mt-4">
          <Tabs defaultValue="code" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="code">Code Editor</TabsTrigger>
              <TabsTrigger value="visual">Visual Builder</TabsTrigger>
              <TabsTrigger value="ai">AI Assistant</TabsTrigger>
            </TabsList>
            <TabsContent value="code" className="p-0">
              <CodeEditor value={jsonValue} onChange={handleJsonChange} isValid={isValid} />
            </TabsContent>
            <TabsContent value="visual">
              <VisualEditor value={jsonValue} onChange={handleVisualEditorChange} isValid={isValid} />
            </TabsContent>
            <TabsContent value="ai">
              <AiAssistant jsonValue={jsonValue} setJsonValue={setJsonValue} isValid={isValid} />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </section>
  )
}
