import { createClient } from "@supabase/supabase-js"

/**
 * A stateless, standalone Supabase client for public/static data fetching.
 * Does NOT use cookies or headers, making it safe for static generation (SSG) 
 * and ISR in Next.js 15.
 */
export function createSupabaseStaticClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}
