"use client"

import React from "react"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { PanierDrawer } from '@/components/panier-drawer'
import { Footer } from '@/components/footer'
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react'

export default function PageConnexion() {
  const router = useRouter()
  const [afficherMotDePasse, setAfficherMotDePasse] = useState(false)
  const [chargement, setChargement] = useState(false)
  const [erreur, setErreur] = useState('')
  
  const [formulaire, setFormulaire] = useState({
    email: '',
    motDePasse: '',
    seRappeler: false
  })

  const gererChangement = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormulaire(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    setErreur('')
  }

  const gererSoumission = async (e: React.FormEvent) => {
    e.preventDefault()
    setChargement(true)
    setErreur('')

    // Simulation de connexion
    await new Promise(resolve => setTimeout(resolve, 1500))

    if (formulaire.email && formulaire.motDePasse) {
      // Succès - redirection
      router.push('/')
    } else {
      setErreur('Veuillez remplir tous les champs')
    }
    
    setChargement(false)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <PanierDrawer />

      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-md px-4 sm:px-6">
          {/* En-tête */}
          <div className="text-center mb-10 animate-fade-in">
            <h1 className="font-serif text-4xl font-bold text-foreground mb-3">
              Bon retour
            </h1>
            <p className="text-muted-foreground">
              Connectez-vous pour accéder à votre compte
            </p>
          </div>

          {/* Formulaire */}
          <div className="bg-card rounded-3xl p-8 shadow-lg border border-border animate-fade-in animation-delay-100">
            <form onSubmit={gererSoumission} className="space-y-6">
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
                    required
                    value={formulaire.email}
                    onChange={gererChangement}
                    placeholder="votre@email.com"
                    className="w-full pl-12 pr-4 py-4 bg-secondary rounded-xl border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                  />
                </div>
              </div>

              {/* Mot de passe */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="motDePasse" className="block text-sm font-medium text-foreground">
                    Mot de passe
                  </label>
                  <Link href="/mot-de-passe-oublie" className="text-sm text-accent hover:underline">
                    Mot de passe oublié ?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    id="motDePasse"
                    name="motDePasse"
                    type={afficherMotDePasse ? 'text' : 'password'}
                    required
                    value={formulaire.motDePasse}
                    onChange={gererChangement}
                    placeholder="Votre mot de passe"
                    className="w-full pl-12 pr-12 py-4 bg-secondary rounded-xl border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setAfficherMotDePasse(!afficherMotDePasse)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {afficherMotDePasse ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Se souvenir */}
              <div className="flex items-center gap-3">
                <input
                  id="seRappeler"
                  name="seRappeler"
                  type="checkbox"
                  checked={formulaire.seRappeler}
                  onChange={gererChangement}
                  className="w-5 h-5 rounded border-border text-accent focus:ring-accent"
                />
                <label htmlFor="seRappeler" className="text-sm text-muted-foreground">
                  Se souvenir de moi
                </label>
              </div>

              {/* Erreur */}
              {erreur && (
                <div className="p-4 bg-destructive/10 text-destructive rounded-xl text-sm animate-fade-in">
                  {erreur}
                </div>
              )}

              {/* Bouton de connexion */}
              <button
                type="submit"
                disabled={chargement}
                className="w-full flex items-center justify-center gap-3 py-4 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {chargement ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Connexion en cours...
                  </>
                ) : (
                  <>
                    Se connecter
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>

            {/* Séparateur */}
            <div className="my-8 flex items-center gap-4">
              <div className="flex-1 h-px bg-border" />
              <span className="text-sm text-muted-foreground">ou continuer avec</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Connexion sociale */}
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

          {/* Lien inscription */}
          <p className="mt-8 text-center text-muted-foreground animate-fade-in animation-delay-200">
            Vous n&apos;avez pas de compte ?{' '}
            <Link href="/inscription" className="text-accent font-medium hover:underline">
              Créer un compte
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
