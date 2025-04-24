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
  // No longer need API key state as it's now server-side
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  // Scroll chat container to bottom when messages change - contained scroll only
  useEffect(() => {
    if (messagesContainerRef.current) {
      // Use setTimeout to ensure the DOM has updated before scrolling
      setTimeout(() => {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
        }
      }, 100)
    }
  }, [messages])

  // Function to handle sending a message
  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage = input
    setInput("")

    // Add user message to chat
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])

    setIsLoading(true)

    try {
      // Prepare messages for API - include conversation history for context
      const messageHistory = [...messages, { role: "user", content: userMessage }];

      // Call our server-side API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messageHistory,
          jsonContext: isValid ? jsonValue : undefined // Optionally send current JSON for context
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get a response');
      }

      const data = await response.json();
      const assistantResponse = data.message;

      setMessages((prev) => [...prev, { role: "assistant", content: assistantResponse }]);
      
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get a response from the AI assistant.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  // No API key handling needed with server-side implementation

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
    <div className="flex flex-col h-[600px] max-h-[80vh] overflow-hidden relative">
      <Tabs defaultValue="chat" className="flex-1 flex flex-col h-full">
        <div className="px-4 py-2 border-b sticky top-0 bg-background z-10">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="chat" className="flex-1 flex flex-col p-0 m-0 h-full overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 h-full" ref={messagesContainerRef}>
            <AnimatePresence mode="sync">
              {messages.map((message, index) => (
                <motion.div
                  key={`message-${index}`}
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
                        // Generate a truly unique key for each part
                        const uniqueKey = `${message.role}-${index}-part-${i}-${part.length}`;
                        
                        // Code blocks are at odd indices after splitting by ```
                        if (i % 2 === 0) {
                          // Only render non-empty text parts
                          return part.trim() ? <span key={uniqueKey}>{part}</span> : null;
                        } else {
                          // Process code blocks
                          // Get the first line as the language and the rest as code content
                          const lines = part.trim().split("\n");
                          
                          // Default to "text" if no language is specified
                          const language = (lines.length > 0 && lines[0].trim()) || "text";
                          
                          // If there's more than one line, the rest is the code content
                          // Otherwise, use the whole part as content (with empty language)
                          const codeContent = lines.length > 1 
                            ? lines.slice(1).join("\n") 
                            : part.trim();
                          
                          // Only render if we actually have content
                          if (!codeContent.trim()) {
                            return null;
                          }
                          
                          return (
                            <div key={uniqueKey} className="my-2">
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
                                <code>{codeContent}</code>
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
              {/* Loading state is now handled by disabling the input and button */}
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
                disabled={isLoading}
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={isLoading || !input.trim()} 
                className="shrink-0"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="flex-1 p-4 m-0">
          <Card>
            <CardHeader>
              <CardTitle>AI Assistant Settings</CardTitle>
              <CardDescription>Information about the AI assistant.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert className="bg-green-50 dark:bg-green-900/20">
                  <Key className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <AlertTitle>Server-Side Integration</AlertTitle>
                  <AlertDescription>The AI assistant is connected to Hugging Face via secure server-side API calls.</AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">About the AI Assistant</h3>
                  <p className="text-sm text-gray-500">
                    The AI assistant uses Hugging Face's language models to help you with JSON generation, validation, and more.
                    Your conversations are processed securely on the server.
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
