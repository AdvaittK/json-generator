"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import CodeEditor from "@/components/code-editor"
import VisualEditor from "@/components/visual-editor"
import AiAssistant from "@/components/ai-assistant"
import { Button } from "@/components/ui/button"
import { Download, Copy, Save, FileUp, Code, PanelLeft, MessageSquare, CheckCircle, XCircle, Sparkles, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { templates } from "@/lib/templates"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export default function MainEditor() {
  const { toast } = useToast()
  const [jsonValue, setJsonValue] = useState<string>(templates.user)
  const [isValid, setIsValid] = useState<boolean>(true)
  const [savedTemplates, setSavedTemplates] = useLocalStorage<Record<string, string>>("json-templates", {})
  const [aiPrompt, setAiPrompt] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [showApiKeyAlert, setShowApiKeyAlert] = useState<boolean>(true)

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

  // Generate JSON from AI prompt
  const generateJsonFromPrompt = async () => {
    if (!aiPrompt.trim()) {
      toast({
        title: "Empty Prompt",
        description: "Please enter a prompt to generate JSON data",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `Generate a comprehensive, well-structured JSON data for: ${aiPrompt}.
              
Important instructions:
1. Return ONLY valid JSON data enclosed in a code block
2. Include multiple detailed entries/items when applicable
3. Use realistic field names and appropriate data types
4. For location data, include coordinates and other relevant details
5. Include nested objects and arrays where appropriate for a rich data structure
6. Ensure the data is complete and could be used in a real application

Example prompt: "restaurants in Pune" should generate JSON with multiple restaurant entries, each with name, cuisine, address, coordinates, ratings, price range, opening hours, etc.`
            }
          ]
        }),
      })

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        
        // Check if it's an API key error
        if (errorData.details && errorData.details.includes("API Key")) {
          toast({
            title: "API Key Missing",
            description: "You need to add a Google Gemini API key in .env.local file. Get a key from https://makersuite.google.com/app/apikey",
            variant: "destructive",
          })
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return;
      }

      const data = await response.json()

      // Extract JSON from the response if present
      const jsonMatch = data.message.match(/```json\n([\s\S]*?)\n```/)
      if (jsonMatch && jsonMatch[1]) {
        try {
          // Validate JSON before setting
          const jsonData = jsonMatch[1]
          JSON.parse(jsonData) // Just to validate
          setJsonValue(jsonData)

          toast({
            title: "JSON Generated",
            description: "AI has generated JSON based on your prompt",
          })
        } catch (error) {
          toast({
            title: "Invalid JSON Generated",
            description: "The AI produced invalid JSON. Please try a different prompt.",
            variant: "destructive",
          })
        }
      } else {
        toast({
          title: "No JSON Found",
          description: "The AI didn't generate valid JSON. Try a more specific prompt.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "An error occurred while generating JSON",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
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
    <section className="w-full py-8 md:py-12">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-wrap gap-4 justify-between items-center">
            <div className="flex-1 min-w-[300px]">
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="w-[200px]">
                  <Select onValueChange={handleLoadTemplate}>
                    <SelectTrigger>
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
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={handleImport} className="h-10">
                    <FileUp className="mr-2 h-4 w-4" />
                    Import
                  </Button>

                  <Button variant="outline" size="sm" onClick={handleSaveTemplate} className="h-10">
                    <Save className="mr-2 h-4 w-4" />
                    Save Template
                  </Button>

                  <Button variant="outline" size="sm" onClick={handleCopy} className="h-10">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>

                  <Button variant="default" size="sm" onClick={handleDownload} className="h-10 bg-blue-600 hover:bg-blue-700">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* API Key Alert */}
      

          {/* AI Prompt Input Bar */}
          <div className="mb-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  placeholder="Enter prompt like 'restaurants in Pune', 'user profiles with addresses', 'product catalog for electronics'"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !isGenerating) {
                      generateJsonFromPrompt();
                    }
                  }}
                  className="pr-24"
                />
              </div>
              <Button 
                onClick={generateJsonFromPrompt} 
                disabled={isGenerating || !aiPrompt.trim()}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate JSON
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Press Enter or click Generate to create JSON based on your prompt
            </p>
          </div>

          <Card className="border-2 shadow-lg overflow-hidden">
            <Tabs defaultValue="code" className="w-full">
              <TabsList className="grid w-full grid-cols-3 rounded-none border-b">
                <TabsTrigger value="code" className="data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 font-medium">
                  <Code className="mr-2 h-4 w-4" />
                  Code Editor
                </TabsTrigger>
                <TabsTrigger value="visual" className="data-[state=active]:bg-indigo-50 dark:data-[state=active]:bg-indigo-900/20 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 font-medium">
                  <PanelLeft className="mr-2 h-4 w-4" />
                  Visual Builder
                </TabsTrigger>
                <TabsTrigger value="ai" className="data-[state=active]:bg-green-50 dark:data-[state=active]:bg-green-900/20 data-[state=active]:text-green-600 dark:data-[state=active]:text-green-400 font-medium">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  AI Assistant
                </TabsTrigger>
              </TabsList>
              <TabsContent value="code" className="p-0 border-0">
                <div className="relative">
                  <CodeEditor value={jsonValue} onChange={handleJsonChange} isValid={isValid} />
                </div>
              </TabsContent>
              <TabsContent value="visual" className="border-0">
                <VisualEditor value={jsonValue} onChange={handleVisualEditorChange} isValid={isValid} />
              </TabsContent>
              <TabsContent value="ai" className="border-0">
                <AiAssistant jsonValue={jsonValue} setJsonValue={setJsonValue} isValid={isValid} />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </section>
  )
}
