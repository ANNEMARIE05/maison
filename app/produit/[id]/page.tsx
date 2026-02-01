"use client"

import { useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { PanierDrawer } from '@/components/panier-drawer'
import { Footer } from '@/components/footer'
import { usePanier } from '@/components/contexte-panier'
import { obtenirProduitParId, formaterPrix, produits } from '@/lib/donnees-produits'
import { CarteProduit } from '@/components/carte-produit'
import { 
  ShoppingBag, 
  Heart, 
  Share2, 
  Truck, 
  RotateCcw, 
  ShieldCheck,
  ChevronRight,
  Minus,
  Plus,
  Check
} from 'lucide-react'

interface PageProduitProps {
  params: Promise<{ id: string }>
}

export default function PageProduit({ params }: PageProduitProps) {
  const { id } = use(params)
  const produit = obtenirProduitParId(Number(id))
  const { ajouterAuPanier } = usePanier()
  
  const [tailleSelectionnee, setTailleSelectionnee] = useState<string | undefined>()
  const [couleurSelectionnee, setCouleurSelectionnee] = useState<string | undefined>()
  const [quantite, setQuantite] = useState(1)
  const [estFavori, setEstFavori] = useState(false)
  const [ajouteAuPanier, setAjouteAuPanier] = useState(false)
  const [imageActive, setImageActive] = useState(0)

  if (!produit) {
    return (
      <main className="min-h-screen">
        <Navigation />
        <PanierDrawer />
        <div className="pt-32 pb-16 text-center">
          <h1 className="text-2xl font-semibold mb-4">Produit non trouvé</h1>
          <Link href="/boutique" className="text-accent hover:underline">
            Retour à la boutique
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  const prixFinal = produit.promotion 
    ? produit.prix * (1 - produit.promotion / 100) 
    : produit.prix

  const produitsAssocies = produits
    .filter(p => p.categorie === produit.categorie && p.id !== produit.id)
    .slice(0, 4)

  const handleAjouterAuPanier = () => {
    ajouterAuPanier(produit, tailleSelectionnee, couleurSelectionnee)
    setAjouteAuPanier(true)
    setTimeout(() => setAjouteAuPanier(false), 2000)
  }

  // Images simulées (dans une vraie app, on aurait plusieurs images)
  const images = [produit.image, produit.image, produit.image]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <PanierDrawer />

      {/* Breadcrumb */}
      <div className="pt-24 pb-4 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Accueil</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/boutique" className="hover:text-foreground transition-colors">Boutique</Link>
            <ChevronRight className="h-4 w-4" />
            <Link 
              href={`/boutique?categorie=${produit.categorie}`} 
              className="hover:text-foreground transition-colors capitalize"
            >
              {produit.categorie}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{produit.nom}</span>
          </nav>
        </div>
      </div>

      {/* Contenu produit */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Galerie images */}
            <div className="space-y-4">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-secondary animate-fade-in">
                <Image
                  src={images[imageActive] || "/placeholder.svg"}
                  alt={produit.nom}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {produit.nouveaute && (
                    <span className="px-3 py-1.5 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                      Nouveau
                    </span>
                  )}
                  {produit.promotion && (
                    <span className="px-3 py-1.5 bg-destructive text-destructive-foreground text-xs font-medium rounded-full">
                      -{produit.promotion}%
                    </span>
                  )}
                </div>
              </div>

              {/* Miniatures */}
              <div className="flex gap-3">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setImageActive(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden transition-all ${
                      imageActive === index 
                        ? 'ring-2 ring-accent ring-offset-2' 
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={img || "/placeholder.svg"} alt={`${produit.nom} - vue ${index + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Informations produit */}
            <div className="lg:py-4 animate-fade-in animation-delay-100">
              <span className="text-sm text-accent uppercase tracking-widest font-medium">
                {produit.categorie}
              </span>
              
              <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-foreground">
                {produit.nom}
              </h1>

              {/* Prix */}
              <div className="mt-4 flex items-center gap-4">
                <span className="text-3xl font-semibold text-foreground">
                  {formaterPrix(prixFinal)}
                </span>
                {produit.promotion && (
                  <span className="text-xl text-muted-foreground line-through">
                    {formaterPrix(produit.prix)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="mt-6 text-muted-foreground leading-relaxed">
                {produit.description}
              </p>

              {/* Sélection taille */}
              {produit.tailles && (
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium">Taille</span>
                    <button className="text-sm text-accent hover:underline">
                      Guide des tailles
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {produit.tailles.map((taille) => (
                      <button
                        key={taille}
                        onClick={() => setTailleSelectionnee(taille)}
                        className={`min-w-[48px] px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                          tailleSelectionnee === taille
                            ? 'border-foreground bg-foreground text-background'
                            : 'border-border hover:border-foreground'
                        }`}
                      >
                        {taille}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sélection couleur */}
              {produit.couleurs && (
                <div className="mt-6">
                  <span className="font-medium block mb-3">
                    Couleur: <span className="text-muted-foreground font-normal">{couleurSelectionnee || 'Sélectionnez'}</span>
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {produit.couleurs.map((couleur) => {
                      const couleurHex = 
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
                        couleur === 'Multicolore' ? 'linear-gradient(135deg, #ff6b6b, #4ecdc4, #ffe66d)' :
                        '#ddd'

                      return (
                        <button
                          key={couleur}
                          onClick={() => setCouleurSelectionnee(couleur)}
                          className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                            couleurSelectionnee === couleur
                              ? 'border-foreground scale-110'
                              : 'border-transparent hover:scale-105'
                          }`}
                          style={{ 
                            background: couleurHex.includes('gradient') ? couleurHex : couleurHex,
                            backgroundColor: couleurHex.includes('gradient') ? undefined : couleurHex
                          }}
                          title={couleur}
                        >
                          {couleurSelectionnee === couleur && (
                            <span className="absolute inset-0 flex items-center justify-center">
                              <Check className={`h-4 w-4 ${['Blanc', 'Écru', 'Nude', 'Naturel'].includes(couleur) ? 'text-foreground' : 'text-background'}`} />
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Quantité */}
              <div className="mt-8">
                <span className="font-medium block mb-3">Quantité</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded-full">
                    <button
                      onClick={() => setQuantite(Math.max(1, quantite - 1))}
                      className="p-3 hover:bg-secondary rounded-l-full transition-colors"
                      aria-label="Réduire la quantité"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{quantite}</span>
                    <button
                      onClick={() => setQuantite(quantite + 1)}
                      className="p-3 hover:bg-secondary rounded-r-full transition-colors"
                      aria-label="Augmenter la quantité"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {produit.enStock ? 'En stock' : 'Rupture de stock'}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAjouterAuPanier}
                  disabled={!produit.enStock}
                  className={`flex-1 flex items-center justify-center gap-3 py-4 px-8 rounded-full font-medium transition-all ${
                    ajouteAuPanier
                      ? 'bg-green-600 text-white'
                      : produit.enStock
                        ? 'bg-foreground text-background hover:opacity-90'
                        : 'bg-muted text-muted-foreground cursor-not-allowed'
                  }`}
                >
                  {ajouteAuPanier ? (
                    <>
                      <Check className="h-5 w-5" />
                      Ajouté au panier
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-5 w-5" />
                      Ajouter au panier
                    </>
                  )}
                </button>

                <button
                  onClick={() => setEstFavori(!estFavori)}
                  className={`p-4 rounded-full border transition-all ${
                    estFavori
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-border hover:border-foreground'
                  }`}
                  aria-label={estFavori ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                >
                  <Heart className={`h-5 w-5 ${estFavori ? 'fill-current' : ''}`} />
                </button>

                <button
                  className="p-4 rounded-full border border-border hover:border-foreground transition-all"
                  aria-label="Partager"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>

              {/* Avantages */}
              <div className="mt-10 pt-8 border-t border-border space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Truck className="h-5 w-5 text-accent" />
                  <span>Livraison gratuite à partir de 65 000 FCFA</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <RotateCcw className="h-5 w-5 text-accent" />
                  <span>Retours gratuits sous 30 jours</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <ShieldCheck className="h-5 w-5 text-accent" />
                  <span>Paiement 100% sécurisé</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Produits associés */}
      {produitsAssocies.length > 0 && (
        <section className="py-16 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-8">
              Vous aimerez aussi
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {produitsAssocies.map((p, index) => (
                <CarteProduit key={p.id} produit={p} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
