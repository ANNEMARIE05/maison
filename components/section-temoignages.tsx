"use client"

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const temoignages = [
  {
    id: 1,
    nom: 'Sophie Martin',
    role: 'Directrice Artistique',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    note: 5,
    texte: 'La qualité exceptionnelle des pièces MAISON est incomparable. Chaque détail témoigne d\'un savoir-faire artisanal rare. Je suis cliente fidèle depuis plus de 5 ans.',
  },
  {
    id: 2,
    nom: 'Alexandre Dubois',
    role: 'Entrepreneur',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    note: 5,
    texte: 'Un service client irréprochable et des produits qui surpassent mes attentes. MAISON a redéfini ma vision du luxe accessible.',
  },
  {
    id: 3,
    nom: 'Marie Laurent',
    role: 'Architecte d\'intérieur',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    note: 5,
    texte: 'Je recommande MAISON à tous mes clients. Les pièces de décoration apportent une touche d\'élégance intemporelle à chaque projet.',
  },
]

export function SectionTemoignages() {
  const [indexActif, setIndexActif] = useState(0)

  const suivant = () => {
    setIndexActif((prev) => (prev + 1) % temoignages.length)
  }

  const precedent = () => {
    setIndexActif((prev) => (prev - 1 + temoignages.length) % temoignages.length)
  }

  return (
    <section className="py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-medium tracking-widest text-accent uppercase">
            Témoignages
          </span>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl font-bold text-foreground">
            Ce que disent nos clients
          </h2>
        </div>

        {/* Testimonial */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-card rounded-3xl p-8 md:p-12 shadow-lg">
            {/* Quote */}
            <div className="absolute top-8 left-8 text-8xl font-serif text-accent/10 leading-none">
              "
            </div>

            <div className="relative">
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(temoignages[indexActif].note)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Text */}
              <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed mb-8 animate-fade-in">
                {temoignages[indexActif].texte}
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 rounded-full overflow-hidden">
                  <Image
                    src={temoignages[indexActif].avatar || "/placeholder.svg"}
                    alt={temoignages[indexActif].nom}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {temoignages[indexActif].nom}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {temoignages[indexActif].role}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="absolute bottom-8 right-8 flex gap-2">
              <button
                onClick={precedent}
                className="p-3 rounded-full border border-border hover:bg-secondary transition-colors"
                aria-label="Témoignage précédent"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={suivant}
                className="p-3 rounded-full border border-border hover:bg-secondary transition-colors"
                aria-label="Témoignage suivant"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {temoignages.map((_, index) => (
              <button
                key={index}
                onClick={() => setIndexActif(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === indexActif ? 'w-8 bg-accent' : 'w-2 bg-border hover:bg-muted-foreground'
                }`}
                aria-label={`Témoignage ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
