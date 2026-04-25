import { NextResponse } from "next/server"
import { getSupabaseAdminClient } from "@/lib/supabase"

type LeadPayload = {
  name: string
  email: string
  phone?: string
  formule?: string
  message?: string
}

function normalize(value: unknown): string {
  return typeof value === "string" ? value.trim() : ""
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadPayload
    const name = normalize(body.name)
    const email = normalize(body.email)
    const phone = normalize(body.phone)
    const formule = normalize(body.formule)
    const message = normalize(body.message)

    if (!name || !email) {
      return NextResponse.json(
        { error: "Le nom et l'email sont obligatoires." },
        { status: 400 },
      )
    }

    const supabase = getSupabaseAdminClient()
    const { error } = await supabase.from("leads").insert({
      name,
      email,
      phone: phone || null,
      formule: formule || null,
      message: message || null,
      status: "nouvelle",
    })

    if (error) {
      return NextResponse.json(
        { error: "Impossible d'enregistrer la demande." },
        { status: 500 },
      )
    }

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: "Requête invalide." },
      { status: 400 },
    )
  }
}
