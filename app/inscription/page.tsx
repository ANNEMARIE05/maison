"use client"

import React from "react"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { PanierDrawer } from '@/components/panier-drawer'
import { Footer } from '@/components/footer'
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Loader2, Check } from 'lucide-react'

export default function PageInscription() {
  const router = useRouter()
  const [afficherMotDePasse, setAfficherMotDePasse] = useState(false)
  const [chargement, setChargement] = useState(false)
  const [erreurs, setErreurs] = useState<Record<string, string>>({})
  const [etape, setEtape] = useState(1)
  
  const [formulaire, setFormulaire] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    motDePasse: '',
    confirmerMotDePasse: '',
    accepterConditions: false,
    newsletter: false
  })

  const gererChangement = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormulaire(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Effacer l'erreur pour ce champ
    if (erreurs[name]) {
      setErreurs(prev => {
        const nouvelles = { ...prev }
        delete nouvelles[name]
        return nouvelles
      })
    }
  }

  const validerEtape1 = () => {
    const nouvellesErreurs: Record<string, string> = {}
    
    if (!formulaire.prenom.trim()) {
      nouvellesErreurs.prenom = 'Le prénom est requis'
    }
    if (!formulaire.nom.trim()) {
      nouvellesErreurs.nom = 'Le nom est requis'
    }
    if (!formulaire.email.trim()) {
      nouvellesErreurs.email = 'L\'email est requis'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formulaire.email)) {
      nouvellesErreurs.email = 'Email invalide'
    }

    setErreurs(nouvellesErreurs)
    return Object.keys(nouvellesErreurs).length === 0
  }

  const validerEtape2 = () => {
    const nouvellesErreurs: Record<string, string> = {}
    
    if (!formulaire.motDePasse) {
      nouvellesErreurs.motDePasse = 'Le mot de passe est requis'
    } else if (formulaire.motDePasse.length < 8) {
      nouvellesErreurs.motDePasse = 'Minimum 8 caractères'
    }
    if (formulaire.motDePasse !== formulaire.confirmerMotDePasse) {
      nouvellesErreurs.confirmerMotDePasse = 'Les mots de passe ne correspondent pas'
    }
    if (!formulaire.accepterConditions) {
      nouvellesErreurs.accepterConditions = 'Vous devez accepter les conditions'
    }

    setErreurs(nouvellesErreurs)
    return Object.keys(nouvellesErreurs).length === 0
  }

  const passerEtape2 = () => {
    if (validerEtape1()) {
      setEtape(2)
    }
  }

  const gererSoumission = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validerEtape2()) return

    setChargement(true)

    // Simulation de création de compte
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Succès - redirection
    router.push('/')
    
    setChargement(false)
  }

  // Indicateur de force du mot de passe
  const forceMdp = () => {
    const mdp = formulaire.motDePasse
    let force = 0
    if (mdp.length >= 8) force++
    if (/[a-z]/.test(mdp) && /[A-Z]/.test(mdp)) force++
    if (/\d/.test(mdp)) force++
    if (/[^a-zA-Z0-9]/.test(mdp)) force++
    return force
  }

  const couleurForce = ['bg-destructive', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500']
  const texteForce = ['Très faible', 'Faible', 'Moyen', 'Fort']

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <PanierDrawer />

      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-md px-4 sm:px-6">
          {/* En-tête */}
          <div className="text-center mb-10 animate-fade-in">
            <h1 className="font-serif text-4xl font-bold text-foreground mb-3">
              Créer un compte
            </h1>
            <p className="text-muted-foreground">
              Rejoignez MAISON et profitez d&apos;avantages exclusifs
            </p>
          </div>

          {/* Indicateur d'étape */}
          <div className="flex items-center justify-center gap-4 mb-10 animate-fade-in">
            <div className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all ${
                etape >= 1 ? 'bg-foreground text-background' : 'bg-secondary text-muted-foreground'
              }`}>
                {etape > 1 ? <Check className="h-5 w-5" /> : '1'}
              </div>
              <span className={`text-sm font-medium ${etape >= 1 ? 'text-foreground' : 'text-muted-foreground'}`}>
                Informations
              </span>
            </div>
            <div className={`w-12 h-0.5 ${etape >= 2 ? 'bg-foreground' : 'bg-border'} transition-colors`} />
            <div className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all ${
                etape >= 2 ? 'bg-foreground text-background' : 'bg-secondary text-muted-foreground'
              }`}>
                2
              </div>
              <span className={`text-sm font-medium ${etape >= 2 ? 'text-foreground' : 'text-muted-foreground'}`}>
                Sécurité
              </span>
            </div>
          </div>

          {/* Formulaire */}
          <div className="bg-card rounded-3xl p-8 shadow-lg border border-border animate-fade-in animation-delay-100">
            <form onSubmit={gererSoumission} className="space-y-6">
              
              {/* Étape 1: Informations personnelles */}
              {etape === 1 && (
                <div className="space-y-6 animate-fade-in">
                  {/* Prénom et Nom */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="prenom" className="block text-sm font-medium text-foreground mb-2">
                        Prénom
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                          id="prenom"
                          name="prenom"
                          type="text"
                          value={formulaire.prenom}
                          onChange={gererChangement}
                          placeholder="Jean"
                          className={`w-full pl-12 pr-4 py-4 bg-secondary rounded-xl border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
                            erreurs.prenom ? 'ring-2 ring-destructive' : ''
                          }`}
                        />
                      </div>
                      {erreurs.prenom && (
                        <p className="mt-1 text-sm text-destructive">{erreurs.prenom}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="nom" className="block text-sm font-medium text-foreground mb-2">
                        Nom
                      </label>
                      <input
                        id="nom"
                        name="nom"
                        type="text"
                        value={formulaire.nom}
                        onChange={gererChangement}
                        placeholder="Dupont"
                        className={`w-full px-4 py-4 bg-secondary rounded-xl border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
                          erreurs.nom ? 'ring-2 ring-destructive' : ''
                        }`}
                      />
                      {erreurs.nom && (
                        <p className="mt-1 text-sm text-destructive">{erreurs.nom}</p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Adresse email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formulaire.email}
                        onChange={gererChangement}
                        placeholder="votre@email.com"
                        className={`w-full pl-12 pr-4 py-4 bg-secondary rounded-xl border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
                          erreurs.email ? 'ring-2 ring-destructive' : ''
                        }`}
                      />
                    </div>
                    {erreurs.email && (
                      <p className="mt-1 text-sm text-destructive">{erreurs.email}</p>
                    )}
                  </div>

                  {/* Téléphone */}
                  <div>
                    <label htmlFor="telephone" className="block text-sm font-medium text-foreground mb-2">
                      Téléphone <span className="text-muted-foreground">(optionnel)</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <input
                        id="telephone"
                        name="telephone"
                        type="tel"
                        value={formulaire.telephone}
                        onChange={gererChangement}
                        placeholder="+225 XX XX XX XX XX"
                        className="w-full pl-12 pr-4 py-4 bg-secondary rounded-xl border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                      />
                    </div>
                  </div>

                  {/* Bouton continuer */}
                  <button
                    type="button"
                    onClick={passerEtape2}
                    className="w-full flex items-center justify-center gap-3 py-4 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-all"
                  >
                    Continuer
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              )}

              {/* Étape 2: Mot de passe et conditions */}
              {etape === 2 && (
                <div className="space-y-6 animate-fade-in">
                  {/* Mot de passe */}
                  <div>
                    <label htmlFor="motDePasse" className="block text-sm font-medium text-foreground mb-2">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <input
                        id="motDePasse"
                        name="motDePasse"
                        type={afficherMotDePasse ? 'text' : 'password'}
                        value={formulaire.motDePasse}
                        onChange={gererChangement}
                        placeholder="Créez un mot de passe"
                        className={`w-full pl-12 pr-12 py-4 bg-secondary rounded-xl border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
                          erreurs.motDePasse ? 'ring-2 ring-destructive' : ''
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setAfficherMotDePasse(!afficherMotDePasse)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {afficherMotDePasse ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {erreurs.motDePasse && (
                      <p className="mt-1 text-sm text-destructive">{erreurs.motDePasse}</p>
                    )}
                    
                    {/* Indicateur de force */}
                    {formulaire.motDePasse && (
                      <div className="mt-3 space-y-2">
                        <div className="flex gap-1">
                          {[0, 1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className={`h-1.5 flex-1 rounded-full transition-colors ${
                                i < forceMdp() ? couleurForce[forceMdp() - 1] : 'bg-border'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Force: <span className={forceMdp() >= 3 ? 'text-green-600' : forceMdp() >= 2 ? 'text-yellow-600' : 'text-destructive'}>
                            {texteForce[forceMdp() - 1] || 'Très faible'}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Confirmer mot de passe */}
                  <div>
                    <label htmlFor="confirmerMotDePasse" className="block text-sm font-medium text-foreground mb-2">
                      Confirmer le mot de passe
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <input
                        id="confirmerMotDePasse"
                        name="confirmerMotDePasse"
                        type={afficherMotDePasse ? 'text' : 'password'}
                        value={formulaire.confirmerMotDePasse}
                        onChange={gererChangement}
                        placeholder="Confirmez votre mot de passe"
                        className={`w-full pl-12 pr-4 py-4 bg-secondary rounded-xl border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
                          erreurs.confirmerMotDePasse ? 'ring-2 ring-destructive' : ''
                        }`}
                      />
                      {formulaire.confirmerMotDePasse && formulaire.motDePasse === formulaire.confirmerMotDePasse && (
                        <Check className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-green-600" />
                      )}
                    </div>
                    {erreurs.confirmerMotDePasse && (
                      <p className="mt-1 text-sm text-destructive">{erreurs.confirmerMotDePasse}</p>
                    )}
                  </div>

                  {/* Conditions et newsletter */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <input
                        id="accepterConditions"
                        name="accepterConditions"
                        type="checkbox"
                        checked={formulaire.accepterConditions}
                        onChange={gererChangement}
                        className="w-5 h-5 mt-0.5 rounded border-border text-accent focus:ring-accent"
                      />
                      <label htmlFor="accepterConditions" className="text-sm text-muted-foreground">
                        J&apos;accepte les{' '}
                        <Link href="/conditions" className="text-accent hover:underline">
                          conditions générales d&apos;utilisation
                        </Link>
                        {' '}et la{' '}
                        <Link href="/confidentialite" className="text-accent hover:underline">
                          politique de confidentialité
                        </Link>
                      </label>
                    </div>
                    {erreurs.accepterConditions && (
                      <p className="text-sm text-destructive">{erreurs.accepterConditions}</p>
                    )}

                    <div className="flex items-start gap-3">
                      <input
                        id="newsletter"
                        name="newsletter"
                        type="checkbox"
                        checked={formulaire.newsletter}
                        onChange={gererChangement}
                        className="w-5 h-5 mt-0.5 rounded border-border text-accent focus:ring-accent"
                      />
                      <label htmlFor="newsletter" className="text-sm text-muted-foreground">
                        Je souhaite recevoir les offres et actualités de MAISON par email
                      </label>
                    </div>
                  </div>

                  {/* Boutons */}
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setEtape(1)}
                      className="flex-1 py-4 border border-border rounded-full font-medium hover:bg-secondary transition-all"
                    >
                      Retour
                    </button>
                    <button
                      type="submit"
                      disabled={chargement}
                      className="flex-1 flex items-center justify-center gap-3 py-4 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {chargement ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Création...
                        </>
                      ) : (
                        <>
                          Créer mon compte
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>

            {/* Séparateur */}
            <div className="my-8 flex items-center gap-4">
              <div className="flex-1 h-px bg-border" />
              <span className="text-sm text-muted-foreground">ou s&apos;inscrire avec</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Inscription sociale */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 py-3 border border-border rounded-xl hover:bg-secondary transition-all">
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-3 py-3 border border-border rounded-xl hover:bg-secondary transition-all">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.49.5.09.682-.218.682-.486 0-.24-.009-.875-.013-1.713-2.782.602-3.369-1.34-3.369-1.34-.455-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.091-.645.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .269.18.58.688.482C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                GitHub
              </button>
            </div>
          </div>

          {/* Lien connexion */}
          <p className="mt-8 text-center text-muted-foreground animate-fade-in animation-delay-200">
            Vous avez déjà un compte ?{' '}
            <Link href="/connexion" className="text-accent font-medium hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
