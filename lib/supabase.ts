import { createClient } from "@supabase/supabase-js"

type LeadRow = {
  id: string
  name: string
  email: string
  phone: string | null
  formule: string | null
  message: string | null
  status: "nouvelle" | "en_cours" | "traitee"
  created_at: string
}

type Database = {
  public: {
    Tables: {
      leads: {
        Row: LeadRow
        Insert: Omit<LeadRow, "id" | "created_at" | "status"> & {
          status?: LeadRow["status"]
        }
        Update: Partial<LeadRow>
      }
    }
  }
}

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`)
  }
  return value
}

export function getSupabaseAdminClient() {
  const url = requireEnv("NEXT_PUBLIC_SUPABASE_URL")
  const serviceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY")

  return createClient<Database>(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
