"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    return (
      <Button 
        variant="ghost" 
        size="icon"
        className="relative h-10 w-10 rounded-xl border border-gray-200/50 bg-gradient-to-br from-gray-50 to-white backdrop-blur-sm dark:border-gray-800/50 dark:from-gray-900 dark:to-gray-950"
      >
        <div className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <Button 
      variant="ghost" 
      size="icon"
      onClick={toggleTheme}
      className="group relative h-10 w-10 overflow-hidden rounded-xl border border-gray-200/50 bg-gradient-to-br from-gray-50 to-white backdrop-blur-sm transition-all hover:scale-105 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/50 dark:border-gray-800/50 dark:from-gray-900 dark:to-gray-950 dark:hover:border-gray-700 dark:hover:shadow-blue-500/20"
    >
      <motion.div
        className="relative flex h-full w-full items-center justify-center"
        initial={false}
      >
        {/* Light mode icon */}
        <motion.div
          className="absolute"
          initial={false}
          animate={{
            scale: theme === "dark" ? 0 : 1,
            rotate: theme === "dark" ? 90 : 0,
            opacity: theme === "dark" ? 0 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Sun className="h-5 w-5 text-amber-500" />
        </motion.div>

        {/* Dark mode icon */}
        <motion.div
          className="absolute"
          initial={false}
          animate={{
            scale: theme === "dark" ? 1 : 0,
            rotate: theme === "dark" ? 0 : -90,
            opacity: theme === "dark" ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Moon className="h-5 w-5 text-blue-500" />
        </motion.div>
      </motion.div>
      
      {/* Glow effect on hover */}
      <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-amber-400/0 to-blue-500/0 opacity-0 transition-opacity group-hover:from-amber-400/10 group-hover:to-blue-500/10 group-hover:opacity-100 dark:group-hover:from-blue-400/10 dark:group-hover:to-purple-500/10" />
      
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
