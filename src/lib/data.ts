import {
  MOCK_BLOG_POSTS,
  MOCK_CERTIFICATIONS,
  MOCK_EXPERIENCES,
  MOCK_FEEDBACKS,
  MOCK_PROFILE,
  MOCK_PROJECTS,
  MOCK_SKILLS,
  MOCK_SKILL_CATEGORIES,
  MOCK_RESEARCH,
  MOCK_ACHIEVEMENTS,
  MOCK_EDUCATION,
} from "./mock-data"
import type {
  BlogPost,
  Certification,
  Experience,
  ExperienceType,
  Feedback,
  Profile,
  Project,
  Skill,
  SkillCategory,
  Research,
  Education,
} from "@/lib/supabase/types"

export async function getProfile(): Promise<Profile | null> {
  return Promise.resolve(MOCK_PROFILE)
}

export async function getSkills(): Promise<Skill[]> {
  const skillsWithCategories = MOCK_SKILLS.map((skill) => ({
    ...skill,
    category: MOCK_SKILL_CATEGORIES.find((cat) => cat.id === skill.category_id),
  }))
  return Promise.resolve(skillsWithCategories)
}

export async function getProjects(
  options: { featured?: boolean } = {},
): Promise<Project[]> {
  let projects = MOCK_PROJECTS
  if (options.featured) {
    projects = projects.filter((p) => p.featured)
  }
  return Promise.resolve(projects.sort((a, b) => a.sort_order - b.sort_order))
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const project = MOCK_PROJECTS.find((p) => p.slug === slug)
  return Promise.resolve(project || null)
}

export async function getBlogPosts(
  options: { limit?: number } = {},
): Promise<BlogPost[]> {
  let posts = MOCK_BLOG_POSTS.filter((p) => p.published)
  posts = posts.sort(
    (a, b) =>
      new Date(b.published_at!).getTime() - new Date(a.published_at!).getTime(),
  )
  if (options.limit) {
    posts = posts.slice(0, options.limit)
  }
  return Promise.resolve(posts)
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  const post = MOCK_BLOG_POSTS.find((p) => p.slug === slug && p.published)
  return Promise.resolve(post || null)
}

export async function incrementPostViews(postId: string): Promise<void> {
  console.log(`Mock: Incremented views for post ${postId}`)
  return Promise.resolve()
}

export async function getExperiences(
  options: { type?: ExperienceType; featured?: boolean } = {},
): Promise<Experience[]> {
  let experiences = MOCK_EXPERIENCES
  if (options.type) {
    experiences = experiences.filter((e) => e.type === options.type)
  }
  if (options.featured) {
    experiences = experiences.filter((e) => e.featured)
  }
  return Promise.resolve(
    experiences.sort(
      (a, b) =>
        new Date(b.start_date).getTime() - new Date(a.start_date).getTime(),
    ),
  )
}

export async function getCertifications(): Promise<Certification[]> {
  return Promise.resolve(
    MOCK_CERTIFICATIONS.sort((a, b) => a.sort_order - b.sort_order),
  )
}

export async function getFeedbacks(): Promise<Feedback[]> {
  return Promise.resolve(
    MOCK_FEEDBACKS.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    ),
  )
}

export async function getResearch(): Promise<Research> {
  return Promise.resolve(MOCK_RESEARCH)
}

export async function getAchievements(): Promise<string[]> {
  return Promise.resolve(MOCK_ACHIEVEMENTS)
}

export async function getEducation(): Promise<Education[]> {
  return Promise.resolve(MOCK_EDUCATION.sort((a, b) => a.sort_order - b.sort_order))
}


