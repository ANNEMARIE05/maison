"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePanier } from './contexte-panier'
import { Menu, X, Search, ShoppingBag, User, Heart, Layers, Star, Info } from 'lucide-react'

const liensNavigation = [
  { nom: 'Accueil', href: '/' },
  { nom: 'Boutique', href: '/boutique' },
  { nom: 'Collections', href: '/boutique?categorie=vetements' },
  { nom: 'Nouveautés', href: '/boutique?nouveautes=true' },
  { nom: 'À propos', href: '#apropos' },
]

export function Navigation() {
  const [menuOuvert, setMenuOuvert] = useState(false)
  const [recherche, setRecherche] = useState(false)
  const [defiler, setDefiler] = useState(false)
  const { totalArticles, ouvrirPanier } = usePanier()

  useEffect(() => {
    const gererDefilement = () => {
      setDefiler(window.scrollY > 50)
    }
    window.addEventListener('scroll', gererDefilement)
    return () => window.removeEventListener('scroll', gererDefilement)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${defiler
          ? 'bg-background/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
        }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-2xl font-bold tracking-wider text-foreground transition-transform hover:scale-105"
          >
            MAISON
          </Link>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center gap-8">
            {liensNavigation.map((lien) => (
              <Link
                key={lien.nom}
                href={lien.href}
                className="relative text-sm font-medium text-foreground/80 hover:text-foreground transition-colors group"
              >
                {lien.nom}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setRecherche(!recherche)}
              className="p-2 text-foreground/80 hover:text-foreground transition-colors hover:scale-110 transform duration-200"
              aria-label="Rechercher"
            >
              <Search className="h-5 w-5" />
            </button>

            <button
              className="hidden sm:block p-2 text-foreground/80 hover:text-foreground transition-colors hover:scale-110 transform duration-200"
              aria-label="Favoris"
            >
              <Heart className="h-5 w-5" />
            </button>

            <Link
              href="/connexion"
              className="hidden sm:block p-2 text-foreground/80 hover:text-foreground transition-colors hover:scale-110 transform duration-200"
              aria-label="Compte"
            >
              <User className="h-5 w-5" />
            </Link>

            <button
              onClick={ouvrirPanier}
              className="relative p-2 text-foreground/80 hover:text-foreground transition-colors hover:scale-110 transform duration-200"
              aria-label="Panier"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalArticles > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-medium text-accent-foreground animate-scale-in">
                  {totalArticles}
                </span>
              )}
            </button>

            {/* Menu mobile */}
            <button
              onClick={() => setMenuOuvert(!menuOuvert)}
              className="md:hidden p-2 text-foreground/80 hover:text-foreground transition-colors"
              aria-label="Menu"
            >
              {menuOuvert ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Barre de recherche */}
        <div className={`overflow-hidden transition-all duration-300 ${recherche ? 'max-h-20 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher des produits..."
              className="w-full pl-12 pr-4 py-3 bg-secondary border-0 rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
            />
          </div>
        </div>
      </nav>

      {/* Menu mobile overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-background/98 backdrop-blur-xl z-40 transition-all duration-500 ease-in-out ${menuOuvert ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}
        style={{ top: '80px' }}
      >
        <div className="flex flex-col h-[calc(100vh-80px)] overflow-y-auto px-6 py-12">
          <div className="flex flex-col gap-6">
            {[
              { nom: 'Accueil', href: '/', icon: <Heart className="h-5 w-5" /> },
              { nom: 'Boutique', href: '/boutique', icon: <ShoppingBag className="h-5 w-5" /> },
              { nom: 'Collections', href: '/boutique?categorie=vetements', icon: <Layers className="h-5 w-5" /> },
              { nom: 'Nouveautés', href: '/boutique?nouveautes=true', icon: <Star className="h-5 w-5" /> },
              { nom: 'À propos', href: '#apropos', icon: <Info className="h-5 w-5" /> },
            ].map((lien, index) => (
              <Link
                key={lien.nom}
                href={lien.href}
                onClick={() => setMenuOuvert(false)}
                className={`flex items-center gap-4 text-2xl font-serif text-foreground hover:text-accent transition-all duration-300 ${menuOuvert ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                  }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <span className="p-2 bg-secondary rounded-full text-accent">
                  {lien.icon}
                </span>
                {lien.nom}
              </Link>
            ))}

            <hr className="my-4 border-muted" />

            <Link
              href="/connexion"
              onClick={() => setMenuOuvert(false)}
              className={`flex items-center gap-4 text-2xl font-serif text-foreground hover:text-accent transition-all duration-300 ${menuOuvert ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                }`}
              style={{ transitionDelay: `250ms` }}
            >
              <span className="p-2 bg-accent/10 rounded-full text-accent">
                <User className="h-5 w-5" />
              </span>
              Connexion
            </Link>
          </div>

          <div className="mt-auto pt-12 text-center text-sm text-muted-foreground">
            <p>© 2024 MAISON. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    </header>
  )
}
