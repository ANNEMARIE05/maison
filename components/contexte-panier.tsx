"use client"

import { createContext, useContext, useState, type ReactNode } from 'react'

export interface Produit {
  id: number
  nom: string
  prix: number
  image: string
  categorie: string
  description: string
  tailles?: string[]
  couleurs?: string[]
  enStock: boolean
  nouveaute?: boolean
  promotion?: number
}

export interface ArticlePanier extends Produit {
  quantite: number
  tailleSelectionnee?: string
  couleurSelectionnee?: string
}

interface ContextePanierType {
  articles: ArticlePanier[]
  ajouterAuPanier: (produit: Produit, taille?: string, couleur?: string) => void
  retirerDuPanier: (id: number) => void
  modifierQuantite: (id: number, quantite: number) => void
  viderPanier: () => void
  totalArticles: number
  totalPrix: number
  panierOuvert: boolean
  ouvrirPanier: () => void
  fermerPanier: () => void
}

const ContextePanier = createContext<ContextePanierType | undefined>(undefined)

export function FournisseurPanier({ children }: { children: ReactNode }) {
  const [articles, setArticles] = useState<ArticlePanier[]>([])
  const [panierOuvert, setPanierOuvert] = useState(false)

  const ajouterAuPanier = (produit: Produit, taille?: string, couleur?: string) => {
    setArticles(articlesActuels => {
      const articleExistant = articlesActuels.find(
        article => article.id === produit.id && 
        article.tailleSelectionnee === taille && 
        article.couleurSelectionnee === couleur
      )

      if (articleExistant) {
        return articlesActuels.map(article =>
          article.id === produit.id && 
          article.tailleSelectionnee === taille && 
          article.couleurSelectionnee === couleur
            ? { ...article, quantite: article.quantite + 1 }
            : article
        )
      }

      return [...articlesActuels, { 
        ...produit, 
        quantite: 1, 
        tailleSelectionnee: taille,
        couleurSelectionnee: couleur 
      }]
    })
    setPanierOuvert(true)
  }

  const retirerDuPanier = (id: number) => {
    setArticles(articlesActuels => articlesActuels.filter(article => article.id !== id))
  }

  const modifierQuantite = (id: number, quantite: number) => {
    if (quantite <= 0) {
      retirerDuPanier(id)
      return
    }
    setArticles(articlesActuels =>
      articlesActuels.map(article =>
        article.id === id ? { ...article, quantite } : article
      )
    )
  }

  const viderPanier = () => setArticles([])

  const totalArticles = articles.reduce((total, article) => total + article.quantite, 0)
  
  const totalPrix = articles.reduce((total, article) => {
    const prixFinal = article.promotion 
      ? article.prix * (1 - article.promotion / 100) 
      : article.prix
    return total + prixFinal * article.quantite
  }, 0)

  const ouvrirPanier = () => setPanierOuvert(true)
  const fermerPanier = () => setPanierOuvert(false)

  return (
    <ContextePanier.Provider value={{
      articles,
      ajouterAuPanier,
      retirerDuPanier,
      modifierQuantite,
      viderPanier,
      totalArticles,
      totalPrix,
      panierOuvert,
      ouvrirPanier,
      fermerPanier
    }}>
      {children}
    </ContextePanier.Provider>
  )
}

export function usePanier() {
  const contexte = useContext(ContextePanier)
  if (!contexte) {
    throw new Error('usePanier doit être utilisé dans un FournisseurPanier')
  }
  return contexte
}
