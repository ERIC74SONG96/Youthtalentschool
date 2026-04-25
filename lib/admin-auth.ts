export function getAdminCredentials() {
  const username = process.env.ADMIN_USERNAME
  const password = process.env.ADMIN_PASSWORD

  if (!username || !password) {
    throw new Error("Missing ADMIN_USERNAME or ADMIN_PASSWORD")
  }

  return { username, password }
}

export type LeadStatus = "nouvelle" | "en_cours" | "traitee"

export function isValidLeadStatus(value: string): value is LeadStatus {
  return value === "nouvelle" || value === "en_cours" || value === "traitee"
}
