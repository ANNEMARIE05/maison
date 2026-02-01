"use client"

import { categories } from '@/lib/donnees-produits'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface FiltresBoutiqueProps {
  categorieActive: string
  setCategorieActive: (categorie: string) => void
  triActif: string
  setTriActif: (tri: string) => void
  prixMin: number
  setPrixMin: (prix: number) => void
  prixMax: number
  setPrixMax: (prix: number) => void
  afficherPromotions: boolean
  setAfficherPromotions: (value: boolean) => void
  totalProduits: number
}

const optionsTri = [
  { valeur: 'pertinence', label: 'Pertinence' },
  { valeur: 'prix-asc', label: 'Prix croissant' },
  { valeur: 'prix-desc', label: 'Prix décroissant' },
  { valeur: 'nouveautes', label: 'Nouveautés' },
]

export function FiltresBoutique({
  categorieActive,
  setCategorieActive,
  triActif,
  setTriActif,
  prixMin,
  setPrixMin,
  prixMax,
  setPrixMax,
  afficherPromotions,
  setAfficherPromotions,
  totalProduits,
}: FiltresBoutiqueProps) {
  const [filtresOuverts, setFiltresOuverts] = useState(false)
  const [triOuvert, setTriOuvert] = useState(false)

  const reinitialiserFiltres = () => {
    setCategorieActive('tous')
    setTriActif('pertinence')
    setPrixMin(0)
    setPrixMax(5000)
    setAfficherPromotions(false)
  }

  const filtresActifs = categorieActive !== 'tous' || prixMin > 0 || prixMax < 5000 || afficherPromotions

  return (
    <div className="mb-8">
      {/* Barre principale */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setFiltresOuverts(!filtresOuverts)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all ${
              filtresOuverts || filtresActifs
                ? 'border-accent bg-accent/10 text-accent'
                : 'border-border hover:border-foreground'
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="font-medium">Filtres</span>
            {filtresActifs && (
              <span className="flex items-center justify-center h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs">
                !
              </span>
            )}
          </button>

          <span className="text-muted-foreground">
            {totalProduits} {totalProduits > 1 ? 'produits' : 'produit'}
          </span>
        </div>

        {/* Tri */}
        <div className="relative">
          <button
            onClick={() => setTriOuvert(!triOuvert)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-border hover:border-foreground transition-all"
          >
            <span className="text-sm">Trier par: </span>
            <span className="font-medium text-sm">
              {optionsTri.find(o => o.valeur === triActif)?.label}
            </span>
            <ChevronDown className={`h-4 w-4 transition-transform ${triOuvert ? 'rotate-180' : ''}`} />
          </button>

          {triOuvert && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setTriOuvert(false)} />
              <div className="absolute right-0 mt-2 w-48 bg-card rounded-xl shadow-lg border border-border z-20 overflow-hidden animate-scale-in">
                {optionsTri.map((option) => (
                  <button
                    key={option.valeur}
                    onClick={() => {
                      setTriActif(option.valeur)
                      setTriOuvert(false)
                    }}
                    className={`w-full px-4 py-3 text-left text-sm hover:bg-secondary transition-colors ${
                      triActif === option.valeur ? 'bg-secondary font-medium' : ''
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Panneau de filtres */}
      <div className={`overflow-hidden transition-all duration-500 ${filtresOuverts ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="pt-6 pb-2">
          {/* Catégories */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-3">Catégories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((categorie) => (
                <button
                  key={categorie.id}
                  onClick={() => setCategorieActive(categorie.id)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    categorieActive === categorie.id
                      ? 'bg-foreground text-background'
                      : 'bg-secondary text-foreground hover:bg-secondary/80'
                  }`}
                >
                  {categorie.nom}
                </button>
              ))}
            </div>
          </div>

          {/* Prix */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-3">Prix</h3>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="text-xs text-muted-foreground mb-1 block">Min</label>
                <input
                  type="number"
                  value={prixMin}
                  onChange={(e) => setPrixMin(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-secondary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  min={0}
                  max={prixMax}
                />
              </div>
              <span className="text-muted-foreground mt-5">—</span>
              <div className="flex-1">
                <label className="text-xs text-muted-foreground mb-1 block">Max</label>
                <input
                  type="number"
                  value={prixMax}
                  onChange={(e) => setPrixMax(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-secondary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  min={prixMin}
                />
              </div>
            </div>
          </div>

          {/* Promotions */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-medium">Afficher uniquement les promotions</span>
            <button
              onClick={() => setAfficherPromotions(!afficherPromotions)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                afficherPromotions ? 'bg-accent' : 'bg-border'
              }`}
            >
              <span 
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-background transition-transform ${
                  afficherPromotions ? 'translate-x-6' : ''
                }`}
              />
            </button>
          </div>

          {/* Réinitialiser */}
          {filtresActifs && (
            <button
              onClick={reinitialiserFiltres}
              className="flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
            >
              <X className="h-4 w-4" />
              Réinitialiser les filtres
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
