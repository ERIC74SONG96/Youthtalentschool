import { NextResponse } from "next/server"
import { getSupabaseAdminClient } from "@/lib/supabase"

type StatusFilter = "all" | "nouvelle" | "en_cours" | "traitee"

function parseStatus(value: string | null): StatusFilter {
  if (value === "nouvelle" || value === "en_cours" || value === "traitee") {
    return value
  }
  return "all"
}

function toCsvValue(value: string | null): string {
  const safe = (value ?? "").replaceAll('"', '""')
  return `"${safe}"`
}

function toCsv(rows: Array<Record<string, string | null>>): string {
  const headers = ["created_at", "name", "email", "phone", "formule", "status", "message"]
  const headerLine = headers.join(",")
  const lines = rows.map((row) => headers.map((header) => toCsvValue(row[header] ?? "")).join(","))
  return [headerLine, ...lines].join("\n")
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = (searchParams.get("q") ?? "").trim()
    const statusFilter = parseStatus(searchParams.get("status"))
    const escapedQuery = query ? query.replace(/[%_]/g, "") : ""
    const searchClause = escapedQuery
      ? `name.ilike.%${escapedQuery}%,email.ilike.%${escapedQuery}%,phone.ilike.%${escapedQuery}%,message.ilike.%${escapedQuery}%`
      : ""

    const supabase = getSupabaseAdminClient()
    let builder = supabase
      .from("leads")
      .select("created_at,name,email,phone,formule,status,message")
      .order("created_at", { ascending: false })
      .limit(5000)

    if (statusFilter !== "all") {
      builder = builder.eq("status", statusFilter)
    }
    if (searchClause) {
      builder = builder.or(searchClause)
    }

    const { data, error } = await builder
    if (error) {
      return NextResponse.json({ error: "Impossible d'exporter les donnees." }, { status: 500 })
    }

    const csv = toCsv((data ?? []) as Array<Record<string, string | null>>)
    const now = new Date().toISOString().slice(0, 10)
    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="youth-leads-${now}.csv"`,
      },
    })
  } catch {
    return NextResponse.json({ error: "Requete invalide." }, { status: 400 })
  }
}
