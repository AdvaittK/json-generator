"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, ChevronUp, ChevronDown, Sparkles, Loader2, XCircle, PanelLeft } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

interface VisualEditorProps {
  value: string
  onChange: (value: Record<string, unknown>) => void
  isValid: boolean
}

type JsonValueType = "string" | "number" | "boolean" | "object" | "array" | "null"

export default function VisualEditor({ value, onChange, isValid }: VisualEditorProps) {
  const { toast } = useToast()
  const [jsonData, setJsonData] = useState<Record<string, unknown>>({})
  const [isGenerating, setIsGenerating] = useState(false)

  // Parse JSON when value changes
  useEffect(() => {
    if (isValid) {
      try {
        const parsed = JSON.parse(value)
        // Only update if the JSON data is actually different to prevent infinite loops
        if (JSON.stringify(parsed) !== JSON.stringify(jsonData)) {
          setJsonData(parsed)
        }
      } catch (e) {
        // If there's an error, don't update
      }
    }
  }, [value, isValid])

  // Only update parent component when jsonData changes from user interactions
  // We skip this effect on the initial render and when the change was initiated from the parent
  const isInitialRender = useRef(true)
  const isParentUpdate = useRef(false)
  
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }
    
    if (!isParentUpdate.current) {
      onChange(jsonData)
    } else {
      isParentUpdate.current = false
    }
  }, [jsonData, onChange])
  
  // When value changes from parent, mark it as a parent update
  useEffect(() => {
    isParentUpdate.current = true
  }, [value])

  // Function to generate JSON using the AI
  const generateJson = async () => {
    // If we have existing JSON structure, use it as a template
    if (Object.keys(jsonData).length > 0) {
      setIsGenerating(true)
      
      try {
        // Create a specific prompt that instructs the AI to preserve the structure
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [
              {
                role: "user",
                content: `I have the following JSON structure:\n\`\`\`json\n${JSON.stringify(jsonData, null, 2)}\n\`\`\`\n\nPlease generate a new JSON that maintains this exact structure (same keys and hierarchy), but fill it with realistic sample data. Keep all the keys the same but update the values with realistic, appropriate data that matches the key names and value types.`
              }
            ]
          }),
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        
        const data = await response.json()
        
        // Extract JSON from the response if present
        const jsonMatch = data.message.match(/```json\n([\s\S]*?)\n```/)
        if (jsonMatch && jsonMatch[1]) {
          try {
            // Validate JSON before setting
            const parsed = JSON.parse(jsonMatch[1])
            onChange(parsed)
            setJsonData(parsed)
            
            toast({
              title: "JSON Generated",
              description: "Your JSON has been filled with data while preserving the structure.",
            })
          } catch (error) {
            toast({
              title: "Invalid JSON Generated",
              description: "The AI produced invalid JSON. Please try again.",
              variant: "destructive",
            })
          }
        } else {
          toast({
            title: "No JSON Found",
            description: "The AI didn't generate valid JSON.",
            variant: "destructive",
          })
        }
      } catch (error) {
        toast({
          title: "Generation Failed",
          description: "An error occurred while generating JSON.",
          variant: "destructive",
        })
      } finally {
        setIsGenerating(false)
      }
    } else {
      // If no structure exists, prompt to first define a structure
      toast({
        title: "No Structure Defined",
        description: "Please define a JSON structure first by adding properties.",
        variant: "destructive",
      })
    }
  }

  // Function to add a new key-value pair to an object
  const addKeyValue = (obj: any, path: string[] = []) => {
    const newKey = `newKey${Object.keys(obj).length + 1}`
    const newValue = ""

    // Create a deep copy of the object
    const newObj = JSON.parse(JSON.stringify(obj))

    // Navigate to the target object
    let target = newObj
    for (const key of path) {
      target = target[key]
    }

    // Add the new key-value pair
    target[newKey] = newValue

    setJsonData(newObj)
  }

  // Function to remove a key-value pair from an object
  const removeKeyValue = (obj: any, key: string, path: string[] = []) => {
    // Create a deep copy of the object
    const newObj = JSON.parse(JSON.stringify(obj))

    // Navigate to the target object
    let target = newObj
    for (const k of path) {
      target = target[k]
    }

    // Remove the key-value pair
    delete target[key]

    setJsonData(newObj)
  }

  // Function to update a key in an object
  const updateKey = (obj: any, oldKey: string, newKey: string, path: string[] = []) => {
    if (oldKey === newKey) return

    // Check if the new key already exists
    const target = path.reduce((acc, key) => acc[key], obj)
    if (target[newKey] !== undefined) {
      toast({
        title: "Key already exists",
        description: `The key "${newKey}" already exists in this object`,
        variant: "destructive",
      })
      return
    }

    // Create a deep copy of the object
    const newObj = JSON.parse(JSON.stringify(obj))

    // Navigate to the target object
    let targetObj = newObj
    for (const k of path) {
      targetObj = targetObj[k]
    }

    // Create a new object with the updated key
    const value = targetObj[oldKey]
    delete targetObj[oldKey]
    targetObj[newKey] = value

    setJsonData(newObj)
  }

  // Function to update a value in an object
  const updateValue = (obj: any, key: string, value: any, type: JsonValueType, path: string[] = []) => {
    // Create a deep copy of the object
    const newObj = JSON.parse(JSON.stringify(obj))

    // Navigate to the target object
    let target = newObj
    for (const k of path) {
      target = target[k]
    }

    // Convert the value based on the type
    let convertedValue
    switch (type) {
      case "string":
        convertedValue = String(value)
        break
      case "number":
        convertedValue = Number(value)
        break
      case "boolean":
        convertedValue = value === "true"
        break
      case "object":
        convertedValue = {}
        break
      case "array":
        convertedValue = []
        break
      case "null":
        convertedValue = null
        break
      default:
        convertedValue = value
    }

    // Update the value
    target[key] = convertedValue

    setJsonData(newObj)
  }

  // Function to add an item to an array
  const addArrayItem = (obj: any, path: string[] = []) => {
    // Create a deep copy of the object
    const newObj = JSON.parse(JSON.stringify(obj))

    // Navigate to the target array
    let target = newObj
    for (const key of path) {
      target = target[key]
    }

    // Add a new item to the array
    target.push("")

    setJsonData(newObj)
  }

  // Function to remove an item from an array
  const removeArrayItem = (obj: any, index: number, path: string[] = []) => {
    // Create a deep copy of the object
    const newObj = JSON.parse(JSON.stringify(obj))

    // Navigate to the target array
    let target = newObj
    for (const key of path) {
      target = target[key]
    }

    // Remove the item from the array
    target.splice(index, 1)

    setJsonData(newObj)
  }

  // Function to move an array item up
  const moveArrayItemUp = (obj: any, index: number, path: string[] = []) => {
    if (index === 0) return

    // Create a deep copy of the object
    const newObj = JSON.parse(JSON.stringify(obj))

    // Navigate to the target array
    let target = newObj
    for (const key of path) {
      target = target[key]
    }
    // Swap the item with the one above it
    ;[target[index], target[index - 1]] = [target[index - 1], target[index]]

    setJsonData(newObj)
  }

  // Function to move an array item down
  const moveArrayItemDown = (obj: any, index: number, path: string[] = []) => {
    // Create a deep copy of the object
    const newObj = JSON.parse(JSON.stringify(obj))

    // Navigate to the target array
    let target = newObj
    for (const key of path) {
      target = target[key]
    }

    if (index === target.length - 1) return // Swap the item with the one below it
    ;[target[index], target[index + 1]] = [target[index + 1], target[index]]

    setJsonData(newObj)
  }

  // Function to determine the type of a value
  const getValueType = (value: any): JsonValueType => {
    if (value === null) return "null"
    if (Array.isArray(value)) return "array"
    if (typeof value === "object") return "object"
    if (typeof value === "boolean") return "boolean"
    if (typeof value === "number") return "number"
    return "string"
  }

  // Recursive component to render an object
  const renderObject = (obj: any, path: string[] = []) => {
    return (
      <div className="space-y-2 pl-4 border-l-2 border-indigo-200 dark:border-indigo-800">
        {Object.keys(obj).map((key) => (
          <div key={key} className="mb-3">
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white/50 p-2 dark:border-gray-800 dark:bg-gray-950/50">
              <Input 
                value={key} 
                onChange={(e) => updateKey(jsonData, key, e.target.value, path)} 
                className="w-1/3 rounded-lg border-gray-200 dark:border-gray-800" 
              />
              <span className="font-semibold text-gray-500">:</span>
              {renderValue(obj[key], [...path, key])}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeKeyValue(jsonData, key, path)}
                className="h-9 w-9 shrink-0 rounded-lg text-red-500 transition-all hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-900/30"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => addKeyValue(jsonData, path)} 
          className="mt-2 h-10 rounded-lg border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 font-medium text-indigo-700 transition-all hover:border-indigo-300 hover:from-indigo-100 hover:to-purple-100 dark:border-indigo-800 dark:from-indigo-900/30 dark:to-purple-900/30 dark:text-indigo-400"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Property
        </Button>
      </div>
    )
  }

  // Recursive component to render an array
  const renderArray = (arr: unknown[], path: string[] = []) => {
    return (
      <div className="space-y-2 pl-4 border-l-2 border-purple-200 dark:border-purple-800">
        {arr.map((item, index) => (
          <div key={index} className="mb-3">
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white/50 p-2 dark:border-gray-800 dark:bg-gray-950/50">
              <span className="w-12 shrink-0 text-right font-mono text-sm font-semibold text-purple-600 dark:text-purple-400">[{index}]</span>
              {renderValue(item, [...path, index.toString()])}
              <div className="flex shrink-0 items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => moveArrayItemUp(jsonData, index, path)}
                  disabled={index === 0}
                  className="h-9 w-9 rounded-lg transition-all hover:bg-blue-100 disabled:opacity-30 dark:hover:bg-blue-900/30"
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => moveArrayItemDown(jsonData, index, path)}
                  disabled={index === arr.length - 1}
                  className="h-9 w-9 rounded-lg transition-all hover:bg-blue-100 disabled:opacity-30 dark:hover:bg-blue-900/30"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeArrayItem(jsonData, index, path)}
                  className="h-9 w-9 rounded-lg text-red-500 transition-all hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-900/30"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => addArrayItem(jsonData, path)} 
          className="mt-2 h-10 rounded-lg border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 font-medium text-purple-700 transition-all hover:border-purple-300 hover:from-purple-100 hover:to-pink-100 dark:border-purple-800 dark:from-purple-900/30 dark:to-pink-900/30 dark:text-purple-400"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Item
        </Button>
      </div>
    )
  }

  // Component to render a value based on its type
  const renderValue = (value: unknown, path: string[] = []) => {
    const type = getValueType(value)

    return (
      <div className="flex-1 flex items-center gap-2">
        <Select
          value={type}
          onValueChange={(newType) =>
            updateValue(jsonData, path[path.length - 1], value, newType as JsonValueType, path.slice(0, -1))
          }
        >
          <SelectTrigger className="w-[110px] rounded-lg border-gray-200 dark:border-gray-800">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="string">String</SelectItem>
            <SelectItem value="number">Number</SelectItem>
            <SelectItem value="boolean">Boolean</SelectItem>
            <SelectItem value="object">Object</SelectItem>
            <SelectItem value="array">Array</SelectItem>
            <SelectItem value="null">Null</SelectItem>
          </SelectContent>
        </Select>

        {type === "string" && (
          <Input
            value={typeof value === 'string' ? value : String(value)}
            onChange={(e) => updateValue(jsonData, path[path.length - 1], e.target.value, "string", path.slice(0, -1))}
            className="flex-1 rounded-lg border-gray-200 dark:border-gray-800"
          />
        )}

        {type === "number" && (
          <Input
            type="number"
            value={typeof value === 'number' ? value : Number(value)}
            onChange={(e) => updateValue(jsonData, path[path.length - 1], e.target.value, "number", path.slice(0, -1))}
            className="flex-1 rounded-lg border-gray-200 dark:border-gray-800"
          />
        )}

        {type === "boolean" && (
          <Select
            value={typeof value === 'boolean' ? value.toString() : 'false'}
            onValueChange={(newValue) =>
              updateValue(jsonData, path[path.length - 1], newValue, "boolean", path.slice(0, -1))
            }
          >
            <SelectTrigger className="flex-1 rounded-lg border-gray-200 dark:border-gray-800">
              <SelectValue placeholder="Value" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">true</SelectItem>
              <SelectItem value="false">false</SelectItem>
            </SelectContent>
          </Select>
        )}

        {type === "null" && (
          <div className="flex-1 px-4 py-2 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 font-mono text-sm text-gray-500">null</div>
        )}

        {type === "object" && (
          <Accordion type="single" collapsible className="flex-1">
            <AccordionItem value="item-1" className="border-0">
              <AccordionTrigger className="py-2 px-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg border border-indigo-200 dark:border-indigo-800 hover:no-underline font-medium text-indigo-700 dark:text-indigo-400">
                Object {typeof value === 'object' && value !== null ? `(${Object.keys(value).length} properties)` : "(empty)"}
              </AccordionTrigger>
              <AccordionContent className="pt-3">{typeof value === 'object' && value !== null ? renderObject(value, path) : null}</AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

        {type === "array" && (
          <Accordion type="single" collapsible className="flex-1">
            <AccordionItem value="item-1" className="border-0">
              <AccordionTrigger className="py-2 px-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg border border-purple-200 dark:border-purple-800 hover:no-underline font-medium text-purple-700 dark:text-purple-400">
                Array {Array.isArray(value) && value.length > 0 ? `(${value.length} items)` : "(empty)"}
              </AccordionTrigger>
              <AccordionContent className="pt-3">{Array.isArray(value) ? renderArray(value, path) : null}</AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </div>
    )
  }

  return (
    <div className="relative h-[600px] overflow-auto bg-gradient-to-br from-gray-50/30 to-white/30 p-6 dark:from-gray-950/30 dark:to-gray-900/30">
      {!isValid ? (
        <div className="flex h-full items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md"
          >
            <Card className="overflow-hidden rounded-2xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-pink-50 dark:border-red-800 dark:from-red-900/20 dark:to-pink-900/20">
              <CardHeader className="border-b border-red-200 bg-white/50 dark:border-red-800 dark:bg-gray-950/50">
                <CardTitle className="flex items-center gap-2 text-center text-red-600 dark:text-red-400">
                  <div className="rounded-lg bg-gradient-to-br from-red-500 to-pink-500 p-2">
                    <XCircle className="h-5 w-5 text-white" />
                  </div>
                  Invalid JSON
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-center text-gray-700 dark:text-gray-300">
                  Please fix the JSON errors in the Code Editor tab before using the Visual Builder.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          {/* Premium Header */}
          <div className="mb-6 flex flex-col gap-4 rounded-xl border border-indigo-200/50 bg-gradient-to-br from-indigo-50/50 to-white/50 p-5 backdrop-blur-sm dark:border-indigo-800/50 dark:from-indigo-950/20 dark:to-gray-900/50 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 p-2">
                <PanelLeft className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">JSON Structure Builder</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Define JSON structure visually, then click &quot;Generate Data&quot; to fill it with realistic values.
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-11 shrink-0 rounded-xl border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 px-5 font-semibold text-purple-700 transition-all hover:border-purple-300 hover:from-purple-100 hover:to-pink-100 hover:shadow-md dark:border-purple-800 dark:from-purple-900/30 dark:to-pink-900/30 dark:text-purple-400 dark:hover:border-purple-700"
              onClick={generateJson}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Data
                </>
              )}
            </Button>
          </div>

          {/* Content */}
          {Object.keys(jsonData).length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white/50 py-16 dark:border-gray-700 dark:bg-gray-950/50"
            >
              <div className="mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 p-4">
                <PanelLeft className="h-8 w-8 text-white" />
              </div>
              <p className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Start building your JSON</p>
              <p className="mb-6 max-w-md text-center text-sm text-gray-600 dark:text-gray-400">
                1. Add properties and define their types<br/>
                2. Create the exact structure you need<br/>
                3. Click &quot;Generate Data&quot; to automatically fill with realistic values
              </p>
              <Button 
                onClick={() => addKeyValue(jsonData)}
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 font-semibold text-white transition-all hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg hover:shadow-indigo-500/25"
              >
                <Plus className="mr-2 h-5 w-5" /> Add Property
              </Button>
            </motion.div>
          ) : (
            <div className="rounded-xl bg-white/50 p-4 dark:bg-gray-950/30">
              {renderObject(jsonData)}
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
