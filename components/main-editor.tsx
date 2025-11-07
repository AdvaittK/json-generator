"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import CodeEditor from "@/components/code-editor"
import VisualEditor from "@/components/visual-editor"
import AiAssistant from "@/components/ai-assistant"
import { Button } from "@/components/ui/button"
import { Download, Copy, Save, FileUp, Code, PanelLeft, MessageSquare, CheckCircle, XCircle, Sparkles, Loader2, FileJson } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { templates } from "@/lib/templates"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

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
    <section className="relative w-full overflow-hidden py-12 md:py-16">
      <div className="container relative mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-7xl"
        >
          {/* Premium Toolbar */}
          <div className="mb-6 rounded-2xl border border-gray-200/80 bg-white/80 p-4 backdrop-blur-sm dark:border-gray-800/80 dark:bg-gray-900/80 md:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* Left side - Template selector */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-white px-3 py-1.5 text-sm font-medium text-gray-700 dark:border-gray-800 dark:from-gray-900 dark:to-gray-950 dark:text-gray-300">
                  <FileJson className="h-3.5 w-3.5" />
                  <span>Template</span>
                </div>
                <Select onValueChange={handleLoadTemplate}>
                  <SelectTrigger className="h-10 w-[200px] rounded-xl border-gray-200 bg-white transition-all hover:border-gray-300 dark:border-gray-800 dark:bg-gray-950">
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

              {/* Right side - Action buttons */}
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleImport} 
                  className="h-10 rounded-xl border-gray-200 bg-white transition-all hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-900"
                >
                  <FileUp className="mr-2 h-4 w-4" />
                  Import
                </Button>

                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSaveTemplate} 
                  className="h-10 rounded-xl border-gray-200 bg-white transition-all hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-900"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>

                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleCopy} 
                  className="h-10 rounded-xl border-gray-200 bg-white transition-all hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-900"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>

                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={handleDownload} 
                  className="h-10 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white transition-all hover:from-blue-700 hover:to-cyan-700 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          </div>

          {/* Premium AI Prompt Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 overflow-hidden rounded-2xl border border-purple-200/50 bg-gradient-to-br from-purple-50/50 to-white/50 p-5 backdrop-blur-sm dark:border-purple-800/50 dark:from-purple-950/20 dark:to-gray-900/50"
          >
            <div className="mb-3 flex items-center gap-2">
              <div className="rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-2">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">AI Generation</h3>
            </div>
            
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Input
                  placeholder="Describe your JSON data: 'restaurants in Pune', 'user profiles', 'product catalog'..."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !isGenerating) {
                      generateJsonFromPrompt();
                    }
                  }}
                  className="h-12 rounded-xl border-purple-200 bg-white/80 pr-24 text-base shadow-sm transition-all placeholder:text-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 dark:border-purple-800 dark:bg-gray-950/50 dark:focus:border-purple-600 dark:focus:ring-purple-900/50"
                />
              </div>
              <Button 
                onClick={generateJsonFromPrompt} 
                disabled={isGenerating || !aiPrompt.trim()}
                className="h-12 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 text-base font-medium text-white transition-all hover:from-purple-700 hover:to-pink-700 hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate
                  </>
                )}
              </Button>
            </div>
            <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
              Press <kbd className="rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold dark:bg-gray-800">Enter</kbd> to generate
            </p>
          </motion.div>

          {/* Premium Editor Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="overflow-hidden rounded-2xl border-2 border-gray-200/80 bg-white shadow-xl dark:border-gray-800/80 dark:bg-gray-900">
              <Tabs defaultValue="code" className="w-full">
                <TabsList className="grid h-14 w-full grid-cols-3 rounded-none border-b border-gray-200/80 bg-gray-50/50 p-1 dark:border-gray-800/80 dark:bg-gray-900/50">
                  <TabsTrigger 
                    value="code" 
                    className="group relative rounded-lg font-medium transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-950"
                  >
                    <Code className="mr-2 h-4 w-4 transition-colors group-data-[state=active]:text-blue-600 dark:group-data-[state=active]:text-blue-400" />
                    <span className="transition-colors group-data-[state=active]:text-blue-600 dark:group-data-[state=active]:text-blue-400">
                      Code Editor
                    </span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="visual" 
                    className="group relative rounded-lg font-medium transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-950"
                  >
                    <PanelLeft className="mr-2 h-4 w-4 transition-colors group-data-[state=active]:text-indigo-600 dark:group-data-[state=active]:text-indigo-400" />
                    <span className="transition-colors group-data-[state=active]:text-indigo-600 dark:group-data-[state=active]:text-indigo-400">
                      Visual Builder
                    </span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="ai" 
                    className="group relative rounded-lg font-medium transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-950"
                  >
                    <MessageSquare className="mr-2 h-4 w-4 transition-colors group-data-[state=active]:text-green-600 dark:group-data-[state=active]:text-green-400" />
                    <span className="transition-colors group-data-[state=active]:text-green-600 dark:group-data-[state=active]:text-green-400">
                      AI Assistant
                    </span>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="code" className="border-0 p-0">
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
