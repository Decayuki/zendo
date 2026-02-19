// =============================================================
// SCRIPT SEED - Insere des produits de test dans MongoDB
// A lancer UNE FOIS pour remplir la base avec des faux produits
// Commande : npx ts-node src/scripts/seed-products.ts
//
// Les images sont des URLs placeholder (picsum.photos)
// Plus tard elles seront remplacees par de vraies photos
// =============================================================

import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product";

dotenv.config();

// Liste de produits de test
// Des produits artisanaux francais fictifs pour tester l'affichage
const productsData = [
  {
    name: "Bracelet en cuir tresse",
    description: "Bracelet artisanal en cuir veritable, tresse a la main dans notre atelier bordelais.",
    images: ["https://picsum.photos/seed/bracelet1/400/400", "https://picsum.photos/seed/bracelet2/400/400"],
    price: 35,
    family: "Femme",
    category: "Bijoux",
    material: ["Cuir"],
    madeInFrance: true,
    status: "active",
  },
  {
    name: "Boucles d'oreilles en argent",
    description: "Boucles d'oreilles pendantes en argent 925, design geometrique.",
    images: ["https://picsum.photos/seed/boucles1/400/400"],
    price: 48,
    family: "Femme",
    category: "Bijoux",
    material: ["Argent"],
    madeInFrance: true,
    status: "active",
  },
  {
    name: "Sac bandouliere en lin",
    description: "Petit sac bandouliere en lin naturel, teinture vegetale.",
    images: ["https://picsum.photos/seed/sac1/400/400"],
    price: 65,
    family: "Femme",
    category: "Sacs",
    material: ["Lin"],
    madeInFrance: true,
    status: "active",
  },
  {
    name: "Chemise en coton bio",
    description: "Chemise homme coupe droite en coton biologique, fabrication francaise.",
    images: ["https://picsum.photos/seed/chemise1/400/400"],
    price: 89,
    family: "Homme",
    category: "Vetements",
    material: ["Coton"],
    madeInFrance: true,
    status: "active",
  },
  {
    name: "Ceinture en cuir artisanale",
    description: "Ceinture en cuir pleine fleur, boucle en laiton faite main.",
    images: ["https://picsum.photos/seed/ceinture1/400/400"],
    price: 55,
    family: "Homme",
    category: "Accessoires",
    material: ["Cuir", "Laiton"],
    madeInFrance: true,
    status: "active",
  },
  {
    name: "Vase en ceramique",
    description: "Vase tourne a la main en ceramique emaillee, piece unique.",
    images: ["https://picsum.photos/seed/vase1/400/400"],
    price: 42,
    family: "Maison",
    category: "Decoration",
    material: ["Ceramique"],
    madeInFrance: true,
    status: "active",
  },
  {
    name: "Bougie parfumee lavande",
    description: "Bougie artisanale a la cire de soja, parfum lavande de Provence.",
    images: ["https://picsum.photos/seed/bougie1/400/400"],
    price: 22,
    family: "Maison",
    category: "Decoration",
    material: ["Cire de soja"],
    madeInFrance: true,
    status: "active",
  },
  {
    name: "T-shirt imprime garcon",
    description: "T-shirt en coton bio avec impression artisanale, motif animaux.",
    images: ["https://picsum.photos/seed/tshirt1/400/400"],
    price: 28,
    family: "Garcon",
    category: "Vetements",
    material: ["Coton"],
    madeInFrance: false,
    status: "active",
  },
  {
    name: "Lampe en bois flotte",
    description: "Lampe de table en bois flotte recolte sur les plages atlantiques.",
    images: ["https://picsum.photos/seed/lampe1/400/400"],
    price: 75,
    family: "Maison",
    category: "Luminaire",
    material: ["Bois"],
    madeInFrance: true,
    status: "active",
  },
  {
    name: "Collier perles en bois",
    description: "Collier en perles de bois peintes a la main, fermoir en argent.",
    images: ["https://picsum.photos/seed/collier1/400/400"],
    price: 32,
    family: "Femme",
    category: "Bijoux",
    material: ["Bois", "Argent"],
    madeInFrance: true,
    status: "active",
  },
  {
    name: "Bol en gres emaille",
    description: "Bol en gres tourne a la main, email bleu ocean.",
    images: ["https://picsum.photos/seed/bol1/400/400"],
    price: 18,
    family: "Maison",
    category: "Art_de_la_table",
    material: ["Gres"],
    madeInFrance: true,
    status: "active",
  },
  {
    name: "Sandales en cuir femme",
    description: "Sandales artisanales en cuir naturel, semelle en liege.",
    images: ["https://picsum.photos/seed/sandales1/400/400"],
    price: 95,
    family: "Femme",
    category: "Chaussures",
    material: ["Cuir", "Liege"],
    madeInFrance: true,
    status: "active",
  },
];

// Fonction principale du seed
async function seedProducts() {
  try {
    // Etape 1 : se connecter a MongoDB
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connecte a MongoDB");

    // Etape 2 : supprimer tous les anciens produits de test
    await Product.deleteMany({});
    console.log("Anciens produits supprimes");

    // Etape 3 : inserer les nouveaux produits
    const created = await Product.insertMany(productsData);
    console.log(created.length + " produits inseres avec succes");

    // Etape 4 : fermer la connexion
    await mongoose.disconnect();
    console.log("Deconnecte de MongoDB");
  } catch (error) {
    console.error("Erreur seed:", error);
    process.exit(1);
  }
}

// Lancer le seed
seedProducts();
