"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, ChevronUp, ChevronDown, Sparkles } from "lucide-react"
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
      <div className="pl-4 border-l-2 border-gray-200 dark:border-gray-700">
        {Object.keys(obj).map((key) => (
          <div key={key} className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Input value={key} onChange={(e) => updateKey(jsonData, key, e.target.value, path)} className="w-1/3" />
              <span className="text-gray-500">:</span>
              {renderValue(obj[key], [...path, key])}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeKeyValue(jsonData, key, path)}
                className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => addKeyValue(jsonData, path)} className="mt-2">
          <Plus className="mr-2 h-4 w-4" /> Add Property
        </Button>
      </div>
    )
  }

  // Recursive component to render an array
  const renderArray = (arr: unknown[], path: string[] = []) => {
    return (
      <div className="pl-4 border-l-2 border-gray-200 dark:border-gray-700">
        {arr.map((item, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-gray-500 w-8 text-right">[{index}]</span>
              {renderValue(item, [...path, index.toString()])}
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => moveArrayItemUp(jsonData, index, path)}
                  disabled={index === 0}
                  className="h-8 w-8"
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => moveArrayItemDown(jsonData, index, path)}
                  disabled={index === arr.length - 1}
                  className="h-8 w-8"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeArrayItem(jsonData, index, path)}
                  className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => addArrayItem(jsonData, path)} className="mt-2">
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
          <SelectTrigger className="w-[100px]">
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
            className="flex-1"
          />
        )}

        {type === "number" && (
          <Input
            type="number"
            value={typeof value === 'number' ? value : Number(value)}
            onChange={(e) => updateValue(jsonData, path[path.length - 1], e.target.value, "number", path.slice(0, -1))}
            className="flex-1"
          />
        )}

        {type === "boolean" && (
          <Select
            value={typeof value === 'boolean' ? value.toString() : 'false'}
            onValueChange={(newValue) =>
              updateValue(jsonData, path[path.length - 1], newValue, "boolean", path.slice(0, -1))
            }
          >
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Value" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">true</SelectItem>
              <SelectItem value="false">false</SelectItem>
            </SelectContent>
          </Select>
        )}

        {type === "null" && (
          <div className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-500">null</div>
        )}

        {type === "object" && (
          <Accordion type="single" collapsible className="flex-1">
            <AccordionItem value="item-1" className="border-0">
              <AccordionTrigger className="py-1 px-3 bg-gray-100 dark:bg-gray-800 rounded-md hover:no-underline">
                Object {typeof value === 'object' && value !== null ? `(${Object.keys(value).length} properties)` : "(empty)"}
              </AccordionTrigger>
              <AccordionContent>{typeof value === 'object' && value !== null ? renderObject(value, path) : null}</AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

        {type === "array" && (
          <Accordion type="single" collapsible className="flex-1">
            <AccordionItem value="item-1" className="border-0">
              <AccordionTrigger className="py-1 px-3 bg-gray-100 dark:bg-gray-800 rounded-md hover:no-underline">
                Array {Array.isArray(value) && value.length > 0 ? `(${value.length} items)` : "(empty)"}
              </AccordionTrigger>
              <AccordionContent>{Array.isArray(value) ? renderArray(value, path) : null}</AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </div>
    )
  }

  return (
    <div className="p-4 h-[500px] overflow-auto">
      {!isValid ? (
        <div className="flex items-center justify-center h-full">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center text-red-500">Invalid JSON</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center">
                Please fix the JSON errors in the Code Editor tab before using the Visual Builder.
              </p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <div className="mb-4 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">JSON Structure Builder</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Define JSON structure visually, then click &quot;Generate Data&quot; to fill it with realistic values.
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800 dark:hover:bg-purple-900/30"
              onClick={generateJson}
              disabled={isGenerating}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {isGenerating ? "Generating..." : "Generate Data"}
            </Button>
          </div>

          {Object.keys(jsonData).length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-gray-500 mb-2">Start by defining your JSON structure:</p>
              <p className="text-gray-500 mb-4 text-center text-sm max-w-md">
                1. Add properties and define their types<br/>
                2. Create the exact structure you need<br/>
                3. Click &quot;Generate Data&quot; to automatically fill with realistic values
              </p>
              <Button onClick={() => addKeyValue(jsonData)}>
                <Plus className="mr-2 h-4 w-4" /> Add Property
              </Button>
            </div>
          ) : (
            renderObject(jsonData)
          )}
        </motion.div>
      )}
    </div>
  )
}
