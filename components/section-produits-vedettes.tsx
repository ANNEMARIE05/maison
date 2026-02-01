"use client"

import Link from 'next/link'
import Image from 'next/image'
import { obtenirNouveautes, formaterPrix } from '@/lib/donnees-produits'
import { usePanier } from './contexte-panier'
import { ShoppingBag, Heart, ArrowRight } from 'lucide-react'
import { useState } from 'react'

export function SectionProduitsVedettes() {
  const produitsVedettes = obtenirNouveautes()
  const { ajouterAuPanier } = usePanier()
  const [favoris, setFavoris] = useState<number[]>([])

  const toggleFavori = (id: number) => {
    setFavoris(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  return (
    <section className="py-24 bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
          <div>
            <span className="text-sm font-medium tracking-widest text-accent uppercase">
              Nouveautés
            </span>
            <h2 className="mt-2 font-serif text-4xl sm:text-5xl font-bold text-foreground">
              Pièces Exclusives
            </h2>
          </div>
          <Link
            href="/boutique?nouveautes=true"
            className="group flex items-center gap-2 text-foreground font-medium hover:text-accent transition-colors"
          >
            Voir tout
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {produitsVedettes.map((produit, index) => (
            <article 
              key={produit.id}
              className="group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-2xl bg-card hover-lift image-zoom">
                <Link href={`/produit/${produit.id}`}>
                  <Image
                    src={produit.image || "/placeholder.svg"}
                    alt={produit.nom}
                    fill
                    className="object-cover"
                  />
                </Link>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {produit.nouveaute && (
                    <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                      Nouveau
                    </span>
                  )}
                  {produit.promotion && (
                    <span className="px-3 py-1 bg-destructive text-destructive-foreground text-xs font-medium rounded-full">
                      -{produit.promotion}%
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => toggleFavori(produit.id)}
                    className={`p-3 rounded-full backdrop-blur-sm transition-all duration-300 ${
                      favoris.includes(produit.id)
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-background/80 text-foreground hover:bg-background'
                    }`}
                    aria-label="Ajouter aux favoris"
                  >
                    <Heart className={`h-5 w-5 ${favoris.includes(produit.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Quick add */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <button
                    onClick={() => ajouterAuPanier(produit)}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-foreground text-background font-medium rounded-full hover:bg-foreground/90 transition-colors"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Ajouter au panier
                  </button>
                </div>
              </div>

              {/* Info */}
              <Link href={`/produit/${produit.id}`}>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  {produit.categorie}
                </span>
                <h3 className="mt-1 font-medium text-foreground group-hover:text-accent transition-colors">
                  {produit.nom}
                </h3>
                <div className="mt-2 flex items-center gap-2">
                  {produit.promotion ? (
                    <>
                      <span className="font-semibold text-accent">
                        {formaterPrix(produit.prix * (1 - produit.promotion / 100))}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        {formaterPrix(produit.prix)}
                      </span>
                    </>
                  ) : (
                    <span className="font-semibold">{formaterPrix(produit.prix)}</span>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
