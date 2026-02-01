import { Navigation } from '@/components/navigation'
import { PanierDrawer } from '@/components/panier-drawer'
import { HeroSection } from '@/components/hero-section'
import { SectionCollections } from '@/components/section-collections'
import { SectionProduitsVedettes } from '@/components/section-produits-vedettes'
import { SectionHistoire } from '@/components/section-histoire'
import { SectionTemoignages } from '@/components/section-temoignages'
import { SectionAvantages } from '@/components/section-avantages'
import { Footer } from '@/components/footer'

export default function PageAccueil() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <PanierDrawer />
      
      {/* Hero */}
      <HeroSection />
      
      {/* Collections */}
      <SectionCollections />
      
      {/* Produits Vedettes */}
      <SectionProduitsVedettes />
      
      {/* Histoire */}
      <SectionHistoire />
      
      {/* Témoignages */}
      <SectionTemoignages />
      
      {/* Avantages */}
      <SectionAvantages />
      
      {/* Footer */}
      <Footer />
    </main>
  )
}
