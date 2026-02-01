"use client"

import { usePanier } from './contexte-panier'
import { formaterPrix } from '@/lib/donnees-produits'
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function PanierDrawer() {
  const { 
    articles, 
    panierOuvert, 
    fermerPanier, 
    retirerDuPanier, 
    modifierQuantite,
    totalPrix,
    totalArticles 
  } = usePanier()

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          panierOuvert ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={fermerPanier}
      />

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-background z-50 shadow-2xl transition-transform duration-500 ease-out ${
          panierOuvert ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-6 w-6" />
              <h2 className="text-xl font-serif font-semibold">Votre Panier</h2>
              <span className="px-2 py-0.5 bg-accent text-accent-foreground text-xs rounded-full">
                {totalArticles}
              </span>
            </div>
            <button 
              onClick={fermerPanier}
              className="p-2 hover:bg-secondary rounded-full transition-colors"
              aria-label="Fermer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Articles */}
          <div className="flex-1 overflow-y-auto p-6">
            {articles.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mb-4" />
                <p className="text-lg font-medium text-foreground mb-2">Votre panier est vide</p>
                <p className="text-sm text-muted-foreground mb-6">
                  Découvrez notre collection et ajoutez vos articles favoris
                </p>
                <Link
                  href="/boutique"
                  onClick={fermerPanier}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
                >
                  Explorer la boutique
                </Link>
              </div>
            ) : (
              <ul className="space-y-6">
                {articles.map((article, index) => {
                  const prixFinal = article.promotion 
                    ? article.prix * (1 - article.promotion / 100) 
                    : article.prix

                  return (
                    <li 
                      key={`${article.id}-${article.tailleSelectionnee}-${article.couleurSelectionnee}`}
                      className="flex gap-4 animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
                        <Image
                          src={article.image || "/placeholder.svg"}
                          alt={article.nom}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-sm font-medium text-foreground line-clamp-1">
                              {article.nom}
                            </h3>
                            {(article.tailleSelectionnee || article.couleurSelectionnee) && (
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {article.tailleSelectionnee && `Taille: ${article.tailleSelectionnee}`}
                                {article.tailleSelectionnee && article.couleurSelectionnee && ' | '}
                                {article.couleurSelectionnee && `Couleur: ${article.couleurSelectionnee}`}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => retirerDuPanier(article.id)}
                            className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                            aria-label="Supprimer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex items-end justify-between mt-auto">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => modifierQuantite(article.id, article.quantite - 1)}
                              className="h-8 w-8 flex items-center justify-center rounded-full border border-border hover:bg-secondary transition-colors"
                              aria-label="Réduire la quantité"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">
                              {article.quantite}
                            </span>
                            <button
                              onClick={() => modifierQuantite(article.id, article.quantite + 1)}
                              className="h-8 w-8 flex items-center justify-center rounded-full border border-border hover:bg-secondary transition-colors"
                              aria-label="Augmenter la quantité"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <div className="text-right">
                            {article.promotion && (
                              <span className="text-xs text-muted-foreground line-through block">
                                {formaterPrix(article.prix * article.quantite)}
                              </span>
                            )}
                            <span className="font-medium">
                              {formaterPrix(prixFinal * article.quantite)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          {/* Footer */}
          {articles.length > 0 && (
            <div className="border-t border-border p-6 bg-secondary/30">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Sous-total</span>
                <span className="font-medium">{formaterPrix(totalPrix)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-muted-foreground">Livraison</span>
                <span className="text-sm text-accent font-medium">Gratuite</span>
              </div>
              <div className="flex justify-between text-lg font-semibold mb-6">
                <span>Total</span>
                <span>{formaterPrix(totalPrix)}</span>
              </div>
              <Link
                href="/checkout"
                onClick={fermerPanier}
                className="block w-full py-4 bg-primary text-primary-foreground text-center font-medium rounded-full hover:opacity-90 transition-all hover:scale-[1.02] transform"
              >
                Passer la commande
              </Link>
              <button
                onClick={fermerPanier}
                className="block w-full mt-3 py-3 text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Continuer mes achats
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
