"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { PanierDrawer } from '@/components/panier-drawer'
import { Footer } from '@/components/footer'
import { usePanier } from '@/components/contexte-panier'
import { formaterPrix } from '@/lib/donnees-produits'
import { 
  ChevronRight, 
  CreditCard, 
  Truck, 
  ShieldCheck,
  Check,
  Lock,
  ChevronLeft
} from 'lucide-react'

type EtapeCheckout = 'informations' | 'livraison' | 'paiement' | 'confirmation'

export default function PageCheckout() {
  const { articles, totalPrix, viderPanier } = usePanier()
  const [etapeActuelle, setEtapeActuelle] = useState<EtapeCheckout>('informations')
  const [commandeConfirmee, setCommandeConfirmee] = useState(false)

  // États des formulaires
  const [informations, setInformations] = useState({
    email: '',
    prenom: '',
    nom: '',
    telephone: ''
  })

  const [adresse, setAdresse] = useState({
    rue: '',
    complement: '',
    codePostal: '',
    ville: '',
    pays: 'Côte d\'Ivoire'
  })

  const [paiement, setPaiement] = useState({
    numeroCarte: '',
    titulaire: '',
    expiration: '',
    cvv: ''
  })

  const [methodeLivraison, setMethodeLivraison] = useState('standard')

  // Frais de livraison en FCFA (prix déjà convertis via formaterPrix)
  const fraisLivraisonFCFA = methodeLivraison === 'express' ? 7870 : totalPrix >= 65600 ? 0 : 3280
  const fraisLivraison = fraisLivraisonFCFA
  const totalFinal = totalPrix + fraisLivraison

  const etapes: { id: EtapeCheckout; label: string }[] = [
    { id: 'informations', label: 'Informations' },
    { id: 'livraison', label: 'Livraison' },
    { id: 'paiement', label: 'Paiement' },
  ]

  const getEtapeIndex = (etape: EtapeCheckout) => etapes.findIndex(e => e.id === etape)

  const passerEtapeSuivante = () => {
    const indexActuel = getEtapeIndex(etapeActuelle)
    if (indexActuel < etapes.length - 1) {
      setEtapeActuelle(etapes[indexActuel + 1].id)
    } else {
      // Confirmer la commande
      setCommandeConfirmee(true)
      setEtapeActuelle('confirmation')
      viderPanier()
    }
  }

  const passerEtapePrecedente = () => {
    const indexActuel = getEtapeIndex(etapeActuelle)
    if (indexActuel > 0) {
      setEtapeActuelle(etapes[indexActuel - 1].id)
    }
  }

  if (articles.length === 0 && !commandeConfirmee) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <PanierDrawer />
        <div className="pt-32 pb-16 text-center">
          <h1 className="font-serif text-3xl font-bold mb-4">Votre panier est vide</h1>
          <p className="text-muted-foreground mb-8">
            Ajoutez des articles à votre panier pour passer commande.
          </p>
          <Link 
            href="/boutique"
            className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Explorer la boutique
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  if (commandeConfirmee) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <PanierDrawer />
        <div className="pt-32 pb-16">
          <div className="mx-auto max-w-2xl px-4 text-center">
            <div className="mb-8 flex justify-center">
              <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center animate-scale-in">
                <Check className="h-10 w-10 text-green-600" />
              </div>
            </div>
            <h1 className="font-serif text-4xl font-bold mb-4 animate-fade-in">
              Commande confirmée !
            </h1>
            <p className="text-lg text-muted-foreground mb-2 animate-fade-in animation-delay-100">
              Merci pour votre commande, {informations.prenom} !
            </p>
            <p className="text-muted-foreground mb-8 animate-fade-in animation-delay-200">
              Un email de confirmation a été envoyé à <span className="font-medium">{informations.email}</span>
            </p>
            
            <div className="bg-card p-6 rounded-2xl mb-8 text-left animate-fade-in animation-delay-300">
              <h2 className="font-semibold mb-4">Récapitulatif de votre commande</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Numéro de commande</span>
                  <span className="font-medium">CMD-{Date.now().toString().slice(-8)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-medium">{formaterPrix(totalFinal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Livraison</span>
                  <span className="font-medium">
                    {methodeLivraison === 'express' ? '2-3 jours ouvrés' : '5-7 jours ouvrés'}
                  </span>
                </div>
              </div>
            </div>

            <Link 
              href="/boutique"
              className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Continuer mes achats
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-secondary/30">
      <Navigation />
      <PanierDrawer />

      <div className="pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* En-tête */}
          <div className="text-center mb-12">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
              Finaliser votre commande
            </h1>
          </div>

          {/* Indicateur d'étapes */}
          <div className="mb-12">
            <div className="flex items-center justify-center gap-4">
              {etapes.map((etape, index) => {
                const estActive = etapeActuelle === etape.id
                const estCompletee = getEtapeIndex(etapeActuelle) > index

                return (
                  <div key={etape.id} className="flex items-center">
                    <div className="flex items-center gap-2">
                      <div className={`
                        flex items-center justify-center h-10 w-10 rounded-full text-sm font-medium transition-all
                        ${estActive ? 'bg-foreground text-background' : ''}
                        ${estCompletee ? 'bg-accent text-accent-foreground' : ''}
                        ${!estActive && !estCompletee ? 'bg-muted text-muted-foreground' : ''}
                      `}>
                        {estCompletee ? <Check className="h-5 w-5" /> : index + 1}
                      </div>
                      <span className={`hidden sm:block text-sm font-medium ${
                        estActive ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {etape.label}
                      </span>
                    </div>
                    {index < etapes.length - 1 && (
                      <ChevronRight className="h-5 w-5 mx-4 text-muted-foreground" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Formulaire */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-sm">
                {/* Étape Informations */}
                {etapeActuelle === 'informations' && (
                  <div className="animate-fade-in">
                    <h2 className="text-xl font-semibold mb-6">Vos informations</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                          type="email"
                          value={informations.email}
                          onChange={(e) => setInformations({ ...informations, email: e.target.value })}
                          className="w-full px-4 py-3 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                          placeholder="votre@email.com"
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Prénom</label>
                          <input
                            type="text"
                            value={informations.prenom}
                            onChange={(e) => setInformations({ ...informations, prenom: e.target.value })}
                            className="w-full px-4 py-3 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                            placeholder="Jean"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Nom</label>
                          <input
                            type="text"
                            value={informations.nom}
                            onChange={(e) => setInformations({ ...informations, nom: e.target.value })}
                            className="w-full px-4 py-3 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                            placeholder="Dupont"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Téléphone</label>
                        <input
                          type="tel"
                          value={informations.telephone}
                          onChange={(e) => setInformations({ ...informations, telephone: e.target.value })}
                          className="w-full px-4 py-3 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                          placeholder="+225 07 12 34 56 78"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Étape Livraison */}
                {etapeActuelle === 'livraison' && (
                  <div className="animate-fade-in">
                    <h2 className="text-xl font-semibold mb-6">Adresse de livraison</h2>
                    <div className="space-y-4 mb-8">
                      <div>
                        <label className="block text-sm font-medium mb-2">Adresse</label>
                        <input
                          type="text"
                          value={adresse.rue}
                          onChange={(e) => setAdresse({ ...adresse, rue: e.target.value })}
                          className="w-full px-4 py-3 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                          placeholder="123 Rue de Paris"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Complément (optionnel)</label>
                        <input
                          type="text"
                          value={adresse.complement}
                          onChange={(e) => setAdresse({ ...adresse, complement: e.target.value })}
                          className="w-full px-4 py-3 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                          placeholder="Appartement, étage, etc."
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Code postal</label>
                          <input
                            type="text"
                            value={adresse.codePostal}
                            onChange={(e) => setAdresse({ ...adresse, codePostal: e.target.value })}
                            className="w-full px-4 py-3 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                            placeholder="75001"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Ville</label>
                          <input
                            type="text"
                            value={adresse.ville}
                            onChange={(e) => setAdresse({ ...adresse, ville: e.target.value })}
                            className="w-full px-4 py-3 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                            placeholder="Paris"
                          />
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold mb-4">Mode de livraison</h3>
                    <div className="space-y-3">
                      <button
                        onClick={() => setMethodeLivraison('standard')}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                          methodeLivraison === 'standard'
                            ? 'border-foreground bg-secondary/50'
                            : 'border-border hover:border-muted-foreground'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <Truck className="h-5 w-5" />
                          <div className="text-left">
                            <p className="font-medium">Livraison standard</p>
                            <p className="text-sm text-muted-foreground">5-7 jours ouvrés</p>
                          </div>
                        </div>
                        <span className="font-medium">
                          {totalPrix >= 65600 ? 'Gratuit' : formaterPrix(3280 / 656)}
                        </span>
                      </button>

                      <button
                        onClick={() => setMethodeLivraison('express')}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                          methodeLivraison === 'express'
                            ? 'border-foreground bg-secondary/50'
                            : 'border-border hover:border-muted-foreground'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <Truck className="h-5 w-5" />
                          <div className="text-left">
                            <p className="font-medium">Livraison express</p>
                            <p className="text-sm text-muted-foreground">2-3 jours ouvrés</p>
                          </div>
                        </div>
                        <span className="font-medium">{formaterPrix(7870 / 656)}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Étape Paiement */}
                {etapeActuelle === 'paiement' && (
                  <div className="animate-fade-in">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold">Paiement sécurisé</h2>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Lock className="h-4 w-4" />
                        SSL sécurisé
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Numéro de carte</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={paiement.numeroCarte}
                            onChange={(e) => setPaiement({ ...paiement, numeroCarte: e.target.value })}
                            className="w-full px-4 py-3 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                          />
                          <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Titulaire de la carte</label>
                        <input
                          type="text"
                          value={paiement.titulaire}
                          onChange={(e) => setPaiement({ ...paiement, titulaire: e.target.value })}
                          className="w-full px-4 py-3 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                          placeholder="JEAN DUPONT"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Date d{"'"}expiration</label>
                          <input
                            type="text"
                            value={paiement.expiration}
                            onChange={(e) => setPaiement({ ...paiement, expiration: e.target.value })}
                            className="w-full px-4 py-3 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                            placeholder="MM/AA"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">CVV</label>
                          <input
                            type="text"
                            value={paiement.cvv}
                            onChange={(e) => setPaiement({ ...paiement, cvv: e.target.value })}
                            className="w-full px-4 py-3 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                            placeholder="123"
                            maxLength={4}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Logos paiement */}
                    <div className="mt-6 pt-6 border-t border-border">
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <ShieldCheck className="h-5 w-5" />
                        <span className="text-sm">Paiement 100% sécurisé par cryptage SSL</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                  {etapeActuelle !== 'informations' ? (
                    <button
                      onClick={passerEtapePrecedente}
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                      Retour
                    </button>
                  ) : (
                    <Link
                      href="/boutique"
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                      Continuer mes achats
                    </Link>
                  )}
                  
                  <button
                    onClick={passerEtapeSuivante}
                    className="flex items-center gap-2 px-8 py-3 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-opacity"
                  >
                    {etapeActuelle === 'paiement' ? 'Confirmer et payer' : 'Continuer'}
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Récapitulatif */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl p-6 shadow-sm sticky top-28">
                <h2 className="text-lg font-semibold mb-6">Récapitulatif</h2>
                
                {/* Articles */}
                <div className="space-y-4 mb-6">
                  {articles.map((article) => {
                    const prixFinal = article.promotion 
                      ? article.prix * (1 - article.promotion / 100) 
                      : article.prix

                    return (
                      <div key={`${article.id}-${article.tailleSelectionnee}-${article.couleurSelectionnee}`} className="flex gap-4">
                        <div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden bg-secondary">
                          <Image
                            src={article.image || "/placeholder.svg"}
                            alt={article.nom}
                            fill
                            className="object-cover"
                          />
                          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-background text-xs">
                            {article.quantite}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium line-clamp-1">{article.nom}</h3>
                          {(article.tailleSelectionnee || article.couleurSelectionnee) && (
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {article.tailleSelectionnee && `Taille: ${article.tailleSelectionnee}`}
                              {article.tailleSelectionnee && article.couleurSelectionnee && ' | '}
                              {article.couleurSelectionnee && article.couleurSelectionnee}
                            </p>
                          )}
                          <p className="text-sm font-medium mt-1">
                            {formaterPrix(prixFinal * article.quantite)}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="border-t border-border pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span>{formaterPrix(totalPrix)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Livraison</span>
                    <span className={fraisLivraison === 0 ? 'text-accent font-medium' : ''}>
                      {fraisLivraison === 0 ? 'Gratuite' : formaterPrix(fraisLivraison)}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold pt-3 border-t border-border">
                    <span>Total</span>
                    <span>{formaterPrix(totalFinal)}</span>
                  </div>
                </div>

                {/* Code promo */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Code promo"
                      className="flex-1 px-4 py-2.5 bg-secondary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                    />
                    <button className="px-4 py-2.5 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors">
                      Appliquer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
