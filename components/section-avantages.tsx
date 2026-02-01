"use client"

import { Truck, ShieldCheck, RotateCcw, HeadphonesIcon } from 'lucide-react'

const avantages = [
  {
    icone: Truck,
    titre: 'Livraison Offerte',
    description: 'Livraison gratuite pour toute commande supérieure à 65 000 FCFA.'
  },
  {
    icone: ShieldCheck,
    titre: 'Paiement Sécurisé',
    description: 'Transactions 100% sécurisées avec cryptage SSL et 3D Secure.'
  },
  {
    icone: RotateCcw,
    titre: 'Retours Gratuits',
    description: '30 jours pour changer d\'avis. Retours et échanges gratuits.'
  },
  {
    icone: HeadphonesIcon,
    titre: 'Service Premium',
    description: 'Notre équipe d\'experts est disponible 7j/7 pour vous accompagner.'
  },
]

export function SectionAvantages() {
  return (
    <section className="py-16 bg-background border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {avantages.map((avantage, index) => (
            <div 
              key={avantage.titre}
              className="flex flex-col items-center text-center group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-4 rounded-2xl bg-secondary/50 group-hover:bg-accent/10 transition-colors duration-300">
                <avantage.icone className="h-8 w-8 text-accent" />
              </div>
              <h3 className="mt-4 font-semibold text-foreground">{avantage.titre}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {avantage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
