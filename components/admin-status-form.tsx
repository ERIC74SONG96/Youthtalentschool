"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

type LeadStatus = "nouvelle" | "en_cours" | "traitee"

const statusOptions: Array<{ value: LeadStatus; label: string }> = [
  { value: "nouvelle", label: "nouvelle" },
  { value: "en_cours", label: "en_cours" },
  { value: "traitee", label: "traitee" },
]

function getStatusBadgeClass(status: LeadStatus): string {
  if (status === "nouvelle") return "bg-blue-100 text-blue-800"
  if (status === "en_cours") return "bg-amber-100 text-amber-800"
  return "bg-emerald-100 text-emerald-800"
}

export function AdminStatusForm({
  leadId,
  currentStatus,
}: {
  leadId: string
  currentStatus: LeadStatus
}) {
  const router = useRouter()
  const [status, setStatus] = useState<LeadStatus>(currentStatus)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")

  async function handleSave() {
    setIsSaving(true)
    setError("")
    try {
      const response = await fetch(`/api/admin/leads/${leadId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        const data = (await response.json()) as { error?: string }
        setError(data.error ?? "Erreur lors de la mise a jour.")
        return
      }

      router.refresh()
    } catch {
      setError("Erreur reseau.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex min-w-[220px] flex-col gap-2">
      <span
        className={`inline-flex w-fit rounded-full px-2 py-1 text-xs font-semibold ${getStatusBadgeClass(status)}`}
      >
        {status}
      </span>
      <div className="flex items-center gap-2">
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value as LeadStatus)}
          className="rounded border border-slate-300 px-2 py-1 text-xs text-slate-700"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="rounded bg-slate-900 px-2 py-1 text-xs font-semibold text-white disabled:opacity-70"
        >
          {isSaving ? "..." : "Enregistrer"}
        </button>
      </div>
      {error ? <p className="text-xs text-red-700">{error}</p> : null}
    </div>
  )
}
