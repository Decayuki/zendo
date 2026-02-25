// =============================================================
// UTILITAIRE FORMAT URL
// Convertit les noms de la BDD en slugs pour les URLs et inversement
// Exemple : "Bebe_fille" → "bebe-fille" (pour l'URL)
//           "bebe-fille" → "Bebe_fille" (pour la requete MongoDB)
// =============================================================

// Transforme un nom BDD en slug URL
// "Bebe_fille" → "bebe-fille"
function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/_/g, "-")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/**
 * Transforme "bebe-fille" ou "vêtements" en "Bebe_fille" / "Vetements" pour la requête MongoDB.
 * Compare en normalisant les deux côtés (casse + accents) pour que l’URL matche toujours.
 */
const fromSlug = (slug: string, originalList: string[]): string => {
  const normalizedSlug = toSlug(slug);
  return originalList.find((item) => toSlug(item) === normalizedSlug) || slug;
};

export { toSlug, fromSlug };
