"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Send, Bot, User, Key, CornerDownLeft, Loader2, Shield, MessageSquare, CheckCircle, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"

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
      content: "Hello! I&apos;m your JSON assistant. How can I help you today? I can generate JSON, fix errors, or explain JSON concepts.",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  // Reset copied state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false)
      }, 2000)
      return () => clearTimeout(timeout)
    }
  }, [copied])

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

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Add user message to the chat
    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      console.log("Sending request to /api/chat")
      console.log("Request payload:", { 
        messages: [...messages, userMessage],
        jsonContext: jsonValue 
      })
      
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          messages: [...messages, userMessage],
          jsonContext: jsonValue 
        }),
      })

      if (!response.ok) {
        console.error("API response not OK:", response.status, response.statusText)
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("API response data:", data)
      
      // Add assistant message to the chat
      setMessages((prev) => [...prev, { role: "assistant", content: data.message }])
      
      // Extract JSON from the response if present
      const jsonMatch = data.message.match(/```json\n([\s\S]*?)\n```/)
      if (jsonMatch && jsonMatch[1]) {
        try {
          // Validate JSON before setting
          JSON.parse(jsonMatch[1])
          
          // Show a toast with a button to apply the JSON
          toast({
            title: "JSON Generated",
            description: "Would you like to apply this JSON to the editor?",
            action: (
              <Button variant="outline" size="sm" onClick={() => setJsonValue(jsonMatch[1])}>
                Apply to Editor
              </Button>
            ),
          })
        } catch (error) {
          // If invalid JSON, just show in the chat without offering to apply
          console.error("Invalid JSON in response:", error)
        }
      }
    } catch (error) {
      console.error("Error:", error)
      
      // Add error message to the chat
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error processing your request. Please try again later.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleCopyResponse = (content: string) => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: "Response has been copied to your clipboard",
    })
  }

  // Extract JSON from message if present
  const extractAndApplyJson = (content: string) => {
    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/)
    if (jsonMatch && jsonMatch[1]) {
      try {
        // Validate JSON before setting
        JSON.parse(jsonMatch[1])
        setJsonValue(jsonMatch[1])
        toast({
          title: "JSON Applied",
          description: "The JSON has been applied to the editor",
        })
      } catch {
        toast({
          title: "Invalid JSON",
          description: "The extracted JSON is not valid",
          variant: "destructive",
        })
      }
    }
  }

  // Helper function for formatting message content with syntax highlighting (not used currently)
  /* 
  const formatMessageContent = (content: string) => {
    // Replace code blocks with highlighted syntax
    return content.replace(
      /```(json)?\n([\s\S]*?)\n```/g,
      '<pre class="bg-gray-100 dark:bg-gray-800 p-3 rounded-md overflow-x-auto my-2"><code class="text-sm font-mono">$2</code></pre>'
    )
  }
  */

  // Function to handle quick prompts
  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt)
  }

  return (
    <div className="flex flex-col h-[600px] max-h-[80vh] overflow-hidden relative bg-gradient-to-br from-gray-50/30 to-white/30 dark:from-gray-950/30 dark:to-gray-900/30">
      <Tabs defaultValue="chat" className="flex-1 flex flex-col h-full">
        <div className="px-4 py-3 border-b border-gray-200/80 bg-white/80 backdrop-blur-sm sticky top-0 z-10 dark:border-gray-800/80 dark:bg-gray-900/80">
          <TabsList className="grid w-full grid-cols-2 h-11 rounded-xl bg-gray-100/80 p-1 dark:bg-gray-800/80">
            <TabsTrigger value="chat" className="rounded-lg font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-950">
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="settings" className="rounded-lg font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-950">
              <Key className="mr-2 h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="chat" className="flex-1 flex flex-col p-0 m-0 h-full overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 h-full" ref={messagesContainerRef}>
            <AnimatePresence mode="sync">
              {messages.map((message, index) => (
                <motion.div
                  key={`message-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 mb-6 ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                >
                  {message.role === "assistant" && (
                    <div className="mt-1 shrink-0">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-md">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-5 py-3 max-w-[85%] shadow-sm ${
                      message.role === "assistant" 
                        ? "bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-800" 
                        : "bg-gradient-to-br from-blue-600 to-cyan-600 text-white"
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-[15px] leading-relaxed">
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
                            <div key={uniqueKey} className="my-3 overflow-hidden rounded-xl border border-gray-700">
                              <div className="bg-gray-800 text-gray-300 px-4 py-2.5 flex justify-between items-center text-xs font-medium">
                                <span className="flex items-center gap-2">
                                  <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                                  </div>
                                  {language}
                                </span>
                                {language === "json" && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 rounded-lg px-3 text-xs font-medium hover:bg-gray-700"
                                    onClick={() => extractAndApplyJson(message.content)}
                                  >
                                    Apply to Editor
                                  </Button>
                                )}
                              </div>
                              <pre className="bg-gray-950 text-gray-200 p-4 overflow-x-auto">
                                <code className="text-sm font-mono leading-relaxed">{codeContent}</code>
                              </pre>
                            </div>
                          )
                        }
                      })}
                    </div>
                  </div>
                  {message.role === "user" && (
                    <div className="mt-1 shrink-0">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-md">
                        <User className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="border-t border-gray-200/80 bg-white/80 p-4 backdrop-blur-sm dark:border-gray-800/80 dark:bg-gray-900/80">
            <div className="mb-3 flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="cursor-pointer rounded-lg border-gray-200 bg-white px-3 py-1.5 text-xs font-medium transition-all hover:border-green-300 hover:bg-green-50 hover:text-green-700 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-green-700 dark:hover:bg-green-900/20 dark:hover:text-green-400"
                onClick={() => handleQuickPrompt("Generate a user profile JSON")}
              >
                Generate user profile
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer rounded-lg border-gray-200 bg-white px-3 py-1.5 text-xs font-medium transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                onClick={() => handleQuickPrompt("Fix my JSON")}
              >
                Fix my JSON
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer rounded-lg border-gray-200 bg-white px-3 py-1.5 text-xs font-medium transition-all hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-purple-700 dark:hover:bg-purple-900/20 dark:hover:text-purple-400"
                onClick={() => handleQuickPrompt("Explain JSON structure")}
              >
                Explain JSON
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer rounded-lg border-gray-200 bg-white px-3 py-1.5 text-xs font-medium transition-all hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-orange-700 dark:hover:bg-orange-900/20 dark:hover:text-orange-400"
                onClick={() => handleQuickPrompt("Generate a product catalog JSON")}
              >
                Product catalog
              </Badge>
            </div>

            <div className="flex gap-3">
              <div className="relative flex-1">
                <Textarea
                  placeholder={isValid ? "Ask about JSON or request generation..." : "Please fix JSON errors in the editor first..."}
                  className="min-h-[90px] resize-none rounded-xl border-gray-200 bg-white pr-12 text-base shadow-sm placeholder:text-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-100 dark:border-gray-800 dark:bg-gray-950 dark:focus:border-green-600 dark:focus:ring-green-900/50"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading || !isValid}
                />
                <div className="absolute bottom-3 right-3 text-gray-400">
                  <CornerDownLeft className="h-4 w-4" />
                </div>
              </div>
              <Button
                className="h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 p-0 shadow-md transition-all hover:from-green-700 hover:to-emerald-700 hover:shadow-lg hover:shadow-green-500/25"
                disabled={isLoading || !input.trim() || !isValid}
                onClick={handleSendMessage}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin text-white" />
                ) : (
                  <Send className="h-5 w-5 text-white" />
                )}
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="flex-1 p-6 m-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden rounded-2xl border-2 border-gray-200/80 shadow-lg dark:border-gray-800/80">
              <CardHeader className="border-b border-gray-200 bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:border-gray-800 dark:from-green-900/20 dark:to-emerald-900/20">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 p-3">
                    <Key className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">AI Assistant Settings</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">Information about the AI assistant</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <Alert className="rounded-xl border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 dark:border-green-800 dark:from-green-900/20 dark:to-emerald-900/20">
                    <div className="flex gap-3">
                      <div className="mt-0.5 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 p-2">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <AlertTitle className="mb-1 font-semibold text-green-900 dark:text-green-300">Server-Side Integration</AlertTitle>
                        <AlertDescription className="text-sm text-green-700 dark:text-green-400">
                          The AI assistant is connected to Google Gemini API using your personal API key via secure server-side API calls.
                        </AlertDescription>
                      </div>
                    </div>
                  </Alert>

                  <div className="space-y-3 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-5 dark:border-gray-800 dark:from-gray-900 dark:to-gray-950">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">About the AI Assistant</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                      The AI assistant uses Google's <span className="font-semibold text-purple-600 dark:text-purple-400">Gemini 2.5 Flash</span> model to help you with JSON generation, validation, and more.
                      Your conversations are processed securely on the server without exposing your API key to the client.
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-4 dark:border-blue-800 dark:from-blue-900/20 dark:to-cyan-900/20">
                      <div className="mb-2 flex items-center gap-2">
                        <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <h4 className="font-semibold text-blue-900 dark:text-blue-300">AI Model</h4>
                      </div>
                      <p className="text-sm text-blue-700 dark:text-blue-400">Gemini 2.5 Flash</p>
                    </div>
                    <div className="rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 p-4 dark:border-emerald-800 dark:from-emerald-900/20 dark:to-green-900/20">
                      <div className="mb-2 flex items-center gap-2">
                        <Shield className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        <h4 className="font-semibold text-emerald-900 dark:text-emerald-300">Security</h4>
                      </div>
                      <p className="text-sm text-emerald-700 dark:text-emerald-400">Server-side processing</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
