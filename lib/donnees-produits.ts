import type { Produit } from '@/components/contexte-panier'

export const categories = [
  { id: 'tous', nom: 'Tous' },
  { id: 'vetements', nom: 'Vêtements' },
  { id: 'accessoires', nom: 'Accessoires' },
  { id: 'chaussures', nom: 'Chaussures' },
  { id: 'maison', nom: 'Maison' },
]

export const produits: Produit[] = [
  {
    id: 1,
    nom: "Manteau Cachemire Élégance",
    prix: 1290,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
    categorie: "vetements",
    description: "Un manteau en cachemire italien d'une douceur incomparable. Coupe moderne et sophistiquée pour un style intemporel.",
    tailles: ["XS", "S", "M", "L", "XL"],
    couleurs: ["Noir", "Camel", "Gris"],
    enStock: true,
    nouveaute: true
  },
  {
    id: 2,
    nom: "Sac Cuir Artisanal",
    prix: 890,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    categorie: "accessoires",
    description: "Sac en cuir pleine fleur fabriqué à la main par nos artisans. Doublure en soie et finitions dorées.",
    couleurs: ["Cognac", "Noir", "Bordeaux"],
    enStock: true
  },
  {
    id: 3,
    nom: "Escarpins Signature",
    prix: 650,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80",
    categorie: "chaussures",
    description: "Escarpins en cuir nappa avec semelle rouge signature. Confort optimal et élégance absolue.",
    tailles: ["36", "37", "38", "39", "40", "41"],
    couleurs: ["Noir", "Nude", "Rouge"],
    enStock: true,
    promotion: 20
  },
  {
    id: 4,
    nom: "Pull Mérinos Luxe",
    prix: 420,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
    categorie: "vetements",
    description: "Pull en laine mérinos extra-fine. Tricoté en Écosse avec les techniques traditionnelles.",
    tailles: ["XS", "S", "M", "L", "XL"],
    couleurs: ["Écru", "Marine", "Bordeaux"],
    enStock: true
  },
  {
    id: 5,
    nom: "Montre Classique Or Rose",
    prix: 2450,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80",
    categorie: "accessoires",
    description: "Montre suisse automatique en or rose 18 carats. Cadran nacré et bracelet en alligator.",
    enStock: true,
    nouveaute: true
  },
  {
    id: 6,
    nom: "Vase Céramique Artisanal",
    prix: 180,
    image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800&q=80",
    categorie: "maison",
    description: "Vase en céramique fait main par des artisans portugais. Chaque pièce est unique.",
    couleurs: ["Blanc", "Terracotta", "Bleu"],
    enStock: true
  },
  {
    id: 7,
    nom: "Blazer Laine Vierge",
    prix: 890,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
    categorie: "vetements",
    description: "Blazer en laine vierge italienne. Doublure en viscose et boutons en corne véritable.",
    tailles: ["XS", "S", "M", "L", "XL"],
    couleurs: ["Marine", "Noir", "Gris"],
    enStock: true
  },
  {
    id: 8,
    nom: "Mocassins Cuir Souple",
    prix: 520,
    image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&q=80",
    categorie: "chaussures",
    description: "Mocassins en cuir souple confectionnés en Italie. Semelle en cuir cousue main.",
    tailles: ["39", "40", "41", "42", "43", "44", "45"],
    couleurs: ["Cognac", "Noir"],
    enStock: true,
    promotion: 15
  },
  {
    id: 9,
    nom: "Bougie Parfumée Ambre",
    prix: 85,
    image: "https://images.unsplash.com/photo-1602607961870-ee11e8ef85b6?w=800&q=80",
    categorie: "maison",
    description: "Bougie parfumée aux notes d'ambre, de bois de santal et de vanille. Durée de 60 heures.",
    enStock: true
  },
  {
    id: 10,
    nom: "Écharpe Soie Imprimée",
    prix: 320,
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80",
    categorie: "accessoires",
    description: "Écharpe en soie twill imprimée à la main. Motif exclusif inspiré des jardins de Versailles.",
    couleurs: ["Multicolore", "Bleu", "Rose"],
    enStock: true,
    nouveaute: true
  },
  {
    id: 11,
    nom: "Pantalon Tailleur Premium",
    prix: 380,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
    categorie: "vetements",
    description: "Pantalon tailleur en laine mélangée. Coupe droite et finitions haute couture.",
    tailles: ["34", "36", "38", "40", "42", "44"],
    couleurs: ["Noir", "Marine", "Gris"],
    enStock: true
  },
  {
    id: 12,
    nom: "Coussin Lin Naturel",
    prix: 120,
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&q=80",
    categorie: "maison",
    description: "Coussin en lin lavé européen. Garnissage en plumes d'oie. Plusieurs coloris disponibles.",
    couleurs: ["Naturel", "Gris", "Terracotta", "Olive"],
    enStock: true
  },
]

export function obtenirProduitParId(id: number): Produit | undefined {
  return produits.find(p => p.id === id)
}

export function obtenirProduitsParCategorie(categorie: string): Produit[] {
  if (categorie === 'tous') return produits
  return produits.filter(p => p.categorie === categorie)
}

export function obtenirNouveautes(): Produit[] {
  return produits.filter(p => p.nouveaute)
}

export function obtenirPromotions(): Produit[] {
  return produits.filter(p => p.promotion)
}

export function formaterPrix(prix: number): string {
  // Conversion approximative EUR -> FCFA (1 EUR ≈ 656 FCFA)
  const prixFCFA = Math.round(prix * 656)
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(prixFCFA)
}
