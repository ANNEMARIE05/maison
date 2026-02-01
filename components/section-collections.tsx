"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

const collections = [
	{
		id: 1,
		nom: "Vêtements",
		description: "Pièces raffinées",
		image:
			"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
		href: "/boutique?categorie=vetements",
	},
	{
		id: 2,
		nom: "Accessoires",
		description: "Détails précieux",
		image:
			"https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80",
		href: "/boutique?categorie=accessoires",
	},
	{
		id: 3,
		nom: "Chaussures",
		description: "Élégance absolue",
		image:
			"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80",
		href: "/boutique?categorie=chaussures",
	},
	{
		id: 4,
		nom: "Maison",
		description: "Art de vivre",
		image:
			"https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80",
		href: "/boutique?categorie=maison",
	},
]

export function SectionCollections() {
	return (
		<section className="py-24 bg-background">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="text-center mb-16">
					<span className="text-sm font-medium tracking-widest text-accent uppercase">
						Explorer
					</span>
					<h2 className="mt-4 font-serif text-4xl sm:text-5xl font-bold text-foreground">
						Nos Collections
					</h2>
					<p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
						Chaque collection raconte une histoire unique, mêlant tradition
						artisanale et innovation créative.
					</p>
				</div>

				{/* Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{collections.map((collection, index) => (
						<Link
							key={collection.id}
							href={collection.href}
							className="group relative aspect-[3/4] overflow-hidden rounded-2xl image-zoom animate-fade-in"
							style={{ animationDelay: `${index * 0.1}s` }}
						>
							<Image
								src={collection.image || "/placeholder.svg"}
								alt={collection.nom}
								fill
								className="object-cover transition-transform duration-700"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />

							{/* Content */}
							<div className="absolute inset-0 flex flex-col justify-end p-6">
								<span className="text-sm text-background/70 mb-1">
									{collection.description}
								</span>
								<div className="flex items-center justify-between">
									<h3 className="text-2xl font-serif font-semibold text-background">
										{collection.nom}
									</h3>
									<span className="flex items-center justify-center h-10 w-10 rounded-full bg-background text-foreground opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
										<ArrowUpRight className="h-5 w-5" />
									</span>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	)
}
