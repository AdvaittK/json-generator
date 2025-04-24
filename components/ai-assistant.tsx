"use client"

import { Label } from "@/components/ui/label"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Send, Bot, User, Key } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { useLocalStorage } from "@/hooks/use-local-storage"

interface AiAssistantProps {
  jsonValue: string
  setJsonValue: (value: string) => void
  isValid: boolean
}

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function AiAssistant({ jsonValue, setJsonValue, isValid }: AiAssistantProps) {
  const { toast } = useToast()
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your JSON assistant. I can help you generate, fix, or explain JSON. What would you like to do today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [apiKey, setApiKey] = useLocalStorage<string>("openai-api-key", "")
  const [showApiKeyInput, setShowApiKeyInput] = useState(false)
  const [tempApiKey, setTempApiKey] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Function to handle sending a message
  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Check if API key is set
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please set your OpenAI API key to use the AI assistant.",
        variant: "destructive",
      })
      setShowApiKeyInput(true)
      return
    }

    const userMessage = input
    setInput("")

    // Add user message to chat
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])

    setIsLoading(true)

    try {
      // In a real implementation, this would call the OpenAI API
      // For this demo, we'll simulate a response
      setTimeout(() => {
        let assistantResponse = ""

        // Simple response logic based on user input
        if (userMessage.toLowerCase().includes("generate") || userMessage.toLowerCase().includes("create")) {
          if (userMessage.toLowerCase().includes("user")) {
            assistantResponse = `Here's a JSON structure for a user profile:
\`\`\`json
{
  "user": {
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30,
    "isActive": true,
    "roles": ["admin", "editor"],
    "address": {
      "street": "123 Main St",
      "city": "Anytown",
      "zipCode": "12345"
    }
  }
}
\`\`\`
You can copy this to the editor or I can help you customize it further.`
          } else if (userMessage.toLowerCase().includes("product")) {
            assistantResponse = `Here's a JSON structure for a product:
\`\`\`json
{
  "product": {
    "id": "p123",
    "name": "Wireless Headphones",
    "price": 99.99,
    "inStock": true,
    "categories": ["electronics", "audio"],
    "specs": {
      "color": "black",
      "weight": "250g",
      "wireless": true,
      "batteryLife": "20 hours"
    },
    "reviews": [
      {
        "user": "user123",
        "rating": 4.5,
        "comment": "Great sound quality!"
      }
    ]
  }
}
\`\`\`
Would you like to modify any part of this structure?`
          } else {
            assistantResponse = `I'd be happy to generate some JSON for you. Could you provide more details about what kind of JSON structure you need? For example:
- User profile
- Product information
- API response
- Configuration file
- Or something else?`
          }
        } else if (userMessage.toLowerCase().includes("fix") || userMessage.toLowerCase().includes("validate")) {
          if (!isValid) {
            assistantResponse = `I noticed your JSON has some syntax errors. Here are some common issues to check:
1. Missing or extra commas between properties
2. Unclosed brackets or braces
3. Missing quotes around property names
4. Trailing commas at the end of objects or arrays

Would you like me to try to fix your JSON?`
          } else {
            assistantResponse =
              "Your JSON looks valid! Is there anything specific you'd like to modify or improve about it?"
          }
        } else if (userMessage.toLowerCase().includes("explain")) {
          assistantResponse = `JSON (JavaScript Object Notation) is a lightweight data interchange format that's easy for humans to read and write and easy for machines to parse and generate.

Key characteristics of JSON:
- Data is in name/value pairs
- Data is separated by commas
- Curly braces hold objects
- Square brackets hold arrays
- Values can be strings, numbers, objects, arrays, booleans, or null

Would you like me to explain any specific part of your JSON structure?`
        } else {
          assistantResponse =
            "I'm here to help with your JSON needs. I can generate JSON structures, fix syntax errors, or explain JSON concepts. What would you like assistance with?"
        }

        setMessages((prev) => [...prev, { role: "assistant", content: assistantResponse }])
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Error sending message:", error)
      toast({
        title: "Error",
        description: "Failed to get a response from the AI assistant.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  // Function to handle saving API key
  const handleSaveApiKey = () => {
    setApiKey(tempApiKey)
    setShowApiKeyInput(false)
    setTempApiKey("")
    toast({
      title: "API Key Saved",
      description: "Your OpenAI API key has been saved.",
    })
  }

  // Function to apply JSON from chat
  const applyJsonFromMessage = (message: string) => {
    // Extract JSON from message (between ```json and ```)
    const jsonMatch = message.match(/```json\n([\s\S]*?)\n```/)
    if (jsonMatch && jsonMatch[1]) {
      try {
        // Validate the JSON
        const parsed = JSON.parse(jsonMatch[1])
        const formatted = JSON.stringify(parsed, null, 2)
        setJsonValue(formatted)
        toast({
          title: "JSON Applied",
          description: "The JSON from the chat has been applied to the editor.",
        })
      } catch (e) {
        toast({
          title: "Invalid JSON",
          description: "The JSON in the message could not be parsed.",
          variant: "destructive",
        })
      }
    } else {
      toast({
        title: "No JSON Found",
        description: "No valid JSON block was found in the message.",
        variant: "destructive",
      })
    }
  }

  // Function to handle quick prompts
  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt)
  }

  return (
    <div className="flex flex-col h-[500px]">
      <Tabs defaultValue="chat" className="flex-1 flex flex-col">
        <div className="px-4 py-2 border-b">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="chat" className="flex-1 flex flex-col p-0 m-0">
          <div className="flex-1 overflow-auto p-4">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 mb-4 ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.role === "assistant" ? "bg-muted" : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">
                      {message.content.split("```").map((part, i) => {
                        if (i % 2 === 0) {
                          return <span key={i}>{part}</span>
                        } else {
                          const [language, ...codeParts] = part.split("\n")
                          const code = codeParts.join("\n")
                          return (
                            <div key={i} className="my-2">
                              <div className="bg-gray-800 text-gray-200 p-3 rounded-t-md flex justify-between items-center text-xs">
                                <span>{language}</span>
                                {language === "json" && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 text-xs"
                                    onClick={() => applyJsonFromMessage(message.content)}
                                  >
                                    Apply to Editor
                                  </Button>
                                )}
                              </div>
                              <pre className="bg-gray-900 text-gray-200 p-3 rounded-b-md overflow-x-auto">
                                <code>{code}</code>
                              </pre>
                            </div>
                          )
                        }
                      })}
                    </div>
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <User className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
              {isLoading && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="rounded-lg px-4 py-2 bg-muted">
                    <div className="flex space-x-2">
                      <div
                        className="w-2 h-2 rounded-full bg-primary animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-primary animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-primary animate-bounce"
                        style={{ animationDelay: "600ms" }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </AnimatePresence>
          </div>

          <div className="p-4 border-t">
            <div className="mb-2 flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-primary/10"
                onClick={() => handleQuickPrompt("Generate a user profile JSON")}
              >
                Generate user profile
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-primary/10"
                onClick={() => handleQuickPrompt("Fix my JSON")}
              >
                Fix my JSON
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-primary/10"
                onClick={() => handleQuickPrompt("Explain JSON structure")}
              >
                Explain JSON
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-primary/10"
                onClick={() => handleQuickPrompt("Generate a product catalog JSON")}
              >
                Product catalog
              </Badge>
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Ask the AI assistant..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
              />
              <Button onClick={handleSendMessage} disabled={isLoading || !input.trim()} className="shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="flex-1 p-4 m-0">
          <Card>
            <CardHeader>
              <CardTitle>AI Assistant Settings</CardTitle>
              <CardDescription>Configure your OpenAI API key to use the AI assistant.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-key">OpenAI API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="api-key"
                      type="password"
                      placeholder="Enter your OpenAI API key"
                      value={tempApiKey}
                      onChange={(e) => setTempApiKey(e.target.value)}
                    />
                    <Button onClick={handleSaveApiKey} disabled={!tempApiKey}>
                      Save
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500">Your API key is stored locally and never sent to our servers.</p>
                </div>

                {apiKey && (
                  <Alert className="bg-green-50 dark:bg-green-900/20">
                    <Key className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <AlertTitle>API Key Set</AlertTitle>
                    <AlertDescription>Your OpenAI API key is set and ready to use.</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">About the AI Assistant</h3>
                  <p className="text-sm text-gray-500">
                    The AI assistant uses OpenAI's GPT-4 model to help you with JSON generation, validation, and more.
                    Your conversations are not stored on our servers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
