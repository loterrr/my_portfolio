"use client"

import { CodeHeading, CodeSection } from "@/components/shared/code-tags"
import type { Research } from "@/lib/supabase/types"
import { motion } from "framer-motion"
import { HiOutlineAcademicCap, HiOutlineLightBulb, HiOutlineShieldCheck } from "react-icons/hi2"

interface ThesisSectionProps {
  thesis: Research
}

export function ThesisSection({ thesis }: ThesisSectionProps) {
  return (
    <CodeSection
      id="thesis"
      tag="section"
      attrs={{ id: "thesis" }}
    >
      <CodeHeading tag="h2">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
          Thesis
        </h2>
        <p className="mt-1 text-sm text-code-comment">
          {"// academic capstone & independent analysis"}
        </p>
      </CodeHeading>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-border/40 bg-card/40 p-8 backdrop-blur-sm dark:border-border/20 dark:bg-card/15 shadow-xl"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-code-keyword/10 border border-code-keyword/20">
              <HiOutlineAcademicCap className="size-6 text-code-keyword" />
            </div>
            <div>
              <h3 className="text-xl font-bold leading-tight md:text-2xl mb-2 text-foreground">
                {thesis.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-code-comment">
                <span className="inline-block px-2 py-0.5 rounded border border-code-comment/20">Thesis Framework</span>
                <span>•</span>
                <span>Offline / Privacy-First</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              {thesis.summary}
            </p>
            
            <div className="flex flex-wrap gap-3 pt-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium uppercase tracking-wider">
                <HiOutlineShieldCheck className="size-3.5" />
                Privacy Conscious
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/5 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-medium uppercase tracking-wider">
                <HiOutlineLightBulb className="size-3.5" />
                Retrieval-Augmented
              </div>
            </div>
          </div>
        </motion.div>

        {/* Focus Areas Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6"
        >
          <div className="rounded-2xl border border-border/40 bg-card/40 p-6 backdrop-blur-sm dark:border-border/20 dark:bg-card/15">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-code-comment mb-4">
              Thesis Focus Areas
            </h4>
            <ul className="space-y-4">
              {thesis.interests.map((interest, i) => (
                <li key={i} className="group flex items-start gap-3">
                   <div className="mt-1.5 size-1.5 rounded-full bg-code-keyword group-hover:scale-125 transition-transform" />
                   <span className="text-sm text-muted-foreground font-medium group-hover:text-foreground transition-colors">
                     {interest}
                   </span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="rounded-2xl border border-dashed border-border/30 p-6 opacity-60">
             <p className="text-xs italic text-code-comment leading-relaxed text-center">
                "Focused on grounding AI responses in verifiable document content while maintaining absolute data sovereignty."
             </p>
          </div>
        </motion.div>
      </div>
    </CodeSection>
  )
}
