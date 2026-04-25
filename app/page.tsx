import { Phone, Mail, Globe, MapPin, GraduationCap, Users, BookOpen, CheckCircle, Star, Menu, X } from "lucide-react"
import Image from "next/image"
import { ContactForm } from "@/components/contact-form"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-[#0b1c2d] sticky top-0 z-50 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="#" className="text-[#f2b705] font-bold text-xl">
              Youth Talent School
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a href="#accueil" className="text-white hover:text-[#f2b705] transition-colors">Accueil</a>
              <a href="#pourquoi" className="text-white hover:text-[#f2b705] transition-colors">Pourquoi nous</a>
              <a href="#formules" className="text-white hover:text-[#f2b705] transition-colors">Nos formules</a>
              <a href="#contact" className="text-white hover:text-[#f2b705] transition-colors">Contact</a>
              <a href="#contact" className="bg-[#f2b705] text-[#0b1c2d] font-semibold px-5 py-2 rounded-full hover:bg-[#d9a504] transition-colors">
                Inscription
              </a>
            </div>
            <button className="md:hidden text-white" aria-label="Menu">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with decorative triangles */}
      <header id="accueil" className="relative bg-[#0b1c2d] overflow-hidden">
        {/* Decorative triangles */}
        <div className="absolute top-0 left-0 w-0 h-0 border-l-[100px] border-l-[#1a3a5c] border-b-[150px] border-b-transparent" />
        <div className="absolute top-0 right-0 w-0 h-0 border-r-[100px] border-r-[#1a3a5c] border-b-[150px] border-b-transparent" />
        <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[80px] border-l-[#1a3a5c] border-t-[120px] border-t-transparent" />
        <div className="absolute bottom-0 right-0 w-0 h-0 border-r-[80px] border-r-[#1a3a5c] border-t-[120px] border-t-transparent" />
        
        <div className="relative z-10 px-6 py-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#f2b705] tracking-wide mb-2">
            YOUTH TALENT SCHOOL
          </h1>
          <h2 className="text-xl md:text-2xl text-[#f2b705] font-medium mb-6">
            COURS DE SOUTIEN SCOLAIRE
          </h2>
          <p className="text-white italic text-lg max-w-xl mx-auto mb-4">
            Un accompagnement sérieux pour mieux réussir ses études.
          </p>
          <p className="text-[#f2b705] text-xl font-semibold mb-6">
            « Tu as un talent en toi »
          </p>
          <a 
            href="#contact" 
            className="inline-block bg-[#f2b705] text-[#0b1c2d] font-bold px-8 py-3 rounded-full hover:bg-[#d9a504] transition-colors shadow-lg"
          >
            Nous contacter
          </a>
        </div>
      </header>

      {/* Hero Image Section */}
      <section className="relative bg-white py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/images/students-hero.jpg"
              alt="Eleves etudiant ensemble"
              width={1200}
              height={600}
              className="w-full h-[300px] md:h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c2d]/70 to-transparent flex items-end">
              <div className="p-6 md:p-10">
                <p className="text-white text-lg md:text-2xl font-medium max-w-xl">
                  Des cours adaptes a chaque eleve pour reveler son plein potentiel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi Youth Talent School */}
      <section id="pourquoi" className="py-12 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0b1c2d] text-center mb-10">
            Pourquoi Youth Talent School ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-[#0b1c2d] flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-[#f2b705]" />
              </div>
              <h3 className="text-lg font-bold text-[#0b1c2d] mb-2">Encadrement sérieux</h3>
              <p className="text-gray-600 text-sm">Un suivi pédagogique rigoureux pour améliorer durablement les résultats.</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-[#0b1c2d] flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[#f2b705]" />
              </div>
              <h3 className="text-lg font-bold text-[#0b1c2d] mb-2">Petits groupes</h3>
              <p className="text-gray-600 text-sm">Maximum 10 élèves par classe pour une attention personnalisée.</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-[#0b1c2d] flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-[#f2b705]" />
              </div>
              <h3 className="text-lg font-bold text-[#0b1c2d] mb-2">Contact direct</h3>
              <p className="text-gray-600 text-sm">Communication continue entre parents et enseignant.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Niveaux & Matières + Nos Atouts */}
      <section className="py-10 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Niveaux & Matières */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-[#f2b705]">
            <h3 className="text-xl font-bold text-[#0b1c2d] mb-4 flex items-center gap-2">
              <span className="text-[#f2b705]">●</span>
              NIVEAUX & MATIÈRES
            </h3>
            <ul className="space-y-3 text-[#0b1c2d]">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-[#f2b705] mt-0.5 shrink-0" />
                <span>Primaire – Collège – Lycée</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-[#f2b705] mt-0.5 shrink-0" />
                <span>Maths, Physiques, Chimie, Sciences</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-[#f2b705] mt-0.5 shrink-0" />
                <span>Préparation examens : CE1D, CESS, oraux</span>
              </li>
            </ul>
          </div>

          {/* Nos Atouts */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-[#f2b705]">
            <h3 className="text-xl font-bold text-[#0b1c2d] mb-4 flex items-center gap-2">
              <span className="text-[#f2b705]">●</span>
              NOS ATOUTS
            </h3>
            <ul className="space-y-3 text-[#0b1c2d]">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-[#f2b705] mt-0.5 shrink-0" />
                <span>Enseignants qualifiés</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-[#f2b705] mt-0.5 shrink-0" />
                <span>À domicile, en groupe ou en ligne</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-[#f2b705] mt-0.5 shrink-0" />
                <span>Contact direct parent / prof</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Formules / Pricing Cards */}
      <section id="formules" className="py-12 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-8">
            <Star className="w-8 h-8 text-[#f2b705]" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Cours Individuels */}
            <div className="relative bg-white rounded-3xl p-6 pt-10 shadow-lg border-2 border-gray-200 hover:border-[#0b1c2d] transition-colors">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#0b1c2d] text-white px-4 py-2 rounded-full text-sm font-bold">
                COURS INDIVIDUELS
              </div>
              <ul className="space-y-3 text-[#0b1c2d] text-sm mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-[#f2b705] font-bold">•</span>
                  <span>1h à domicile</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#f2b705] font-bold">•</span>
                  <span>Programme personnalisé, explication des leçons, préparation aux contrôles</span>
                </li>
              </ul>
              <div className="text-center">
                <span className="inline-block bg-[#0b1c2d] text-white px-6 py-2 rounded-full text-xl font-bold">
                  20€/H
                </span>
              </div>
            </div>

            {/* Cours en Petit Groupe - Highlighted */}
            <div className="relative bg-[#fef9e7] rounded-3xl p-6 pt-10 shadow-xl border-2 border-[#f2b705] transform md:-translate-y-4">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#f2b705] text-[#0b1c2d] px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap">
                COURS EN PETIT GROUPE
              </div>
              <ul className="space-y-3 text-[#0b1c2d] text-sm mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-[#0b1c2d] font-bold">•</span>
                  <span>10 élèves maximum</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0b1c2d] font-bold">•</span>
                  <span>2 séances de 2h/semaines</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0b1c2d] font-bold">•</span>
                  <span>Idéal pour élèves en perte de rythme ou démotivés</span>
                </li>
              </ul>
              <div className="text-center space-y-2">
                <div className="text-xs text-[#0b1c2d] font-semibold bg-white/50 inline-block px-3 py-1 rounded-full">FORFAIT MENSUEL : 200 €</div>
                <div>
                  <span className="inline-block bg-[#f2b705] text-[#0b1c2d] px-6 py-2 rounded-full text-xl font-bold">
                    12,5 € /H
                  </span>
                </div>
                <div className="text-xs text-[#0b1c2d] font-medium">TOUTES LES SÉANCES INCLUSES</div>
              </div>
            </div>

            {/* Cours Individuels en Ligne */}
            <div className="relative bg-white rounded-3xl p-6 pt-10 shadow-lg border-2 border-gray-200 hover:border-[#0b1c2d] transition-colors">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#0b1c2d] text-white px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap">
                COURS INDIVIDUELS EN LIGNE
              </div>
              <ul className="space-y-3 text-[#0b1c2d] text-sm mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-[#f2b705] font-bold">•</span>
                  <span>1h en ligne</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#f2b705] font-bold">•</span>
                  <span>Programme personnalisé, explication des leçons, préparation aux contrôles</span>
                </li>
              </ul>
              <div className="text-center">
                <span className="inline-block bg-[#0b1c2d] text-white px-6 py-2 rounded-full text-xl font-bold">
                  15€/H
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-[#0b1c2d] py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-5">
              <a href="tel:+32465339448" className="flex items-center gap-4 text-white hover:text-[#f2b705] transition-colors group">
                <div className="w-11 h-11 rounded-full bg-[#f2b705] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5 text-[#0b1c2d]" />
                </div>
                <span className="text-lg">+32 465 33 94 48</span>
              </a>
              
              <a href="mailto:youthtalentschool@gmail.com" className="flex items-center gap-4 text-white hover:text-[#f2b705] transition-colors group">
                <div className="w-11 h-11 rounded-full bg-[#f2b705] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-[#0b1c2d]" />
                </div>
                <span className="text-lg">youthtalentschool@gmail.com</span>
              </a>
              
              <a href="https://www.youthtalenschool.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white hover:text-[#f2b705] transition-colors group">
                <div className="w-11 h-11 rounded-full bg-[#f2b705] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Globe className="w-5 h-5 text-[#0b1c2d]" />
                </div>
                <span className="text-lg">www.youthtalenschool.com</span>
              </a>
              
              <div className="flex items-center gap-4 text-white">
                <div className="w-11 h-11 rounded-full bg-[#f2b705] flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#0b1c2d]" />
                </div>
                <span className="text-lg">Boulevard de la Camre 48, 1000 Bruxelles</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h3 className="text-[#0b1c2d] text-xl font-bold mb-4 text-center">Formulaire de contact</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#071420] py-6 px-6 text-center">
        <p className="text-white/80 text-sm mb-2">
          © 2026 Youth Talent School – youthtalentschool.be
        </p>
        <p className="text-white/50 text-xs">
          Ouverture officielle après obtention de la carte professionnelle
        </p>
      </footer>
    </div>
  )
}
