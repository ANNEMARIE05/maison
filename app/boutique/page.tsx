"use client"

import { useState, useMemo } from 'react'
import { Navigation } from '@/components/navigation'
import { PanierDrawer } from '@/components/panier-drawer'
import { Footer } from '@/components/footer'
import { FiltresBoutique } from '@/components/filtres-boutique'
import { CarteProduit } from '@/components/carte-produit'
import { produits } from '@/lib/donnees-produits'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function ContenuBoutique() {
  const searchParams = useSearchParams()
  const categorieUrl = searchParams.get('categorie') || 'tous'
  const nouveautesUrl = searchParams.get('nouveautes') === 'true'

  const [categorieActive, setCategorieActive] = useState(categorieUrl)
  const [triActif, setTriActif] = useState('pertinence')
  const [prixMin, setPrixMin] = useState(0)
  const [prixMax, setPrixMax] = useState(5000)
  const [afficherPromotions, setAfficherPromotions] = useState(false)

  const produitsFiltres = useMemo(() => {
    let resultat = [...produits]

    // Filtre par catégorie
    if (categorieActive !== 'tous') {
      resultat = resultat.filter(p => p.categorie === categorieActive)
    }

    // Filtre par nouveautés
    if (nouveautesUrl) {
      resultat = resultat.filter(p => p.nouveaute)
    }

    // Filtre par prix
    resultat = resultat.filter(p => {
      const prixFinal = p.promotion ? p.prix * (1 - p.promotion / 100) : p.prix
      return prixFinal >= prixMin && prixFinal <= prixMax
    })

    // Filtre promotions
    if (afficherPromotions) {
      resultat = resultat.filter(p => p.promotion)
    }

    // Tri
    switch (triActif) {
      case 'prix-asc':
        resultat.sort((a, b) => {
          const prixA = a.promotion ? a.prix * (1 - a.promotion / 100) : a.prix
          const prixB = b.promotion ? b.prix * (1 - b.promotion / 100) : b.prix
          return prixA - prixB
        })
        break
      case 'prix-desc':
        resultat.sort((a, b) => {
          const prixA = a.promotion ? a.prix * (1 - a.promotion / 100) : a.prix
          const prixB = b.promotion ? b.prix * (1 - b.promotion / 100) : b.prix
          return prixB - prixA
        })
        break
      case 'nouveautes':
        resultat.sort((a, b) => (b.nouveaute ? 1 : 0) - (a.nouveaute ? 1 : 0))
        break
    }

    return resultat
  }, [categorieActive, triActif, prixMin, prixMax, afficherPromotions, nouveautesUrl])

  return (
    <>
      {/* Hero boutique */}
      <section className="pt-32 pb-16 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 animate-fade-in">
            Notre Boutique
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in animation-delay-100">
            Explorez notre sélection de pièces exceptionnelles, créées avec passion et savoir-faire.
          </p>
        </div>
      </section>

      {/* Contenu boutique */}
      <section className="py-12 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filtres */}
          <FiltresBoutique
            categorieActive={categorieActive}
            setCategorieActive={setCategorieActive}
            triActif={triActif}
            setTriActif={setTriActif}
            prixMin={prixMin}
            setPrixMin={setPrixMin}
            prixMax={prixMax}
            setPrixMax={setPrixMax}
            afficherPromotions={afficherPromotions}
            setAfficherPromotions={setAfficherPromotions}
            totalProduits={produitsFiltres.length}
          />

          {/* Grille de produits */}
          {produitsFiltres.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {produitsFiltres.map((produit, index) => (
                <CarteProduit key={produit.id} produit={produit} index={index} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-xl text-muted-foreground mb-4">
                Aucun produit ne correspond à vos critères.
              </p>
              <button
                onClick={() => {
                  setCategorieActive('tous')
                  setPrixMin(0)
                  setPrixMax(5000)
                  setAfficherPromotions(false)
                }}
                className="text-accent hover:underline"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default function PageBoutique() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <PanierDrawer />
      
      <Suspense fallback={
        <section className="pt-32 pb-16 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <div className="h-16 bg-secondary/50 rounded-lg animate-pulse mx-auto max-w-md mb-4" />
            <div className="h-6 bg-secondary/50 rounded-lg animate-pulse mx-auto max-w-2xl" />
          </div>
        </section>
      }>
        <ContenuBoutique />
      </Suspense>
      
      <Footer />
    </main>
  )
}
