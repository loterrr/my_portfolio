"use client"

import { useCallback, useEffect, useState } from "react"

export function CodeEditorBackground() {
  const [scrollProgress, setScrollProgress] = useState(0)
  
  // Track scroll position for the minimap thumb
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight
      const windowHeight = window.innerHeight
      const maxScroll = scrollHeight - windowHeight
      
      if (maxScroll <= 0) {
        setScrollProgress(0)
        return
      }

      setScrollProgress(window.scrollY / maxScroll)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle clicking on the minimap to scroll
  const handleMinimapClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickY = e.clientY - rect.top
    const percent = clickY / rect.height
    
    // Scroll to the same percentage of the document
    const targetY = (document.documentElement.scrollHeight - window.innerHeight) * percent
    window.scrollTo({ top: targetY, behavior: "smooth" })
  }, [])

  // Fake line numbers — enough to cover any viewport height
  const gutterLines = 150
  const minimapLines = 250

  return (
    <>
      {/* 1. Background Layer (Behind everything) */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Gutter Background */}
        <div
          className="absolute bottom-0 left-0 top-0 w-16 opacity-30 dark:opacity-20 hidden xl:flex border-r border-border/20"
          style={{ background: "var(--muted)" }}
        />

        {/* Ambient syntax color glows */}
        <div
          className="absolute -top-32 left-1/4 size-125 rounded-full blur-[120px] opacity-[0.08] dark:opacity-[0.12] animate-float-slow"
          style={{ background: "var(--code-keyword)" }}
        />
        <div
          className="absolute -bottom-32 right-1/4 size-150 rounded-full blur-[140px] opacity-[0.06] dark:opacity-[0.10] animate-float-slower"
          style={{ background: "var(--code-function)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 h-100 w-200 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[160px] opacity-[0.04] dark:opacity-[0.07] animate-float-medium"
          style={{ background: "var(--code-string)" }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0 opacity-70 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, var(--background) 100%)`,
          }}
        />
      </div>

      {/* 2. Interactive Layer (Above content, but only on sidebars) */}
      <div className="fixed inset-0 z-20 pointer-events-none overflow-hidden">
        {/* Line numbers column */}
        <div className="absolute bottom-0 left-0 top-0 w-16 flex-col items-end pr-3 pt-4 gap-0 overflow-hidden hidden xl:flex">
          {Array.from({ length: gutterLines }, (_, i) => (
            <span
              key={i}
              className="font-mono leading-[1.6rem] text-[0.65rem] select-none"
              style={{
                color: "var(--muted-foreground)",
                opacity: i % 5 === 0 ? 0.4 : 0.2,
              }}
            >
              {i + 1}
            </span>
          ))}
        </div>

        {/* Interactive Minimap Column */}
        <div
          onClick={handleMinimapClick}
          className="absolute bottom-0 right-0 top-0 w-16 hidden xl:block pointer-events-auto cursor-pointer group border-l border-border/20 bg-background/5"
        >
          <div 
            className="absolute inset-0 opacity-10 dark:opacity-5 bg-muted transition-opacity group-hover:opacity-20" 
          />
          
          {/* Thumb / Viewport Indicator */}
          <div 
            className="absolute right-0 w-16 bg-code-keyword/20 border-y border-code-keyword/30 transition-all duration-75 mix-blend-screen"
            style={{ 
              height: "15%", 
              top: `${scrollProgress * (100 - 15)}%` 
            }}
          />

          {/* Minimap fake code lines */}
          <div className="absolute inset-x-1 top-0 bottom-0 py-4 flex flex-col gap-1 overflow-hidden opacity-30 group-hover:opacity-50 transition-opacity">
            {Array.from({ length: minimapLines }, (_, i) => {
              const colors = [
                "--code-keyword",
                "--code-function",
                "--code-string",
                "--code-tag",
                "--code-attr",
                "--code-comment",
              ]
              const color = colors[i % colors.length]
              const width = [40, 70, 55, 80, 30, 65, 50, 75][i % 8]
              return (
                <div
                  key={i}
                  className="h-0.5 rounded-full shrink-0"
                  style={{
                    width: `${width}%`,
                    background: `var(${color})`,
                    opacity: 0.4,
                    marginLeft: `${(i % 3) * 4}px`,
                  }}
                />
              )
            })}
          </div>
        </div>

        {/* Divider vertical line */}
        <div
          className="absolute bottom-0 right-16 top-0 w-px hidden xl:block"
          style={{ background: "var(--border)" }}
        />
      </div>
    </>
  )
}
