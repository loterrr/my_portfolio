import type {
  Profile,
  Skill,
  SkillCategory,
  Project,
  ProjectImage,
  BlogPost,
  Experience,
  Certification,
  Feedback,
  Tag,
  ExperienceSkill,
  Research,
  Education,
} from "./supabase/types"

export const MOCK_PROFILE: Profile = {
  id: "1",
  full_name: "Luther John Allen Concepcion",
  headline: "Full-Stack Developer · AI Engineer",
  bio: "I’m a 3rd-year Computer Science student at Isabela State University - Cauayan City Campus, with a strong focus on full-stack development, database engineering, and AI-driven systems. I enjoy turning complex ideas into structured, maintainable, and practical solutions—whether that means building web platforms, designing reliable data workflows, or developing intelligent tools for research and real-world use.",
  avatar_url: null,
  resume_url: "#",
  email: "lutherjohnallen@email.com",
  github_url: "https://github.com/loterrr",
  linkedin_url: "https://linkedin.com/in/lutherjohnallen",
  twitter_url: null,
  website_url: "https://github.com/loterrr",
  location: "Cauayan City, Isabela, Philippines",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

export const MOCK_SKILL_CATEGORIES: SkillCategory[] = [
  { id: "cat1", name: "Frontend", slug: "frontend", sort_order: 1, created_at: new Date().toISOString() },
  { id: "cat2", name: "Backend", slug: "backend", sort_order: 2, created_at: new Date().toISOString() },
  { id: "cat3", name: "Database", slug: "database", sort_order: 3, created_at: new Date().toISOString() },
  { id: "cat4", name: "AI / ML", slug: "ai-ml", sort_order: 4, created_at: new Date().toISOString() },
]

export const MOCK_SKILLS: Skill[] = [
  // Frontend
  { id: "s1", name: "React", category_id: "cat1", proficiency: 75, sort_order: 1, created_at: new Date().toISOString() },
  { id: "s2", name: "Next.js", category_id: "cat1", proficiency: 70, sort_order: 2, created_at: new Date().toISOString() },
  { id: "s3", name: "TypeScript", category_id: "cat1", proficiency: 65, sort_order: 3, created_at: new Date().toISOString() },
  { id: "s4", name: "Tailwind CSS", category_id: "cat1", proficiency: 72, sort_order: 4, created_at: new Date().toISOString() },
  { id: "s5", name: "Responsive UI", category_id: "cat1", proficiency: 68, sort_order: 5, created_at: new Date().toISOString() },
  { id: "s21", name: "Modern Styling", category_id: "cat1", proficiency: 70, sort_order: 21, created_at: new Date().toISOString() },
  // Backend
  { id: "s6", name: "PHP", category_id: "cat2", proficiency: 74, sort_order: 6, created_at: new Date().toISOString() },
  { id: "s7", name: "Node.js", category_id: "cat2", proficiency: 60, sort_order: 7, created_at: new Date().toISOString() },
  { id: "s8", name: "REST APIs", category_id: "cat2", proficiency: 62, sort_order: 8, created_at: new Date().toISOString() },
  { id: "s9", name: "Authentication", category_id: "cat2", proficiency: 55, sort_order: 9, created_at: new Date().toISOString() },
  { id: "s10", name: "Server Logic", category_id: "cat2", proficiency: 64, sort_order: 10, created_at: new Date().toISOString() },
  { id: "s22", name: "Role-based Flows", category_id: "cat2", proficiency: 70, sort_order: 22, created_at: new Date().toISOString() },
  // Database
  { id: "s11", name: "MySQL", category_id: "cat3", proficiency: 70, sort_order: 11, created_at: new Date().toISOString() },
  { id: "s12", name: "SQL", category_id: "cat3", proficiency: 65, sort_order: 12, created_at: new Date().toISOString() },
  { id: "s13", name: "Schema Design", category_id: "cat3", proficiency: 50, sort_order: 13, created_at: new Date().toISOString() },
  { id: "s14", name: "Data Validation", category_id: "cat3", proficiency: 48, sort_order: 14, created_at: new Date().toISOString() },
  { id: "s15", name: "Import/Export Flows", category_id: "cat3", proficiency: 55, sort_order: 15, created_at: new Date().toISOString() },
  { id: "s23", name: "Admin Dashboards", category_id: "cat3", proficiency: 70, sort_order: 23, created_at: new Date().toISOString() },
  // AI / ML
  { id: "s16", name: "RAG", category_id: "cat4", proficiency: 52, sort_order: 16, created_at: new Date().toISOString() },
  { id: "s17", name: "Sentence-BERT", category_id: "cat4", proficiency: 45, sort_order: 17, created_at: new Date().toISOString() },
  { id: "s18", name: "Local LLMs", category_id: "cat4", proficiency: 50, sort_order: 18, created_at: new Date().toISOString() },
  { id: "s19", name: "Llama", category_id: "cat4", proficiency: 48, sort_order: 19, created_at: new Date().toISOString() },
  { id: "s20", name: "Document Analysis", category_id: "cat4", proficiency: 60, sort_order: 20, created_at: new Date().toISOString() },
  { id: "s24", name: "Grounded Answering", category_id: "cat4", proficiency: 55, sort_order: 24, created_at: new Date().toISOString() },
]

export const MOCK_TAGS: Tag[] = [
  { id: "t1", name: "Next.js", slug: "nextjs", created_at: new Date().toISOString() },
  { id: "t2", name: "React", slug: "react", created_at: new Date().toISOString() },
  { id: "t3", name: "TypeScript", slug: "typescript", created_at: new Date().toISOString() },
]

export const MOCK_PROJECTS: Project[] = [
  {
    id: "p1",
    title: "The Archive",
    slug: "the-archive",
    description: "An offline research assistant for cross-document academic analysis using retrieval, reranking, and local generation workflows.",
    content: "## Overview\nA privacy-first academic analysis system designed to work locally, retrieve relevant content from uploaded documents, and generate grounded responses for research use cases.",
    cover_image: null,
    live_url: "#",
    github_url: "#",
    featured: true,
    sort_order: 1,
    tags: ["Next.js", "TypeScript", "RAG", "Local LLM"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "p6",
    title: "Automated Attendance System",
    slug: "attendance-system",
    description: "An automated attendance management system using QR technology.",
    content: "## Overview\nA web-based system for tracking attendance efficiently using QR code scanning and reporting.",
    cover_image: null,
    live_url: "#",
    github_url: "#",
    featured: true,
    sort_order: 2,
    tags: ["PHP", "MySQL", "QR Code"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "p5",
    title: "Mediscan",
    slug: "mediscan",
    description: "A conceptual app designed for medicine pill detection.",
    content: "## Overview\nA mobile app concept for identifying pills and medicines, with fallback handling for unknown and non-pill objects.",
    cover_image: null,
    live_url: "#",
    github_url: "#",
    featured: true,
    sort_order: 3,
    tags: ["Flutter", "Mobile ML"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "p3",
    title: "GreenTech Crop Survival Prediction",
    slug: "greentech-crop-survival",
    description: "A dashboard-driven crop survival prediction system using weather inputs, crop data, and practical decision support logic.",
    content: "## Overview\nA dashboard-driven crop survival prediction system using weather inputs, crop data, and practical decision support logic.",
    cover_image: null,
    live_url: "#",
    github_url: "#",
    featured: true,
    sort_order: 4,
    tags: ["PHP", "MySQL", "Open-Meteo API"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "p10",
    title: "Work and Project Schedule System",
    slug: "sched-system",
    description: "A centralized scheduling tool for organizational workflows.",
    content: "## Overview\nA centralized scheduling tool for managing work shifts, project milestones, and resource allocation.",
    cover_image: null,
    live_url: "#",
    github_url: "#",
    featured: true,
    sort_order: 5,
    tags: ["PHP", "MySQL", "Admin Panel"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const MOCK_EXPERIENCES: Experience[] = []

export const MOCK_EDUCATION: Education[] = [
  {
    id: "edu1",
    school: "Isabela State University",
    degree: "BS in Computer Science (3rd Year)",
    period: "2022 - Present",
    description: "Currently pursuing a degree in Computer Science at the Cauayan City Campus, with a focus on high-performance computing, AI integration, and core software engineering principles.",
    sort_order: 1,
  },
]

export const MOCK_RESEARCH: Research = {
  title: "An Offline Retrieval-Augmented Generation Framework Using Llama and Sentence-BERT for Cross-Document Academic Analysis",
  summary: "A privacy-first academic analysis system designed to work locally, retrieve relevant content from uploaded documents, and generate grounded responses for research use cases.",
  interests: [
    "Offline AI Systems",
    "Cross Document Analysis",
    "Grounded Answer Generation",
    "Retrieval and Reranking",
    "Privacy-First Research Tools",
  ],
}

export const MOCK_ACHIEVEMENTS = [
  "Built across full-stack, AI, database, and research-oriented system types",
  "Designed privacy-conscious and workflow-centered digital solutions",
  "Focused on practical systems with real-world and academic use cases",
]

export const MOCK_CERTIFICATIONS: Certification[] = []

export const MOCK_BLOG_POSTS: BlogPost[] = []

export const MOCK_FEEDBACKS: Feedback[] = []
