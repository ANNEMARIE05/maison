"use client"

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Play } from 'lucide-react'
import { useState } from 'react'

export function HeroSection() {
  const [videoChargee, setVideoChargee] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80"
          alt="Collection luxe"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="animate-fade-in">
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium tracking-widest text-background/90 border border-background/30 rounded-full backdrop-blur-sm">
            NOUVELLE COLLECTION PRINTEMPS 2026
          </span>
        </div>
        
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-background mb-6 animate-fade-in animation-delay-100">
          <span className="block">L{"'"}élégance</span>
          <span className="block text-background/80">réinventée</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-background/80 mb-10 animate-fade-in animation-delay-200 leading-relaxed">
          Découvrez notre collection exclusive où le savoir-faire artisanal rencontre le design contemporain pour créer des pièces intemporelles.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in animation-delay-300">
          <Link
            href="/boutique"
            className="group flex items-center gap-2 px-8 py-4 bg-background text-foreground font-medium rounded-full hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Explorer la collection
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <button
            onClick={() => setVideoChargee(true)}
            className="flex items-center gap-3 px-6 py-4 text-background font-medium hover:text-background/80 transition-colors"
          >
            <span className="flex items-center justify-center h-12 w-12 rounded-full border-2 border-background/50 hover:border-background hover:scale-110 transition-all">
              <Play className="h-5 w-5 ml-1" />
            </span>
            Voir le film
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-8 h-12 rounded-full border-2 border-background/50 flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-background/80 rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {videoChargee && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 backdrop-blur-sm animate-fade-in"
          onClick={() => setVideoChargee(false)}
        >
          <div className="relative w-full max-w-4xl mx-4 aspect-video bg-foreground rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-background">
              <p>Vidéo de présentation</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
