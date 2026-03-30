"use client"

import { CodeHeading, CodeSection } from "@/components/shared/code-tags"
import type { Education } from "@/lib/supabase/types"
import { motion } from "framer-motion"
import { HiOutlineAcademicCap, HiOutlineCalendarDays } from "react-icons/hi2"

interface EducationSectionProps {
  education: Education[]
}

export function EducationSection({ education }: EducationSectionProps) {
  if (education.length === 0) return null

  return (
    <CodeSection
      id="education"
      tag="section"
      attrs={{ id: "education" }}
    >
      <CodeHeading tag="h2">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Education</h2>
        <p className="mt-1 text-sm text-code-comment">
          {"// where I learned my craft"}
        </p>
      </CodeHeading>

      <div className="grid gap-6 md:grid-cols-2">
        {education.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative flex flex-col gap-4 rounded-2xl border border-border/40 bg-card/40 p-6 backdrop-blur-sm dark:border-border/20 dark:bg-card/15 hover:border-code-keyword/30 transition-all duration-300 shadow-lg shadow-black/5"
          >
            {/* Top Row: School & Period */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-code-keyword/10 border border-code-keyword/20 group-hover:bg-code-keyword/20 transition-colors">
                  <HiOutlineAcademicCap className="size-5 text-code-keyword" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-code-keyword transition-colors">
                    {item.school}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground/60">
                    <HiOutlineCalendarDays className="size-3.5" />
                    <span>{item.period}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Section: Degree */}
            <div className="mt-2">
              <div className="text-sm font-semibold text-foreground/90 bg-foreground/5 px-2.5 py-1 rounded-md border border-border/20 w-fit">
                {item.degree}
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed italic">
                {item.description}
              </p>

              {/* Thesis Integration */}
              {item.thesis && (
                <div className="mt-6 border-t border-dashed border-border/30 pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-code-keyword px-2 py-0.5 rounded bg-code-keyword/5 border border-code-keyword/20">
                      Capstone Thesis
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-foreground leading-snug mb-2">
                    {item.thesis.title}
                  </h4>
                  <p className="text-xs text-muted-foreground/80 leading-relaxed mb-3">
                    {item.thesis.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.thesis.interests.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] font-mono text-code-comment px-1.5 py-0.5 rounded border border-code-comment/10"
                      >
                        #{tag.toLowerCase().replace(/\s+/g, "_")}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Decorator */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
               <span className="font-mono text-[10px] text-code-comment">{"// <edu />"}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </CodeSection>
  )
}
