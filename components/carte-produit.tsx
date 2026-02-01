"use client"

import Link from 'next/link'
import Image from 'next/image'
import { usePanier, type Produit } from './contexte-panier'
import { formaterPrix } from '@/lib/donnees-produits'
import { ShoppingBag, Heart, Eye } from 'lucide-react'
import { useState } from 'react'

interface CarteProduitProps {
  produit: Produit
  index?: number
}

export function CarteProduit({ produit, index = 0 }: CarteProduitProps) {
  const { ajouterAuPanier } = usePanier()
  const [estFavori, setEstFavori] = useState(false)
  const [imageChargee, setImageChargee] = useState(false)

  return (
    <article 
      className="group animate-fade-in"
      style={{ animationDelay: `${index * 0.05}s`, opacity: 0, animationFillMode: 'forwards' }}
    >
      <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-2xl bg-secondary hover-lift image-zoom">
        {/* Image avec skeleton */}
        <div className={`absolute inset-0 bg-secondary animate-pulse transition-opacity duration-300 ${imageChargee ? 'opacity-0' : 'opacity-100'}`} />
        
        <Link href={`/produit/${produit.id}`}>
          <Image
            src={produit.image || "/placeholder.svg"}
            alt={produit.nom}
            fill
            className={`object-cover transition-opacity duration-500 ${imageChargee ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageChargee(true)}
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {produit.nouveaute && (
            <span className="px-3 py-1.5 bg-accent text-accent-foreground text-xs font-medium rounded-full shadow-md">
              Nouveau
            </span>
          )}
          {produit.promotion && (
            <span className="px-3 py-1.5 bg-destructive text-destructive-foreground text-xs font-medium rounded-full shadow-md">
              -{produit.promotion}%
            </span>
          )}
          {!produit.enStock && (
            <span className="px-3 py-1.5 bg-muted text-muted-foreground text-xs font-medium rounded-full shadow-md">
              Épuisé
            </span>
          )}
        </div>

        {/* Actions rapides */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          <button
            onClick={(e) => {
              e.preventDefault()
              setEstFavori(!estFavori)
            }}
            className={`p-3 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110 ${
              estFavori
                ? 'bg-accent text-accent-foreground shadow-lg'
                : 'bg-background/80 text-foreground hover:bg-background shadow-md'
            }`}
            aria-label={estFavori ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            <Heart className={`h-4 w-4 ${estFavori ? 'fill-current' : ''}`} />
          </button>
          
          <Link
            href={`/produit/${produit.id}`}
            className="p-3 rounded-full bg-background/80 text-foreground hover:bg-background backdrop-blur-sm shadow-md transition-all duration-300 transform hover:scale-110 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
            aria-label="Voir le produit"
          >
            <Eye className="h-4 w-4" />
          </Link>
        </div>

        {/* Bouton ajouter au panier */}
        {produit.enStock && (
          <div className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
            <button
              onClick={(e) => {
                e.preventDefault()
                ajouterAuPanier(produit)
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-foreground text-background font-medium rounded-full hover:bg-foreground/90 transition-colors shadow-lg"
            >
              <ShoppingBag className="h-4 w-4" />
              Ajouter au panier
            </button>
          </div>
        )}
      </div>

      {/* Informations produit */}
      <Link href={`/produit/${produit.id}`} className="block">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">
          {produit.categorie}
        </span>
        <h3 className="mt-1 font-medium text-foreground group-hover:text-accent transition-colors line-clamp-1">
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
            <span className="font-semibold text-foreground">{formaterPrix(produit.prix)}</span>
          )}
        </div>
        
        {/* Couleurs disponibles */}
        {produit.couleurs && produit.couleurs.length > 0 && (
          <div className="mt-3 flex gap-1">
            {produit.couleurs.slice(0, 4).map((couleur) => (
              <span 
                key={couleur}
                className="w-4 h-4 rounded-full border border-border"
                style={{ 
                  backgroundColor: 
                    couleur === 'Noir' ? '#1a1a1a' :
                    couleur === 'Blanc' ? '#ffffff' :
                    couleur === 'Camel' ? '#c19a6b' :
                    couleur === 'Gris' ? '#808080' :
                    couleur === 'Marine' ? '#1a2744' :
                    couleur === 'Bordeaux' ? '#722f37' :
                    couleur === 'Cognac' ? '#9a463d' :
                    couleur === 'Nude' ? '#e3bc9a' :
                    couleur === 'Rouge' ? '#c41e3a' :
                    couleur === 'Écru' ? '#f5f5dc' :
                    couleur === 'Terracotta' ? '#cc5500' :
                    couleur === 'Bleu' ? '#4169e1' :
                    couleur === 'Rose' ? '#ff69b4' :
                    couleur === 'Naturel' ? '#f5f5dc' :
                    couleur === 'Olive' ? '#808000' :
                    '#ddd'
                }}
                title={couleur}
              />
            ))}
            {produit.couleurs.length > 4 && (
              <span className="text-xs text-muted-foreground ml-1">
                +{produit.couleurs.length - 4}
              </span>
            )}
          </div>
        )}
      </Link>
    </article>
  )
}
