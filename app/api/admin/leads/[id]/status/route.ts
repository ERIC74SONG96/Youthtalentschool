import { NextResponse } from "next/server"
import { isValidLeadStatus } from "@/lib/admin-auth"
import { getSupabaseAdminClient } from "@/lib/supabase"

type Params = {
  params: Promise<{ id: string }>
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params
    const body = (await request.json()) as { status?: string }
    const status = typeof body.status === "string" ? body.status.trim() : ""

    if (!isValidLeadStatus(status)) {
      return NextResponse.json({ error: "Statut invalide." }, { status: 400 })
    }

    const supabase = getSupabaseAdminClient()
    const { error } = await supabase.from("leads").update({ status }).eq("id", id)

    if (error) {
      return NextResponse.json(
        { error: "Impossible de mettre a jour le statut." },
        { status: 500 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Requete invalide." }, { status: 400 })
  }
}
