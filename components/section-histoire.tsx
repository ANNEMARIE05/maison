"use client"

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const valeurs = [
  { numero: '01', titre: 'Artisanat', description: 'Chaque pièce est confectionnée à la main par des artisans experts.' },
  { numero: '02', titre: 'Durabilité', description: 'Nous utilisons uniquement des matériaux éco-responsables et durables.' },
  { numero: '03', titre: 'Excellence', description: 'Un contrôle qualité rigoureux pour une satisfaction garantie.' },
]

export function SectionHistoire() {
  return (
    <section id="apropos" className="py-24 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Images */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80"
                alt="Artisan au travail"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-background shadow-xl animate-float">
              <Image
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&q=80"
                alt="Détail couture"
                fill
                className="object-cover"
              />
            </div>
            {/* Stats */}
            <div className="absolute top-8 -left-4 md:-left-8 bg-card p-6 rounded-xl shadow-lg">
              <span className="block text-4xl font-serif font-bold text-accent">35</span>
              <span className="text-sm text-muted-foreground">ans d{"'"}expertise</span>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="text-sm font-medium tracking-widest text-accent uppercase">
              Notre Histoire
            </span>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl font-bold text-foreground leading-tight">
              L{"'"}art du savoir-faire depuis 1990
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Depuis trois décennies, MAISON perpétue la tradition de l{"'"}excellence française. 
              Chaque création est le fruit d{"'"}un travail minutieux, alliant techniques ancestrales 
              et vision contemporaine.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Nos artisans, héritiers d{"'"}un savoir-faire transmis de génération en génération, 
              façonnent des pièces uniques destinées à traverser le temps.
            </p>

            {/* Values */}
            <div className="mt-10 space-y-6">
              {valeurs.map((valeur) => (
                <div key={valeur.numero} className="flex gap-4 group">
                  <span className="text-2xl font-serif font-bold text-accent/30 group-hover:text-accent transition-colors">
                    {valeur.numero}
                  </span>
                  <div>
                    <h3 className="font-semibold text-foreground">{valeur.titre}</h3>
                    <p className="text-sm text-muted-foreground">{valeur.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-10 group flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-full hover:opacity-90 transition-all">
              Découvrir notre histoire
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
