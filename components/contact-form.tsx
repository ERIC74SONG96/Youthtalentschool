"use client"

import { FormEvent, useState } from "react"

type FormStatus = "idle" | "loading" | "success" | "error"

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle")
  const [feedback, setFeedback] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("loading")
    setFeedback("")

    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      formule: String(formData.get("formule") ?? ""),
      message: String(formData.get("message") ?? ""),
    }

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const json = (await response.json()) as { error?: string }

      if (!response.ok) {
        setStatus("error")
        setFeedback(json.error ?? "Une erreur est survenue.")
        return
      }

      setStatus("success")
      setFeedback("Merci, votre demande a bien ete envoyee.")
      form.reset()
    } catch {
      setStatus("error")
      setFeedback("Impossible d'envoyer la demande pour le moment.")
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[#0b1c2d] mb-1">
          Nom complet
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#f2b705] focus:border-transparent text-[#0b1c2d]"
          placeholder="Votre nom"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#0b1c2d] mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#f2b705] focus:border-transparent text-[#0b1c2d]"
          placeholder="votre@email.com"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-[#0b1c2d] mb-1">
          Téléphone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#f2b705] focus:border-transparent text-[#0b1c2d]"
          placeholder="+32 xxx xx xx xx"
        />
      </div>
      <div>
        <label htmlFor="formule" className="block text-sm font-medium text-[#0b1c2d] mb-1">
          Formule souhaitée
        </label>
        <select
          id="formule"
          name="formule"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#f2b705] focus:border-transparent text-[#0b1c2d]"
        >
          <option value="">Sélectionnez une formule</option>
          <option value="individuel">Cours Individuels - 20€/H</option>
          <option value="groupe">Cours en Petit Groupe - 12,5€/H</option>
          <option value="ligne">Cours Individuels en Ligne - 15€/H</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[#0b1c2d] mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#f2b705] focus:border-transparent text-[#0b1c2d] resize-none"
          placeholder="Décrivez vos besoins (niveau, matières, disponibilités...)"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-[#f2b705] text-[#0b1c2d] font-bold py-3 rounded-lg hover:bg-[#d9a504] transition-colors shadow-md disabled:opacity-70"
      >
        {status === "loading" ? "Envoi en cours..." : "Envoyer ma demande"}
      </button>
      {feedback ? (
        <p className={status === "success" ? "text-green-700 text-sm" : "text-red-700 text-sm"}>{feedback}</p>
      ) : null}
    </form>
  )
}
