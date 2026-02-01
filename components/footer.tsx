"use client"

import Link from 'next/link'
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react'

const liensNavigation = [
  { titre: 'Boutique', liens: [
    { nom: 'Nouveautés', href: '/boutique?nouveautes=true' },
    { nom: 'Vêtements', href: '/boutique?categorie=vetements' },
    { nom: 'Accessoires', href: '/boutique?categorie=accessoires' },
    { nom: 'Chaussures', href: '/boutique?categorie=chaussures' },
    { nom: 'Maison', href: '/boutique?categorie=maison' },
  ]},
  { titre: 'Service Client', liens: [
    { nom: 'Contact', href: '#contact' },
    { nom: 'Livraison', href: '#livraison' },
    { nom: 'Retours', href: '#retours' },
    { nom: 'FAQ', href: '#faq' },
    { nom: 'Guide des tailles', href: '#tailles' },
  ]},
  { titre: 'La Maison', liens: [
    { nom: 'Notre histoire', href: '#histoire' },
    { nom: 'Nos artisans', href: '#artisans' },
    { nom: 'Engagements', href: '#engagements' },
    { nom: 'Carrières', href: '#carrieres' },
    { nom: 'Presse', href: '#presse' },
  ]},
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter */}
      <div className="border-b border-background/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl font-serif mb-4">Restez informé</h3>
            <p className="text-background/70 mb-6">
              Inscrivez-vous à notre newsletter pour recevoir nos dernières nouveautés et offres exclusives.
            </p>
            <form className="flex gap-3 flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-6 py-3 bg-background/10 border border-background/20 rounded-full text-background placeholder:text-background/50 focus:outline-none focus:border-background/40 transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-background text-foreground font-medium rounded-full hover:bg-background/90 transition-colors"
              >
                {"S'inscrire"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Liens */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16">
          {/* Logo et description */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-serif text-2xl font-bold tracking-wider">
              MAISON
            </Link>
            <p className="mt-4 text-background/70 text-sm leading-relaxed">
              Depuis 1990, nous créons des pièces intemporelles alliant savoir-faire artisanal et design contemporain.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="p-2 bg-background/10 rounded-full hover:bg-background/20 transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-background/10 rounded-full hover:bg-background/20 transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-background/10 rounded-full hover:bg-background/20 transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Colonnes de liens */}
          {liensNavigation.map((colonne) => (
            <div key={colonne.titre}>
              <h4 className="font-medium mb-4">{colonne.titre}</h4>
              <ul className="space-y-3">
                {colonne.liens.map((lien) => (
                  <li key={lien.nom}>
                    <Link 
                      href={lien.href}
                      className="text-sm text-background/70 hover:text-background transition-colors"
                    >
                      {lien.nom}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-16 pt-8 border-t border-background/10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-background/50" />
              <span className="text-sm text-background/70">75008 Paris, France</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-background/50" />
              <span className="text-sm text-background/70">+33 1 23 45 67 89</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-background/50" />
              <span className="text-sm text-background/70">contact@maison.fr</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-background/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-background/50">
            <p>© 2026 MAISON. Tous droits réservés.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-background transition-colors">Mentions légales</Link>
              <Link href="#" className="hover:text-background transition-colors">Confidentialité</Link>
              <Link href="#" className="hover:text-background transition-colors">CGV</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
