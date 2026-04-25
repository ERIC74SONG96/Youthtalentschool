import { getSupabaseAdminClient } from "@/lib/supabase"
import { AdminStatusForm } from "@/components/admin-status-form"

type Lead = {
  id: string
  name: string
  email: string
  phone: string | null
  formule: string | null
  message: string | null
  status: "nouvelle" | "en_cours" | "traitee"
  created_at: string
}

type SearchParams = Promise<{
  q?: string
  status?: "all" | "nouvelle" | "en_cours" | "traitee"
  page?: string
}>

const PAGE_SIZE = 20

function buildAdminUrl({
  query,
  status,
  page,
}: {
  query: string
  status: "all" | "nouvelle" | "en_cours" | "traitee"
  page: number
}) {
  const params = new URLSearchParams()
  if (query) params.set("q", query)
  if (status !== "all") params.set("status", status)
  params.set("page", String(page))
  return `/admin?${params.toString()}`
}

function buildExportUrl({
  query,
  status,
}: {
  query: string
  status: "all" | "nouvelle" | "en_cours" | "traitee"
}) {
  const params = new URLSearchParams()
  if (query) params.set("q", query)
  if (status !== "all") params.set("status", status)
  return `/api/admin/leads/export?${params.toString()}`
}

export default async function AdminPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const query = (params.q ?? "").trim()
  const statusFilter =
    params.status === "nouvelle" || params.status === "en_cours" || params.status === "traitee"
      ? params.status
      : "all"
  const page = Math.max(1, Number.parseInt(params.page ?? "1", 10) || 1)
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  let leads: Lead[] = []
  let totalCount = 0
  let errorMessage = ""

  try {
    const supabase = getSupabaseAdminClient()
    const escapedQuery = query ? query.replace(/[%_]/g, "") : ""
    const searchClause = escapedQuery
      ? `name.ilike.%${escapedQuery}%,email.ilike.%${escapedQuery}%,phone.ilike.%${escapedQuery}%,message.ilike.%${escapedQuery}%`
      : ""

    let dataBuilder = supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .range(from, to)
    let countBuilder = supabase.from("leads").select("*", { count: "exact", head: true })
    if (statusFilter !== "all") {
      dataBuilder = dataBuilder.eq("status", statusFilter)
      countBuilder = countBuilder.eq("status", statusFilter)
    }
    if (searchClause) {
      dataBuilder = dataBuilder.or(searchClause)
      countBuilder = countBuilder.or(searchClause)
    }

    const [{ data, error }, { count, error: countError }] = await Promise.all([
      dataBuilder,
      countBuilder,
    ])
    if (error || countError) {
      errorMessage = "Impossible de charger les demandes."
    } else {
      leads = data ?? []
      totalCount = count ?? 0
    }
  } catch {
    errorMessage = "Configuration Supabase manquante. Vérifie les variables d'environnement."
  }

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))
  const hasPrevPage = page > 1
  const hasNextPage = page < totalPages

  return (
    <main className="min-h-screen bg-slate-100 p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-2xl font-bold text-slate-900">Admin - Demandes reçues</h1>
        <p className="mt-2 text-sm text-slate-600">
          Cette page affiche les demandes envoyées depuis le formulaire de contact.
        </p>

        <form className="mt-4 flex flex-wrap items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Rechercher nom, email, telephone, message..."
            className="w-full min-w-[260px] flex-1 rounded border border-slate-300 px-3 py-2 text-sm text-slate-700"
          />
          <select
            name="status"
            defaultValue={statusFilter}
            className="rounded border border-slate-300 px-3 py-2 text-sm text-slate-700"
          >
            <option value="all">Tous les statuts</option>
            <option value="nouvelle">nouvelle</option>
            <option value="en_cours">en_cours</option>
            <option value="traitee">traitee</option>
          </select>
          <button
            type="submit"
            className="rounded bg-slate-900 px-3 py-2 text-sm font-semibold text-white"
          >
            Filtrer
          </button>
          <a
            href="/admin"
            className="rounded border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700"
          >
            Reset
          </a>
          <a
            href={buildExportUrl({ query, status: statusFilter })}
            className="rounded border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700"
          >
            Export CSV
          </a>
        </form>

        {errorMessage ? (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {errorMessage}
          </div>
        ) : null}

        {!errorMessage ? (
          <p className="mt-4 text-sm text-slate-600">
            {totalCount} demande(s) - page {page} / {totalPages}
          </p>
        ) : null}

        <div className="mt-6 overflow-x-auto rounded-xl bg-white shadow">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Nom</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Téléphone</th>
                <th className="px-4 py-3">Formule</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">Message</th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-slate-500">
                    Aucune demande pour le moment.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="border-t border-slate-200 align-top">
                    <td className="px-4 py-3 text-slate-700">
                      {new Date(lead.created_at).toLocaleString("fr-BE")}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-900">{lead.name}</td>
                    <td className="px-4 py-3 text-slate-700">{lead.email}</td>
                    <td className="px-4 py-3 text-slate-700">{lead.phone ?? "-"}</td>
                    <td className="px-4 py-3 text-slate-700">{lead.formule ?? "-"}</td>
                    <td className="px-4 py-3">
                      <AdminStatusForm leadId={lead.id} currentStatus={lead.status} />
                    </td>
                    <td className="px-4 py-3 text-slate-700">{lead.message ?? "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {!errorMessage ? (
          <div className="mt-4 flex items-center justify-end gap-2">
            <a
              href={hasPrevPage ? buildAdminUrl({ query, status: statusFilter, page: page - 1 }) : "#"}
              aria-disabled={!hasPrevPage}
              className={`rounded border px-3 py-2 text-sm ${
                hasPrevPage
                  ? "border-slate-300 text-slate-700 hover:bg-white"
                  : "cursor-not-allowed border-slate-200 text-slate-400"
              }`}
            >
              Precedent
            </a>
            <a
              href={hasNextPage ? buildAdminUrl({ query, status: statusFilter, page: page + 1 }) : "#"}
              aria-disabled={!hasNextPage}
              className={`rounded border px-3 py-2 text-sm ${
                hasNextPage
                  ? "border-slate-300 text-slate-700 hover:bg-white"
                  : "cursor-not-allowed border-slate-200 text-slate-400"
              }`}
            >
              Suivant
            </a>
          </div>
        ) : null}
      </div>
    </main>
  )
}
